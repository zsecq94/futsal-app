import { Request, Response } from "express";
import Team from "../models/team-model";
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export const createTeam = async (req: Request, res: Response) => {
  try {
    const { teamName, teamImg, teamLevel, imgPreview } = req.body.teamData;

    const teamData = await Team.findOne({
      teamName,
    });
    if (teamData) {
      return res.send({
        message: "이미 존재하는 팀 이름입니다.",
        state: false,
      });
    } else {
      // 이부분
      await Team.create({
        teamName,
        teamImg,
        teamLevel,
      });
    }

    // return res.send({ message: "팀 생성 완료", state: true });
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
