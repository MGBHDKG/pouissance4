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
    
    if(rooms.has(roomName)){
      const admin = rooms.get(roomName);

      if(admin.length > 2){
        io.to(socket.id).emit("error", "Cette room est déjà complète !")
        return;
      }

      if(admin[0].player == pseudo){
        io.to(socket.id).emit("error", "Ce pseudo est déjà pris dans cette room !")
        return;
      }

      admin.players[1] = {player: pseudo, id: socket.id};
      rooms.set(roomName, admin);
      playersID.set(socket.id, pseudo);
      socket.join(roomName);

      io.to(socket.id).emit("joinRoom", pseudo);

      return;
    }

    rooms.set(roomName, [{player: pseudo, id: socket.id}])

    socket.join(roomName);

    io.to(socket.id).emit("joinRoom", pseudo);
  })
});