---
title: "Getting Started"
lesson: 2
chapter: 1
date: "11/12/2017"
programming_language:  "reasonml"
language: en_UK
type: "lesson"
tags:
    - getting-started
    - nact
    - reason
    - bucklescript
language: reasonml
---
Reason Nact has only been tested to work on Node 8 and above. You can install Nact in your project by invoking the following:

```bash
npm install --save reason-nact
```


You'll also need to add `reason-nact` to your dependencies in the `bsconfig.json` file.

Once installed, you need to import the start function, which starts and then returns the actor system.

```reason
open Nact;
let system = start();
```

Once you have a reference to the system, it is now possible to create our first actor. To create an actor you have to `spawn` it.  As is traditional, let us create an actor which says hello when a message is sent to it. Since this actor doesn't require any state, we can use the simpler `spawnStateless` function.

```reason
type greetingMsg = {name: string};

let greeter =
  spawnStateless(
    ~name="greeter",
    system,
    ({name}, _) => print_endline("Hello " ++ name) |> Js.Promise.resolve
  );

dispatch(greeter, {name: "Erlich Bachman"});
```

The first unnamed argument to `spawnStateless` is the parent, which is in this case the actor system. The [hierarchy](#hierarchy) section will go into more detail about this.

The second unnamed argument to `spawnStateless` is a function which is invoked when a message is received.

The name argument to `spawnStateless` is optional, and if omitted, the actor is automatically assigned a name by the system.

To communicate with the greeter, we need to `dispatch` a message to it informing it who we are:

```reason
dispatch(greeter, { name: "Erlich Bachman" });
```

This should print `"Hello Erlich Bachman"` to the console. 

> Note: Stateless actors can service multiple requests at the same time. Statelessness means that such actors do not have to cater for concurrency issues.

An alternative to calling dispatch is opening `Nact.Operators` and using the  `<-<` operator:

```reason
open Nact.Operators;
greeter <-< { name: "Erlich Bachman" };
{ name: "Erlich Bachman" } >-> greeter;
```

To complete this example, we need to shutdown our system. We can do this by calling `stop(system)`
The `stop` function also can be used to terminate actors.
