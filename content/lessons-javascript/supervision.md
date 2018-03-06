---
title: "Supervision"
lesson: 5
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
Actor systems are often designed around the *let it crash* philosophy.
This thesis is motivated by a desire to reduce the amount of infrastructural code which often obfuscates domain logic. 

How on earth do we achieve system resilience if we just let our actors crash? The answer lies in supervision: If an crashes, a policy defined on the actor has an opportunity to make a decision about what to do about the fault. Erlang was one of the first platforms to adopt this strategy for dealing with faults, and was used to achieve jaw dropping reliability when building out the Ericsson telephone exchanges (on the order of nine 9s of availability). 

Nact's supervision system works similar to that of Erlang. If an actor crashes, it is stopped by default. Specifying the `onCrash` option allows one to override the supervision policy. A custom supervision policy is a function which takes in the exception which was thrown, the message which was being processed at the time at which the fault occurred, and the context of the actor. The supervision policy returns a decision (which may be may be asynchronous). The available decisions are enumerated in the following table:

<table class='definitions'>
    <thead>
      <tr>
        <th align='left'>Decision</th>
        <th align='left'>Effect</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td align='left'>stop</td>
        <td align='left'>Stops the faulted actor</td>
      </tr>
      <tr>
        <td align='left'>stopAll</td>
        <td align='left'>Stops the peers of the faulted actor</td>
      </tr>
      <tr>
        <td align='left'>reset</td>
        <td align='left'>Resets the state of the faulted actor</td>
      </tr>
      <tr>
        <td align='left'>resetAll</td>
        <td align='left'>Resets the state of the faulted actor's peers</td>
      </tr>
      <tr>
        <td align='left'>resume</td>
        <td align='left'>Continue processing the next messages in the actor's mailbox</td>
      </tr>
      <tr>
        <td align='left'>escalate</td>
        <td align='left'>Sends the fault to the grandparent of the faulted actor</td>
      </tr>
    </tbody>
  </table>

Here is an example of a supervision policy which resets the faulted child each time:

```js
const reset = (msg, error, ctx) => ctx.reset;
```

Perhaps your fault is caused by a resource not being available yet.
In that case, we don't want to continually restart the actor as that'll just waste precious CPU cycles. So we'd change the supervision policy to delay the reset:

```js
const delay = duration => new Promise((resolve) => setTimeout(()=>resolve(), duration));

const reset = async (msg, error, ctx) => {
    await delay(Math.random() * 500 - 750);
    return ctx.reset;
};
```

Perhaps we are consuming an external service and are worried about rate limiting. We could use a closure to define more sophisticated behavior:

```js
const delay = duration => new Promise((resolve) => setTimeout(()=>resolve(), duration));

const resetWithExponentialDelay = (factor) => {
    let count = 0;    
    return async (msg, error, ctx) => {                
        let delay =  (2**count - 1)*factor;
        await delay(delay);
        count = count+1;        
        return ctx.reset;
    };
} 
```

Let us modify our contacts service from the previous example to actually use the supervision policy:

```js
const spawnContactsService = (parent) => spawnStateless(
  parent,
  (msg, ctx) => {
    const userId = msg.userId;
    let childActor;
    if(ctx.children.has(userId)){
      childActor = ctx.children.get(userId);
    } else {
      childActor = spawnUserContactService(ctx.self, userId);            
    }
    dispatch(childActor, msg, ctx.sender);
  },
  'contacts',
  { onCrash: reset }
);
```

The fourth parameter to spawnStateless is the actor property object. 
This object specifies various other behaviors of actors besides `onChildCrashes` and will be expanded upon in later sections. 
