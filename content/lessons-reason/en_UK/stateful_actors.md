---
title: "Stateful Actors"
lesson: 1
chapter: 2
date: "11/12/2017"
language: en_uk
programming_language:  "reasonml"
type: "lesson"
tags:
    - getting-started
    - nact
    - reason
    - bucklescript
language: reasonml
---
One of the major advantages of an actor system is that it offers a safe way of creating stateful services. A stateful actor is created using the `spawn` function.

In this example, the state is initialized to an empty object. Each time a message is received by the actor, the current state is passed in as the first argument to the actor.  Whenever the actor encounters a name it hasn't encountered yet, it returns a copy of previous state with the name added. If it has already encountered the name it simply returns the unchanged current state. The return value is used as the next state.

```reason
let statefulGreeter =
  spawn(
    ~name="stateful-greeter",
    system,
    (state, {name}, ctx) => {
      let hasPreviouslyGreetedMe = List.exists((v) => v === name, state);
      if (hasPreviouslyGreetedMe) {
        print_endline("Hello again " ++ name);
        state |> Js.Promise.resolve;
      } else {
        print_endline("Good to meet you, " ++ name ++ ". I am the " ++ ctx.name ++ " service!");
        [name, ...state] |> Js.Promise.resolve;
      }
    },
    (ctx) => []
  );
```
Note the addition of the extra parameter. This parameter (in this case `(ctx) => []`) is a function which takes in the actor context and returns the actor's initial state.
