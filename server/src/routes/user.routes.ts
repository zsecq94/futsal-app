import express from "express";
import { userInfo } from "../controllers/user.controller";

const userRoutes = express.Router();

userRoutes.route("/auth").post(userInfo);

export default userRoutes;
