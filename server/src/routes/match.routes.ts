import express from "express";
import { createMatch, getFalseMatch } from "../controllers/match.controller";

const matchRoutes = express.Router();

matchRoutes.route("/sign").post(createMatch);
matchRoutes.route("/getfalsematch").get(getFalseMatch);

export default matchRoutes;
