---
title: "Logging and Monitoring"
lesson: 1
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
Production system need to be watched like hawks. Knowing that your service has spontaneously burst into flames and having at least some idea why is the first step in fixing an error in production. There are some excellent logging frameworks in node, but they don't make accommodations for the actor model. Nact includes logging which automatically captures a reference to the actor's context. 

Here is an example of an actor which classifies whether strings are *bad* or *good* (bad defined as anything containing the substring 'mutation') and logs the bad strings as events and the good strings as info messages:

```reason
open Nact;
open Nact.Operators;

open Js.Promise;

let system = start(~logger=/* will discuss how to define a logger in the next section */, ());

let stringClassifierActor =
  spawnStateless(
    ~name="classifier",
    system,
    (msg, ctx) =>
      resolve
        /* strings containing mutation are evil.  */
        (
          if (Js.String.indexOf(String.lowercase(msg), "mutation") >= 0) {
            ctx.logger |> Log.event(~name="receivedEvilMessage", ~properties=msg)
          } else {
            ctx.logger |> Log.info("Received message: " ++ msg)
          }
        )
  );
  
stringClassifierActor <-< "hello";
stringClassifierActor <-< "mutation";
```

To make this example usable, we'll need to define a logger. A logger is simply an actor which accepts messages of type Log.t. Since the logger is defined before the system has started, the signature of the ~logger argument is (actorRef(systemMsg) => actorRef(Log.t), implying that the logger takes in a reference to the system and returns a reference to another actor which accepts log messages. 

The logger below writes the messages it receives to the console:

```reason
let defaultTo = (default) =>
  fun
  | Some(v) => v
  | None => default;

let getLogText =
  fun
  | Message(level, text, date, actor) => {
      let pathStr = Nact.ActorPath.toString(actor);
      let dateStr = Js.Date.toUTCString(date);
      let levelStr = logLevelToString(level) |> String.uppercase;
      (levelStr, pathStr, dateStr, text)
    }
  | Error(err, date, actor) => {
      let pathStr = Nact.ActorPath.toString(actor);
      let dateStr = Js.Date.toUTCString(date);
      let json = Js.Json.stringifyAny(err) |> defaultTo("");
      ("EXCEPTION", pathStr, dateStr, json)
    }
  | Metric(name, data, date, actor) => {
      let pathStr = Nact.ActorPath.toString(actor);
      let dateStr = Js.Date.toUTCString(date);
      let json = Js.Json.stringify(data);
      ("METRIC", pathStr, dateStr, {j|{ "$name": $json }|j})
    }
  | Event(name, data, date, actor) => {
      let pathStr = Nact.ActorPath.toString(actor);
      let dateStr = Js.Date.toUTCString(date);
      let json = Js.Json.stringify(data);
      ("EVENT", pathStr, dateStr, {j|{ "$name": $json }|j})
    }
  | Unknown(payload, date, actor) => {
      let pathStr = Nact.ActorPath.toString(actor);
      let dateStr = Js.Date.toUTCString(date);
      let text = Js.Json.stringify(payload);
      ("???", pathStr, dateStr, text)
    };

let consoleLogger = (system) =>
  spawnStateless(
    ~name="console-logger",
    system,
    (msg, _) => {
      let (label, path, date, body) = getLogText(msg);
      Js.log({j|[$label, $path, $date]: $body|j});
      Js.Promise.resolve()
    }
  );
```
we finally then need to tell nact to use this logger:
```reason
  let system = start(~logger=consoleLogger, ());
```
Note the different log variants:
- A `Message` is created when invoking `Log.info`/`Log.warn`, etc. 
- An `Event` emerges when invoking `Log.event` and includes the event name and event properties in a JSON representation. 
- A `Metric` is manufactured when calling `Log.metric`, and is a similar structure to `Event`.  
- An `Error` is extruded when calling `Log.exception_` and includes an value of type `exn` (the built in exception type)
- `Unknown` is passed in to the logging actor when the logging middleware is unable to understand the structure of the log message. 

The design of the logging system has been kept relatively simple so as to allow users to wrap their own, preferred framework whilst remaining idiomatic to the actor model. 
