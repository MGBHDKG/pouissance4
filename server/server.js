import { Server } from "socket.io";

import createGrid from "./my_modules/createGrid.js";

const io = new Server(3000, {
  cors :{
    origin: "http://localhost:8080"
  },
});

let rooms = new Map();
let grids = new Map();

io.on("connection", (socket) => 
{

  //When an user joins a room
  socket.on("joinRoom", (roomName, pseudo) => 
  {
    console.log(roomName, pseudo);
    
    if(rooms.has(roomName)){
      const admin = rooms.get(roomName);

      if(admin.length > 1){
        io.to(socket.id).emit("error", "Cette room est déjà complète !")
        return;
      }

      if(admin[0].player == pseudo){
        io.to(socket.id).emit("error", "Ce pseudo est déjà pris dans cette room !")
        return;
      }

      admin.push({player: pseudo, id: socket.id, isHisTurn: false, color: "yellow"});
      rooms.set(roomName, admin);

      io.to(roomName).emit("newPlayer", pseudo);
      socket.join(roomName);

      io.to(socket.id).emit("joinRoom", admin[0].player, pseudo, roomName);

      let grid = createGrid();

      grids.set(roomName, grid);

      io.to(socket.id).emit("notYourTurn");

      return;
    }

    rooms.set(roomName, [{player: pseudo, id: socket.id, isHisTurn: true, color: "red"}])

    socket.join(roomName);

    io.to(socket.id).emit("joinRoom", pseudo, null, roomName);
  });

  //When user injects a coin
  socket.on("insertCoin", (roomName, col) => 
  {
    let room = rooms.get(roomName);
    let grid = grids.get(roomName);

    for(let i=0; i<2; i++)
    {
      if(room[i].id === socket.id && room[i].isHisTurn == true)
      {
        let otherPlayer = (i + 1) % 2
        console.log(i, otherPlayer);
        for(let k=6; k>0; k--){
          if(grid[k][col] == 0){
            grid[k][col] = i+1;
            
            room[otherPlayer].isHisTurn = false;
            room[otherPlayer].isHisTurn = true;

            rooms.set(roomName, room);
            grids.set(roomName, grid);

            io.to(socket.id).emit("notYourTurn");
            io.to(room[otherPlayer].id).emit("yourTurn");

            io.to(roomName).emit("grid", grid);

            return;
          }
        }
        //Erreur qd la colonne est pleine
      }
    }

    io.to(socket.id).emit("error", "Ce n'est pas à votre tour de jouer !");
  })
});