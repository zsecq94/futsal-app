import { Server } from "socket.io";

let io;

export const initializeSocketIo = (server: any) => {
  io = new Server(server);

  io.on("connection", (socket: any) => {
    console.log("Connected users: ", io.engine.clientsCount);

    socket.on("disconnect", () => {
      console.log("Connected users: ", io.engine.clientsCount);
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
