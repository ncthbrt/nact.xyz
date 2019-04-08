---
title: "Persistent Queries"
lesson: 4
chapter: 3
date: "11/12/2017"
programming_language:  "javascript"
type: "lesson"
language: en_UK
tags:
    - getting-started
    - nact
    - javascript
    - nodejs
---
You start to see the biggest benefit from snapshotting best when your state is small in size, and persisted events are many. 
However sometimes you may on occasion need to render a sequence of events into a different form.

For example a real world problem I had was being able to view a list of transactions which modified a domain entity. You may not need this sequence all the time, but it is still required to be there. The problem with storing all the events in state is that now your state is just slightly larger than the sequence of events which led to that state, and hence snapshotting in fact counter productive. This is a dichotomy solved by the [CQRS pattern](https://martinfowler.com/bliki/CQRS.html). 

Nact provides the persistent query feature as a light-weight (but powerful) form of CQRS. A persistent query takes in a persistent key, and returns a function which when invoked replays the persisted events, building a result which is finally returned as a promise. A persistent query is lazy in that it only retrieves events when forced. It may be invoked any number of times, each time checking for new events. The result and sequence number of the query are cached with an optional timeout, and the result may optionally also be snapshotted every given number of messages. 

Here is a practical example of how a persistent query is useful. The example models a simplified wallet. The actor's state holds the current balance, the wallet id, and a persistent query which represents the list of transactions. An important feature to note in this example is the use of encoders and decoders. This is especially necessary as the state is now no longer just static data, it also contains a dynamic value. 

```javascript
const transactionsQuery = (parent, id) =>
  persistentQuery(    
    parent,
    (state=[], msg) => {
      if(msg.type == 'transaction') {
        return [msg, ...state];
      } else {
        return state;
      }          
    },
    "wallet" ++ id,
  );

let snapshotDecoder = (parent) => (json) => ({
    id: json.id,
    balance: json.balance
    transactions: transactionsQuery(parent, json.id),
});

const initialState = (id, parent) => ({  
  balance: 0,
  id:walletId,
  transactions: transactionsQuery(parent, id),    
});

let spawnWallet = (walletId, parent) =>
  spawnPersistent(
    parent,        
    async (state=initialState(walletId,parent), msg, {recovering, persist}) => {
      switch (msg.type) {
        case 'transaction':          
          if(!recovering) {
            await persist(msg);
          }
          return {...state, balance: state.balance + msg.amount };
        case 'get_transactions':                    
          dispatch(msg.requestee, await state.transactions());
          return state;
        default: 
          return state;
      }
    },
    "wallet" ++ walletId,
    walletId,
    {
      snapshotDecoder: snapshotDecoder(parent),        
      snapshotEvery: 5 * messages,
    }    
  );
```

## Differences and similarities between persistent actors and persistent queries

Persistent queries don't have a lifecycle like actors, therefore they can't `shutdownAfter`. However the current result of a query is cached in memory, the cache is available for an unbounded amount of time by default, unless a `cacheDuration` is specified.

Like persistent actors, persistent queries can have decoders and encoders. They may also be snapshotted. An important difference to note when snapshotting, is that a `snapshotKey` must be added along with the usual `snapshotEvery` property. 