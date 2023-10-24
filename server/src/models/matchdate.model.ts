import mongoose from "mongoose";

const matchDateSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    times: {
      type: [],
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MatchDate = mongoose.model("MatchDate", matchDateSchema);

export default MatchDate;
