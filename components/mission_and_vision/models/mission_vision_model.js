const mongoose = require("mongoose");

const missionVisionSchema = new mongoose.Schema(
  {
    mission: { type: [String], required: true },
    vision: { type: [String], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MissionVision", missionVisionSchema);
