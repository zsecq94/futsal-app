import { Server } from "socket.io";

let io;
let connectedClients = 0;

export const initializeSocketIo = (server: any) => {
  io = new Server(server);

  io.on("connection", (socket: any) => {
    connectedClients++;
    console.log("Connected : ", connectedClients);

    socket.on("disconnect", () => {
      connectedClients--;
      console.log("Disconnect : ", connectedClients);
    });
  });
};

export const getSocketIo = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized!");
  } else {
    return io;
  }
};
