import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
      required: true,
    },
    num: {
      type: Number,
      required: false,
    },
    team: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
