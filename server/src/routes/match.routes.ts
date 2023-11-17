import express from "express";
import {
  createMatch,
  getFalseMatch,
  getOnePlaceData,
  getTeamMatchData,
  getTodayDate,
  updateMatchState,
} from "../controllers/match.controller";

const matchRoutes = express.Router();

matchRoutes.route("/sign").post(createMatch);
matchRoutes.route("/get-today-date/:id").get(getTodayDate);
matchRoutes.route("/get-one-place/:id/:name").get(getOnePlaceData);
matchRoutes.route("/get-false-match/:date").get(getFalseMatch);
matchRoutes.route("/get-team-match-data/:name/:date").get(getTeamMatchData);
matchRoutes.route("/update-match-state").put(updateMatchState);

export default matchRoutes;
