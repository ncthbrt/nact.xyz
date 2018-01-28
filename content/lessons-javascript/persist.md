---
title: "Persist"
lesson: 1
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
<!-- <a class="remix-button" href="https://glitch.com/edit/#!/remix/nact-contacts-3" target="_blank">
  <button>
    <img src="/img/code-fork-symbol.svg"/> REMIX
  </button>
</a> -->

The contacts service we've been working on *still* isn't very useful. While we've extended the service to support multiple users, it has the unfortunate limitation that it loses the contacts each time the machine restarts. To remedy this, nact extends stateful actors by adding a new method: `persist` 

To use `persist`, the first thing we need to do is specify a persistence engine. Currently only a [PostgreSQL](https://github.com/ncthbrt/nact-persistence-postgres) engine is available (though it should be easy to create your own). To work with the PostgreSQL engine, install the persistent provider package using the command `npm install --save nact-persistence-postgres`.  Assuming you've stored a connection string to a running database instance under the environment variable `DATABASE_URL` , we'll need to modify the code creating the system to look something like the following:

```js
const { start, configurePersistence, spawnPersistent } = require('nact');
const { PostgresPersistenceEngine } = require('nact-persistence-postgres');
const connectionString = process.env.DATABASE_URL;
const system = start(configurePersistence(new PostgresPersistenceEngine(connectionString)));
```

The `configurePersistence` method adds the the persistence plugin to the system using the specified persistence engine.

Now the only remaining work is to modify the contacts service to allow persistence. We want to save messages which modify state and replay them when the actor starts up again. When the actor start up, it first receives all the persisted messages and then can begin processing new ones. 

```js

const spawnUserContactService = (parent, userId) => spawnPersistent(
  parent,
  async (state = { contacts:{} }, msg, ctx) => {    
    if(msg.type === GET_CONTACTS) {        
      	dispatch(ctx.sender, { payload: Object.values(state.contacts), type: SUCCESS });
    } else if (msg.type === CREATE_CONTACT) {
        const newContact = { id: uuid(), ...msg.payload };
        const nextState = { contacts: { ...state.contacts, [newContact.id]: newContact } };
      	
      	// We only want to save messages which haven't been previously persisted 
      	// Note the persist call should always be awaited. If persist is not awaited, 
      	// then the actor will process the next message in the queue before the 
      	// message has been safely committed. 
        if(!ctx.recovering) { await ctx.persist(msg); }
      	
      	// Safe to dispatch while recovering. 
      	// The message just goes to Nobody and is ignored.      
        dispatch(ctx.sender, { type: SUCCESS, payload: newContact });            
        return nextState;
    } else {
        const contact = state.contacts[msg.contactId];
        if (contact) {
            switch(msg.type) {
              case GET_CONTACT: {
                dispatch(ctx.sender, { payload: contact, type: SUCCESS }, ctx.self);
                break;
              }
              case REMOVE_CONTACT: {
                const nextState = { ...state.contacts, [contact.id]: undefined };
                if(!ctx.recovering) { await ctx.persist(msg); }
                dispatch(ctx.sender, { type: SUCCESS, payload: contact }, ctx.self);                  
                return nextState;                 
              }
              case UPDATE_CONTACT:  {
                const updatedContact = {...contact, ...msg.payload };
                const nextState = { ...state.contacts, [contact.id]: updatedContact };
                if(!ctx.recovering) { await ctx.persist(msg); }                
                dispatch(ctx.sender,{ type: SUCCESS, payload: updatedContact }, ctx.self);                
                return nextState;                 
              }
            }
        } else {          
          dispatch(ctx.sender, { type: NOT_FOUND, contactId: msg.contactId }, ctx.sender);
        }
    }
    return state;
  },
  // Persistence key. If we want to restore actor state,
  // the key must be the same. Be careful about namespacing here. 
  // For example if we'd just used userId, another developer might accidentally
  // use the same key for an actor of a different type. This could cause difficult to 
  // debug runtime errors
  `contacts:${userId}`,
  userId
);
```