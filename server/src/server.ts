import express from "express";
import http from "http";
import connectToDatabase from "./db";
import matchRoutes from "./routes/match.routes";
import teamRoutes from "./routes/team.routes";
import userRoutes from "./routes/user.routes";
import { initializeSocketIo } from "./socket";

const app = express();
app.use(express.json());
const PORT = 1337;

// 데이터베이스 연결
connectToDatabase();

app.use("/users", userRoutes);
app.use("/matchs", matchRoutes);
app.use("/teams", teamRoutes);

// HTTP 서버 생성
const server = http.createServer(app);
initializeSocketIo(server);

// 변경된 부분: app.listen -> server.listen
server.listen(PORT, () => {
  console.log("Server up and running on port ", PORT);
});
