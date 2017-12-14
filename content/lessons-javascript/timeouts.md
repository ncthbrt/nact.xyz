---
title: "Timeouts"
lesson: 3
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

While not strictly a part of the persistent actor, timeouts are frequently used with snapshotting. Actors take up memory, which is still a limited resource. If an actor has not processed messages in a while, it makes sense to shut it down until it is again needed; this frees up memory. Adding a timeout to the user contacts service is similar to snapshotting:

```js
const { messages, minutes } = require('nact');
const spawnUserContactService = (parent, userId) => spawnPersistent(
  parent,
  // Same function as before
  async (state = { contacts:{} }, msg, ctx) => {},
  `contacts:${userId}`,
  userId,
  { snapshotEvery: 20 * messages,
    shutdownAfter: 10 * minutes
  }
);
```

In the code above, the user contacts service stops if it hasn't received a new message in 10 minutes. 
