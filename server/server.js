import { Server } from "socket.io";
import { createServer } from "http";

import insertCoin from "./my_modules/insertCoin.js";
import secondPlayerJoin from "./my_modules/secondPlayerJoin.js";
import createGrid from "./my_modules/createGrid.js";

const PORT = process.env.PORT || 3001;

const httpServer = createServer();

const io = new Server(httpServer, {
  cors :{
    origin: ["http://localhost:8080", "https://pouissance4.netlify.app"],
    methods: ["GET", "POST"],
    allowedHeaders: ['Content-Type', 'Authorization']
  },
  host: '0.0.0.0'
});

httpServer.listen(PORT)

let rooms = new Map();
let grids = new Map();

io.on("connection", (socket) => 
{
  //When an user joins a room
  socket.on("joinRoom", (roomName, pseudo) => 
  {
    console.log(roomName, pseudo);
    
    if(rooms.has(roomName)){
      secondPlayerJoin(roomName, pseudo, rooms, grids, socket, io);
      return;
    }

    rooms.set(roomName, [{player: pseudo, id: socket.id, isHisTurn: true, color: "red"}])

    socket.join(roomName);

    io.to(socket.id).emit("joinRoom", pseudo, null, roomName);
  });

  //When user injects a coin
  socket.on("insertCoin", (roomName, col) => 
  {
    insertCoin(roomName, col, grids, rooms, socket, io);
  })

  socket.on("replay", roomName => 
  {
    let grid = grids.get(roomName);
    grid = createGrid();
    grids.set(roomName, grid);

    io.to(roomName).emit("restartGame");

    let room = rooms.get(roomName);

    io.to(room[0].id).emit("yourTurn", 0);
    io.to(room[1].id).emit("notYourTurn", 1);
  })
})