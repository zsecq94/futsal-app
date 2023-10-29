import express from "express";
import connectToDatabase from "./db";
import matchRoutes from "./routes/match.routes";
import teamRoutes from "./routes/team.routes";
import userRoutes from "./routes/user.routes";

const app = express();
app.use(express.json());
const PORT = 1337;
connectToDatabase();

app.use("/users", userRoutes);
app.use("/matchs", matchRoutes);
app.use("/teams", teamRoutes);

app.listen(PORT, () => {
  console.log("Server up and running");
});
