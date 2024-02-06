import socket from "./socket/joinSocket.js";

import displayNewPlayer from "./room/displayNewPlayer.js";
import tryJoinRoom from "./room/tryJoinRoom.js";
import joinRoom from "./room/joinRoom.js";
import disableButtons from "./grid/disableButtons.js";
import enableButtons from "./grid/enableButtons.js";

import error from "./error/error.js";

import previewCoin from "./grid/previewCoin.js";
import cancelPreview from "./grid/cancelPreview.js";
import drawCoin from "./grid/drawCoin.js";

const submitButton = document.getElementById("submit-button");
const insertCoinButtons = document.getElementsByClassName("buttonInsertCoins");
var roomName;

for(let i=0; i<7; i++){
    insertCoinButtons[i].addEventListener("mouseover", () => previewCoin(insertCoinButtons[i]));

    insertCoinButtons[i].addEventListener("mouseleave", () => cancelPreview(insertCoinButtons[i]));

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

socket.on("grid", (grid, coinPositionY, coinPositionX, color) => {
    console.log(grid, coinPositionX, coinPositionY, color);
    drawCoin(coinPositionX, coinPositionY, color);
});

socket.on("win", (pseudo) => alert(pseudo + " a gagné la partie !"));
