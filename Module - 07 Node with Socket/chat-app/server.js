const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();

// Create HTTP Server
const server = http.createServer(app);

// Initiate Socket.io and Attached to HTTP server
const io = socketIo(server);

// Serve the static file
app.use(express.static("public"));

// Creating a user list
const users = new Set();

// Listen to new socket connections
io.on("connection", (socket) => {
  console.log("A user is now connected");

  // 👉 Handle users when they'll joins the chat (Whenever we emit the join event from frontend we have to listen it)
  socket.on("join", (userName) => {
    users.add(userName);
    socket.userName = userName;

    // Brodcast to all clients/users that a new user has joined (In this case we emit from server side and listen to client side)
    io.emit("userJoined", userName);

    // Send the updated user list to all clients
    io.emit("userList", Array.from(users));
  });

  // 👉 Handle incomeing chat messages
  socket.on("chatMessage", (message) => {
    // Broadcast the received message to all connected clients
    io.emit("chatMessage", message);
  });

  // 👉 Handle user disconnection
  socket.on("disconnect", () => {
    console.log("An User is disconnected", socket.userName);

    users.forEach((user) => {
      if (user === socket.userName) {
        users.delete(user);

        io.emit("userLeft", user);

        io.emit("userList", Array.from(users));
      }
    });
  });
});

const PORT = 3000;

// Listen to server
server.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}`);
});
