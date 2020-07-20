---
title: "Querying"
lesson: 3
chapter: 2
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

Because actors are message driven, let us define the message types used between the api and actor system:

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
      (contactId, NotFound)
    } else {
      let contact = ContactIdMap.find(contactId, contacts);
      (contactId, Success(contact))
    };
  sender <-< msg;
  {contacts: nextContacts, seqNumber}
};

let updateContact = ({contacts, seqNumber}, sender, contactId, contact) => {
  let nextContacts =
    ContactIdMap.remove(contactId, contacts) |> ContactIdMap.add(contactId, contact);
  let msg =
    if (nextContacts === contacts) {
      (contactId, NotFound)
    } else {
      (contactId, Success(contact))
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
    (ctx) => {contacts: ContactIdMap.empty, seqNumber: 0}
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
