import express from "express";
import {
  changeTeamLeader,
  createTeam,
  deleteTeamManager,
  getAllTeam,
  getTeamData,
  updateApplyTeam,
  updateTeamManager,
} from "../controllers/team.controller";

const teamRoutes = express.Router();

teamRoutes.route("/get-all-team").get(getAllTeam);
teamRoutes.route("/get-team/:name").get(getTeamData);
teamRoutes.route("/create").post(createTeam);
teamRoutes.route("/update-team-apply").put(updateApplyTeam);
teamRoutes.route("/update-team-manager").put(updateTeamManager);
teamRoutes.route("/delete-team-manager").put(deleteTeamManager);
teamRoutes.route("/change-team-leader").put(changeTeamLeader);

export default teamRoutes;
