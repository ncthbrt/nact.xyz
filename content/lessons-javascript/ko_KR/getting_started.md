---
title: "시작하기"
lesson: 2
chapter: 1
cover: "https://unsplash.it/400/300/?random?BoldMage"
date: "22/03/2019"
category: "javascript"
type: "lesson"
language: ko_KR
tags:
    - getting-started
    - nact
    - reason
    - bucklescript
---

Nact는 Node 8 이상 버전 설치된 환경에서 작동합니다. 아래의 방법으로 설치할 수 있습니다.

```bash
# npm 사용자
$ npm install --save nact

# yarn 사용자
$ yarn add nact
```


## 액터 시스템을 시작하고 참조를 반환한다: `start()`

설치한 후에, 애플리케이션 코드에서 `start` 함수를 import 합니다. `start` 함수는 액터 시스템을 시작하고, 그 참조를 반환합니다.

```javascript
// Node (CommonJS) import
const { start, dispatch, stop, spawnStateless } = require('nact')

// ES6 import
import { start, dispatch, stop, spawnStateless } from 'nact'

const system = start() // 액터 시스템을 시작하고 참조를 반환한다.
```


## 액터를 생성한다: `spawn()`, `spawnStateless()`
액터 시스템의 참조(위에서 `system`)를 가지고 이제 첫번째 액터를 생성할 수 있습니다. 액터를 생성하려면 `spawn` 해야합니다. 전통에 따라, 메시지를 수신했을 때 "Hello"를 출력하는 액터를 만들어봅시다. 이 액터는 아무 내부 상태가 없으므로, 더 단순한 `spawnStateless` 함수를 사용합니다.

```javascript
const greeter = spawnStateless(
  // 부모(상위) 액터 참조, 여기서는 ActorSystem(최상위 액터)
  system,
  // 메시지 핸들러 함수
  (msg, ctx) => {
    console.log(`Hello, ${msg.name}`)
  },
  // 액터의 이름(unique)
  'greeter'
);
```

`spawnStateless` 함수 인자
- 첫번째 인자는 부모(상위) 액터의 참조입니다.<br>
  이 코드에서 `system`은 액터 시스템 자체이며, 액터 시스템은 곧 최상위 액터입니다. 나중에 **액터의 계층 구조** 항목에서 더 자세히 다루겠습니다.
- 두번째 인자는 메시지를 수신했을 때 실행되는 함수입니다.
- 세번째 인자는 액터의 고유한 이름입니다. 여기서는 `'greeter'`라고 명명했습니다. 세번째 인자는 생략 가능하며, 생략하면 액터 시스템이 자동으로 이름을 정합니다.


## 액터에 메시지를 보낸다: `dispatch()`

액터와 통신하기 위해 `dispatch` 함수를 사용합니다.

여기서 `greeter` 액터에게, 당신의 이름을 알려주는 메시지를 `dispatch` 해봅시다.

```javascript
dispatch(greeter, { name: 'David Lee' })
```

결과로 콘솔 화면에 아래와 같이 출력됩니다.

```
Hello, David Lee
```


## 액터 시스템을 종료한다: `stop()`

액터 시스템을 종료하면서 예제 실습을 마치겠습니다.

`stop` 함수는 액터 하나를 종료할 때도 쓰입니다.

아래와 같이 해서 `greeter` 액터를 종료합니다.

```javascript
stop(greeter)
```

마찬가지로 (`system`으로 참조된) 최상위 액터인 액터 시스템을 종료하여 전체 액터 시스템을 종료할 수 있습니다.

```javascript
stop(system)
```


## 무상태 액터(Stateless Actor)

무상태(Stateless) 액터는 동시에 여러 개의 요청을 처리할 수 있습니다. 무상태성(Statelessness)이란, 액터가 동시성 문제를 신경 쓸 필요가 없다는 뜻입니다.
