---
title: "Querying"
lesson: 3
chapter: 2
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
<!-- <a class="remix-button" href="https://glitch.com/edit/#!/remix/nact-contacts-1" target="_blank">
  <button>
    <img src="/img/code-fork-symbol.svg"/> REMIX
  </button>
</a> -->

Actor systems don't live in a vacuum, they need to be available to the outside world. Commonly actor systems are fronted by REST APIs or RPC frameworks. REST and RPC style access patterns are blocking: a request comes in, it is processed, and finally returned to the sender using the original connection. To help bridge nact's non blocking nature, references to actors have a `query` function. Query returns a promise.

Similar to `dispatch`, `query` pushes a message on to an actor's mailbox, but differs in that it also creates a virtual actor. When this virtual actor receives a message, the promise returned by the query resolves. 

In addition to the message, `query` also takes in a timeout value measured in milliseconds. If a query takes longer than this time to resolve, it times out and the promise is rejected. A time bounded query is very important in a production system; it ensures that a failing subsystem does not cause cascading faults as queries queue up and stress available system resources.

In this example, we'll create a simple single user in-memory address book system. To make it more realistic, we'll host it as an express app. You'll need to install `express`, `body-parser`, `uuid` and of course `nact` using npm to get going.

> Note: We'll expand on this example in later sections.

What are the basic requirements of a basic address book API? It should be able to:
 - Create a new contact 
 - Fetch all contacts
 - Fetch a specific contact
 - Update an existing contact
 - Delete a contact

To implement this functionality, we'll need to create the following endpoints:
  - POST `/api/contacts` - Create a new contact 
  - GET `/api/contacts` - Fetch all contacts
  - GET `/api/contacts` - Fetch a specific contact
  - PATCH `/api/contacts/:contact_id` - Update an existing contact
  - DELETE `/api/contacts/:contact_id` - Delete a contact

Here are the stubs for setting up the server and endpoints:

```js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/api/contacts', (req,res) => { /* Fetch all contacts */ });

app.get('/api/contacts/:contact_id', (req,res) => { /* Fetch specific contact */ });

app.post('/api/contacts', (req,res) => { /* Create new contact */ });

app.patch('/api/contacts/:contact_id',(req,res) => { /* Update existing contact */ });

app.delete('api/contacts/:contact_id', (req,res) => { /* Delete contact */ });

app.listen(process.env.PORT || 3000, function () {
  console.log(`Address book listening on port ${process.env.PORT || 3000}!`);
});
```

Because actor are message driven, let us define the message types used between the express api and actor system:

```js
 const ContactProtocolTypes = {
   GET_CONTACTS: 'GET_CONTACTS',
   GET_CONTACT: 'GET_CONTACT',
   UPDATE_CONTACT: 'UPDATE_CONTACT',
   REMOVE_CONTACT: 'REMOVE_CONTACT',
   CREATE_CONTACT: 'CREATE_CONTACT',
   // Operation sucessful
   SUCCESS: 'SUCCESS',
   // And finally if the contact is not found
   NOT_FOUND: 'NOT_FOUND'
 };
```
Our contacts actor will need to handle each message type:

```js
const uuid = require('uuid/v4');

const contactsService = spawn(
  system,
  (state = { contacts:{} }, msg, ctx) => {    
    if(msg.type === GET_CONTACTS) {
        // Return all the contacts as an array
        dispatch(
          ctx.sender, 
          { payload: Object.values(state.contacts), type: SUCCESS }, 
          ctx.self
        );
    } else if (msg.type === CREATE_CONTACT) {
        const newContact = { id: uuid(), ...msg.payload };
        const nextState = { 
          contacts: { ...state.contacts, [newContact.id]: newContact } 
        };
        dispatch(ctx.sender, { type: SUCCESS, payload: newContact });
        return nextState;
    } else {
        // All these message types require an existing contact
        // So check if the contact exists
        const contact = state.contacts[msg.contactId];
        if (contact) {
            switch(msg.type) {
              case GET_CONTACT: {
                dispatch(ctx.sender, { payload: contact, type: SUCCESS });
                break;
              }
              case REMOVE_CONTACT: {
                // Create a new state with the contact value to undefined
                const nextState = { ...state.contacts, [contact.id]: undefined };
                dispatch(ctx.sender, { type: SUCCESS, payload: contact });
                return nextState;                 
              }
              case UPDATE_CONTACT:  {
                // Create a new state with the previous fields of the contact 
                // merged with the updated ones
                const updatedContact = {...contact, ...msg.payload };
                const nextState = { 
                  ...state.contacts,
                  [contact.id]: updatedContact 
                };
                dispatch(ctx.sender, { type: SUCCESS, payload: updatedContact });
                return nextState;                 
              }
            }
        } else {
          // If it does not, dispatch a not found message to the sender          
          dispatch(
            ctx.sender, 
            { type: NOT_FOUND, contactId: msg.contactId }, 
            ctx.self
          );
        }
    }      
    // Return the current state if unchanged.
    return state;
  },
  'contacts'
);
```

Now to wire up the contact service to the API controllers, we have create a query for each endpoint. For example here is how to wire up the fetch a specific contact endpoint (the others are very similar):

```js
app.get('/api/contacts/:contact_id', async (req,res) => { 
  const contactId = req.params.contact_id;
  const msg = { type: GET_CONTACT, contactId };
  try {
    const result = await query(contactService, msg, 250); // Set a 250ms timeout
    switch(result.type) {
      case SUCCESS: res.json(result.payload); break;
      case NOT_FOUND: res.sendStatus(404); break;
      default:
        // This shouldn't ever happen, but means that something is really wrong in the application
        console.error(JSON.stringify(result));
        res.sendStatus(500);
        break;
    }
  } catch (e) {
    // 504 is the gateway timeout response code. Nact only throws on queries to a valid actor reference if the timeout 
    // expires.
    res.sendStatus(504);
  }
});
```
Now this is a bit of boilerplate for each endpoint, but could be refactored so as to extract the error handling into a separate function named `performQuery`:

```js
const performQuery = async (msg, res) => {
  try {
    const result = await query(contactsService, msg, 500); // Set a 250ms timeout
    switch(result.type) {
      case SUCCESS: res.json(result.payload); break;
      case NOT_FOUND: res.sendStatus(404); break;
      default:
        // This shouldn't ever happen, but means that something is really wrong in the application
        console.error(JSON.stringify(result));
        res.sendStatus(500);
        break;
    }
  } catch (e) {
    // 504 is the gateway timeout response code. Nact only throws on queries to a valid actor reference if the timeout 
    // expires.
    res.sendStatus(504);
  }
};
```
This would allow us to define the endpoints as follows:

```js
app.get('/api/contacts', (req,res) => performQuery({ type: GET_CONTACTS }, res));

app.get('/api/contacts/:contact_id', (req,res) => 
  performQuery({ type: GET_CONTACT, contactId: req.params.contact_id }, res)
);

app.post('/api/contacts', (req,res) => performQuery({ type: CREATE_CONTACT, payload: req.body }, res));

app.patch('/api/contacts/:contact_id', (req,res) => 
  performQuery({ type: UPDATE_CONTACT, contactId: req.params.contact_id, payload: req.body }, res)
);

app.delete('/api/contacts/:contact_id', (req,res) => 
  performQuery({ type: REMOVE_CONTACT, contactId: req.params.contact_id }, res)
);
```

This should leave you with a working but very basic contacts service. 

