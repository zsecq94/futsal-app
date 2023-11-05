import express from "express";
import {
  createMatch,
  getFalseMatch,
  getOnePlaceData,
  getTodayDate,
} from "../controllers/match.controller";

const matchRoutes = express.Router();

matchRoutes.route("/sign").post(createMatch);
matchRoutes.route("/get-today-date/:id").get(getTodayDate);
matchRoutes.route("/get-one-place/:id/:name").get(getOnePlaceData);
matchRoutes.route("/get-false-match/:date").get(getFalseMatch);

export default matchRoutes;
