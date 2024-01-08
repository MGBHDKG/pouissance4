import { Server } from "socket.io";

const io = new Server(3000, {
  cors :{
    origin: "http://localhost:8080"
  },
});

let rooms = new Map();

io.on("connection", (socket) => {
  socket.on("joinRoom", (roomName, pseudo) => {
    console.log(roomName, pseudo);
  })
});