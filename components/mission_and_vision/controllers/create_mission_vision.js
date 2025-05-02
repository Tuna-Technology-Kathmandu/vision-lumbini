const MissionVision = require("../models/mission_vision_model");
const missionVisionValidation = require("../helper/mission_vision_validator");

const createMissionVision = async (req, res) => {
  try {
    const { error, value } = missionVisionValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const exists = await MissionVision.findOne();
    if (exists) {
      return res.status(400).json({ message: "Mission & Vision already exists. Please update instead." });
    }

    const newEntry = new MissionVision({ ...value });
    await newEntry.save();

    return res.status(201).json({
      message: "Mission & Vision created successfully",
      mission_and_vision: newEntry,
    });
  } catch (err) {
    console.error("Create Mission & Vision Error:", err);
    return res.status(500).json({ message: "Server error while creating Mission & Vision" });
  }
};

module.exports = createMissionVision;
