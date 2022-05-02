const { Router } = require("express");
const notificationsModuleV2 = require("./notifications");

const routerV2 = Router();

routerV2.use(notificationsModuleV2);

module.exports = routerV2;
