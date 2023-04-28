const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("express-async-errors"); //eliminate try-catch blocks

const coursesRouter = require("./controllers/courses");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const { info, error } = require("./utils/logger");

info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    info("connected to MongoDB");
  })
  .catch((e) => {
    error("error connection to MongoDB:", e.message);
  });

app.use(cors());
app.use(express.json());

app.use("/api/login", loginRouter);
app.use("/api/courses", middleware.userExtractor, coursesRouter);
app.use("/api/users", middleware.userExtractor, usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
