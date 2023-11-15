import mongoose from "mongoose";

const matchDataSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    A: {
      count: {
        type: Number,
        required: false,
      },
      times: {
        type: [],
        required: true,
      },
    },
    B: {
      count: {
        type: Number,
        required: false,
      },
      times: {
        type: [],
        required: true,
      },
    },
    C: {
      count: {
        type: Number,
        required: false,
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

const MatchData = mongoose.model("MatchData", matchDataSchema);

export default MatchData;
