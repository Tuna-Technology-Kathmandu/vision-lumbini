const MissionVision = require("../models/mission_vision_model");

const getSingleMissionVision = async (req, res) => {
  try {
    const { id } = req.params;

    const missionVision = await MissionVision.findById(id);
    if (!missionVision) {
      return res.status(404).json({ message: "Mission and Vision not found" });
    }

    return res.status(200).json({ missionVision });
  } catch (error) {
    console.error("Get Single Mission & Vision Error:", error);
    return res.status(500).json({ message: "Error retrieving Mission and Vision" });
  }
};

module.exports = getSingleMissionVision;
