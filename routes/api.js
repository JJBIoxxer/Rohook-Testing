const router = require("express").Router();

const webhooksRouter = require("./webhooks");

router.use("/webhooks", webhooksRouter);

module.exports = router;