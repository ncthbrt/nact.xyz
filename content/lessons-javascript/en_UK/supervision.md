---
title: "Supervision"
lesson: 5
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
Actor systems are often designed around the *let it crash* philosophy.
This thesis is motivated by a desire to reduce the amount of infrastructural code which often obfuscates domain logic. 

How on earth do we achieve system resilience if we just let our actors crash? The answer lies in supervision: If an actor crashes, a policy defined on the actor has an opportunity to make a decision about what to do about the fault. Erlang was one of the first platforms to adopt this strategy for dealing with faults, and was used to achieve jaw dropping reliability when building out the Ericsson telephone exchanges (on the order of nine 9s of availability). 

Nact's supervision system works similar to that of Erlang. If a *stateful* actor crashes, it escalates the error to the actor's parent where it will be stopped by the system if a parent does not intercede. Specifying the `onCrash` option allows one to override a stateful actor's supervision policy. A custom supervision policy is a function which takes in the exception which was thrown, the message which was being processed at the time at which the fault occurred, the context of the actor, and if the fault was escalated, than also the context of the child actor. The supervision policy returns a decision (which may be asynchronous). The available decisions are enumerated in the following table:

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
        <td align='left'>stopChild</td>
        <td align='left'>Resumes actor and stops the faulted child of the actor</td>
      </tr>
      <tr>
        <td align='left'>stopAllChildren</td>
        <td align='left'>Resumes actor and stops all the children of the actor</td>
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
        <td align='left'>resetChild</td>
        <td align='left'>Resumes actor and resets the state of the faulted child of the actor</td>
      </tr>
      <tr>
        <td align='left'>resetAllChildren</td>
        <td align='left'>Resumes actor and resets the state of all the children of the actor</td>
      </tr>
      <tr>
        <td align='left'>resume</td>
        <td align='left'>Continue processing the next messages in the actor's mailbox</td>
      </tr>
      <tr>
        <td align='left'>escalate</td>
        <td align='left'>Sends the fault to the parent of the faulted actor</td>
      </tr>
    </tbody>
  </table>

Here is an example of a supervision policy which resets the faulted actor each time:

```js
const reset = (msg, error, ctx) => ctx.reset;
```

Here is an example of a supervision policy which resets the faulted child actor each time when the child escalates the fault to the parent actor:

```js
const resetIfChild = (msg, error, ctx, child) => {
  if (child) {   
    return ctx.resetChild;
  }
  else {
    return ctx.stop;
  }
}
```

It's important to note, that the forth parameter, `child`, will only be present when a child actor escalates the error to its parent.

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
const spawnContactsService = (parent) => spawn(
  parent,
  (msg, ctx) => {
    const userId = msg.userId;
    let childActor;
    if(ctx.children.has(userId)){
      childActor = ctx.children.get(userId);
    } else {
      childActor = spawnUserContactService(ctx.self, userId);            
    }
    dispatch(childActor, msg);
  },
  'contacts',
  { onCrash: reset }
);
```

The fourth parameter to spawn is the actor property object. 
This object specifies various other behaviors of actors besides `onCrash` and will be expanded upon in later sections. 
