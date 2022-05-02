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
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  res.write(`data: ${JSON.stringify(notifications)}`);
  res.write("\n\n");

  const clientId = Date.now();

  const newClient = {
    id: clientId,
    res: res,
  };

  realTimeClients.push(newClient);

  req.on("close", () => {
    console.log(`Client ${clientId} disconnected`);
    realTimeClients = realTimeClients.filter(
      (client) => client.id !== clientId
    );
  });
});

router.post("/notifications", (req, res) => {
  const { title, body } = req.body;
  const newNotification = { title, body };
  notifications.push(newNotification);
  res.json(newNotification);
  return sendEventsToAll(newNotification);
});

module.exports = router;
