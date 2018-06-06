---
title: "ReasonNact v5.0.0 Release Notes"
cover: "https://unsplash.it/400/300/?random?BoldMage"
date: "2018-06-06"
category: "tech"
type: "post"
tags: []    
---
ReasonNact's latest release is a breaking change. In previous versions, the initial state was supplied as a plain value. *Now* the initial state must be specified as a function which takes in the actor's context. (See [Stateful Actors](/lesson/reasonml/stateful-actors) ) for an example).

While in many cases this change adds a few redundant characters, it solves a problem we have frequently experienced: Creating adapters, child actors and anything that lives in the state object which requires the actor reference for instantiation.

Please let me know if you experience any issues with the changes. And always, the Nact community is available on Discord to help out:

<iframe src='https://discordapp.com/widget?id=392625718682714112&theme=light' width='350' height='500' allowTransparency='true' frameBorder='0' />
