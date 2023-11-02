import express from "express";
import {
  deleteUserTeam,
  getTeamMember,
  getUser,
  userInfo,
  userUpdate,
} from "../controllers/user.controller";

const userRoutes = express.Router();

userRoutes.route("/auth").post(userInfo);
userRoutes.route("/update").put(userUpdate);
userRoutes.route("/delete-user-team").put(deleteUserTeam);
userRoutes.route("/get-user/:id").get(getUser);
userRoutes.route("/get-member/:name").get(getTeamMember);

export default userRoutes;
