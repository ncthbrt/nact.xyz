---
title: "Persist"
lesson: 1
chapter: 3
cover: "https://unsplash.it/400/300/?random?BoldMage"
date: "11/12/2017"
category: "reasonml"
type: "lesson"
tags:
    - getting-started
    - nact
    - reason
    - bucklescript
---

> Note: Please take a careful look at the [Decoders and Encoders](/lesson/reasonml/decoders-and-encoders) section to understand an important limitation of persistence actors in Reason.

The contacts service we've been working on *still* isn't very useful. While we've extended the service to support multiple users, it has the unfortunate limitation that it loses the contacts each time the program restarts. To remedy this, nact extends stateful actors by adding a new function: `persist` 

To use `persist`, the first thing we need to do is specify a persistence engine. Currently only a [PostgreSQL](https://github.com/ncthbrt/reason-nact-postgres) engine is available (though it should be easy to create your own). To work with the PostgreSQL engine, install the persistent provider package using the command `npm install --save reason-nact-postgres`. Also ensure you add
the package to `bsconfig.json`. Now we'll need to modify the code creating the system to look something like the following (replacing "CONNECTION_STRING" with a valid postgresql connection string of course):

```reason
let system = start(~persistenceEngine=NactPostgres.create("CONNECTION_STRING"), ());
```

The optional parameter `~persistenceEngine` adds the persistence plugin to the system using the specified persistence engine.

Now the only remaining work is to modify the contacts service to allow persistence. When the actor starts up, it first receives all the persisted messages and then can begin processing new ones.

```reason
let createContactsService = (parent, userId) =>
  spawnPersistent(
    ~key="contacts" ++ userId,
    ~name=userId,
    parent,
    (state, (sender, msg), {persist, recovering}) =>
      (recovering ? Js.Promise.resolve((sender, msg)) : persist((sender, msg)))
      |> Js.Promise.then_ (
        () =>
          (
            switch msg {
            | CreateContact(contact) => createContact(state, sender, contact)
            | RemoveContact(contactId) => removeContact(state, sender, contactId)
            | UpdateContact(contactId, contact) => updateContact(state, sender, contactId, contact)
            | FindContact(contactId) => findContact(state, sender, contactId)
            }
          )
          |> Js.Promise.resolve
      ),
    (ctx) => {contacts: ContactIdMap.empty, seqNumber: 0}
  );
```

The `~key` parameter supplied when spawning the persistent actor is very important and should be a unique value. The key is used to save and retrieve snapshots and persisted events.


