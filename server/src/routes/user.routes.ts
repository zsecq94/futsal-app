import express from "express";
import { getUser, userInfo, userUpdate } from "../controllers/user.controller";

const userRoutes = express.Router();

userRoutes.route("/auth").post(userInfo);
userRoutes.route("/update").put(userUpdate);
userRoutes.route("/get-user/:id").get(getUser);

export default userRoutes;
