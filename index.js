const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socketio = require("socket.io");


var redis = require("redis");
const client = redis.createClient({password:"foobared"});

const io = socketio(server);

const path = require("path");
const publicDirectoryPath = path.join(__dirname, "/public");

app.use(express.static(publicDirectoryPath));

count = 1;

io.on("connection", (socket) => {
  console.log("New Web Socket Connection");
  client.set(count, socket.id);
  socket.emit("message", count);
  count++;

  socket.on("message", (message) => {
    console.log(message);
    io.emit("message", message);//send to all connected clients
  });

  socket.on("one", (message) => {
    client.get("2", (err, socketId) => {
      io.to(socketId).emit("one", message);  // to individual socketid (private message) for user that has count=2
    });
  });

});

server.listen(3050, () => {
  console.log("Server is up and running!");
});
