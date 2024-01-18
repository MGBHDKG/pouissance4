import socket from "./socket/joinSocket";

import displayNewPlayer from "./room/displayNewPlayer";
import tryJoinRoom from "./room/tryJoinRoom";
import joinRoom from "./room/joinRoom";

import previewCoin from "./grid/previewCoin";

const submitButton = document.getElementById("submit-button");
const insertCoinButtons = document.getElementsByClassName("buttonInsertCoins");
let roomName;

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

for(const button of insertCoinButtons){
    button.addEventListener("mouseover", () => previewCoin());
}

submitButton.addEventListener("click", () => tryJoinRoom());

socket.on("error", msg =>{
    error(msg);
});

socket.on("joinRoom", (pseudo1, pseudo2, roomName) => joinRoom(pseudo1, pseudo2, roomName));

socket.on("newPlayer", (player) => displayNewPlayer(player))
