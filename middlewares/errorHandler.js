const HttpError = require("../utils/HttpError");

module.exports = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ message: err.message });
}