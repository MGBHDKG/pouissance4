import socket from "../socket/joinSocket";

export default function tryJoinRoom(){
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
}