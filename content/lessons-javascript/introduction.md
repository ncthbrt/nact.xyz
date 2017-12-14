---
title: "Introduction"
lesson: 1
chapter: 1
cover: "https://unsplash.it/400/300/?random?BoldMage"
date: "11/12/2017"
category: "javascript"
type: "lesson"
tags:
    - getting-started
    - nact
    - javascript
    - nodejs
---
Nact is an implementation of the actor model for Node.js. It is inspired by the approaches taken by [Akka](getakka.net) and [Erlang](https://erlang.com). Additionally it attempts to provide a familiar interface to users coming from Redux. 

The goal of the project is to provide a simple way to create and reason about µ-services and asynchronous event driven architectures in Node.js.

The actor model describes a system made up of a set of entities called actors. An actor could be described as an independently running packet of state. Actors communicate solely by passing messages to one another.  Actors can also create more (child) actors.

Actor systems have been used to drive hugely scalable and highly available systems (such as WhatsApp and Twitter), but that doesn't mean it is exclusively for companies with big problems and even bigger pockets. Architecting a system using actors should be an option for any developer considering considering a move to a µ-services architecture:

  * Creating a new type of actor is a very lightweight operation in contrast to creating a whole new microservice.
  * [Location transparency](https://doc.akka.io/docs/akka/2.5.4/java/general/remoting.html) and no shared state mean that it is possible to defer decisions around where to deploy a subsystem, avoiding the commonly cited problem of prematurely choosing a [bounded context](https://vimeo.com/74589816).
  * Using actors mean that the spaghetti you might see in a monolithic system is far less likely to happen in the first place as message passing creates less coupled systems. 
  * Actors are asynchronous by design and closely adhere to the principles enumerated in the [reactive manifesto](https://www.reactivemanifesto.org/)
  * Actors deal well with both stateful and statelessness, so creating a smart cache, an in-memory event store or a stateful worker is just as easy as creating a stateless db repository layer without increasing infrastructural complexity.
  
## Caveats

While network transparency and clustering are planned features of the framework, they have not been implemented yet.
