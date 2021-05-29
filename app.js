const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get('/chat.js', (req, res) => {
    res.sendFile(__dirname + "/chat.js");
});

io.on("connection", (socket) => {
    socket.on("chat message", (message) => {
        io.emit("chat message", message);
        console.log("Message received: " + message);
    });
});

server.listen("3000", () => {
    console.log("Listening on port 3000")
});