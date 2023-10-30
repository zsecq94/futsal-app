import { Request, Response } from "express";
import Team from "../models/team-model";

export const createTeam = async (req: Request, res: Response) => {
  try {
    const { name, img, level } = req.body.teamData;
    const leader = req.body.user.name;

    const teamData = await Team.findOne({
      name,
    });
    if (teamData) {
      return res.send({
        message: "이미 존재하는 팀 이름입니다.",
        state: false,
      });
    } else {
      await Team.create({
        name,
        img,
        level,
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

export const updateApplyTeam = async (req: Request, res: Response) => {
  try {
    const { user, team, state } = req.body;
    if (state) {
      const {} = req.body;
      if (user.team === null) {
        const teamData = await Team.findOne({ name: team.name });
        if (teamData) {
          const alreadyApplied = teamData.apply.some(
            (applicant) => applicant.id === user.id
          );
          if (alreadyApplied) {
            return res.send({
              message: "이미 신청했습니다!",
              state: false,
            });
          } else {
            teamData.apply.push({
              name: user.name,
              id: user.id,
              thumb: user.thumb,
            });
            await teamData.save();
          }
        }
        return res.send({ message: "팀 신청 완료", state: true });
      } else {
        return res.send({
          message: "이미 팀이 있습니다 어플을 재시작 해주세요!",
          state: false,
        });
      }
    } else {
      const teamData = await Team.findOne({ name: team.name });
      if (teamData) {
        const updatedApply = teamData.apply.filter(
          (applicant) => applicant.id !== user
        );

        teamData.apply = updatedApply;
        await teamData.save();
      }
    }
  } catch (error) {
    console.log("error in createApplyTeam", error);
    throw error;
  }
};

export const getTeamData = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const teamData = await Team.findOne({ name });
    return res.send(teamData);
  } catch (error) {
    console.log("error in getTeamData", error);
    throw error;
  }
};
