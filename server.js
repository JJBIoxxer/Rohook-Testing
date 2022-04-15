const express = require("express");

const app = express();

// Routers
const apiRouter = require("./routes/api");

// Middlewares
const errorHandler = require("./middlewares/errorHandler");

// Utils
const HttpError = require("./utils/HttpError");

app.use(express.json());

app.use("/api", apiRouter);

app.all("*", (req, res, next) => { 
    next( new HttpError(`Requested URL ${req.path} not found!`, 404) );
});
app.use(errorHandler);

app.listen(2000, () => console.log("Server Started"));