import { Server } from "socket.io";

const io = new Server(3000, {
  cors :{
    origin: "http://localhost:8080"
  },
});

io.on("connection", (socket) => {
  socket.on("msg", (msg) => {
    console.log(msg);
  })
});