import socket from "./socket/joinSocket";

import displayNewPlayer from "./room/displayNewPlayer";
import tryJoinRoom from "./room/tryJoinRoom";
import joinRoom from "./room/joinRoom";
import disableButtons from "./grid/disableButtons";
import enableButtons from "./grid/enableButtons";

import previewCoin from "./grid/previewCoin";

const submitButton = document.getElementById("submit-button");
const insertCoinButtons = document.getElementsByClassName("buttonInsertCoins");
var roomName;

function error(msg) {
    const errorDialog = document.getElementsByClassName("error")[0];
    const text = document.querySelector('div.error > p:nth-child(2)');

    errorDialog.style.display = "flex";
    text.textContent = msg;

    setTimeout(() => {
        errorDialog.style.display = "none";
        text.textContent = "";
    }, 3000)
}

for(let i=0; i<7; i++){
    insertCoinButtons[i].addEventListener("mouseover", () => previewCoin());

    insertCoinButtons[i].addEventListener("click", () => {
        socket.emit("insertCoin", roomName, i);
    })
}

submitButton.addEventListener("click", () => tryJoinRoom());

socket.on("error", msg =>{
    error(msg);
});

socket.on("joinRoom", (pseudo1, pseudo2, room) => {
    roomName = room;
    joinRoom(pseudo1, pseudo2, roomName);
});

socket.on("newPlayer", (player) => displayNewPlayer(player));

socket.on("notYourTurn", () => disableButtons());
socket.on("yourTurn", () => enableButtons());

socket.on("grid", (grid) => console.log(grid));
