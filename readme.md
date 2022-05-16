# Server Sent Events

This is a project for experimenting with [Server Sent Events (SSE)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events), a way of communication going from server to client. It's not a WebSocket competitor, but more like an alternative for specific cases, mainly for when a bidirectional communication is not really necessary. While this is not the SSE's purpose, we can simulate bidirectional communication by using common POST requests to send from client to server, and SSE to listen from server to client. Last but not least, SSE is entirely based on HTTP protocol.

> PS: the purpose of this project was entirely related to server-client communication. No design pattern, project structure, SOLID concept nor UI/UX were intended to be covered here.

## Host

### Backend

The backend is hosted on [Heroku](https://www.heroku.com/) and accessible at:

> https://server-sent-events-mullet.herokuapp.com/

### Frontend

The frontend is hosted on [Vercel](https://vercel.com/) and accessible at:

> https://v1-sse-mullet.vercel.app/ - for a simpler solution

and

> https://v2-sse-mullet.vercel.app/ - for a smarter solution, with different message types, that is from the [v2 branch](https://github.com/italomlp/sse/tree/v2)

## Running

### Ping/pong

To understand how the things would work, there is a simple endpoint called `/ping`, where the server keeps sending a _pong_ message each `2` seconds while the connection lives. You can access it here: https://v2-sse-mullet.vercel.app/ping.

Although simple, it is enough to see the server sending events to the client without the need of a new protocol, like websocket does.

### Notifications provider

For a more smarter solution, I created something like a notifications provider. To be a client of it, you just need to access this link: https://v2-sse-mullet.vercel.app/.

To send notifications, you can access the link https://v2-sse-mullet.vercel.app/send-notification, and fill the form. The server will send the notification to every client connected.

## Stack

- Typescript
- Javascript
- ReactJS
- NodeJS
- Express
- NextJS
- Fetch API

## Useful links

- [Points that were used to guide the presentation](/presentation.md)
- https://stackoverflow.com/a/5326159 (Very informative, with some use cases and comparisons)
- https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
- https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
- https://github.com/binaryminds/react-native-sse
- https://pub.dev/packages/sse_client
- https://github.com/fanout/django-eventstream
