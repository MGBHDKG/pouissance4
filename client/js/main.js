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
import restartGame from "./game/restartGame";

const submitButton = document.getElementById("submit-button");
const insertCoinButtons = document.getElementsByClassName("buttonInsertCoins");
const replayButton = document.getElementById("replay");
var roomName;
var points = [];
points.push(0);
points.push(0); 

for(let i=0; i<7; i++){
    insertCoinButtons[i].addEventListener("mouseover", () => previewCoin(insertCoinButtons[i]));

    insertCoinButtons[i].addEventListener("mouseleave", () => cancelPreview(insertCoinButtons[i]));

    insertCoinButtons[i].addEventListener("click", () => {
        socket.emit("insertCoin", roomName, i);
    })
}

submitButton.addEventListener("click", () => tryJoinRoom());

replayButton.addEventListener("click", () => {
    socket.emit("replay", roomName);
})

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

socket.on("grid", (coinPositionY, coinPositionX, color) => {
    drawCoin(coinPositionX, coinPositionY, color);
});

socket.on("win", (pseudo, indexWinner) =>
{
    const endGameDiv = document.getElementById("winScreen");
    const text = document.querySelector("h3");
    const pointsText = document.querySelectorAll("h4");

    text.innerText = `${pseudo} a gagné la partie !`
    endGameDiv.style.display = "flex";

    points[indexWinner]++;
    pointsText[0].innerText = `Points: ${points[0]}`;
    pointsText[1].innerText = `Points: ${points[1]}`;
});

socket.on("restartGame", () =>
{
    restartGame();
})

socket.on("disconnection", () => 
{
    location.reload();
})
