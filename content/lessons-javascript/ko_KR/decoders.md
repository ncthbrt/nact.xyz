---
title: "인코더/디코더"
lesson: 2
chapter: 4
date: "10/04/2019"
programming_language: "javascript"
type: "lesson"
language: ko_KR
tags:
    - getting-started
    - nact
    - reason
    - bucklescript
---

## 스키마 변경

시스템이 유지되는 동안 데이터 스키마는 자연스럽게 변합니다. 요구사항이 변하며 현실적으로 보강되기도 하고, 버그를 없애기 위해 수정되기도 합니다. 운영 중인 시스템에서, 하나의 버전의 데이터를 다른 버전으로 이관하는 것은 정상적인 범위에 들어갑니다.

스키마 변경 방법의 하나로 배치 작업을 실행하는 방법이 있습니다. 이전 스키마를 새 스키마로 바로 그 자리에서 변경하는 것입니다. 이 방법에는 데이터 손실과 여러가지 불행한 상황이 발생할 위험 소지가 있습니다. 또 데이터 불변의 원칙에도 위배됩니다. 또다른 단점으로는 액터가 상태를 복구하려면 이벤트 저널 데이터에 일관성이 있어야 하므로 어떤 상황에서는 일관성있는 스키마 업데이트를 위해 다운타임이 발생하게 됩니다.

대안으로는, 이벤트 소싱과 불변 데이터에서 아이디어를 따온 것으로, 스키마 버전 간에 **지연 업그레이드**를 하는 것입니다.

예를 들어서, 현재 S 스키마의 버전 S<sub>1</sub>, S<sub>2</sub>, S<sub>3</sub>가 있다고 생각해봅시다. 메시지 m<sub>1</sub>, m<sub>2</sub>는 스키마 S<sub>1</sub>로 저장되고, m<sub>3</sub>는 스키마 S<sub>2</sub>로 저장되었습니다. 이제 스키마 S를 모두 S<sub>3</sub>로 업그레이드하려고 합니다. 이제 메시지를 리플레이하기 위해서는 두 변환 함수를 정의해야 합니다. S<sub>1</sub> => S<sub>2</sub>, S<sub>2</sub> => S<sub>3</sub>입니다. 이제 m<sub>3</sub>에 대해서는 S<sub>2</sub> => S<sub>3</sub>를 적용하고, m<sub>1</sub>, m<sub>2</sub>에 대해서는 S<sub>1</sub> => S<sub>2</sub>를 적용한 뒤 S<sub>2</sub> => S<sub>3</sub>를 적용하면 업그레이드가 완료됩니다. 이 방법을 가능하게 하는 것이 **디코더**와 **인코더**를 소개하는 주요 동기입니다.


## 퍼시스턴트 액터와 JSON

Nact는 저장과 메시지 전달에 JSON을 사용합니다. (JSON을 사용하지 않고) 대충 객체를 직렬화해서 저장한다면, 시스템을 프로토타이핑하는 기간 얼마간은 잘 동작하겠지만, 견고한 상용 제품의 수준으로 설계할 때 데이터 표현 문제가 골칫거리가 될 것입니다.

`spawnPersistent` 함수에 `encoder`, `snapshotEncoder`, `decoder`, `snapshotDecoder` 등의 인자를 선택적으로 전달할 수 있습니다. 이들은 각각 JSON을 객체로, 객체를 JSON으로 사상합니다.(직렬화/역직렬화) **인코더**로는 저장되는 데이터에 스키마 버전을 매기고 더 안정된 표현을 사용해서 저장할 수 있습니다. **디코더**는 저장된 버전을 바탕으로 스키마 변경하는 데 유용합니다.


## 예제

열정적이지만 순진한 어느 개발자가 있었습니다. 그는 [ROT<sub>13</sub>](https://en.wikipedia.org/wiki/ROT13) 인코딩의 신봉자로서 모든 데이터를 ROT<sub>13</sub>으로 인코딩해서 저장하도록 만들었습니다. (그는 아마 해고 당했을 겁니다.) 이제 이 사태를 어떻게 고쳐보면 될까요?

아래 예제에서, 스키마 버전0은 ROT<sub>13</sub>으로 저장된 메시지이고(객체로 역직렬화 하기 전에, ROT<sub>13</sub>의 역함수를 적용해서(ROT<sub>13</sub><sup>2</sup> == ROT<sub>13</sub>) 원문으로 되돌려야 합니다.), 버전1에서는 평문(JSON)으로 저장되어 있습니다.

```javascript
/* Rot13 code */
const a = 'a'.charCodeAt(0)

const toPositionInAlphabet = (c) => c.charCodeAt(0) - a

const fromPositionInAlphabet = (c) => String.fromCharCode(c + a)

const rot13 = str => [...str].map(chr => fromPositionInAlphabet((toPositionInAlphabet(chr) + 13) % 26)).join('')

const decoder = (json) => {
  if (msg.version == 0) {
    return rot13(msg.text)
  } else {
    return msg.text
  }
}

const encoder = (msg) => ({ version: 1, text: msg.text })

const system = start(/* 퍼시스턴스 엔진 */)

const actor = spawnPersistent(
  system,    
  async (state = [], msg, ctx) => {
    console.log(msg);      
    if (!ctx.recovering) {
      await ctx.persist(msg)
    }
    return [msg, ...state]
  },
  'da-vinci-code',
  'da-vinci-code-actor',
  {
    decoder,
    encoder,
    system
  }    
)
```
