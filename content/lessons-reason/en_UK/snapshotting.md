---
title: "Snapshotting"
lesson: 2
chapter: 3
date: "11/12/2017"
language: en_uk
programming_language:  "reasonml"
type: "lesson"
tags:
    - getting-started
    - nact
    - reason
    - bucklescript
---
Sometimes actors accumulate a lot of persisted events. This is problematic because it means that it can take a potentially long time for an actor to recover. For time-sensitive applictions, this would make nact an unsuitable proposition. Snapshotting is a way to skip replaying every single event. When a persistent actor starts up again, nact checks to see if there are any snapshots available in the *snapshot store*. Nact selects the latest snapshot. The snapshot contains the sequence number at which it was taken. The snapshot is passed as the initial state to the actor, and only the events which were persisted after the snapshot are replayed. 

To modify the user contacts service to support snapshotting, we refactor the code to the following:

```reason
let createContactsService = (parent, userId) =>
  spawnPersistent(
    ~key="contacts" ++ userId,
    ~name=userId,
    ~snapshotEvery=10 * messages,
    parent,
    (state, (sender, msg), {persist}) => {
      /* Same function as before */
    }    
    (ctx) => {contacts: ContactIdMap.empty, seqNumber: 0}
  );
```
Here we are using the optional argument `snapshotEvery` to instruct nact to take a snapshot every 10 messages.