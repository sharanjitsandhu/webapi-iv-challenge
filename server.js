const express = require("express");
const helmet = require("helmet");
const server = express();

// custom middleware
// Write custom middleware to ensure that the user's name is upper-cased
// before the request reaches the POST or PUT route handlers
function upperCase(req, res, next) {
  const name = req.body.name;
  if (name) {
    req.body.name = name.toUpperCase();
  }
  next();
}

// middleware modules
server.use(express.json()); // add this for POST request
server.use(helmet()); //third party, need to yarn add it
server.use(upperCase);

const usersRouter = require("./routers/users-router.js");
const postsRouter = require("./routers/posts-router.js");

// routing
server.use("/api/users", upperCase, usersRouter);
server.use("/api/posts", postsRouter);

// route handlers are middlewares
server.get("/", (req, res) => {
  res.send("Welcome to my API ✔️");
});

module.exports = server;
