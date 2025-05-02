const MissionVision = require("../models/mission_vision_model");

const listMissionVision = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortOrder = req.query.sort === "asc" ? 1 : -1;
    const search = req.query.search || "";

    const searchQuery = search
      ? { mission: { $regex: search, $options: "i" } }
      : {};

    const missionAndVision = await MissionVision.find(searchQuery)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await MissionVision.countDocuments(searchQuery);

    return res.status(200).json({
      message: "Mission & Vision fetched successfully",
      mission_and_vision: missionAndVision,
      pagination: {
        currentPage: page,
        totalEntries: total,
        totalPages: Math.ceil(total / limit),
        entriesPerPage: limit,
      },
    });
  } catch (error) {
    console.error("List Mission & Vision Error:", error);
    return res.status(500).json({ message: "Failed to fetch Mission & Vision" });
  }
};

module.exports = listMissionVision;
