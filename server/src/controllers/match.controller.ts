import { Request, Response } from "express";
import Match from "../models/match-model";

export const createMatch = async (req: Request, res: Response) => {
  try {
    const { team, place, date, time, level } = req.body;
    const matchCreate = await Match.create({
      id: new Date().toISOString() + team,
      team1: team,
      place,
      level,
      date: {
        date,
        time,
      },
      state: false,
    });
    return res.status(201).send({ message: "신청 완료" });
  } catch (error) {
    console.log("error in createUser", error);
    throw error;
  }
};

export const getFalseMatch = async (req: Request, res: Response) => {
  try {
    const response = await Match.find({
      state: false,
    });
    return res.status(201).send({ response });
  } catch (error) {
    console.log("error in createUser", error);
    throw error;
  }
};
