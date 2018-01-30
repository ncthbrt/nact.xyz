---
title: "Decoders and Encoders"
lesson: 2
chapter: 4
cover: "https://unsplash.it/400/300/?random?BoldMage"
date: "28/01/2018"
category: "future-reasonml"
type: "lesson"
tags:
    - getting-started
    - nact
    - reason
    - bucklescript
---
## Schema evolution 
Evolution is a natural part of a systems lifecycle; requirements change, reality sets in and bugs are fixed. 
As a result, migrating data from one version to another is a normal part of running a system in production.

One approach to schema evolution is running some kind of batch job which upgrades the old types to the new in-place.
This approach is not without its risks: if done without discipline, there is the chance of data loss and other unhappy happenstances. It also goes against the philosophy of data immutability. Another downside of this approach to migration is that due to  the behavior of stateful actors, an all or nothing migration would likely require downtime.  

An alternative approach which fits in with the idea of event sourcing and immutable data is lazy upgrades between schema versions

For example let us imagine we have versions `S`<sub>`1`</sub>, `S`<sub>`2`</sub> and `S`<sub>`3`</sub> of a schema `S`. Messages `m`<sub>`1`</sub> and `m`<sub>`2`</sub> were persisted with `S`<sub>`1`</sub>, while `m`<sub>`3`</sub> was saved with `S`<sub>`2`</sub>. We've made a change and are forced to use `S`<sub>`3`</sub> of the schema. When replaying messages, all we need to do is define two functions: `S`<sub>`1`</sub>` => ` `S`<sub>`2`</sub> and `S`<sub>`2`</sub>` => ` `S`<sub>`3`</sub>. We apply `S`<sub>`2`</sub>` => ` `S`<sub>`3`</sub> to `m`<sub>`3`</sub> to upgrade it to latest version of the `S`. For `m`<sub>`2,3`</sub> we map `S`<sub>`1`</sub>` => ` `S`<sub>`2`</sub> then map from `S`<sub>`2`</sub>` => ` `S`<sub>`3`</sub> to complete the upgrade. Being able to support this strategy was the primary motivation for introducing decoders and encoders.

## Persistent Actors and JSON

Nact uses JSON for persistence and message passing. This means that in the ReasonML implementation, it uses the underlying mapping of BuckleScript types to JavaScript as a crutch so that users don't immediately have to worry about serialization and deserialization. However this should very much be a concern when engineering a robust production grade system. 

The `spawnPersistent` function includes a number of optional arguments, namely `~encoder`, `~stateEncoder`, `~decoder` and `~stateDecoder`. These functions decode `Js.Json.t` values into Reason types and encode Reason types into types of `Js.Json.t`. The decoders are well suited to performing schema evolution, while the encoders are useful for adding version information and creating a more stable persistent representation. 

## Cracking the Code
The `DaVinci_Decode` example below demonstrates how to [ROT<sub>13</sub>](https://en.wikipedia.org/wiki/ROT13).
