import displayGrid from "../grid/displayGrid.js";

export default function joinRoom(pseudo1, pseudo2, roomName) {
    const room = document.getElementById("room");
    const game = document.getElementById("game");

    room.style.display = "none";
    game.style.display = "block";

    const players = document.querySelectorAll(".player");
    const p1 = players[0].querySelector("p");

    p1.textContent = pseudo1;

    roomName = roomName;

    if(pseudo2 != null){
        console.log(pseudo1, pseudo2);
        const p2 = players[1].querySelector("p");   
        p2.textContent = pseudo2;
        p2.style.color = "#FFA500";

        displayGrid();
        return;
    }

    p1.style.color = "#FFA500";
}