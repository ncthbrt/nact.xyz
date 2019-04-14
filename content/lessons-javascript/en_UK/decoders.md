---
title: "Decoders and Encoders"
lesson: 2
chapter: 4
date: "28/01/2018"
programming_language:  "javascript"
type: "lesson"
language: en_uk
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
This approach is not without its risks: if done without discipline, there is the chance of data loss and other unhappy happenstances. It also goes against the philosophy of data immutability. Another downside of this approach to migration is that due to the behavior of stateful actors, an all or nothing migration may in certain circumstances, require downtime. 

An alternative approach which fits in with the idea of event sourcing and immutable data is lazy upgrades between schema versions

For example let us imagine we have versions `S`<sub>`1`</sub>, `S`<sub>`2`</sub> and `S`<sub>`3`</sub> of a schema `S`. Messages `m`<sub>`1`</sub> and `m`<sub>`2`</sub> were persisted with `S`<sub>`1`</sub>, while `m`<sub>`3`</sub> was saved with `S`<sub>`2`</sub>. We've made a change and are forced to use `S`<sub>`3`</sub> of the schema. When replaying messages, all we need to do is define two functions: `S`<sub>`1`</sub>` => ` `S`<sub>`2`</sub> and `S`<sub>`2`</sub>` => ` `S`<sub>`3`</sub>. We apply `S`<sub>`2`</sub>` => ` `S`<sub>`3`</sub> to `m`<sub>`3`</sub> to upgrade it to latest version of the `S`. For `m`<sub>`1,2`</sub> we map `S`<sub>`1`</sub>` => ` `S`<sub>`2`</sub> then map from `S`<sub>`2`</sub>` => ` `S`<sub>`3`</sub> to complete the upgrade. Being able to support this strategy was the primary motivation for introducing decoders and encoders.

## Persistent Actors and JSON

Nact uses JSON for persistence and message passing. Naïvely serializing your objects may work for a while as you are prototyping your system, however using a stable representation for your data models should very much be a concern when engineering a robust production grade system. 

The `spawnPersistent` function includes a number of optional arguments, namely `encoder`, `snapshotEncoder`, `decoder` and `snapshotDecoder`. These functions map deserialized JSON-safe objects to Javascript objects and map Javascript objects to JSON safe representations respectively. The decoders are well suited to performing schema evolution, while the encoders are useful for adding versioning information and creating a more stable persistent representation. 

## Cracking the Code
The `DaVinci_Decode` example below demonstrates how to deal with an enthusiastic but naïve coworker who a) thought that [ROT<sub>13</sub>](https://en.wikipedia.org/wiki/ROT13) was a good encryption scheme and b) applied it **everywhere**. 

In the example, version zero of the message protocol is ROT13 encoded and needs to be unscrambled before 
it is processed by the actor. Version one is encoded in plain text.

```reason
/* Rot13 code */
let a = 'a'.charCodeAt(0);

let toPositionInAlphabet = (c) => c.charCodeAt(0) - a;

let fromPositionInAlphabet = (c) => String.fromCharCode(c + a);

let rot13 = str => [...str].map(chr => fromPositionInAlphabet((toPositionInAlphabet(chr) + 13) % 26)).join('');

let decoder = (json) => {
  if (msg.version == 0) {
    return rot13(msg.text);
  } else {
    return msg.text;
  }
};

let encoder = (msg) => ({ version: 1, text: msg.text });

let system = start(/* Specify a concrete persistence engine here */);

let actor =
  spawnPersistent(
    system,    
    async (state = [], msg, ctx) => {
      console.log(msg);      
      if (! ctx.recovering) {
        await ctx.persist(msg);
      }
      return [msg, ...state];
    },
    'da-vinci-code',
    'da-vinci-code-actor',
    {
      decoder,    
      encoder,
      system      
    }    
  );
```
