const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("Server connected..");

  // broadcasting server
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});

http.listen(PORT, () => console.log(`Listening on port ${PORT}`));
