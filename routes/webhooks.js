const axios = require("axios");
const router = require("express").Router();

const rateLimiter = require("../middlewares/rateLimiter");
const HttpError = require("../utils/HttpError");

const baseUrl = "https://discord.com/api/webhooks"

router.use(rateLimiter);

router.get("/:id/:token", async (req, res, next) => {
    const response = await axios.request({
        method: "get",
        url: `${baseUrl}/webhooks/${req.params.id}/${req.params.token}`
    });
    return res.json(response.data);
});

router.post("/:id/:token", async (req, res, next) => {
    try {
        axios({
            method: "post",
            url: `${baseUrl}/${req.params.id}/${req.params.token}`,
            body: req.body
        });
    } catch (err) {
        next( new HttpError(err.message, 400) );
    }
});

module.exports = router;