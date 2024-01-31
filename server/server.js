import fastify from 'fastify';
import { Server } from "socket.io";
import { createServer } from 'http';
import fastifyCors from '@fastify/cors';

import insertCoin from "./my_modules/insertCoin.js";
import secondPlayerJoin from "./my_modules/secondPlayerJoin.js";

const app = fastify();

const corsParam = {
  origin: ["http://localhost:8080", "https://pouissance4.netlify.app"],
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}

await app.register(fastifyCors, corsParam);

app.get('/test', async (req, rep) => {
  return "hello world";
})

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: corsParam
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

const PORT = 3000;

httpServer.listen(PORT, () => 
{
  console.log(`Server is running on port ${PORT}`);
});
