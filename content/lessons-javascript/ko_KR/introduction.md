---
title: "Nact 소개"
lesson: 1
chapter: 1
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

Nact는 Node.js에서 실행되는 [액터 모델](https://ko.wikipedia.org/wiki/행위자_모델) 구현체입니다. Akka 라이브러리와 Erlang 언어의 문제 접근 방법에서 영감을 받았습니다. 특히 기존에 Redux를 사용하던 사용자에게 친숙한 인터페이스를 제공하려고 하였습니다.

이 프로젝트의 목적은 마이크로서비스를 쉽게 생성하고 파악할 수 있도록 하고, Node 플랫폼 위에서 비동기 이벤트 기반 아키텍처를 실현하는  방법을 제공하는 것입니다.

액터 모델에서는 액터라고 부르는 개체의 집합으로 시스템을 구성합니다. 하나의 액터는 독립적으로 실행되는 상태의 묶음으로 생각할 수 있습니다. 액터는 서로 간에 메시지를 통해서만 통신을 합니다. 액터는 하나 이상의 자식 액터를 생성할 수 있습니다.

액터 시스템은 [WhatsApp](https://www.whatsapp.com/)이나 [Twitter](https://twitter.com/) 같은 거대 확장 가능한, 고가용성 시스템을 운용하기 위해 사용되었습니다. 그러나 꼭 그런 큰 회사의 업무를 위한 것만은 아닙니다. 액터를 이용한 시스템 아키텍처는, 마이크로서비스로의 전환을 고려하는 개발자에게 하나의 선택지가 될 수 있습니다.

- 새로운 타입의 액터를 생성하는 일은 하나의 마이크로서비스를 통째로 생성하는 것보다 매우 가벼운 연산입니다.
- [위치 투명성](https://en.wikipedia.org/wiki/Location_transparency)과 상태 비공유(No Shared State) 특성은 [도메인 주도 개발](https://en.wikipedia.org/wiki/Domain-driven_design)에서 서브 시스템에 대한 배치에 관한 아키텍처 상 결정을 유예할 수 있게 해줍니다.
- 액터 시스템을 사용함으로써, 기존에 [모놀리식](https://microservices.io/patterns/monolithic.html) 시스템에서 볼 수 있었던 복잡함을 해소할 수 있습니다. 이는 메시지 기반 통신이 모듈 간의 의존성을 제거하여 서로 간에 덜 결합된(less coupled) 시스템을 만드는 덕분입니다.
- 액터는 비동기식으로 설계되었습니다. 이로써 [리액티브 선언문](https://www.reactivemanifesto.org/ko)에 제시된 항목에 잘 부합합니다.
- 액터는 상태와 무상태 시스템 모두에 적합합니다. 이로써 인프라적인 복잡성을 더하지 않고도 스마트 캐싱, 인-메모리 이벤트 저장소, 상태기계 워커를 생성하는 일을 쉽게 해줍니다.

## 유의사항

네트워크 투명성[^1]과 클러스터링[^2] 기능은 개발 예정이며, 아직 구현되지 않았습니다.

---

[^1]: Zookeeper나 Consul등을 이용해서 서비스 디스커버리(Service Discovery)를 제공하는 기능 혹은 그로 인한 특성  
[^2]: 여러 노드에 걸쳐 분산 액터 시스템을 구축하는 기능
