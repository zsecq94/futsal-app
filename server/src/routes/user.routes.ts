import express from "express";
import {
  getApplyUser,
  userInfo,
  userTeamUpdate,
  userUpdate,
} from "../controllers/user.controller";

const userRoutes = express.Router();

userRoutes.route("/auth").post(userInfo);
userRoutes.route("/getapplyuser").post(getApplyUser);
userRoutes.route("/update").put(userUpdate);
userRoutes.route("/teamupdate").put(userTeamUpdate);

export default userRoutes;
