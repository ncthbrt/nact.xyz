---
title: "상태가 있는 액터"
lesson: 1
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

**액터 시스템**의 주요 장점 가운데 하나는 바로 **상태가 있는 서비스를 안전하게 생성하는** 방법을 제공하는 것입니다. Nact에서는 `spawn` 함수를 이용해서 **상태 있는 액터**를 생성합니다.

아래의 예제에서, 상태는 비어있는 객체 `state = {}` 로 초기화됩니다. 액터가 메시지를 수신할 때마다, 현재 상태는 메시지 핸들러 함수의 첫번째 인자로 들어갑니다. 한 번도 들어오지 않았던 이름(`msg.name`)이 들어오면, 메시지 핸들러 함수는 기존의 상태(`state`)에 새로운 이름(`msg.name`)을 추가해서 새로운 상태로 반환합니다. 만약 이미 들어왔던 이름(`msg.name`)이라면 그냥 기존의 상태를 그대로 반환합니다. 이때 반환된 상태는 다음 번 메시지 핸들러 함수 호출 시 `state` 인자의 값으로 사용됩니다.

```javascript
const statefulGreeter = spawn(
  system, 
  (state = {}, msg, ctx) => {
    const hasPreviouslyGreetedMe = state[msg.name] !== undefined
    if (hasPreviouslyGreetedMe) {
      console.log(`Hello again ${msg.name}.`)
      return state;
    } else {
      console.log(
        `Good to meet you, ${msg.name}.\nI am the ${ctx.name} service!`
      )
      return { ...state, [msg.name]: true }
    }
  },
  'stateful-greeter'
)
```
