---
title: "Timeouts"
lesson: 3
chapter: 3
date: "11/12/2017"
language: en_UK
programming_language:  "reasonml"
type: "lesson"
tags:
    - getting-started
    - nact
    - reason
    - bucklescript
---
While not strictly a part of the persistent actor, timeouts are frequently used with snapshotting. Actors take up memory, which is still a limited resource. If an actor has not processed messages in a while, it makes sense to shut it down until it is again needed; this frees up memory. Adding a timeout to the user contacts service is similar to snapshotting:

```reason
let createContactsService = (parent, userId) =>
  spawnPersistent(
    ~key="contacts" ++ userId,
    ~name=userId,
    ~shutdownAfter=15 * minutes,
    ~snapshotEvery=10 * messages,
    parent,
    (state, (sender, msg), {persist}) => {
      /* Same function as before */
    }    
    (ctx) => {contacts: ContactIdMap.empty, seqNumber: 0}
  );
```
