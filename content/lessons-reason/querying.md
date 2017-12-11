---
title: "Querying"
lesson: 4
chapter: 2
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
Actor systems don't live in a vacuum, they need to be available to the outside world. Commonly actor systems are fronted by REST APIs or RPC frameworks. REST and RPC style access patterns are blocking: a request comes in, it is processed, and finally returned to the sender using the original connection. To help bridge nact's non blocking nature, Nact provides a `query` function. Query returns a promise.

Similar to `dispatch`, `query` pushes a message on to an actor's mailbox, but differs in that it also creates a temporary actor. The temporary actor is passed into a function which returns the message to send to the target actor. When the temporary actor receives a message, the promise returned by the query resolves. 

In addition to the message, `query` also takes in a timeout value measured in milliseconds. If a query takes longer than this time to resolve, it times out and the promise is rejected. A time bounded query is very important in a production system; it ensures that a failing subsystem does not cause cascading faults as queries queue up and stress available system resources.

In this example, we'll create a simple single user in-memory address book system.

> Note: We'll expand on this example in later sections.

What are the basic requirements of a basic address book API? It should be able to:
 - Create a new contact 
 - Fetch all contacts
 - Fetch a specific contact
 - Update an existing contact
 - Delete a contact

Because actor are message driven, let us define the message types used between the api and actor system:

```reason
type contactId =
  | ContactId(int);

type contact = {
  name: string,
  email: string
};

type contactResponseMsg =
  | Success(contact)
  | NotFound;

type contactMsg =
  | CreateContact(contact)
  | RemoveContact(contactId)
  | UpdateContact(contactId, contact)
  | FindContact(contactId);
```
We also need to describe the shape of the contact actor's state. In this example, it was decided to create a `ContactIdMap` map to hold the list of contacts. `seqNumber` is used to assign each contact a unique identifier. `seqNumber` monotonically increases, even if a contact is deleted:

```reason
module ContactIdCompare = {
  type t = contactId;
  let compare = (ContactId(left), ContactId(right)) => compare(left, right);
};

module ContactIdMap = Map.Make(ContactIdCompare);

type contactsServiceState = {
  contacts: ContactIdMap.t(contact),
  seqNumber: int
};
```

Now let us create functions to handle each message type:

```reason
let createContact = ({contacts, seqNumber}, sender, contact) => {
  let contactId = ContactId(seqNumber);
  sender <-< (contactId, Success(contact));
  let nextContacts = ContactIdMap.add(contactId, contact, contacts);
  {contacts: nextContacts, seqNumber: seqNumber + 1}
};

let removeContact = ({contacts, seqNumber}, sender, contactId) => {
  let nextContacts = ContactIdMap.remove(contactId, contacts);
  let msg =
    if (contacts === nextContacts) {
      let contact = ContactIdMap.find(contactId, contacts);
      (contactId, Success(contact))
    } else {
      (contactId, NotFound)
    };
  sender <-< msg;
  {contacts: nextContacts, seqNumber}
};

let updateContact = ({contacts, seqNumber}, sender, contactId, contact) => {
  let nextContacts =
    ContactIdMap.remove(contactId, contacts) |> ContactIdMap.add(contactId, contact);
  let msg =
    if (nextContacts === contacts) {
      (contactId, Success(contact))
    } else {
      (contactId, NotFound)
    };
  sender <-< msg;
  {contacts: nextContacts, seqNumber}
};

let findContact = ({contacts, seqNumber}, sender, contactId) => {
  let msg =
    try (contactId, Success(ContactIdMap.find(contactId, contacts))) {
    | Not_found => (contactId, NotFound)
    };
  sender <-< msg;
  {contacts, seqNumber}
};
```
Finally we can put it all together and create the actor:

```reason
let system = start();

let contactsService =
  spawn(
    ~name="contacts",
    system,
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
    {contacts: ContactIdMap.empty, seqNumber: 0}
  );
```

This should leave you with a working but very basic contacts service. 
We can now interact with this actor from outside the actor system by calling the query function. In the example below, we are passing in a 
function which constructs the final message to sender to the contactsService actor:

```reason
let createDinesh = query(
    ~timeout=100 * milliseconds,
    contactsService,
    (tempReference) => (
      tempReference,
      CreateContact({name: "Dinesh Chugtai", email: "dinesh@piedpiper.com"})
    )
  );
```

## Hierarchy

The application we made in the [querying](#querying) section isn't very useful. For one it only supports a single user's contacts, and secondly it forgets all the user's contacts whenever the system restarts. In this section we'll solve the multi-user problem by exploiting an important feature of any blue-blooded actor system: the hierachy.

Actors are arranged hierarchially, they can create child actors of their own, and accordingly every actor has a parent. The lifecycle of an actor is tied to its parent; if an actor stops, then it's children do too.

Up till now we've been creating actors which are children of the actor system (which is a pseudo actor). However in a real system, this would be considered an anti pattern, for much the same reasons as placing all your code in a single file is an anti-pattern. By exploiting the actor hierarchy, you can enforce a separation of concerns and encapsulate system functionality, while providing a coherent means of reasoning with failure and system shutdown. 

Let us imagine that the single user contacts service was simple a part of some larger system; an email campaign management API for example.  A potentially valid system could perhaps be represented by the diagram below. 

<img height="500px" alt="Example of an Actor System Hierarchy" src="https://raw.githubusercontent.com/ncthbrt/nact/master/assets/hierarchy-diagram.svg?sanitize=true"/>

In the diagram, the email service is responsible for managing the template engine and email delivery, while the contacts service has choosen to model each user's contacts as an actor. (This is a very feasible approach in production provided you shutdown actors after a period of inactivity)

Let us focus on the contacts service to see how we can make effective of use of the hierarchy. To support multiple users, we need do three things: 

- Modify our original contacts service to so that we can parameterise its parent and name
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
    {contacts: ContactIdMap.empty, seqNumber: 0}
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
    StringMap.empty
  );
```

These two modifications show the power of an actor hierarchy. The contact service doesn't need to know the implementation details of its children (and doesn't even have to know about what kind of messages the children can handle). The children also don't need to worry about multi tenancy and can focus on the domain.

Now the only thing remaining for a MVP of our contacts service is some way of persisting changes...

