---
title: "Persistent Queries"
lesson: 4
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
You start to see the biggest benefit from snapshotting best when your state is small in size, and persisted events are many. 
However sometimes you may on occasion need to view the result of the sequence of events in a different form.

For example a real world problem I had was being able to view a sequence of events which modified a domain entity. You may not need this sequence all the time, but you need it. The problem with storing all the events in state is that now your state is just slightly larger than the sequence of events which led to that state, and hence snapshotting is in fact counter productive. This is a dichotomy solved by the [CQRS pattern](https://martinfowler.com/bliki/CQRS.html). 

Nact provides the persistent query feature as a light-weight (but powerful) form of  CQRS. A persistent query takes in a persistent key, and returns a function which when invoked replays the persisted events, building a result which is finally returned as a promise. A persistent query is lazy in that it only retrieves events when forced. It may be invoked any number of times, each time checking for new events (streaming support could later be added without having to change the API). The result and sequence number of the query are cached with an optional timeout, and the result may optionally also be snapshotted every given number of messages. 

Here is a practical example of how a persistent query is useful. The example models a simplified wallet. The actor's state holds the current balance, the wallet id, and a persistent query which represents the list of transactions. An important feature to note in this example is the use of encoders and decoders. This is especially necessary as the state is now no longer just static data, it also contains a dynamic value. 

```reason
open Nact;

open Nact.Operators;

module Transaction = {
  type t = {
    amount: int,
    createdAt: Js.Date.t,
    reference: string,
  };
};

module Wallet = {
  type id =
    | WalletId(string);
  type t = {
    balance: int,
    id,
    transactions: unit => Js.Promise.t(list(Transaction.t)),
  };
};

let transactionsQuery = (parent, id) =>
  Nact.persistentQuery(
    ~key="wallet" ++ id,
    parent,
    state =>
      fun
      | `Transaction(t) => Js.Promise.resolve([t, ...state])
      | _ => Js.Promise.resolve(state),
    [],
  );

let stateDecoder = (parent, json) => {
  open Json.Decode;
  let id = field("id", string, json);
  {
    Wallet.id: Wallet.WalletId(id),
    balance: field("balance", int, json),
    transactions: transactionsQuery(parent, id),
  };
};

let stateEncoder = ({id: WalletId(id), balance}: Wallet.t) =>
  Json.Encode.(
    object_([
      ("id", id |> Json.Encode.string),
      ("balance", balance |> Json.Encode.int),
    ])
  );

let spawnWallet = (walletId, parent) =>
  spawnPersistent(
    parent,
    ~key="wallet" ++ walletId,
    ~stateEncoder,
    ~stateDecoder=stateDecoder(parent),
    ~snapshotEvery=5 * messages,
    (state, msg, {recovering, persist}) =>
      switch (msg) {
      | `Transaction((t: Transaction.t)) =>
        (recovering ? Js.Promise.resolve() : persist(`Transaction(t)))
        |> Js.Promise.then_(() =>
             Js.Promise.resolve({...state, balance: state.balance + t.amount})
           )
      | `GetTransactions(requestee) =>
        ignore(
          state.transactions()
          |> Js.Promise.then_(transactions =>
               Js.Promise.resolve(requestee <-< transactions)
             ),
        );
        Js.Promise.resolve(state);
      },
    {
      Wallet.balance: 0,
      id: Wallet.WalletId(walletId),
      transactions: transactionsQuery(parent, walletId),
    },
  );
```

