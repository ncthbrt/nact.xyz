---
title: "Actor Communication"
lesson: 2
chapter: 2
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
<!-- <a class="remix-button" href="https://glitch.com/edit/#!/remix/nact-ping-pong" target="_blank">
  <button>
    <img src="/img/code-fork-symbol.svg"/> REMIX
  </button>
</a> -->

An actor alone is a somewhat useless construct; actors need to work together. Actors can send messages to one another by using the `dispatch` method. 

The third parameter of `dispatch` is the sender. This parameter is very useful in allowing an actor to service requests without knowing explicitly who the sender is.

In this example, the actors Ping and Pong are playing a perfect ping-pong match. To start the match, we dispatch a message to Ping as Pong use this third parameter. 


```js
const delay = (time) => new Promise((res) => setTimeout(res, time));

const ping = spawnStateless(system, async (msg, ctx) =>  {
  console.log(msg);
  // ping: Pong is a little slow. So I'm giving myself a little handicap :P
  await delay(500);
  dispatch(ctx.sender, ctx.name, ctx.self);
}, 'ping');

const pong = spawnStateless(system, (msg, ctx) =>  {
  console.log(msg);
  dispatch(ctx.sender, ctx.name, ctx.self);  
}, 'pong');

dispatch(ping, 'begin', pong);
```
This produces the following console output:

``` 
begin
ping
pong
ping
pong
ping
etc...
```

