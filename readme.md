Summary
======

It is a simple object for to publish messages to listeners. Messages
are transmitted synchronously.

Exemple
---
```javascript
const EventStream = require("rauricoste-event-stream-sync")

const stream = new EventStream()
```

EventStream class
-----
* `subscribe(fct: Function)` : add the `fct` as a listener of published messages.
* `publish(message: Any)` : execute all listeners with `message` as its argument.
Execution is synchronous and sequential.
* `subEventStream(key: String)` : create an `EventStream` object that listens only
on messages that are objects and have a value associated to `key` key and
publishing only this value.
Publishing on a sub EventStream does not publish on the parent EventStream.

