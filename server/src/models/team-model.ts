import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
    },
    teamImg: {
      type: String,
      required: true,
    },
    teamLevel: {
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
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("Team", teamSchema);

export default Team;
