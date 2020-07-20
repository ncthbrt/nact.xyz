---
title: "액터의 계층 구조"
lesson: 4
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

이전 **질의 하기** 장에서 만든 예제 애플리케이션은 그다지 쓸모있지 않습니다. 그 이유는 첫째로 단일 유저를 위한 주소록만 제공한다는 점이며, 두번째는 시스템이 재시작하면 모든 연락처가 소실된다는 점입니다. 이번 장에서는 액터 시스템의 중요한 기능인 계층 구조를 사용해서 다중 사용자를 지원하도록 해보겠습니다.

액터는 **계층적**으로 배치됩니다. **액터는 자녀 액터를 만들 수 있습니다.** 따라서 **모든 액터에는 그 부모 액터가 존재**합니다. 액터의 생명주기는 부모 액터에 달려있습니다. **어떤 액터가 중지하면, 그 액터의 모든 자녀 액터는 중지**합니다.

지금까지는 액터 시스템(액터 시스템 역시 일종의 액터입니다.)의 자녀 액터를 만들었습니다. 그러나 실제 운영 시스템에서, 액터 시스템의 자녀 액터만 만들어서 사용하는 것은 안티패턴입니다. 프로그램의 모든 코드를 단 하나의 파일로 구성하는 것이 안티패턴인 것과 같은 맥락입니다. 액터의 계층 구조를 이용함으로써 **관심사의 분리(separation of concerns)**와 시스템 기능의 **캡슐화**를 달성하고, 동시에 **시스템 장애와 액터의 종료 처리**와 같은 부분에 대해 일관적인 추론을 할 수 있습니다.

다시 주소록 애플리케이션으로 돌아가서, 단일 사용자 주소록 서비스가 이번에는 더 큰 규모의 시스템의 일부분이라고 생각해봅시다. 예를 들면 이메일 캠페인 관리자 API 서비스 같은 것입니다. 아마도 전체 시스템의 그림은 아래와 같이 나타낼 수 있겠습니다.

```
└── 캠페인 관리자 서비스
          │
          ├── 주소록 서비스
          │       │
          │       ├── 사용자 A의 주소록
          │       ├── 사용자 B의 주소록
          │       └── ...
          │
          └── 이메일 서비스
                  │
                  ├── 이메일 템플릿 서비스
                  ├── 이메일 전송 서비스
                  └── ...
```

그림에서 이메일 서비스는 템플릿을 관리하고 메일을 전송하는 일을 담당합니다. 그리고 주소록 서비스는 각 사용자의 주소록 정보를 액터로 모델링합니다. (**일정 기간 활동이 없는 액터는 종료할 수 있습니다.** 그래서 이렇게 여러 자녀 액터로 분리하는 것은, 특히 프로덕션 환경에서 매우 적절한 방법입니다.)

주소록 서비스에 집중해서, 어떻게 하면 계층 구조를 잘 활용할 수 있을지 알아봅시다. 다중 사용자를 지원하기 위해서는 다음과 같은 작업들이 추가로 필요합니다.

- 기존의 주소록 서비스를 수정해서, 액터를 생성할 때 부모 액터와 액터 이름을 인자로 받도록 합니다.
- 주소록 액터의 부모 액터를 만들어서, 이 부모 액터가 적절한 자녀 액터로 요청을 라우팅하도록 합니다.
- 주소록 API 엔드포인트의 URL 경로에 `user_id`를 추가합니다. 메시지에도 `userId`를 추가합니다.

기존의 주소록 서비스는 이렇게 바뀝니다.

```javascript
const spawnUserContactService = (parent, userId) => spawn(
  parent,
  handler, // 기존과 같음
  userId
)
```

연락처 액터의 부모 액터도 만듭니다.

```javascript
const spawnContactsService = (parent) => spawnStateless(
  parent,
  (msg, ctx) => {
    const userId = msg.userId
    let childActor
    if (ctx.children.has(userId)) {
      childActor = ctx.children.get(userId)
    } else {
      childActor = spawnUserContactService(ctx.self, userId)            
    }
    dispatch(childActor, msg)
  },
  'contacts'
)
```

새로 만든 부분들이 액터의 계층 구조의 힘을 보여줍니다. 이제 주소록 서비스(부모 액터)는 **자녀 액터의 세세한 구현에 신경쓰지 않아도 됩니다.** (심지어 자녀 액터들이 어떤 메시지를 처리하는지도 알 필요가 없습니다.) 자녀 액터도 다중 사용자 환경에 대해서 고민할 필요가 없이, **자기 역할에만 충실하게** 됩니다.

예제를 완성하기 위해 API 엔드포인트도 수정하겠습니다.

```javascript
app.get('/api/:user_id/contacts', (req, res) =>
  performQuery({ type: GET_CONTACTS, userId: req.params.user_id }, res)
)

app.get('/api/:user_id/contacts/:contact_id', (req, res) => 
  performQuery({
    type: GET_CONTACT,
    userId: req.params.user_id,
    contactId: req.params.contact_id
  }, res)
)

app.post('/api/:user_id/contacts', (req, res) =>
  performQuery({ type: CREATE_CONTACT, payload: req.body }, res)
)

app.patch('/api/:user_id/contacts/:contact_id', (req, res) => 
  performQuery({
    type: UPDATE_CONTACT,
    userId: req.params.user_id,
    contactId: req.params.contact_id,
    payload: req.body
  }, res)
)

app.delete('/api/:user_id/contacts/:contact_id', (req, res) => 
  performQuery({
    type: REMOVE_CONTACT,
    userId: req.params.user_id,
    contactId: req.params.contact_id
  }, res)
)
```

이제 **최소 기능 제품**(Minimum Viable Product, MVP)을 만들기 위해 남은 과제는, **시스템을 재시작해도 데이터가 사라지지 않도록 상태를 저장하는 방법**을 강구하는 것입니다.
