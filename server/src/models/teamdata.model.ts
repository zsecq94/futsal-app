import mongoose from "mongoose";

const teamDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  apply: {
    type: [],
    required: false,
  },
  match: {
    type: [],
    required: false,
  },
});

const TeamData = mongoose.model("TeamData", teamDataSchema);

export default TeamData;
