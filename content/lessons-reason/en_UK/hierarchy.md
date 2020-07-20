---
title: "Hierarchy"
lesson: 4
chapter: 2
date: "11/12/2017"
programming_language:  "reasonml"
language: en_uk
type: "lesson"
tags:
    - getting-started
    - nact
    - reason
    - bucklescript
---
The application we made in the [querying](/lesson/reasonml/querying) section isn't very useful. For one it only supports a single user's contacts, and secondly it forgets all the user's contacts whenever the system restarts. In this section we'll solve the multi-user problem by exploiting an important feature of any blue-blooded actor system: the hierarchy.

Actors are arranged hierarchically, they can create child actors of their own, and accordingly every actor has a parent. The lifecycle of an actor is tied to its parent; if an actor stops, then it's children do too.

Up till now we've been creating actors which are children of the actor system (which is a pseudo actor). However in a real system, this would be considered an anti pattern, for much the same reasons as placing all your code in a single file is an anti-pattern. By exploiting the actor hierarchy, you can enforce a separation of concerns and encapsulate system functionality, while providing a coherent means of reasoning with failure and system shutdown. 

Let us imagine that the single user contacts service was simply a part of some larger system; an email campaign management API for example.  A potentially valid system could perhaps be represented by the diagram below. 

![Image](/img/hierarchy-diagram.svg)

In the diagram, the email service is responsible for managing the template engine and email delivery, while the contacts service has chosen to model each user's contacts as an actor. (This is a very feasible approach in production provided you shutdown actors after a period of inactivity)

Let us focus on the contacts service to see how we can make effective of use of the hierarchy. To support multiple users, we need do three things: 

- Modify our original contacts service so that we can parameterize its parent and name
- Create a parent to route requests to the correct child
- Add a user id to the path of each API endpoint and add a `userId` into each message.

Modifying our original service is as simple as the following:

```reason
let createContactsService = (parent, userId) =>
  spawn(
    ~name=userId,
    parent,
    (state, (sender, msg), _) =>
      (
        switch msg {
        | CreateContact(contact) => createContact(state, sender, contact)
        | RemoveContact(contactId) => removeContact(state, sender, contactId)
        | UpdateContact(contactId, contact) => updateContact(state, sender, contactId, contact)
        | FindContact(contactId) => findContact(state, sender, contactId)
        }
      )
      |> Js.Promise.resolve,
    (ctx) => {contacts: ContactIdMap.empty, seqNumber: 0}
  );
```

Now we need to create the parent contact service. The parent checks if it has a child with the userId as the key. If it does not, it spawns the 
child actor:

```reason

let contactsService =
  spawn(
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

These two modifications show the power of an actor hierarchy. The contact service doesn't need to know the implementation details of its children (and doesn't even have to know about what kind of messages the children can handle). The children also don't need to worry about multi tenancy and can focus on the domain.

Now the only thing remaining for a MVP of our contacts service is some way of persisting changes...

