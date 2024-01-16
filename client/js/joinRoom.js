import socket from "../joinSocket";
import drawGrid from "./gameGrid";

const button = document.getElementById("submit-button");
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

function displayGrid(){
    const waitScreen = document.getElementById("waitScreen");
    const canva = document.querySelector("canvas");
    const yellowCoin = document.getElementsByClassName("cercle");
    const buttonDiv = document.getElementById("insertCoinButtons");

    waitScreen.style.display = "none";
    canva.style.display = "block";
    buttonDiv.style.display = "block";
    yellowCoin[1].style.display = "block";

    drawGrid();
}

button.addEventListener("click", () => {
    const roomName = document.getElementById("roomName").value;
    const pseudo = document.getElementById("pseudo").value;

    if(pseudo == "" ){
        error("Veuillez entrer un pseudo !");
        return;
    }

    if(pseudo.length > 10 ){
        error("Pseudo trop long !");
        return;
    }

    if(roomName == "" ){
        error("Veuillez entrer un nom de room !");
        return;
    }

    if(roomName.length > 30 ){
        error("Nom de room trop long !");
        return;
    }

    socket.emit("joinRoom", roomName, pseudo);
});

socket.on("error", msg =>{
    error(msg);
});

socket.on("joinRoom", (pseudo1, pseudo2, roomName) => {
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

        displayGrid();
    }
});

socket.on("newPlayer", pseudo => {
    const players = document.querySelectorAll(".player");
    const p1 = players[1].querySelector("p");

    p1.textContent = pseudo;

    displayGrid();
})
