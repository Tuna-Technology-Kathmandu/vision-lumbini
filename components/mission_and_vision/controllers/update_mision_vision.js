const MissionVision = require("../models/mission_vision_model");
const missionVisionValidation = require("../helper/mission_vision_validator");

const updateMissionVision = async (req, res) => {
  try {
    const { error, value } = missionVisionValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existing = await MissionVision.findOne();
    if (!existing) {
      return res.status(404).json({ message: "Mission & Vision not found" });
    }

    const updated = await MissionVision.findByIdAndUpdate(existing._id, value, {
      new: true,
    });

    return res.status(200).json({
      message: "Mission & Vision updated successfully",
      mission_and_vision: updated,
    });
  } catch (err) {
    console.error("Update Mission & Vision Error:", err);
    return res.status(500).json({
      message: "Server error while updating Mission & Vision",
    });
  }
};

module.exports = updateMissionVision;
