import express from "express";
import {
  createMatch,
  getFalseMatch,
  getTodayCount,
} from "../controllers/match.controller";

const matchRoutes = express.Router();

matchRoutes.route("/sign").post(createMatch);
matchRoutes.route("/getdate").post(getTodayCount);
matchRoutes.route("/getfalsematch").get(getFalseMatch);

export default matchRoutes;
