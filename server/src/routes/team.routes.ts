import express from "express";
import {
  createApplyTeam,
  createTeam,
  getAllTeam,
  getApplyData,
  updateApplyData,
} from "../controllers/team.controller";

const teamRoutes = express.Router();

teamRoutes.route("/getallteam").get(getAllTeam);
teamRoutes.route("/create").post(createTeam);
teamRoutes.route("/createteamdata").post(createApplyTeam);
teamRoutes.route("/updataapply").put(updateApplyData);
teamRoutes.route("/getapplydata").post(getApplyData);

export default teamRoutes;
