import { BASE_URL } from "@/services/config";
import { createContext } from "react";
import io from "socket.io-client";

let socket: any;

export const getSocket = () => {
  if (!socket) {
    socket = io(BASE_URL);
  }
  return socket;
};

export const SocketContext = createContext(getSocket());
