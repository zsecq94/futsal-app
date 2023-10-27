import mongoose from "mongoose";

const matchDateSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    A: {
      count: {
        type: Number,
        required: true,
      },
      times: {
        type: [],
        required: true,
      },
    },
    B: {
      count: {
        type: Number,
        required: true,
      },
      times: {
        type: [],
        required: true,
      },
    },
    C: {
      count: {
        type: Number,
        required: true,
      },
      times: {
        type: [],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const MatchDate = mongoose.model("MatchDate", matchDateSchema);

export default MatchDate;
