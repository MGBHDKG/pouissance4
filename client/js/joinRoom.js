import io from "socket.io-client";

const socket = io();

socket.emit("msg", "hello world");

const button = document.getElementById("submit-button");

button.addEventListener("click", () => {
    const roomName = document.getElementById("roomName").value;
    const pseudo = document.getElementById("pseudo").value;

    //A faire cote serveur

    if(roomName === ""){
        console.log("Veuillez entrer un nom de room !");
        return;
    }

    if(roomName.length > 5){
        console.log("Nom de room trop long !");
        return;
    }

    if(pseudo === ""){
        console.log("Veuillez entrer un pseudo !");
        return;
    }

    if(pseudo.length > 5)
    {
        console.log("Pseudo trop long !");
        return;
    }
});