import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    team: {
      type: [],
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Match = mongoose.model("User", matchSchema);

export default Match;
