import { Request, Response } from "express";
import Match from "../models/match-model";
import MatchDate from "../models/matchdate.model";

export const createMatch = async (req: Request, res: Response) => {
  try {
    const { team, place, date, time, level } = req.body;
    await Match.create({
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

    // timeBarPreview를 위해 새로운 시간 배열 생성
    const [startTime, endTime] = time;
    let newTime = [];
    for (let t = startTime; t <= endTime - 0.5; t += 0.5) {
      newTime.push(t);
    }

    const today = await MatchDate.findOne({
      id: place + date,
    });
    if (today) {
      await MatchDate.updateOne(
        {
          id: place + date,
        },
        {
          $push: {
            times: {
              $each: newTime,
            },
          },
          $inc: {
            count: 1,
          },
        }
      );
    } else {
      await MatchDate.create({
        id: place + date,
        times: newTime,
        count: 1,
      });
    }

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

export const getTodayCount = async (req: Request, res: Response) => {
  const checkNum = 23.5;
  try {
    const { todayDate } = req.body;

    const responseA = await MatchDate.findOne({
      id: `A${todayDate}`,
    });

    const responseB = await MatchDate.findOne({
      id: `B${todayDate}`,
    });
    const responseC = await MatchDate.findOne({
      id: `C${todayDate}`,
    });

    const add24IfNecessary = (response: any) => {
      if (response.times.includes(checkNum)) {
        response.times.push(24);
      }
    };

    add24IfNecessary(responseA);
    add24IfNecessary(responseB);
    add24IfNecessary(responseC);

    const response = [responseA, responseB, responseC];
    return res.status(201).send(response);
  } catch (error) {
    console.log("error in createUser", error);
    throw error;
  }
};
