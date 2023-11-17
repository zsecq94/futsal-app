import { Request, Response } from "express";
import Match from "../models/match-model";
import MatchData from "../models/matchdata-model";
import { Mutex } from "async-mutex";
import { getSocketIo } from "../socket";
import mongoose from "mongoose";

const mutex = new Mutex();

// 겹치는 매치 찾기
const findOverlappingMatches = async (date, place, time, state) => {
  if (!state) return [];
  const start = time[0][0];
  const end = time[1][1];
  const matches = await Match.find({ date, place, state: false });

  return matches.filter((match) => {
    const matchStart = Math.min(...match.time[0]);
    const matchEnd = Math.max(...match.time[1]);
    return start < matchEnd && matchStart < end;
  });
};

// 겹치는 시간 제거
const removeOverlappingTimes = (matchData, place, overlaps) => {
  for (let match of overlaps) {
    const newTime = fillGapsInTimes(match.time, match.state);
    matchData[place].times = matchData[place].times.filter((time) => {
      return !newTime.some((newTimeItem) => newTimeItem[0] === time[0]);
    });
  }
  return matchData;
};

// 시간 채우기
const fillGapsInTimes = (times, state) => {
  let filledTimes = [];
  for (let i = 0; i < times.length - 1; i += 2) {
    let start = times[i][0];
    let end = times[i + 1][1];
    for (let j = start; j < end; j += 0.5) {
      filledTimes.push([j, j + 0.5, state]);
    }
  }
  return filledTimes;
};

export const createMatch = async (req: Request, res: Response) => {
  const socket = getSocketIo();
  const release = await mutex.acquire();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { team, place, date, time, level, state } = req.body;
    // 오늘 이미 신청한 기록이 있을때
    // const existingMatch = await Match.findOne({
    //   team1: team,
    //   date,
    //   state: false,
    // });
    // if (existingMatch) {
    //   return res.send({
    //     message: "오늘 이미 매치를 신청하셨습니다.",
    //     state: false,
    //     type: "error",
    //   });
    // }

    const newDateList = fillGapsInTimes(time, state);
    let matchData = await MatchData.findOne({ id: date });

    const overlaps = await findOverlappingMatches(date, place, time, state);
    const overlapCount = overlaps.length;

    if (overlapCount > 0) {
      matchData = removeOverlappingTimes(matchData, place, overlaps);
      // 이 부분에 삭제된 매치의 팀에 실시간 알림 필요
      await matchData.save();
      await Match.updateMany({ _id: { $in: overlaps } }, { state: true });
    }
    if (matchData) {
      const existingTimes = matchData[place].times;
      if (
        newDateList.some((newTime) =>
          existingTimes.some((time) => time[0] === newTime[0])
        )
      ) {
        return res.send({
          message: "해당 시간대는 이미 신청되었습니다.",
          state: false,
          type: "error",
        });
      }
    }

    await MatchData.findOneAndUpdate(
      { id: date },
      {
        $push: { [`${place}.times`]: { $each: newDateList } },
        $inc: { [`${place}.count`]: 1 - overlapCount },
      },
      { upsert: true, new: true, session }
    );

    await Match.create(
      [
        {
          team1: team,
          place,
          level: state ? "예약" : level,
          date,
          time,
          state,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    socket.emit("update-match");
    socket.emit(`${team}-match-data-update`);
    socket.emit("timepicker-update");

    return res.send({ message: "신청 완료", state: true, type: "success" });
  } catch (error) {
    console.log("error in createMatch", error);
    await session.abortTransaction();
    return res
      .status(500)
      .send({ message: error.message, state: false, type: "error" });
  } finally {
    session.endSession();
    release();
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

// 매치 데이터 업데이트
const updateMatchDataTimes = async (teamData) => {
  const matchData = await MatchData.findOne({ id: teamData.date });
  if (matchData) {
    matchData[teamData.place].times = matchData[teamData.place].times.map(
      (time) => {
        if (teamData.time[0][0] <= time[0] && time[0] <= teamData.time[1][0]) {
          return [time[0], time[1], true];
        } else {
          return time;
        }
      }
    );
    await matchData.save();
  }
};

export const updateMatchState = async (req: Request, res: Response) => {
  const socket = getSocketIo();
  const release = await mutex.acquire();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id, team2 } = req.body;

    const existingMatch = await Match.findOne({ _id: id });

    if (existingMatch && existingMatch.state) {
      return res.send({ message: "이미 성사된 매칭입니다!", state: false });
    }

    const teamData = await Match.findOneAndUpdate(
      { _id: id },
      { state: true, team2 },
      { new: true, session }
    );

    await updateMatchDataTimes(teamData);

    await session.commitTransaction();

    socket.emit("update-match");
    socket.emit("timepicker-update");

    return res.send({ message: "매칭이 성사되었습니다!", state: true });
  } catch (error) {
    console.log("error in updateMatchState", error);
    await session.abortTransaction();
    return res.status(500).send({ message: error.message, state: false });
  } finally {
    session.endSession();
    release();
  }
};

export const getTeamMatchData = async (req: Request, res: Response) => {
  try {
    const { name, date } = req.params;
    const newDate = new Date(date);
    const matchData = await Match.find({
      $or: [{ team1: name }, { team2: name }],
      date: { $gte: newDate },
    });
    return res.send(matchData);
  } catch (error) {
    console.log("error in getTeamMatchData", error);
    throw error;
  }
};
