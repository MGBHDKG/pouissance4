import createGrid from "./createGrid.js";

export default function secondPlayerJoin(roomName, pseudo, rooms, grids, socket, io)
{
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
}