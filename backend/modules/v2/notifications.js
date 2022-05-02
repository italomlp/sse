const { Router } = require("express");

const router = Router();

let realTimeClients = [];
const notifications = [];

const MESSAGE_TYPES = {
  NEW_NOTIFICATION: "NEW_NOTIFICATION",
  NEW_CLIENT_CONNECTED: "NEW_CLIENT_CONNECTED",
  CLIENT_DISCONNECTED: "CLIENT_DISCONNECTED",
  INITIAL_LOAD: "INITIAL_LOAD",
};

function sendEventsToAll(message) {
  realTimeClients.forEach((client) => {
    client.res.write(`data: ${JSON.stringify(message)}`);
    client.res.write("\n\n");
  });
}

router.get("/status", (req, res) => {
  res.json({ realTimeClients: realTimeClients.length, version: "v2" });
});

router.get("/notifications", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  res.write(
    `data: ${JSON.stringify({
      type: MESSAGE_TYPES.INITIAL_LOAD,
      content: {
        numberOfClients: realTimeClients.length + 1, // add 1 to represent the client that is currently connecting
        notifications,
      },
    })}`
  );
  res.write("\n\n");

  const clientId = Date.now();

  const newClient = {
    id: clientId,
    res: res,
  };

  sendEventsToAll({
    type: MESSAGE_TYPES.NEW_CLIENT_CONNECTED,
    content: clientId,
  });

  realTimeClients.push(newClient);

  req.on("close", () => {
    console.log(`Client ${clientId} disconnected`);
    realTimeClients = realTimeClients.filter(
      (client) => client.id !== clientId
    );
    sendEventsToAll({
      type: MESSAGE_TYPES.CLIENT_DISCONNECTED,
      content: clientId,
    });
  });
});

router.post("/notifications", (req, res) => {
  const { title, body } = req.body;
  const newNotification = { title, body };
  notifications.push(newNotification);
  res.json(newNotification);
  return sendEventsToAll({
    type: MESSAGE_TYPES.NEW_NOTIFICATION,
    content: newNotification,
  });
});

module.exports = router;
