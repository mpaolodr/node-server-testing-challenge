const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const userRouter = require("../routers/userRouter.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "is live!" });
});

module.exports = server;
