import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const button = document.getElementById("submit-button");

export default socket;