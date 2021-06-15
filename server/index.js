var express = require('express')
const http = require("http");
const cors= require("cors")
var app = express();
const server = http.createServer(app);
const db= require('./src/config/db')
const route = require('./src/routes')
db.connect();
app.use(cors())
app.use(express.json())

const socketIo = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
  });

  route(app)

socketIo.on("connection", (socket) => {
  socket.on('setId',(data)=>{
    socket.id=data._id;
    socket.name=data.username;
    data.rooms.forEach(element => {
      console.log(element)
      socket.join(element)
    });
    socket.emit('add-room',socket.name)
  })
  
  socket.on("sendDataClient", function(data) {
    socket.join(data.room)
    console.log(socket.adapter.rooms)
    socketIo.in(data.room).emit("sendDataServer", data);
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(5000, () => {
    console.log('Server đang chay tren cong 5000');
});