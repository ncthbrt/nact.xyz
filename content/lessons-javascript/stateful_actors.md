---
title: "Stateful Actors"
lesson: 1
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
<!-- <a class="remix-button" href="https://glitch.com/edit/#!/remix/nact-stateful-greeter" target="_blank">
  <button>
    <img src="/img/code-fork-symbol.svg"/> REMIX
  </button>
</a> -->

One of the major advantages of an actor system is that it offers a safe way of creating stateful services. A stateful actor is created using the `spawn` function.

In this example, the state is initialized to an empty object using `state = {}`. Each time a message is received by the actor, the current state is passed in as the first argument to the actor.  Whenever the actor encounters a name it hasn't encountered yet, it returns a copy of previous state with the name added. If it has already encountered the name it simply returns the unchanged current state. The return value is used as the next state.

```js
const statefulGreeter = spawn(
  system, 
  (state = {}, msg, ctx) => {
    const hasPreviouslyGreetedMe = state[msg.name] !== undefined;
    if(hasPreviouslyGreetedMe) {
      console.log(`Hello again ${msg.name}.`);  
      return state;
    } else {
      console.log(
        `Good to meet you, ${msg.name}.\nI am the ${ctx.name} service!`
      );
      return { ...state, [msg.name]: true };
    }
  },
  'stateful-greeter'
);
```

If no state is returned or the state returned is `undefined` or `null`, stateful actors automatically shut down.
