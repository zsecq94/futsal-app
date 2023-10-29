import { Request, Response } from "express";
import User from "../models/user-model";

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
  try {
    const { id, teamData } = req.body;
    const user = await User.findOne({ id });

    if (user) {
      user.team = teamData.teamName;
      await user.save();
      return res.send({ user });
    } else {
      return;
    }
  } catch (error) {
    console.log("error in userUpdate", error);
    throw error;
  }
};
