---
title: "상태 저장(영속성)"
lesson: 1
chapter: 3
date: "22/03/2019"
programming_language:  "javascript"
type: "lesson"
language: ko_kr
tags:
    - getting-started
    - nact
    - javascript
    - nodejs
---

지금까지 만든 주소록 서비스 예제는 여전히 그다지 유용하지 않습니다. 비록 여러 사용자가 사용할 수 있는 버전으로 확장하긴 했지만, 아직도 부족한 점이 있습니다. 바로 시스템을 재시작하면 연락처 데이터를 다 잃어버리게 된다는 것입니다. 이를 극복하기 위해 **nact**에서는, 상태 있는 액터에 `persist` 메서드를 추가해서 보강합니다.

`persist` 메서드를 사용하기 위해서는 먼저 저장(영속성) 엔진을 설정해야 합니다. 현재는 **PostgreSQL** 엔진 구현만 제공하고 있습니다. (다만 여러분이 각자 필요한 엔진을 쉽게 작성할 수 있습니다.) PostgreSQL 엔진을 사용하려면 아래와 같이 하면 됩니다.

```bash
$ npm install --save nact-persistence-postgres
$ yarn add nact-persistence-postgres
```

여러분이 데이터베이스 연결 URL을 환경변수 `DATABASE_URL`에 설정했다고 가정하고, 기존 코드에서 액터 시스템을 생성하는 부분을 아래와 같이 수정합니다.

```javascript
const { start, configurePersistence, spawnPersistent } = require('nact')
const { PostgresPersistenceEngine } = require('nact-persistence-postgres')
const connectionString = process.env.DATABASE_URL
const system = start(configurePersistence(new PostgresPersistenceEngine(connectionString)))
```

`configurePersistence` 함수는 액터 시스템에 지정한 저장 엔진을 플러그인으로 추가합니다.

이제 남은 일은 연락처 서비스가 상태를 저장하도록 만드는 것입니다. 상태를 변경하는 메시지를 저장하고, 액터가 재시작할 때 메시지를 재생하여 상태를 복구합니다.[^1] 액터가 재시작할 때는 먼저 저장된 메시지를 재생하여 상태를 복구한 다음에 새로 도착한 메시지를 처리합니다.

```javascript
const spawnUserContactService = (parent, userId) => spawnPersistent(
  parent,
  async (state = { contacts:{} }, msg, ctx) => {    
    if (msg.type === GET_CONTACTS) {        
      dispatch(ctx.sender, { payload: Object.values(state.contacts), type: SUCCESS })
    } else if (msg.type === CREATE_CONTACT) {
      const newContact = { id: uuid(), ...msg.payload };
      const nextState = { contacts: { ...state.contacts, [newContact.id]: newContact } }

      // 이전에 저장되지 않은 메시지만 저장한다.
      // `persist` 메서드는 반드시 `await`로 해결하고 지나가야 한다.
      // 그렇지 않으면 액터가 이 메시지를 저장하기도 전에 새로운 메시지를 받아서 처리하게 될 수도 있다.
      if (!ctx.recovering) {
        await ctx.persist(msg)
      }

      // 복구중에는 `dispatch`를 해도 안전하다. (아무 액터에게도 보내지 않으며, 무시된다.)
      dispatch(ctx.sender, { type: SUCCESS, payload: newContact })
      return nextState
    } else {
      const contact = state.contacts[msg.contactId]
      if (contact) {
        switch(msg.type) {
          case GET_CONTACT: {
            dispatch(ctx.sender, { payload: contact, type: SUCCESS }, ctx.self)
            break
          }
          case REMOVE_CONTACT: {
            const nextState = { ...state.contacts, [contact.id]: undefined }
            if (!ctx.recovering) {
              await ctx.persist(msg)
            }
            dispatch(ctx.sender, { type: SUCCESS, payload: contact }, ctx.self)
            return nextState
          }
          case UPDATE_CONTACT:  {
            const updatedContact = {...contact, ...msg.payload }
            const nextState = { ...state.contacts, [contact.id]: updatedContact }
            if (!ctx.recovering) {
              await ctx.persist(msg)
            }                
            dispatch(ctx.sender, { type: SUCCESS, payload: updatedContact }, ctx.self)
            return nextState
          }
        }
      } else {          
        dispatch(ctx.sender, { type: NOT_FOUND, contactId: msg.contactId }, ctx.sender)
      }
    }
    return state
  },
  // 저장 키
  // 액터의 상태를 복구하기 위해서는 저장 키가 같아야 한다.
  // 네임스페이스 등으로 잘 구분해서, 실수로 키가 섞이지 않도록 해야 한다.
  // 그렇지 않으면 디버깅하기 매우 어렵다.
  `contacts:${userId}`,
  userId
)
```

[^1]: 정석대로 하면, 메시지 자체를 저장하는 것이 아니라 메시지로 말미암은 변화를 이벤트로 치환하고, 그 이벤트를 저장한다. 복구할 때는 저장된 이벤트를 재생한다. 그래서 Event-Sourcing이라고 하는 것이다.
