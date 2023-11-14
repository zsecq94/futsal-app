import express from "express";
import {
  createMercenary,
  getOneDayMercenaryData,
} from "../controllers/mercenary.controller";

const mercenaryRoutes = express.Router();

mercenaryRoutes.route("/get-one-day/:date").get(getOneDayMercenaryData);
mercenaryRoutes.route("/create").post(createMercenary);

export default mercenaryRoutes;
