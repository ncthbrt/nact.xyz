---
title: "Hierarchy"
lesson: 4
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
<!-- <a class="remix-button" href="https://glitch.com/edit/#!/remix/nact-contacts-2" target="_blank">
  <button>
    <img src="/img/code-fork-symbol.svg"/> REMIX
  </button>
</a> -->

The application we made in the [querying](/lesson/javascript/querying) section isn't very useful. For one it only supports a single user's contacts, and secondly it forgets all the user's contacts whenever the system restarts. In this section we'll solve the multi-user problem by exploiting an important feature of any blue-blooded actor system: the hierarchy.

Actors are arranged hierarchically, they can create child actors of their own, and accordingly every actor has a parent. The lifecycle of an actor is tied to its parent; if an actor stops, then it's children do too.

Up till now we've been creating actors which are children of the actor system (which is a pseudo actor). However in a real system, this would be considered an anti pattern, for much the same reasons as placing all your code in a single file is an anti-pattern. By exploiting the actor hierarchy, you can enforce a separation of concerns and encapsulate system functionality, while providing a coherent means of reasoning with failure and system shutdown. 

Let us imagine that the single user contacts service was simple a part of some larger system; an email campaign management API for example.  A potentially valid system could perhaps be represented by the diagram below. 

![Image](/img/hierarchy-diagram.svg)

In the diagram, the email service is responsible for managing the template engine and email delivery, while the contacts service has chosen to model each user's contacts as an actor. (This is a very feasible approach in production provided you shutdown actors after a period of inactivity)

Let us focus on the contacts service to see how we can make effective of use of the hierarchy. To support multiple users, we need do three things: 

- Modify our original contacts service to so that we can parameterize its parent and name
- Create a parent to route requests to the correct child
- Add a user id to the path of each API endpoint and add a `userId` into each message.

Modifying our original service is as simple as the following:

```js
const spawnUserContactService = (parent, userId) => spawn(
  parent,
  // same function as before
  userId
);
```

Now we need to create the parent contact service:

```js
const spawnContactsService = (parent) => spawnStateless(
  parent,
  (msg, ctx) => {
    const userId = msg.userId;
    let childActor;
    if(ctx.children.has(userId)){
      childActor = ctx.children.get(userId);
    } else {
      childActor = spawnUserContactService(ctx.self, userId);            
    }
    dispatch(childActor, msg, ctx.sender);
  },
  'contacts'
);
```

These two modifications show the power of an actor hierarchy. The contact service doesn't need to know the implementation details of its children (and doesn't even have to know about what kind of messages the children can handle). The children also don't need to worry about multi tenancy and can focus on the domain.

To complete the example, we finally adjust the API endpoints:

```js

app.get('/api/:user_id/contacts', (req,res) => performQuery({ type: GET_CONTACTS, userId: req.params.user_id }, res));

app.get('/api/:user_id/contacts/:contact_id', (req,res) => 
  performQuery({ type: GET_CONTACT, userId: req.params.user_id, contactId: req.params.contact_id }, res)
);

app.post('/api/:user_id/contacts', (req,res) => performQuery({ type: CREATE_CONTACT, payload: req.body }, res));

app.patch('/api/:user_id/contacts/:contact_id', (req,res) => 
  performQuery({ type: UPDATE_CONTACT, userId: req.params.user_id, contactId: req.params.contact_id, payload: req.body }, res)
);

app.delete('/api/:user_id/contacts/:contact_id', (req,res) => 
  performQuery({ type: REMOVE_CONTACT, userId: req.params.user_id, contactId: req.params.contact_id }, res)
);
```

Now the only thing remaining for a MVP of our contacts service is some way of persisting changes...

