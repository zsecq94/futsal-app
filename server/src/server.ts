import express, { Request, Response } from "express";
import connectToDatabase from "./db";
import userRoutes from "./routes/user.routes";

const app = express();
app.use(express.json());
const PORT = 1337;
connectToDatabase();

app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log("Server up and running");
});
