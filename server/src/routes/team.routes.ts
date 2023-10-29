import express from "express";
import { createTeam, getAllTeam } from "../controllers/team.controller";

const teamRoutes = express.Router();

teamRoutes.route("/create").post(createTeam);
teamRoutes.route("/getallteam").get(getAllTeam);

export default teamRoutes;
