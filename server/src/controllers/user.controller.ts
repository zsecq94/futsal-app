import { Request, Response } from "express";
import User from "../models/user-model";
import { getSocketIo } from "../socket";

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
  const socket = getSocketIo();
  try {
    const { id, teamData } = req.body;
    const user = await User.findOne({ id });
    if (user) {
      user.team = teamData;
      await user.save();
      socket.emit(id, user);
      return res.send(user);
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
