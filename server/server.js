import { Server } from 'socket.io';
import express from "express";
import cors from "cors";

import insertCoin from "./my_modules/insertCoin.js";
import secondPlayerJoin from "./my_modules/secondPlayerJoin.js";

const app = express();

app.use(cors());

const corsParams = {
  origin: '*',
  methods: ['GET','POST'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
  exposedHeader: ['Authorization', 'Access-Control-Allow-Origin'],
  credentials: true,
};

const server = app.listen(3000, () => {
  console.log("Le serveur est lancé !")
});

app.get("/", (req, res) =>{
  res.send("Serveur fonctionnel !")
})

// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

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