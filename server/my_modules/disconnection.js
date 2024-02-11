export default function disconnection(socket, io, rooms)
{
    var roomName;
    for (let [key, value] of rooms.entries())
    {
      for (let obj of value) 
      {
        if (obj.id === socket.id)
        {
          roomName = key;
          break;
        }
      }
    }

    if(roomName === undefined) return;

    io.to(roomName).emit("error", "Votre adversaire s'est déconnecté de la room, vous allez être déconnecté");
    setTimeout(() => 
    {
      io.to(roomName).emit("disconnection");
    }, 3000)

    rooms.delete(roomName);
}