---
title: "Decoders and Encoders"
lesson: 2
chapter: 4
cover: "https://unsplash.it/400/300/?random?BoldMage"
date: "28/01/2018"
category: "reasonml"
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

For example let us imagine we have versions `S`<sub>`1`</sub>, `S`<sub>`2`</sub> and `S`<sub>`3`</sub> of a schema `S`. Messages `m`<sub>`1`</sub> and `m`<sub>`2`</sub> were persisted with `S`<sub>`1`</sub>, while `m`<sub>`3`</sub> was saved with `S`<sub>`2`</sub>. We've made a change and are forced to use `S`<sub>`3`</sub> of the schema. When replaying messages, all we need to do is define two functions: `S`<sub>`1`</sub>` => ` `S`<sub>`2`</sub> and `S`<sub>`2`</sub>` => ` `S`<sub>`3`</sub>. We apply `S`<sub>`2`</sub>` => ` `S`<sub>`3`</sub> to `m`<sub>`3`</sub> to upgrade it to latest version of the `S`. For `m`<sub>`1,2`</sub> we map `S`<sub>`1`</sub>` => ` `S`<sub>`2`</sub> then map from `S`<sub>`2`</sub>` => ` `S`<sub>`3`</sub> to complete the upgrade. Being able to support this strategy was the first motivation for introducing decoders and encoders.

## Persistent Actors and JSON

The `spawnPersistent` function includes a number of optional arguments, namely `~encoder`, `~stateEncoder`, `~decoder` and `~stateDecoder`. These functions decode `Js.Json.t` values into Reason types and encode Reason types into types of `Js.Json.t`. The decoders are well suited to performing schema evolution, while the encoders are useful for adding version information and creating a more stable persistent representation. 

A second motivation for adding decoders and encoders is that Reason's runtime representation when serialized to JSON isn't very human readable nor stable. Variants for example, are currently represented by an arrays, and the variant tag is just a number which is set in the `tag` field on an array. This is problematic as JSON does not support associative arrays. Nact includes an `unsafeDecoder` and `unsafeEncoder`, which is set on the persistent actor by default to cater for this limitation. 

If you use a custom decoder/encoder, you should ensure that all variants are serialized correctly to avoid any nasty surprises. The `unsafeDecoder` and `unsafeEncoder` have been made available in the public API so as to allow for safe serialization if you only want to manually serialize a subset of information. The  **unsafe** encoder/decoder pair are so named because the functions are not stack safe and may result in a stack overflow if an object is too deeply nested. Long lists are a prime candidate for overflow as they are represented by nested arrays. You would be advised to as a rule to either use lists sparingly or explicitly encode a list as an array when persisting.

## Cracking the Code
The `DaVinci_Decode` example below demonstrates how to deal with an enthusiastic but naïve coworker who a) thought that [ROT<sub>13</sub>](https://en.wikipedia.org/wiki/ROT13) was a good encryption scheme and b) applied it **everywhere**. 

In the example, version zero of the message protocol is ROT13 encoded and needs to be unscrambled before 
it is processed by the actor. Version one is encoded in plain text.

```reason
/* Rot13 code */
let a = Char.code('a');

let toPositionInAlphabet = (c) => Char.code(c) - a;

let fromPositionInAlphabet = (c) => Char.unsafe_chr(c + a);

let rot13 = String.map((c) => (toPositionInAlphabet(c) + 13) mod 26 |> fromPositionInAlphabet);

type msg = {. "version": int, "text": string};

/* Encoders and Decoders */
let jsonDecoder = (json) =>
  Json.Decode.({"version": json |> field("version", int), "text": json |> field("text", string)});

let decoder = (json) => {
  let msg = json |> jsonDecoder;
  if (msg##version == 0) {
    rot13(msg##text)
  } else {
    msg##text
  }
};

let encoder = (msg) =>
  Json.Encode.(object_([("version", int(1)), ("text", msg |> string)]));

open Nact;

/* Specify a concrete persistence engine here */
let system = start(~persistenceEngine, ());

let actor =
  spawnPersistent(
    ~key="da-vinci-code",    
    /* Decoder and encoder functions are specified here */
    ~decoder,    
    ~encoder,
    system,
    (state, msg, ctx) => {
      Js.log(msg);
      let nextState = () => Js.Promise.resolve([msg, ...state]);
      if (! ctx.recovering) {
        ctx.persist(msg) |> Js.Promise.then_(nextState)
      } else {
        nextState()
      }
    },
    []
  );
```
