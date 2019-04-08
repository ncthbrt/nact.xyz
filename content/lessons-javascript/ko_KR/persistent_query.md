---
title: "퍼시스턴트 쿼리"
lesson: 4
chapter: 3
cover: "https://unsplash.it/400/300/?random?BoldMage"
date: "22/03/2019"
category: "javascript"
type: "lesson"
language: ko_KR
tags:
    - getting-started
    - nact
    - javascript
    - nodejs
---

저장된 이벤트가 많을 때 스냅샷 기능을 이용하면 액터의 상태를 복원할 때 성능상 이득을 볼 수 있다는 것을 알았습니다. 그런데 어떤 때는 이벤트 목록 자체가 필요할 수 있습니다.

예를 들면, 어떤 도메인 엔티티에 변화를 일으키는 트랜잭션 목록을 보고 싶은 때가 있을 수 있습니다. 항상 필요하지는 않지만 그래도 언젠가는 필요할 때가 있습니다. 그런데 만약 이것 때문에 이벤트 목록 자체를 상태로 저장해버린다면, 이벤트 목록까지 포함된 스냅샷이 점점 커져서 비효율적이게 됩니다.(상상해보십시오) 이 문제는 [CQRS 패턴](https://martinfowler.com/bliki/CQRS.html)으로 해결할 수 있습니다.

**Nact**는 **CQRS**의 경량화된(그러나 강력한) 형태로서 **퍼시스턴트 쿼리** 기능을 제공합니다. 퍼시스턴트 쿼리에는 **퍼시스턴트 키**를 입력받아 저장된 이벤트를 메시지 핸들러에 재생하는 함수를 리턴합니다. 이 함수는 Promise에 담긴 결과를 반환합니다. 퍼시스턴트 쿼리는 지연 평가되어(lazy evaluation) 사용할 때 비로소 실행됩니다.[^1] 참조될 때마다 반복적으로 실행되고, 혹시 새 이벤트가 있으면 역시 반영됩니다. 퍼시스턴트 쿼리의 결과와 시퀀스 번호(이벤트가 저장될 때 순서대로 부여되는 번호)는 별도로 설정된 타임아웃 값에 따라서 캐시되고, 또 일정 메시지마다 스냅샷을 저장하도록 할 수 있습니다.

아래에서 퍼시스턴트 쿼리를 유용하게 사용하는 실용적인 예를 볼 수 있습니다. 이 예제는 지갑을 간단히 모델링한 것입니다. 액터의 상태에는 현재 잔액, 아이디, 금전 출납 기록에 대한 퍼시스턴트 쿼리 등이 있습니다. 이 예제에서 주목해야 할 것은 `encoder`와 `decoder`를 사용한 부분입니다. 이는 액터의 상태가 단지 정적인 데이터가 아니라 퍼시스턴트 쿼리와 같은 동적 데이터를 포함하고 있을 때 필요합니다.

```javascript
const transactionsQuery = (parent, id) =>
  persistentQuery(    
    parent,
    (state = [], msg) => {
      if (msg.type === 'transaction') {
        return [msg, ...state]
      } else {
        return state
      }          
    },
    `wallet${id}`,
  )

let snapshotDecoder = (parent) => (json) => ({
    id: json.id,
    balance: json.balance
    transactions: transactionsQuery(parent, json.id),
})

const initialState = (id, parent) => ({  
  balance: 0,
  id:walletId,
  transactions: transactionsQuery(parent, id),    
})

let spawnWallet = (walletId, parent) =>
  spawnPersistent(
    parent,        
    async (state = initialState(walletId, parent), msg, {recovering, persist}) => {
      switch (msg.type) {
        case 'transaction':          
          if (!recovering) {
            await persist(msg)
          }
          return { ...state, balance: state.balance + msg.amount }
        case 'get_transactions':                    
          dispatch(msg.requestee, await state.transactions())
          return state
        default: 
          return state
      }
    },
    `wallet${walletId}`,
    walletId,
    {
      snapshotDecoder: snapshotDecoder(parent),        
      snapshotEvery: 5 * messages,
    }    
  )
```


## 퍼시스턴트 액터와 퍼시스턴트 쿼리의 차이점

퍼시스턴트 쿼리는 액터와 같은 라이프사이클이 없습니다. 그래서 `shutdownAfter` 같은 함수도 없습니다. 그러나 퍼시스턴트 쿼리의 결과는 메모리에 캐시될 수 있습니다. 캐시는 `cacheDuration` 옵션을 사용해서 유효 기간을 제한하지 않으면 지속됩니다.

퍼시스턴트 쿼리는 encoder와 decoder를 사용할 수 있습니다. 이 때 퍼시스턴트 액터와 마찬가지로 각각의 결과는 스냅샷으로 저장할 수 있습니다. 다른 점으로, `snapshotEvery` 속성 외에 `snapshotKey`도 지정해야 합니다.
