---
title: "2017: The beginning"
cover: "https://unsplash.it/400/300/?random?BoldMage"
date: "2017-12-18"
category: "tech"
type: "post"
language: en_UK
tags: []    
---
Midway through 2017, I was due to start a job at [Root](https://root.co.za). My previous job had a .NET stack, which is where I'd learnt Akka. I'd come to really appreciate the benefits and constraints provided by an actor system. Root's stack used Node.js however, and while there are one or two actor frameworks available, it felt that they had quite different goals: focusing on performance first. From my experience introducing Akka to my colleagues, I feel that getting the ergonomics and pedagogical aspects right from the start is of greater importance. Nact is thus being designed to make it easy for software teams to fall into the pit of success. 

This year most of the important building blocks were added to the framework, first class [ReasonML](http://reasonml.github.io/) bindings 
were released, and the website you're reading this on was published. 

I was fortunate to join Root at a stage where the company doesn't face scaling problems. Thus we were able to adopt nact purely for it's event sourcing capabilities. Adding clustering is a priority for 2018, *especially* to support Root's move to kubernetes. 

Other goals for 2018 are:
- Further improvement to the documentation
- Tooling for logging and monitoring
- Better error messages
- Support for more storage providers
- A library which implements common patterns (such as at-least once delivery, scheduled jobs, the repository pattern, etc.) to reduce boilerplate code
- Eliminating the rxjs dependency.

If you're interested in nact, would like to contribute to the framework, have suggestions, complaints or any comments, please reach out. I can be found on the [nact discord](https://discord.gg/uxhFdDS) or alternatively you can email me at <a href='mailto:nick@cuthbert.co.za'>nick@cuthbert.co.za</a>.

Wishing you a happy holiday,<br/>
Nick

P.S: [Root is hiring](http://root.co.za/careers/)
