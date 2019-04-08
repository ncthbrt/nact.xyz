---
title: "Supervision"
lesson: 5
chapter: 2
cover: "https://unsplash.it/400/300/?random?BoldMage"
date: "11/12/2017"
category: "reasonml"
language: en_UK
type: "lesson"
tags:
    - getting-started
    - nact
    - reasonml
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
        <td align='left'>Stop</td>
        <td align='left'>Stops the faulted actor</td>
      </tr>
      <tr>
        <td align='left'>StopAll</td>
        <td align='left'>Stops the peers of the faulted actor</td>
      </tr>
      <tr>
        <td align='left'>Reset</td>
        <td align='left'>Resets the state of the faulted actor</td>
      </tr>
      <tr>
        <td align='left'>ResetAll</td>
        <td align='left'>Resets the state of the faulted actor's peers</td>
      </tr>
      <tr>
        <td align='left'>Resume</td>
        <td align='left'>Continue processing the next messages in the actor's mailbox</td>
      </tr>
      <tr>
        <td align='left'>Escalate</td>
        <td align='left'>Sends the fault to the grandparent of the faulted actor</td>
      </tr>
    </tbody>
  </table>

Here is an example of a supervision policy which resets the faulted child each time:

```reason
let reset = (msg, error, ctx) => Reset |> Js.Promise.resolve;
```

Perhaps your fault is caused by a resource not being available yet. In that case, we don't want to continually restart the actor as that'll just waste precious CPU cycles. So we'd change the supervision policy to delay the reset.

Let us first define the delay function (we'll be using this a lot):

```reason
let delay = (ms) =>
  Js.Promise.make(
    (~resolve, ~reject as _) => Js.Global.setTimeout(() => [@bs] resolve((): unit), ms) |> ignore
  );
``` 

Now to define the actual supervision policy itself: 

```reason
let resetAfterDelayOf = (duration, msg, err, ctx) =>
  delay(duration) |> Js.Promise.then_(() => Js.Promise.resolve(Reset));
```

Perhaps we are consuming an external service and are worried about rate limiting. 
In that case, we can use the `useStatefulSupervisionPolicy` to define a supervision policy with more sophisticated behavior:

```reason
let resetFaultedChildWithExponentialDelayOf = factor => 
  useStatefulSupervisionPolicy(
    (msg, err, state, ctx) => {
      let delayDuration = int_of_float(2.0**(float_of_int(state - 1))*.factor);
      (state+1, delay(delayDuration) |> Js.Promise.then_(() => Js.Promise.resolve(Reset)));      
    }, 0 /* Initial State */
  );
```
The main difference between the code we had before and this new supervision policy, is the addition of the state parameter and
that now we return a `('state, Js.Promise.t(supervisionAction))` in response to an error. 
The first element in the tuple is passed as the state to the next failure.

Let us modify our contacts service from the previous example to actually use the supervision policy:

```js
let contactsService =
  spawn(
    ~onCrash: resetFaultedChildWithExponentialDelayOf(100 * milliseconds)
    system,
    (children, (sender, userId, msg), ctx) => {
      let potentialChild =
        try (Some(StringMap.find(userId, children))) {
        | _ => None
        };
      Js.Promise.resolve(
        switch potentialChild {
        | Some(child) =>
          dispatch(child, (sender, msg));
          children
        | None =>
          let child = createContactsService(ctx.self, userId);
          dispatch(child, (sender, msg));
          StringMap.add(userId, child, children)
        }
      )
    },
    (ctx) => StringMap.empty
  );
```
