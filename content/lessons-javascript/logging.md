---
title: "Logging and Monitoring"
lesson: 1
chapter: 4
cover: "https://unsplash.it/400/300/?random?BoldMage"
date: "28/01/2018"
category: "javascript"
type: "lesson"
tags:
    - getting-started
    - nact
    - reason
    - bucklescript
---
Production system need to be watched like hawks. Knowing that your service has spontaneously burst into flames and having at least some idea why is the first step in fixing an error in production. There are some excellent logging frameworks in node, but they don't make accommodations for the actor model. Nact includes logging which automatically captures a reference to the actor's context. 

Here is an example of an actor which classifies whether strings are *bad* or *good* (bad defined as anything containing the substring 'mutation') and logs the bad strings as events and the good strings as info messages:

```javascript
const { start, spawnStateless, configureLogging, dispatch } = require('nact');

const system = start(configureLogging(/* we will discuss how to define a logger in the next section */));

const stringClassifierActor =
  spawnStateless(
    system,
    (msg, ctx) => {
      if ((msg||"").toLowerCase().indexOf('mutation') >= 0) {
      	ctx.log.event('receivedEvilMessage', msg);
  	  } else {
        ctx.log.info(`Received message: ${msg}`);        
       } 
    }     
  );

dispatch(stringClassifierActor, 'hello');
dispatch(stringClassifierActor, 'mutation');
```
To make this example usable, we'll need to define a logger. A logger is simply an actor which accepts log messages. Since the logger is defined before the system has started, the configureLogging method accepts a function which takes in a reference to the system and returns a reference to another actor which accepts the log messages. 

The logger below writes the messages it receives to the console:
```javascript
const logLevelAsText = (level) => {  
  switch(level){
    case LogLevel.OFF: return 'OFF';
    case LogLevel.TRACE: return 'TRACE';
    case LogLevel.DEBUG: return 'DEBUG';
    case LogLevel.INFO: return 'INFO';
    case LogLevel.WARN: return 'WARN';
    case LogLevel.ERROR: return 'ERROR';
  	case LogLevel.CRITICAL: return 'CRITICAL'
    default: return '???';
  }
};

const getLogText = (msg) => {
  let path = msg.actor
  switch(msg.type) {      
    case 'trace':
      let level = logLevelAsText(msg.level);
      return `[${level}, ${msg.actor.path}, ${msg.createdAt}]: ${JSON.stringify(msg.message)}`;  
    case 'event':
      return `[EVENT, ${msg.actor.path}, ${msg.createdAt}]: {'${msg.name}': ${JSON.stringify(msg.properties)}}`;
    case 'exception':
      return `[EXCEPTION, ${msg.actor.path}, ${msg.createdAt}]: ${JSON.stringify(msg.exception)}`;      
    case 'metric':
      return `[METRIC, ${msg.actor.path}, ${msg.createdAt}]: {'${msg.name}': ${JSON.stringify(msg.properties)}}`;
    default: 
      return `[???, ${msg.actor.path} ${msg.createdAt}]: ${JSON.stringify(msg)}`;   
  }
};

const consoleLogger = (system) =>
  spawnStateless(    
    system,
    (msg, _) => {
      let text = getLogText(msg);
      console.log(text);
    },
    "console-logger"
  );
```

we then need to tell nact to use this logger using `start(configureLogging(consoleLogger))`

> Note: If your logger is using nact-persistence, ensure that that `configurePersistence` appears before `configureLogging` in the start method 

Note the different log types:
- A `trace` is created when invoking `ctx.log.info` / `ctx.log.warn`, etc. 
- An `event` emerges when invoking `ctx.log.event` and includes the event name and event properties in a JSON  representation.
- A `metric` is manufactured when calling  `ctx.log.metric`, and is a similar structure to `event`.  
- Finally there is `error`, which is extruded when calling `ctx.log.exception` with an exception.

The design of the logging system has been kept relatively simple so as to allow users to wrap their own, preferred framework whilst remaining idiomatic to the actor model.

