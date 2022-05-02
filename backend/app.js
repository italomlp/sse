const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const routesV1 = require("./modules/v1");
const routesV2 = require("./modules/v2");

const PORT = process.env.PORT || 3001;
const ENV = process.env.NODE_ENV || "development";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const apiRouter = express.Router();

apiRouter.use("/v1", routesV1);
apiRouter.use("/v2", routesV2);

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(
    `Server is running!${
      ENV === "development" ? ` It's available at http://localhost:${PORT}` : ""
    }`
  );
});
