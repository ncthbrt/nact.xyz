---
title: "타임아웃"
lesson: 3
chapter: 3
date: "22/03/2019"
programming_language:  "javascript"
type: "lesson"
language: ko_KR
tags:
    - getting-started
    - nact
    - javascript
    - nodejs
---

퍼시스턴스 액터(상태를 영속적으로 저장할 수 있는 액터)의 일부는 아니지만, **타임아웃** 기능은 **스냅샷** 기능과 자주 함께 사용됩니다. 액터는 한정된 메모리 공간을 차지합니다. 만약 한동안 액터가 메시지를 처리하지 않는다면, 나중에 필요할 때까지 액터를 중단하는 것이 바람직합니다. 이렇게 하면 사용하지 않는 메모리를 반환할 수 있습니다. 기존에 만든 주소록 서비스에 타임아웃을 추가하는 방법은 스냅샷 옵션을 추가하는 방법과 비슷합니다.

```javascript
const { messages, minutes } = require('nact')

const spawnUserContactService = (parent, userId) => spawnPersistent(
  parent,
  // 메시지 핸들러 (그대로)
  async (state = { contacts: {} }, msg, ctx) => {},
  `contacts:${userId}`,
  userId,
  {
    snapshotEvery: 20 * messages,
    shutdownAfter: 10 * minutes
  }
);
```

위 코드에 따르면, 주소록 서비스는 10분 동안 새로운 메시지를 수신하지 않으면 종료됩니다.
