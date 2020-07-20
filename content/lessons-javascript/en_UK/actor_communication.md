---
title: "Actor Communication"
lesson: 2
chapter: 2
date: "11/12/2017"
programming_language:  "javascript"
type: "lesson"
language: en_uk
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

References to other actors can be included in a given message, allowing actors to randomly address one another.

In this example, the actors Ping and Pong are playing a perfect ping-pong match. To start the match, we dispatch a message to Ping with Pong set as the sender in the message


```js
const delay = (time) => new Promise((res) => setTimeout(res, time));

const ping = spawnStateless(system, async (msg, ctx) =>  {
  console.log(msg.value);
  // ping: Pong is a little slow. So I'm giving myself a little handicap :P
  await delay(500);
  dispatch(msg.sender, { value: ctx.name, sender: ctx.self });
}, 'ping');

const pong = spawnStateless(system, (msg, ctx) =>  {
  console.log(msg.value);
  dispatch(msg.sender, { value: ctx.name, sender: ctx.self });
}, 'pong');

dispatch(ping, { value: 'begin' sender:pong });
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
