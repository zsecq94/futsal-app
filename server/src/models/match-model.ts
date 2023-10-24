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
    level: {
      type: String,
      required: true,
    },
    team2: {
      type: String,
      required: false,
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
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Match = mongoose.model("Match", matchSchema);

export default Match;
