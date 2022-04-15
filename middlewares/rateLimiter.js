const { RateLimiterMemory } = require("rate-limiter-flexible");

const rateLimiter = new RateLimiterMemory({ points: 30, duration: 60 });

const HttpError = require("../utils/HttpError");

module.exports = (req, res, next) => {
    rateLimiter.consume(req.params.id, 1).then(rateLimitRes => next()).catch(rateLimitRes => {
        next( new HttpError("Too many requests", 429) );
    });
}