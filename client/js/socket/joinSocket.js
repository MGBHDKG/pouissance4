import { io } from "socket.io-client";

const socket = io("https://pouissance4-production.up.railway.app:3000");

export default socket;