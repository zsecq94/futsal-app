import { Request, Response } from "express";
import Team from "../models/team-model";

export const createTeam = async (req: Request, res: Response) => {
  try {
    const { teamName, teamImg, teamLevel } = req.body.teamData;
    const leader = req.body.leader;

    const teamData = await Team.findOne({
      teamName,
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
