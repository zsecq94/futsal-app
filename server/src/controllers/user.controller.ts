import { Request, Response } from "express";
import User from "../models/user-model";
import { getSocketIo } from "../socket";
import { Mutex } from "async-mutex";
import Team from "../models/team-model";

const mutex = new Mutex();

export const userInfo = async (req: Request, res: Response) => {
  try {
    const { id, name, thumb } = req.body;
    const existingUser = await User.findOne({ id });
    if (existingUser) {
      return res
        .status(201)
        .send({ user: existingUser, message: "이미 가입됨" });
    } else {
      const user = await User.create({
        id,
        name,
        thumb,
        num: 0,
        team: null,
        level: 0,
      });
      return res.status(201).send({ user: user, message: "가입 완료" });
    }
  } catch (error) {
    console.log("error in createUser", error);
    throw error;
  }
};

export const userUpdate = async (req: Request, res: Response) => {
  const release = await mutex.acquire();
  const socket = getSocketIo();
  try {
    const { id, teamData } = req.body;
    const user = await User.findOne({ id });
    if (user) {
      if (user.team === null) {
        user.team = teamData;
        await user.save();
        release();
        await socket.emit(`${id}-update`, user);
        return res.send({ state: true, message: "팀 수락 완료!" });
      } else {
        release();
        return res.send({ state: false, message: "이미 소속된 팀이 있음!" });
      }
    } else {
      return;
    }
  } catch (error) {
    console.log("error in userUpdate", error);
    throw error;
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ id });
    if (user) {
      return res.send(user);
    }
  } catch (error) {
    console.log("error in getUser", error);
    throw error;
  }
};

export const deleteUserTeam = async (req: Request, res: Response) => {
  const socket = getSocketIo();
  try {
    const { id, teamData } = req.body;

    const user = await User.findOneAndUpdate(
      { id },
      { team: null },
      { new: true }
    );

    const team = await Team.findOneAndUpdate(
      { name: teamData.name },
      {
        $inc: { count: -1 },
        $pull: { manager: id },
      },
      { new: true }
    );

    if (user && team) {
      socket.emit(`${id}-delete`, user);
      socket.emit(`${team.name}-update`);

      return res.send({ message: "탈퇴 성공!" });
    }
  } catch (error) {
    console.log("error in deleteUserTeam", error);
    throw error;
  }
};

export const getTeamMember = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const users = await User.find({ team: name });
    if (users) {
      return res.send(users);
    } else {
      return res.send([]);
    }
  } catch (error) {
    console.log("error in getTeamMember", error);
    throw error;
  }
};
