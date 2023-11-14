import mongoose from "mongoose";

const mercenarySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      require: true,
    },
    date: {
      type: String,
      require: true,
    },
    times: {
      type: [],
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Mercenary = mongoose.model("Mercenary", mercenarySchema);

export default Mercenary;
