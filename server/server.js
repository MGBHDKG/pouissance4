import fastify from 'fastify';

const app = fastify();

app.addHook('onRequest', (request, reply, done) => {
  // Autorisez l'origine spécifique (ou toutes les origines avec '*')
  reply.header('Access-Control-Allow-Origin', 'https://pouissance4.netlify.app');

  // Autorisez les méthodes HTTP spécifiques que vous utilisez (par exemple, GET, POST, PUT, DELETE)
  reply.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  // Autorisez les en-têtes HTTP spécifiques que vous utilisez
  reply.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // Activez les cookies (si nécessaire)
  reply.header('Access-Control-Allow-Credentials', 'true');

  // Si la méthode HTTP est OPTIONS, renvoyez une réponse vide
  if (request.method === 'OPTIONS') {
    reply.status(200).send('');
  } else {
    done();
  }
});

// Définissez vos routes et gestion Socket.IO ici
const io = new Server(server, {
  cors: {
    origin: 'https://pouissance4.netlify.app',
    credentials: true,
  },
});

let rooms = new Map();
let grids = new Map();

io.on("connection", (socket) => {
  // When a user joins a room
  socket.on("joinRoom", (roomName, pseudo) => {
    console.log(roomName, pseudo);

    if (rooms.has(roomName)) {
      secondPlayerJoin(roomName, pseudo, rooms, grids, socket, io);
      return;
    }

    rooms.set(roomName, [{ player: pseudo, id: socket.id, isHisTurn: true, color: "red" }]);

    socket.join(roomName);

    io.to(socket.id).emit("joinRoom", pseudo, null, roomName);
  });

  // When a user injects a coin
  socket.on("insertCoin", (roomName, col) => {
    insertCoin(roomName, col, grids, rooms, socket, io);
  });
});

const PORT = 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on port ${PORT}`);
});
