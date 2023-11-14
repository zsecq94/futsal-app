import { Request, Response } from "express";
import { getSocketIo } from "../socket";
import { Mutex } from "async-mutex";
import Mercenary from "../models/mercenary-model";

const mutex = new Mutex();

export const createMercenary = async (req: Request, res: Response) => {
  try {
    const { name, thumb, level, date, times } = req.body;
    const duplication = await Mercenary.findOne({ name, date });
    if (duplication) {
      return res.send({
        message: `${date}일의 용병신청을 이미 하셨습니다.`,
        state: "error",
      });
    }
    await Mercenary.create({
      name,
      thumb,
      level,
      date,
      times,
    });
    return res.send({ message: "용병신청 완료!", state: "success" });
  } catch (error) {
    console.log("error in 용병신청", error);
    throw error;
  }
};

export const getOneDayMercenaryData = async (req: Request, res: Response) => {
  try {
    const { date } = req.params;
    const data = await Mercenary.find({ date });
    if (data) {
      return res.send(data);
    } else {
      return res.send([]);
    }
  } catch (error) {
    console.log("error in 용병신청", error);
    throw error;
  }
};
