---
title: "Actor Communication"
lesson: 2
chapter: 2
date: "11/12/2017"
programming_language: "reasonml"
language: en_uk
type: "lesson"
tags:
    - getting-started
    - nact
    - reason
    - bucklescript
---
An actor alone is a somewhat useless construct; actors need to work together. Actors can send messages to one another by using the `dispatch` method. 

In this example, the actors Ping and Pong are playing a perfect ping-pong match. To start the match, we dispatch a message to ping and 
specify that the sender in msgType is pong.


```reason
open Nact;

open Nact.Operators;

let system = start();

type msgType =
  | Msg(actorRef(msgType), string);

let ping: actorRef(msgType) =
  spawnStateless(
    ~name="ping",
    system,
    (Msg(sender, msg), ctx) => {
      print_endline(msg);
      dispatch(sender, Msg(ctx.self, ctx.name)) |> Js.Promise.resolve
    }
  );

let pong: actorRef(msgType) =
  spawnStateless(
    ~name="pong",
    system,
    (Msg(sender, msg), ctx) => {
      print_endline(msg);
      /* Here we're using the <-< operator as a shorthand for the dispatch method */
      sender <-< Msg(ctx.self, ctx.name) |> Js.Promise.resolve
    }
  );

ping <-< Msg(pong, "hello");

```
This produces the following console output:

``` 
begin
ping
pong
ping
pong
ping
...
```
