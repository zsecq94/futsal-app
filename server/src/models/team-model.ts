import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    member: {
      type: [],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("User", teamSchema);

export default Team;
