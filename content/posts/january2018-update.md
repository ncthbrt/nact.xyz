---
title: "January 2018 Update"
cover: "https://unsplash.it/400/300/?random?BoldMage"
date: "2018-01-30"
category: "tech"
type: "post"
tags: []    
---
## New features

This month a few new features were added to the framework. JavaScript gained [logging](https://nact.io/lesson/javascript/logging-and-monitoring),
while Reason added [logging](https://nact.io/lesson/reasonml/logging-and-monitoring), [encoders and decoders](https://nact.io/lesson/reasonml/decoders-and-encoders), and [type adapters](https://nact.io/lesson/reasonml/adapters). The ReasonML additions were largely focused on improving ergonomics. 

Thanks to [@iskandersierra](https://github.com/iskandersierra/) for making logging in Nact JS happen. Iskander Sierra is Nact's first external contributor. Iskander was patient despite my fussiness, so huge thanks. He definitely deserves a follow 😉. 

## A preview of the future

One of the main innovations of the actor model was moving the idea of a process from a physical construct to a logical one. This abstraction allowed developers to focus on writing domain code without worrying about locking, staleness, or even on what core/machine the process was located. A cluster can be similarly abstracted. This allows developers to worry less about networking, load balancing, and service discovery, and more about solving domain problems at scale. 

I've been thinking hard about what such an abstraction would look like, and *think* I have something which could work. Obviously this is all subject to change, and a lot of hard work will need to be done to make it a reality (failure detection, gossiping, sharding, membership and so on) but I'd be very happy if Nact clustering could look something like this:

This is the ReasonML version:
```reason
let system = start(~seeds=["https://system-1","https://system-2"]);

let (actorRef, cluster) = spawnCluster(~key="abc", system, RoundRobin);

let member = spawnStateless(system, (msg, ctx) => resolve(Js.log(msg)));

cluster +@ member; 
actorRef <-< "Hello Cluster!";
```

...and the JavaScript one:

```javascript
const system = start({seeds: ["https://system-1", "https://system-2", "https://system-3"]});

const cluster = spawnCluster("abc", system, roundRobin);

let member = spawnStateless(system, (msg, ctx) => console.log(msg));

join(cluster, member); 
dispatch(cluster, "Hello Cluster!");
```

In the example, the system is fed a set of well known addresses to bootstrap discovery of peer nodes. 
Then a virtual cluster is created. This cluster has a particular routing strategy (in this case round robin) 
as different routing strategies have different consistency requirements. 

The `clusterRef` supports two additional operations: `join` and `leave` or the `+@` and `-@` operators in Reason respectively. Messages can be dispatched to the cluster as per usual. In the Reason version, the `clusterRef` and 
`actorRef` are separate so as to simplify typing.

This clustering design feels ergonomic, fairly simple for the end user and flexible. If you spot a fatal flaw, please message me on [discord](/community); I like ideas that have a hope of actually working.
