const { Router } = require("express");

const router = Router();

let realTimeClients = [];
const notifications = [];

function sendEventsToAll(message) {
  realTimeClients.forEach((client) => {
    client.res.write(`data: ${JSON.stringify(message)}`);
    client.res.write("\n\n");
  });
}

router.get("/status", (req, res) => {
  res.json({ realTimeClients: realTimeClients.length, version: "v1" });
});

router.get("/notifications", (req, res) => {
  // tell the client that it's a stream, and to keep connection alive
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  // send initial data to client
  res.write(`data: ${JSON.stringify(notifications)}`);
  res.write("\n\n");

  // create a new client with his respective connection response object
  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res,
  };

  // add new client to our list of clients
  // this will be used to send events to all clients
  realTimeClients.push(newClient);

  // listen for client disconnection
  req.on("close", () => {
    console.log(`Client ${clientId} disconnected`);
    // remove client from our list of clients on disconnection
    realTimeClients = realTimeClients.filter(
      (client) => client.id !== clientId
    );
  });
});

router.post("/notifications", (req, res) => {
  const { title, body } = req.body;
  const newNotification = { title, body };
  // create and add new notification to our list of notifications
  notifications.push(newNotification);

  // return new notification object as response
  res.json(newNotification);

  // send new notification to all clients
  return sendEventsToAll(newNotification);
});

module.exports = router;
