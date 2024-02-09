import socket from "./socket/joinSocket";

import displayNewPlayer from "./room/displayNewPlayer";
import tryJoinRoom from "./room/tryJoinRoom";
import joinRoom from "./room/joinRoom";
import disableButtons from "./grid/disableButtons";
import enableButtons from "./grid/enableButtons";

import error from "./error/error";

import previewCoin from "./grid/previewCoin";
import cancelPreview from "./grid/cancelPreview";
import drawCoin from "./grid/drawCoin";

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

socket.on("notYourTurn", (i) => disableButtons(i));
socket.on("yourTurn", (i) => enableButtons(i));

socket.on("grid", (grid, coinPositionY, coinPositionX, color) => {
    drawCoin(coinPositionX, coinPositionY, color);
});

socket.on("win", (pseudo) =>
{
    const endGameDiv = document.getElementById("winScreen");
    const text = document.querySelector("h3");
    text.innerText = `${pseudo} a gagné la partie !`
    endGameDiv.style.display = "flex";
});
