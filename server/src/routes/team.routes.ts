import express from "express";
import {
  createTeam,
  getAllTeam,
  getTeamData,
  updateApplyTeam,
} from "../controllers/team.controller";

const teamRoutes = express.Router();

teamRoutes.route("/get-all-team").get(getAllTeam);
teamRoutes.route("/get-team/:name").get(getTeamData);
teamRoutes.route("/create").post(createTeam);
teamRoutes.route("/update-team-apply").put(updateApplyTeam);

export default teamRoutes;
