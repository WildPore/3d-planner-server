require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const ALLOWED_ORIGINS =
  process.env.NODE_ENV === "production" ? "https://ourcoolserver.net" : "*";

const io = new Server(server, {
  cors: {
    origin: ALLOWED_ORIGINS,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`${socket.id} has connected.`);

  socket.on("move-cube", (position, rotation, scale) => {
    socket.broadcast.emit("move-cube", position, rotation, scale);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
