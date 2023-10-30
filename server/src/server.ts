import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectToDatabase from "./db";
import matchRoutes from "./routes/match.routes";
import teamRoutes from "./routes/team.routes";
import userRoutes from "./routes/user.routes";

const app = express();
app.use(express.json());
const PORT = 1337;

// HTTP 서버 생성
const server = http.createServer(app);

// Socket.IO 서버 생성
const io = new Server(server);

// 데이터베이스 연결
connectToDatabase();

app.use("/users", userRoutes);
app.use("/matchs", matchRoutes);
app.use("/teams", teamRoutes);

// Socket.IO 이벤트 핸들러
io.on("connection", (socket) => {
  console.log("유저 연결");
  console.log("Connected users: ", io.engine.clientsCount);

  socket.on("USER_ONLINE", (user) => {
    console.log("Online User: ", user);
    io.emit("message", user);
  });

  socket.on("disconnect", () => {
    console.log("유저 연결해제");
    console.log("Connected users: ", io.engine.clientsCount);
  });
});

// 변경된 부분: app.listen -> server.listen
server.listen(PORT, () => {
  console.log("Server up and running on port ", PORT);
});
