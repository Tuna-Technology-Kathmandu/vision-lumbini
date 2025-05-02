const MissionVision = require("../models/mission_vision_model");

const deleteMissionVision = async (req, res) => {
  try {
    const { id } = req.params;

    const missionVision = await MissionVision.findById(id);
    if (!missionVision) {
      return res.status(404).json({ message: "Mission & Vision not found" });
    }

    await missionVision.deleteOne();

    return res.status(200).json({
      message: "Mission & Vision deleted successfully",
    });
  } catch (error) {
    console.error("Delete Mission & Vision Error:", error);
    return res.status(500).json({ message: "Error deleting Mission & Vision" });
  }
};

module.exports = deleteMissionVision;