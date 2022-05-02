const { Router } = require("express");

const router = Router();

router.get("/ping", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const startConnectionTime = Date.now();

  res.write(
    `data: ${JSON.stringify({
      ping: "pong",
      time: Date.now() - startConnectionTime,
    })}`
  );
  res.write("\n\n");

  const interval = setInterval(() => {
    res.write(
      `data: ${JSON.stringify({
        ping: "pong",
        time: `${Date.now() - startConnectionTime}ms`,
      })}`
    );
    res.write("\n\n");
  }, 2000);

  req.on("close", () => {
    clearInterval(interval);
  });
});

module.exports = router;
