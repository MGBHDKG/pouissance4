import { io } from "socket.io-client";

const socket = io("https://pouissance4-production.up.railway.app/");

export default socket;