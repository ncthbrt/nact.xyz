---
title: "Getting Started"
lesson: 2
chapter: 1
date: "11/12/2017"
programming_language:  "javascript"
type: "lesson"
language: en_uk
tags:
    - getting-started
    - nact
    - reason
    - bucklescript
---
<!-- <a class="remix-button" href="https://glitch.com/edit/#!/remix/nact-stateless-greeter" target="_blank">
  <button>
    <img src="/img/code-fork-symbol.svg"/> REMIX
  </button>
</a> -->

> Tip: The remix buttons like the one above, allow you to try out the samples in this guide and make changes to them. 
> Playing around with the code is probably the best way to get to grips with the framework. 

Nact has only been tested to work on Node 8 and above. You can install nact in your project by invoking the following:

```bash
    npm install --save nact
```

Once installed, you need to import the start function, which starts and then returns the actor system.

```js
const { start, dispatch, stop, spawnStateless } = require('nact');
const system = start();
```

Once you have a reference to the system, it is now possible to create our first actor. To create an actor you have to `spawn` it.  As is traditional, let us create an actor which says hello when a message is sent to it. Since this actor doesn't require any state, we can use the simpler `spawnStateless` function.

```js
const greeter = spawnStateless(
  system, // parent
  (msg, ctx) => console.log(`Hello ${msg.name}`), // function
  'greeter' // name
);
```

The first argument to `spawnStateless` is the parent, which is in this case the actor system. The [hierarchy](#hierarchy) section will go into more detail about this.

The second argument to `spawnStateless` is a function which is invoked when a message is received.

The third argument to `spawnStateless` is the name of the actor, which in this case is `'greeter'`. The name field is optional, and if omitted, the actor is automatically assigned a name by the system.

To communicate with the greeter, we need to `dispatch` a message to it informing it who we are:

```js
dispatch(greeter, { name: 'Erlich Bachman' });
```

This should print `Hello Erlich Bachman` to the console. 

To complete this example, we need to shutdown our system. We can do this by calling `stop(system)`
The `stop` function also can be used to terminate an actor.

> Note: Stateless actors can service multiple requests at the same time. Statelessness means that such actors do not have to cater for concurrency issues.

