import socket from "../joinSocket";

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

socket.on("joinRoom", (pseudo, roomName) => {
    const room = document.getElementById("room");
    const game = document.getElementById("game");

    room.style.display = "none";
    game.style.display = "block";

    const p = document.querySelector("#waitScreen p");
    p.textContent = pseudo;

    roomName = roomName;
});

socket.on("newPlayer", pseudo => {
    console.log(pseudo);
})