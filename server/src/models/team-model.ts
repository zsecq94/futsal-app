import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    win: {
      type: Number,
      required: true,
    },
    draw: {
      type: Number,
      required: true,
    },
    lose: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    leader: {
      type: String,
      required: true,
    },
    apply: {
      type: [],
      required: false,
    },
    match: {
      type: [],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("Team", teamSchema);

export default Team;
