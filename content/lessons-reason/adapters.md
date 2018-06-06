---
title: "Adapters"
lesson: 6
chapter: 2
cover: "https://unsplash.it/400/300/?random?BoldMage"
date: "28/01/2018"
category: "reasonml"
type: "lesson"
tags:
    - getting-started
    - nact
    - reasonml
    - nodejs
---
A typical pattern in Nact when sending a message to an actor is including references to other actors. These references are often to whom the result should be delivered to. The problem is that ActorRefs are strongly typed. Consider the contacts service again—imagine that there was another service which needed to retrieve contacts from the contact service, but that it spoke an protocol which was unintelligible to the contacts actor. 

One way you could solve this problem would be to add a variant to the protocol for each type of `actorRef('a)` which could conceivably communicate with the contacts service. This doesn't seem like a great idea: it completely breaks encapsulation, is tedious, and causes a combinatorial explosion of typings. 

A slightly better idea would be to create another actor which knew how to map from one protocol to another. Still a little tedious, but it improves encapsulation, and doesn't cause the volume of code to grow exponentially.

To reduce the tedium, the `spawnAdapter` method is provided. It takes in the `actorRef('a)` of the target actor and a mapping function from `'b -> 'a`, returning an actorRef of type `actorRef('b)`.

> Note: Adapter actors are added as children of the target actor and *do* consume a small amount of memory, so adapters should ideally not be created on every message. 

Whenever the adapter receives a message of type `'b`, it maps it to type `'a` and forwards it to the target actor.


The code below is a concrete but toy example of the idea. The example explores the scenario where the `world` protocol was defined before the `hello` protocol. It is a minor variation of ping-pong but where hello has the additional responsibility of mediating between the newer and older protocols

```reason
open Nact;

open Nact.Operators;

let system = Nact.start();

type world =
  | World(actorRef(world));

type hello =
  | Hello(actorRef(world));

let world: actorRef(world) =
  spawnStateless(
    ~name="world",
    system,
    (World(sender), ctx) => {
      print_endline("world!!");
      sender <-< World(ctx.self) |> Js.Promise.resolve
    }
  );

let createAdapterIfNotExists = (parent, adapterOpt) =>
  switch adapterOpt {
  | Some(adapter) => adapter
  | None => spawnAdapter(parent, (World(sender)) => Hello(sender))
  };

let hello =
  spawn(
    ~name="hello",
    system,
    (adapterOpt, Hello(sender), ctx) => {
      let adapter = createAdapterIfNotExists(ctx.self, adapterOpt);
      print_string("Hello ");
      sender <-< World(adapter);
      Js.Promise.resolve(Some(adapter))
    },
    (ctx) => None
  );

hello <-< Hello(world);
```




