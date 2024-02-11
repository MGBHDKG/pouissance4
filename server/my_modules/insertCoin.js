import checkWin from "./checkWin/checkWin.js";

export default function insertCoin(roomName, col, grids, rooms, socket, io)
{
    let room = rooms.get(roomName);
    let grid = grids.get(roomName);

    for(let i=0; i<2; i++)
    {
      if(room[i].id === socket.id && room[i].isHisTurn == true)
      {
        let otherPlayer = (i + 1) % 2
        
        for(let k=6; k>=0; k--)
        {
          if(grid[k][col] == 0)
          {
            grid[k][col] = i+1;

            io.to(roomName).emit("grid",k, col, room[i].color);

            if(checkWin(grid, i+1) == true)
            {
              setTimeout(() => {
                io.to(roomName).emit("win", room[i].player, i);
              }, 200);
              return;
            }

            room[otherPlayer].isHisTurn = false;
            room[otherPlayer].isHisTurn = true;

            rooms.set(roomName, room);
            grids.set(roomName, grid);

            io.to(socket.id).emit("notYourTurn", i);
            io.to(room[otherPlayer].id).emit("yourTurn", otherPlayer);

            return;
          }
        }
        //Erreur qd la colonne est pleine
        io.to(socket.id).emit("error", "Colonne pleine !");
        return;
      }
    }

    io.to(socket.id).emit("error", "Ce n'est pas à votre tour de jouer !");
}