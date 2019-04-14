---
title: "스냅샷"
lesson: 2
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

이벤트가 많이 누적된 액터를 복원할 때 문제가 생길 수 있습니다. 왜냐하면 누적된 이벤트가 많을수록 액터가 상태를 복원하는 데 시간이 오래 걸릴 수 있기 때문입니다. 시간에 민감한 애플리케이션에서는 nact가 부적절하다고 생각하실 수도 있겠지만, 이를 해결할 방법이 있습니다. 바로 **스냅샷**입니다. 스냅샷은 **모든 저장된 이벤트를 재생하지 않고도 액터의 상태를 복원하는 방법**입니다. 액터가 상태를 복원할 때 nact는 **스냅샷 저장소**에서 복원할 수 있는 스냅샷이 있는지 먼저 확인하고, 그 중에서 최근의 스냅샷을 불러옵니다. 스냅샷에는 몇 번째 이벤트에서 스냅샷이 만들어졌는지를 알려주는 시퀀스 번호가 있습니다. 이제 액터 복원 모드에서 스냅샷을 액터의 `initialState`로 전달하고, 해당 스냅샷 이후에 만들어진 이벤트만 재생합니다.

기존의 코드에서 스냅샷을 지원하도록 고쳐보겠습니다.

```javascript
const { messages } = require('nact')

const spawnUserContactService = (parent, userId) => spawnPersistent(
  parent,
  // 메시지 핸들러 (변경 없음)
  async (state = { contacts: {} }, msg, ctx) => {},
  `contacts:${userId}`,
  userId,
  { snapshotEvery: 20 * messages }
)
```

`spawnPersistent` 함수의 마지막 인자로 **액터 속성** 오브젝트를 전달합니다. 이때 `snapshotEvery` 속성은 nact가 해당 액터가 수신하는 메시지 20회마다 스냅샷을 생성하도록 합니다.
