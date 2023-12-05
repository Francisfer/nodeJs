// CORE MODULES
const fs = require("fs");

// THIRD PARTY MODULES
const express = require("express");
const morgan = require("morgan");
const app = express();

// OUR ROUTE MODULES
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

// THIRD PARTY MIDDLEWARE
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// MIDDLEWARE
app.use(express.json()); // Built in
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("Hello from the middleware.");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// MOUNTING THE ROUTERS
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// SERVER START
module.exports = app;
