import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    team1: {
      type: String,
      required: true,
    },
    team2: {
      type: String,
      required: false,
    },
    level: {
      type: String,
      required: true,
    },
    state: {
      type: Boolean,
      require: true,
    },
    place: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: [],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Match = mongoose.model("Match", matchSchema);

export default Match;
