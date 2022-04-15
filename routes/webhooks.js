const axios = require("axios").default;
const router = require("express").Router();

const rateLimiter = require("../middlewares/rateLimiter");
const HttpError = require("../utils/HttpError");

const baseUrl = "https://discord.com/api/webhooks"

router.use(rateLimiter);

router.get("/:id/:token", async (req, res, next) => {
    try {
        const response = await axios({
            method: req.method.toLowerCase(),
            url: `${baseUrl}/${req.params.id}/${req.params.token}`
        });
        return res.json(response.data);
    } catch (error) {
        next( new HttpError("Bad Request", 400) );
    }
});

router.post("/:id/:token", async (req, res, next) => {
    try {
        axios({
            method: req.method.toLowerCase(),
            url: `${baseUrl}/${req.params.id}/${req.params.token}`,
            body: req.body
        });
    } catch (err) {
        next( new HttpError(err.message, 400) );
    }
});

module.exports = router;