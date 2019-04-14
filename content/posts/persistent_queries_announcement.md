---
title: "Persistent Queries"
date: "2018-05-19"
type: "post"
language: en_uk
tags: []    
---
Version 7.1.0 of NactJS and version 4.1.0 of ReasonNact added a new feature, Persistent Queries, which should go some way to supporting patterns like CQRS (which is something I have been asked a few times about). 

I think the way the feature achieves its goals may be a little surprising for some people, who are used to a more global solution to CQRS; an example being events streams which pipe to some form of database. I decided to take a more localised, [lazy](https://en.wikipedia.org/wiki/Lazy_evaluation) approach to read models, because I feel that this is truer to what Nact is about (small, simple, functional). The global model is still useful in many instances, but it is quite a prescriptive approach and can anyway be modeled using the primitives Nact offers. 

As the documentation explains:

> Nact provides the persistent query feature as a light-weight (but powerful) form of CQRS. A persistent query takes in a persistent key, and returns a function which when invoked replays the persisted events, building a result which is finally returned as a promise. A persistent query is lazy in that it only retrieves events when forced. It may be invoked any number of times, each time checking for new events. The result and sequence number of the query are cached with an optional timeout, and the result may optionally also be snapshotted every given number of messages. 

The rest of the documentation for persistence queries in js and reason can be found [here](/lesson/javascript/persistent-queries/) and [here](/lesson/reasonml/persistent-queries/).
