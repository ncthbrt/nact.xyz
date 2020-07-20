---
title: "질의하기"
lesson: 3
chapter: 2
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

액터 시스템은 닫힌 세계가 아니므로 외부 세계와 소통할 수 있어야 합니다. 일반적으로 액터 시스템은 REST API 혹은 RPC를 통해 외부에 노출됩니다. 그런데 REST나 RPC는 블로킹 스타일로 동작합니다. 즉 Request가 들어와서 처리되고 Response를 회신하는 동안 원래의 연결은 유지됩니다. 논블로킹으로 동작하는 nact와 연결될 수 있도록 `query` 함수를 제공합니다. `query` 함수는 `Promise`를 반환합니다.

`dispatch` 함수와 마찬가지로 `query` 함수는 액터의 메일박스에 메시지를 담습니다. 다른 점은, `query` 함수는 가상의 액터를 생성해서 (송신자로 참조해서) 메시지를 보내는 것입니다. 이때 이 가상 액터가 응답 메시지를 받으면 `query` 함수에서 리턴된 Promise에 값이 들어갑니다.

`query` 함수는 대상 액터 참조, 메시지와 더불어 timeout 값을 인자로 받습니다. timeout 값의 단위는 밀리 초입니다. 만약 Promise에 값이 들어오는데 이보다 시간이 오래 걸리면, 시간 초과와 함께 Promise는 무효화됩니다. 질의 패턴에서의 시간 제한은 운영 환경에서 매우 중요합니다. 서브 시스템의 실패로 인해 질의가 처리되지 못하게 되면 점점 시스템의 가용 자원을 소모하게 되고, 이는 전체 시스템에 단계적으로 장애를 일으키게 됩니다. timeout은 이런 문제가 발생하지 않도록 해줍니다.

이 예제에서, 간단한 단일 사용자용 인-메모리 주소록 시스템을 만들어보겠습니다. 실제감을 더하기 위해 express 애플리케이션을 호스팅하겠습니다. npm(혹은 yarn)을 이용해서 `express`, `body-parser`, `uuid` 그리고 `nact`를 설치합니다.

> 알림: 이 예제는 이후 장에서 계속 확장할 것입니다.

주소록 API의 기본 요건이 어떻게 될까요? 다음과 같은 것들이 될 수 있습니다.

- 새 연락처 추가
- 모든 연락처 조회
- 특정 연락처 조회
- 연락처 수정
- 연락처 삭제

이를 구현하기 위해 다음의 엔드포인트를 구성합니다.

- POST /api/contacts - 새 연락처 추가
- GET /api/contacts - 모든 연락처 조회
- GET /api/contacts/:contact_id - 특정 연락처 조회
- PATCH /api/contacts/:contact_id - 연락처 수정
- DELETE /api/contacts/:contact_id - 연락처 삭제

아래는 서버 인스턴스와 엔드 포인트를 구성하는 미완성 코드입니다.

```javascript
import express from 'express'
import * as bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json())

app.get('/api/contacts', (req, res) => {
  /* 모든 연락처 조회 */
})

app.get('/api/contacts/:contact_id', (req, res) => {
  /* 특정 연락처 조회 */
})

app.post('/api/contacts', (req, res) => {
  /* 새 연락처 추가 */
})

app.patch('/api/contacts/:contact_id', (req, res) => {
  /* 연락처 수정 */
})

app.delete('api/contacts/:contact_id', (req, res) => {
  /* 연락처 삭제 */
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`${process.env.PORT || 3000} 포트 수신중!`)
})
```

액터는 메시지 구동 방식으로 동작하므로, 액터 시스템과 REST API 간에 사용할 메시지 타입을 정의합니다.

```javascript
const ContactProtocolTypes = {
   GET_CONTACTS: 'GET_CONTACTS',
   GET_CONTACT: 'GET_CONTACT',
   UPDATE_CONTACT: 'UPDATE_CONTACT',
   REMOVE_CONTACT: 'REMOVE_CONTACT',
   CREATE_CONTACT: 'CREATE_CONTACT',
   
   // 성공
   SUCCESS: 'SUCCESS',
   
   // 연락처를 찾지 못했을 때
   NOT_FOUND: 'NOT_FOUND'
}
```

연락처 액터는 각 메시지 타입을 처리해야 합니다.

```javascript
import { v4 as uuid } from 'uuid'

const contactsService = spawn(
  system,
  (state = { contacts: {} }, msg, ctx) => {    
    if (msg.type === GET_CONTACTS) {
      // 모든 연락처를 배열로 반환
      dispatch(
        msg.sender, 
        { payload: Object.values(state.contacts), type: SUCCESS, sender: ctx.self }
      )
    } else if (msg.type === CREATE_CONTACT) {
      const newContact = { id: uuid(), ...msg.payload }
      const nextState = { 
        contacts: { ...state.contacts, [newContact.id]: newContact } 
      }
      dispatch(msg.sender, { type: SUCCESS, payload: newContact })
      return nextState
    } else {
      // 이미 존재하는 연락처가 있는지 확인
      const contact = state.contacts[msg.contactId]

      if (contact) {
          switch(msg.type) {
            case GET_CONTACT: {
              dispatch(msg.sender, { payload: contact, type: SUCCESS })
              break
            }
            case REMOVE_CONTACT: {
              // 특정 연락처 항목을 undefined로 변경한 새 상태 반환
              const nextState = { ...state.contacts, [contact.id]: undefined }
              dispatch(msg.sender, { type: SUCCESS, payload: contact })
              return nextState
            }
            case UPDATE_CONTACT: {
              // 특정 연락처 항목을 덮어 쓴 새 상태 반환
              const updatedContact = {...contact, ...msg.payload }
              const nextState = { 
                ...state.contacts,
                [contact.id]: updatedContact 
              }
              dispatch(msg.sender, { type: SUCCESS, payload: updatedContact })
              return nextState                 
            }
          }
      } else {
        // 기존 연락처가 존재하지 않으면 NOT_FOUND 메시지를 요청자에게 응답
        dispatch(
          msg.sender, 
          { type: NOT_FOUND, contactId: msg.contactId, sender: ctx.self }, 
        )
      }
    }      
    // 현재 상태에서 변경된 것이 없으면 현재 상태를 그대로 반환
    return state
  },
  'contacts'
)
```

이제 주소록 서비스를 API 컨트롤러와 연결합니다. 각 엔드포인트에서 질의 패턴으로 액터에 메시지를 보냅니다.

아래는 특정 연락처를 조회하는 엔드포인트에서 액터와 통신하는 예제입니다. (다른 곳도 비슷하게 합니다.)

```javascript
app.get('/api/contacts/:contact_id', async (req, res) => { 
  const contactId = req.params.contact_id
  const msg = { type: GET_CONTACT, contactId }
  try {
    const result = await query(contactService, (sender) => Object.assign(msg, {sender}), 250) // 타임아웃 250ms 설정
    switch(result.type) {
      case SUCCESS:
        res.json(result.payload)
        break
      case NOT_FOUND:
        res.sendStatus(404)
        break
      default:
        // 여기에 도달하지는 않을 것임. 무언가 크게 잘못된 경우
        console.error(JSON.stringify(result))
        res.sendStatus(500)
        break
    }
  } catch (e) {
    // 504: 게이트웨이 시간 초과. 타임아웃이 발생할 때만 예외 던짐
    res.sendStatus(504)
  }
})
```

각 엔드포인트를 구현할 때, 반복되는 보일러 플레이트 코드가 많습니다. `performQuery`라는 별도의 함수를 만들어서 에러 처리 부분을 따로 빼는 방법으로 코드를 리팩터링 할 수 있습니다.

```javascript
const performQuery = async (msg, res) => {
  try {
    const result = await query(contactsService, (sender) => Object.assign(msg, {sender}), 500) // 타임아웃 250ms 설정
    
    switch(result.type) {
      case SUCCESS:
        res.json(result.payload)
        break
      case NOT_FOUND:
        res.sendStatus(404)
        break
      default:
        // 여기에 도달하지는 않을 것임. 무언가 크게 잘못된 경우
        console.error(JSON.stringify(result))
        res.sendStatus(500)
        break
    }
  } catch (e) {
    // 504: 게이트웨이 시간 초과. 타임아웃이 발생할 때만 예외 던짐
    res.sendStatus(504)
  }
}
```

이로써 API 엔드포인트를 아래와 같이 작성할 수 있습니다.

```javascript
app.get('/api/contacts', (req, res) =>
  performQuery({ type: GET_CONTACTS }, res)
)

app.get('/api/contacts/:contact_id', (req, res) => 
  performQuery({ type: GET_CONTACT, contactId: req.params.contact_id }, res)
)

app.post('/api/contacts', (req, res) =>
  performQuery({ type: CREATE_CONTACT, payload: req.body }, res)
)

app.patch('/api/contacts/:contact_id', (req, res) => 
  performQuery({ type: UPDATE_CONTACT, contactId: req.params.contact_id, payload: req.body }, res)
)

app.delete('/api/contacts/:contact_id', (req, res) => 
  performQuery({ type: REMOVE_CONTACT, contactId: req.params.contact_id }, res)
)
```

이상으로 간단한 주소록 서비스를 구현해보았습니다.
