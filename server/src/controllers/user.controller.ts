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
    }

    const user = await User.create({
      id,
      name,
      thumb,
      num: 0,
      team: null,
    });

    return res.status(201).send({ user: user, message: "가입 완료" });
  } catch (error) {
    console.log("error in createUser", error);
    throw error;
  }
};
