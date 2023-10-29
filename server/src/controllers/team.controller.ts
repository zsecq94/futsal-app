import { Request, Response } from "express";
import Team from "../models/team-model";
import TeamData from "../models/teamdata.model";

export const createTeam = async (req: Request, res: Response) => {
  try {
    const { teamName, teamImg, teamLevel } = req.body.teamData;
    const leader = req.body.leader;

    const teamData = await Team.findOne({
      teamName,
    });

    await TeamData.create({
      name: teamName,
    });

    if (teamData) {
      return res.send({
        message: "이미 존재하는 팀 이름입니다.",
        state: false,
      });
    } else {
      await Team.create({
        teamName,
        teamImg,
        teamLevel,
        leader: leader,
        score: 1500,
        win: 0,
        draw: 0,
        lose: 0,
        count: 1,
      });
    }

    return res.send({ message: "팀 생성 완료", state: true });
  } catch (error) {
    console.log("error in createTeam", error);
    throw error;
  }
};

export const getAllTeam = async (req: Request, res: Response) => {
  try {
    const teamData = await Team.find();
    if (teamData) {
      return res.send(teamData);
    } else {
      return res.send([]);
    }
  } catch (error) {
    console.log("error in getAllTeam", error);
    throw error;
  }
};

export const createApplyTeam = async (req: Request, res: Response) => {
  try {
    const { user, team } = req.body;

    if (user.team === null) {
      const check = await TeamData.findOne({ name: team.teamName });
      if (check) {
        if (check.apply.includes(user.id)) {
          return res.send({ message: "이미 신청했습니다", state: false });
        }
        await TeamData.updateOne(
          { name: team.teamName },
          { $push: { apply: user.id } }
        );
      } else {
        await TeamData.create({
          name: team.teamName,
          apply: [user.id],
        });
      }
      return res.send({ message: "팀 신청 완료", state: true });
    } else {
      return res.send({
        message: "이미 팀이 있습니다 어플을 재시작 해주세요!",
        state: false,
      });
    }
  } catch (error) {
    console.log("error in createApplyTeam", error);
    throw error;
  }
};

export const getApplyData = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const teamData = await TeamData.findOne({ name });
    return res.send({ teamData });
  } catch (error) {
    console.log("error in getApplyData", error);
    throw error;
  }
};

export const updateApplyData = async (req: Request, res: Response) => {
  try {
    const { id, team } = req.body;
    const teamData = await TeamData.findOne({ name: team });
    const newApplyArray = teamData.apply.filter((applyId) => applyId !== id);

    await TeamData.updateOne(
      { name: team },
      { $set: { apply: newApplyArray } }
    );
    return res.send({ message: "수정 완료", state: true });
  } catch (error) {
    console.log("error in updateApplyData", error);
    throw error;
  }
};
