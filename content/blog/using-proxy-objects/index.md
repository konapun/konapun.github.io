---
title: Using Proxy Objects
date: "2020-06-16T22:18:34Z"
description: "A problem and solution using a Proxy"
tags: ["snippets"]
---

Recently, someone asked on a programming subreddit if there was a way in a node
Express app to reduce duplicated error handling logic when specifying route handlers.

There are a number of good Express-provided ways or design solutions to address this issue
but I wondered if I could come up with a solution using a Proxy.

The gist of the problem was this:
```js
import express from 'express'

const router = express.Router()
router.post('/one', async (req, res, next) => {
  try {
    some_code_which_may_throw_an_error() // code which may throw errors, including database operations
  } catch (error) {
    next(error)
  }
})
router.post('/two', async (req, res, next) => {
  try {
    some_more_code_which_may_throw_an_error() // code which may throw errors, including database operations
  } catch (error) {
    next(error)
  }
})
// and so on...
```

Those of you that are familiar with Express may know about custom middleware that
could be used to handle errors in a uniform way and I agree that this is the better
solution. However, the point of this for me was more of a puzzle.

## What is a Proxy in Javascript?
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy](Proxies) were added
in ES6 as a way of specifying traps for an object. That is, ways you can hook into a defined object to
intercept calls and provide your own code to run. There are many practical uses for proxies but here we'll
be using it as a tool to solve the problem stated above.

## A Solution
Given what we know about proxies, we can see a potential solution in trapping the route handler and adding
the error handling there. Let's design our solution as a wrapper function called `proxyRouter` which takes
an Express router:

```js
const proxyRouter = router => new Proxy(router, {
  get (target, prop) {
    if (!['get', 'put', 'post', 'patch', 'delete'].includes(prop)) return target[prop]

    return (route, handler) => target[prop](route, (req, res, next) => {
      try {
        return handler(req, res, next)
      } catch (error) {
        next(error)
      }
    })
  }
})
```

---

### Let's break it down!
The first thing to notice is our Proxy definition. The first argument to Proxy is the `target` object we want
to proxy, which is the Express router. The second argument is the `handler` which specifies our hooks. `get`
is invoked upon property access on our target which includes methods as well. Here, `target` is our object and
`prop` is the property being accessed.

For our purposes, we want to provide our own implementations for all the HTTP verbs while leaving any other
properties untouched:
```js
if (!['get', 'put', 'post', 'patch', 'delete'].includes(prop)) return target[prop]
```

But if the property IS an HTTP verb, we need to return a new function which includes our extra logic. Remember
that the signature for `router.post`, `router.put`, etc. is `(route, handler)` which we can see in the specification
of the original problem at the beginning of this post. We want to provide an alternate implementation for this
function that includes the error handling bits we care about:
```js
return (route, handler) => target[prop](route, (req, res, next) => {
  try {
    return handler(req, res, next) // This is the handler function the user passes
  } catch (error) {
    next(error)
  }
})
```

---

### Using our proxy object
So how would we use this? Easy!
```js
const router = proxyRouter(express.Router())
router.post('/test', (req, res, next) => {
  some_code_which_may_throw_an_error() // We no longer need to put it in a try/catch!
})
```

It works!

Because the call to `post` is running through the proxy, error handling is already taken care of!

Again, this isn't necessarily the best solution but it's definitely a problem that can be solved using a
Proxy and Proxies are awesome!
