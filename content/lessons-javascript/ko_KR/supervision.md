---
title: "관리 감독(Supervision)"
lesson: 5
chapter: 2
cover: "https://unsplash.it/400/300/?random?BoldMage"
date: "22/03/2019"
category: "javascript"
type: "lesson"
tags:
    - getting-started
    - nact
    - javascript
    - nodejs
---

액터 시스템은 '**실패하게 내버려 둬라([let it crash](http://wiki.c2.com/?LetItCrash))**' 철학에 입각하여 설계되었습니다. 이 명제는 **(시스템의 예외 처리를 담당하는) 인프라 영역의 코드가 도메인 영역의 로직과 뒤섞여서 혼잡해지는 것을 줄이려는** 바람에서 비롯한 것입니다.

그렇다면 실패하게 내버려 두면서도 어떻게 시스템의 탄력성(장애 회복성)을 확보할 수 있을까요? 그 답은 액터의 관리 감독(Supervision) 기능에 있습니다. **액터가 예외적으로 중지되면 액터에 정의된 정책에 따라 어떻게 실패에서 회복할지를 결정하게 됩니다.** **[Erlang](https://ko.wikipedia.org/wiki/얼랭)**은 이러한 실패 회복 전략을 처음으로 채택한 플랫폼이었습니다. 이로써 [에릭슨](https://ko.wikipedia.org/wiki/에릭슨) 사가 전화 교환 시스템을 구축했을 때 **[99.9999999% 가용성](https://ko.wikipedia.org/wiki/고가용성)**의 놀라운 안정성을 이루었습니다.

**Nact**의 관리 감독 시스템도 **Erlang**과 유사하게 동작합니다. 액터가 예외를 던지면, 기본적으로는 중지됩니다. 액터를 생성할 때 `onCrash` 파라미터를 전달해서 관리 감독 정책을 변경할 수 있습니다. 이 값은 사용자 정의 함수로서 던져진 예외, 예외가 던져질 당시에 처리하던 메시지, 그리고 액터 컨텍스트를 파라미터로 받습니다. 이 관리 감독 정책 함수는 관리 감독 결정 사항을 반환합니다. (비동기적으로도 처리 가능) 아때 가능한 결정은 아래와 같습니다.

| 결정 | 효과 |
|---|---|
| stop | 예외를 일으킨 액터를 종료 |
| stopAll | 같은 부모를 둔 액터를 모두 종료 |
| reset | 예외를 일으킨 액터의 상태를 초기화 |
| resetAll | 같은 부모를 둔 액터의 상태를 초기화 |
| resume | 현재 상태 그대로 액터를 재개해서 다음 메시지를 계속 처리하도록 함 |
| escalate | 부모 액터로 결정을 넘김 |

실패할 때마다 액터의 상태를 초기화하는 관리 감독 정책 함수의 예입니다.

```javascript
const reset = (msg, error, ctx) => ctx.reset
```

액터의 실패는 시스템 자원을 사용할 수 없을 때 발생하기도 합니다. 이때 즉시 액터를 재개하면 금방 다시 실패하기 때문에 CPU 사이클을 불필요하게 소모하게 됩니다. 그래서 관리 감독 정책 함수에 약간의 지연을 추가하겠습니다.

```javascript
const delay = duration => new Promise(resolve => setTimeout(() => resolve(), duration))

const reset = async (msg, error, ctx) => {
  await delay(Math.random() * 500 - 750)
  return ctx.reset
}
```

외부 서비스를 호출하는 부분이 있을 떼, API에 호출 빈도 제한이 있을 수 있습니다. 그래서 클로저(closure)를 사용해서 좀 더 정교하게 만들어보겠습니다. (실패가 반복되면 지연 시간을 지수적으로 증가)

```javascript
const delay = duration => new Promise(resolve => setTimeout(() => resolve(), duration))

const resetWithExponentialDelay = factor => {
  let count = 0
  return async (msg, error, ctx) => {                
      let delay =  (2 ** count - 1) * factor
      await delay(delay)
      count = count + 1
      return ctx.reset
  }
}
```

저번에 만든 주소록 서비스 액터에 관리 감독 정책 함수를 등록합니다.

```javascript
const spawnContactsService = parent => spawnStateless(
  parent,
  (msg, ctx) => {
    const userId = msg.userId
    let childActor
    if (ctx.children.has(userId)) {
      childActor = ctx.children.get(userId)
    } else {
      childActor = spawnUserContactService(ctx.self, userId)
    }
    dispatch(childActor, msg, ctx.sender)
  },
  'contacts',
  { onCrash: reset }
)
```

`spawnStateless` 함수의 네번째 파라미터는 액터 속성 객체입니다. 여기에는 `onChildCrashes`를 비롯해서 다양한 액터의 동작을 지정할 수 있습니다. 이후의 장에서 더 살펴보겠습니다.
