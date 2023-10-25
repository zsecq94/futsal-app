import express from "express";
import {
  createMatch,
  getFalseMatch,
  getTodayDate,
} from "../controllers/match.controller";

const matchRoutes = express.Router();

matchRoutes.route("/sign").post(createMatch);
matchRoutes.route("/gettodaydate").post(getTodayDate);
matchRoutes.route("/getfalsematch").get(getFalseMatch);

export default matchRoutes;
