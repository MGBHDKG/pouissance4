import { Server } from 'socket.io';
import express from "express";
import cors from "cors";

import insertCoin from "./my_modules/insertCoin.js";
import secondPlayerJoin from "./my_modules/secondPlayerJoin.js";

const app = express();
app.use(cors());

const corsParams = {
  origin: 'https://pouissance4.netlify.app',
  methods: ['GET','POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

const server = app.listen(3000, () => {
  console.log("Le serveur est lancé !")
});

app.get("/", (req, res) =>{
  res.send("Serveur fonctionnel !")
})

const io = new Server(server, {
  cors: corsParams
});

let rooms = new Map();
let grids = new Map();

io.on("connection", (socket) => 
{
  // When a user joins a room
  socket.on("joinRoom", (roomName, pseudo) => 
  {
    console.log(roomName, pseudo);

    if (rooms.has(roomName)) 
    {
      secondPlayerJoin(roomName, pseudo, rooms, grids, socket, io);
      return;
    }

    rooms.set(roomName, [{ player: pseudo, id: socket.id, isHisTurn: true, color: "red" }]);

    socket.join(roomName);

    io.to(socket.id).emit("joinRoom", pseudo, null, roomName);
  });

  // When a user injects a coin
  socket.on("insertCoin", (roomName, col) => 
  {
    insertCoin(roomName, col, grids, rooms, socket, io);
  });
});