import express from "express";
import { userInfo, userUpdate } from "../controllers/user.controller";

const userRoutes = express.Router();

userRoutes.route("/auth").post(userInfo);
userRoutes.route("/update").put(userUpdate);

export default userRoutes;
