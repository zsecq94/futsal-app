import mongoose from "mongoose";

const mercenarySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requiredd: true,
    },
    thumb: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    times: {
      type: [],
      required: true,
    },
    state: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Mercenary = mongoose.model("Mercenary", mercenarySchema);

export default Mercenary;
