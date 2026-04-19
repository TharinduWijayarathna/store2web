const express = require("express");

const routes = require("./routes");
const { requestLogger } = require("./middleware/logger");
const { notFound } = require("./middleware/notFound");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

module.exports = { app };
