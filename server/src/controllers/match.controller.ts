import { Request, Response } from "express";
import Match from "../models/match-model";
import MatchData from "../models/matchdata.model";
import { Mutex } from "async-mutex";
import { getSocketIo } from "../socket";

const mutex = new Mutex();

export const createMatch = async (req: Request, res: Response) => {
  const release = await mutex.acquire();
  const socket = getSocketIo();
  try {
    const { team, place, date, time, level, todayTime } = req.body;

    const matchData = await MatchData.findOne({ id: date });

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

    // 배열 비교 함수
    const arrayEquals = (a: any, b: any) => {
      return (
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
      );
    };

    // time의 원소가 matchData[place].times에 존재하는지 확인
    if (
      matchData &&
      newDateList.some((newTime) =>
        matchData[place].times.some((time: any) => arrayEquals(time, newTime))
      )
    ) {
      release();

      return res
        .status(201)
        .send({ message: "해당 시간대는 이미 신청되었습니다." });
    } else {
      await MatchData.findOneAndUpdate(
        { id: date },
        {
          $push: { [`${place}.times`]: { $each: newDateList } },
          $inc: { [`${place}.count`]: 1 },
        },
        { upsert: true, new: true }
      );
      release();
    }

    await Match.create({
      id: date + todayTime + team,
      team1: team,
      place,
      level,
      date,
      time,
      state: false,
    });
    socket.emit("create-match");
    return res.status(201).send({ message: "신청 완료" });
  } catch (error) {
    console.log("error in createMatch", error);
    throw error;
  }
};

export const getFalseMatch = async (req: Request, res: Response) => {
  try {
    const { date } = req.params;
    const response = await Match.find({
      date,
      state: false,
    });
    if (response) {
      return res.send(response);
    } else {
      return res.send([]);
    }
  } catch (error) {
    console.log("error in getFalseMatch", error);
    throw error;
  }
};

export const getTodayDate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await MatchData.findOne({
      id,
    });
    if (response) {
      return res.send([response.A, response.B, response.C]);
    } else {
      return res.send([[], [], []]);
    }
  } catch (error) {
    console.log("error in getTodayDate", error);
    throw error;
  }
};

export const getOnePlaceData = async (req: Request, res: Response) => {
  const { id, name } = req.params;
  try {
    const response = await MatchData.findOne({
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
