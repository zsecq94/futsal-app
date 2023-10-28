import { Request, Response } from "express";
import Match from "../models/match-model";
import MatchDate from "../models/matchdate.model";

export const createMatch = async (req: Request, res: Response) => {
  try {
    const { team, place, date, time, level, todayTime } = req.body;

    await Match.create({
      id: date + todayTime + team,
      team1: team,
      place,
      level,
      date,
      time,
      state: false,
    });

    const fillGapsInTimes = (dates: number[][]) => {
      let filledDates: number[][] = [];
      for (let i = 0; i < dates.length - 1; i += 2) {
        let start = dates[i][0];
        let end = dates[i + 1][1];

        for (let j = start; j < end; j += 0.5) {
          filledDates.push([j, j + 0.5]);
        }
      }

      return filledDates;
    };
    const newDateList = fillGapsInTimes(time);

    await MatchDate.findOneAndUpdate(
      { id: date },
      {
        $push: { [`${place}.times`]: { $each: newDateList } },
        $inc: { [`${place}.count`]: 1 },
      },
      { upsert: true, new: true }
    );

    return res.status(201).send({ message: "신청 완료" });
  } catch (error) {
    console.log("error in createMatch", error);
    throw error;
  }
};

export const getFalseMatch = async (req: Request, res: Response) => {
  try {
    const response = await Match.find({
      state: false,
    });
    return res.send({ response });
  } catch (error) {
    console.log("error in getFalseMatch", error);
    throw error;
  }
};

export const getTodayDate = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const response = await MatchDate.findOne({
      id,
    });
    if (response) {
      return res.send([response.A, response.B, response.C]);
    } else {
      return res.send([]);
    }
  } catch (error) {
    console.log("error in getTodayDate", error);
    throw error;
  }
};

export const getOnePlaceData = async (req: Request, res: Response) => {
  const { id, name } = req.body;
  try {
    const response = await MatchDate.findOne({
      id,
    });
    if (response) {
      return res.send(response[name].times);
    } else {
      return res.send([]);
    }
  } catch (error) {
    console.log("error in getOnePlaceData", error);
    throw error;
  }
};
