// src/socket.ts
import { io, Socket } from "socket.io-client";
import { BASE_URL } from "./api/constants";

const SOCKET_URL = BASE_URL; // ⚡ change to your backend URL

export const socket: Socket = io(SOCKET_URL, {
  autoConnect: false, // we control when it connects
  transports: ["websocket"], // enforce websocket
});
