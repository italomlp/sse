const { Router } = require("express");
const notificationsModuleV1 = require("./notifications");
const pingModuleV1 = require("./ping");

const routerV1 = Router();

routerV1.use(notificationsModuleV1);
routerV1.use(pingModuleV1);

module.exports = routerV1;
