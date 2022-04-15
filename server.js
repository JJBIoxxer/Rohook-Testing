if (process.env.ENVIRONMENT != "production") require("dotenv").config();

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

const port = process.env.PORT || 2000;
app.listen(port, () => console.log(`Listening for requests on port ${port}`));