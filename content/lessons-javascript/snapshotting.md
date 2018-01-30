---
title: "Snapshotting"
lesson: 2
chapter: 3
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
Sometimes actors accumulate a lot of persisted events. This is problematic because it means that it can take a potentially long time for an actor to recover. For time-sensitive applictions, this would make nact an unsuitable proposition. Snapshotting is a way to skip replaying every single event. When a persistent actor starts up again, nact checks to see if there are any snapshots available in the *snapshot store*. Nact selects the latest snapshot. The snapshot contains the sequence number at which it was taken. The snapshot is passed as the initial state to the actor, and only the events which were persisted after the snapshot are replayed. 

To modify the user contacts service to support snapshotting, we refactor the code to the following:

```js
const { messages } = require('nact');
const spawnUserContactService = (parent, userId) => spawnPersistent(
  parent,
  // Same function as before
  async (state = { contacts:{} }, msg, ctx) => {},
  `contacts:${userId}`,
  userId,
  { snapshotEvery: 20 * messages }
);
```

The final argument to `spawnPersistent` is the actor properties object. Here we are using `snapshotEvery` to instruct nact to make a snapshot every 20 messages.
