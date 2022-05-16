# SSE - Server Sent Events

- [x] Communication Client → Server
- [x] Communication Server → Client

  - [x] Push notifications - Apps
  - [x] Long-polling
  - [x] WebSockets
  - [x] GraphQL pub/sub - another mullet
  - [x] Server Sent Events

- [x] Push notifications
  - Apps - mobile
  - Browsers
  - Can be disabled
  - Not event-driven
- [x] Long-polling
  - Old technic
  - Not performative
  - Can increase costs
  - Not event-driven
- [x] WebSocket
  - New protocol
  - Bi-directional
  - Event driven
  - Proxy problems - enterprise firewalls
- [x] Server Sent Events
  - Based on HTTP
  - Event driven
  - Reconnection and event id by default
  - No problems with proxy and firewalls
  - Just one direction - Server → Client
  - Only UTF-8

Examples:

- WebSockets
  - Chat
  - Multiplayer games
  - Collaborative editing and coding
- SSE
  - Stock ticker streaming
  - Notifications
  - Twitter feed updating

Disclaimers:

- Almost everything can be done on both, WebSockets and SSE

Let's code...

- [x] Ping example - https://v2-sse-mullet.vercel.app/ping
- [x] Notifications example
  - Client: https://v1-sse-mullet.vercel.app/
  - Send notifications: https://v1-sse-mullet.vercel.app/send-notification
- [x] Notifications smarter example
  - Client: https://v2-sse-mullet.vercel.app/
  - Send notifications: https://v2-sse-mullet.vercel.app/send-notification
