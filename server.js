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
  console.log(`A user connected with id: ${socket.id}`);

  // broadcasting server
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
    console.log(msg);
  });
})
  .on("disconnect", () => {
    console.log("Server disconnected");
  })
  .on("error", (err) => {
    console.log(err);
  });

http.listen(PORT, () => console.log(`Listening on port ${PORT}`));
