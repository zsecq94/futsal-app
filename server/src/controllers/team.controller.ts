import { Request, Response } from "express";
import Team from "../models/team-model";
import { getSocketIo } from "../socket";

export const createTeam = async (req: Request, res: Response) => {
  const socket = getSocketIo();
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
        score: 0,
        win: 0,
        draw: 0,
        lose: 0,
        count: 1,
      });
    }
    socket.emit("team-list-update");
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
  const socket = getSocketIo();
  try {
    const { user, team, state, count } = req.body;

    if (state) {
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
          }
          teamData.apply.push({
            name: user.name,
            id: user.id,
            thumb: user.thumb,
          });
          await teamData.save();
          socket.emit(`${teamData.leader}-apply-update`);
          return res.send({ message: "팀 신청 완료", state: true });
        }
      } else {
        return res.send({
          message: "이미 팀이 있습니다 어플을 재시작 해주세요!",
          state: false,
        });
      }
    } else {
      const filter = { name: team.name };
      const update = {
        $pull: { apply: { id: user } },
        $inc: { count: count ? 1 : 0 },
      };

      const teamData = await Team.findOneAndUpdate(filter, update, {
        new: true,
      });

      if (teamData) {
        socket.emit(`${teamData.leader}-apply-update`);
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
    if (teamData) {
      return res.send(teamData);
    } else {
      return res.send([]);
    }
  } catch (error) {
    console.log("error in getTeamData", error);
    throw error;
  }
};

export const updateTeamManager = async (req: Request, res: Response) => {
  const socket = getSocketIo();
  try {
    const { id, teamName } = req.body;

    const teamData = await Team.findOne({ name: teamName });

    if (teamData.manager.length < 2) {
      await Team.findOneAndUpdate(
        { name: teamName },
        { $push: { manager: id } },
        { new: true }
      );
      socket.emit(`${teamName}-manager`);
      return res.send({ message: "매치 권한 부여 완료!", state: true });
    } else {
      return res.send({
        message: "이미 2명의 매니저가 존재합니다...",
        state: false,
      });
    }
  } catch (error) {
    console.log("error in updateTeamManager", error);
    throw error;
  }
};

export const deleteTeamManager = async (req: Request, res: Response) => {
  const socket = getSocketIo();
  try {
    const { id, teamName } = req.body;
    await Team.findOneAndUpdate(
      { name: teamName },
      { $pull: { manager: id } },
      { new: true }
    );
    socket.emit(`${teamName}-manager`);
    return res.send({ message: "매치 권한 제거 완료!" });
  } catch (error) {
    console.log("error in deleteTeamManager", error);
    throw error;
  }
};

export const changeTeamLeader = async (req: Request, res: Response) => {
  const socket = getSocketIo();
  try {
    const { name, teamName } = req.body;

    await Team.findOneAndUpdate(
      { name: teamName },
      { leader: name },
      { new: true }
    );

    socket.emit(`${teamName}-manager`);
    return res.send({ message: "팀장을 성공적으로 넘겼습니다!" });
  } catch (error) {
    console.log("error in changeTeamLeader", error);
    throw error;
  }
};
