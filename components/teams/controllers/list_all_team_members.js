const Team = require("../models/team_model");

const listAllTeamMembers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortOrder = req.query.sort === "asc" ? 1 : -1; 

    const search = req.query.search || "";
    const searchQuery = search
      ? { fullname: { $regex: search, $options: "i" } }
      : {};

    const members = await Team.find(searchQuery)
      .sort({ createdAt: sortOrder }) 
      .skip(skip)
      .limit(limit)
      .lean();

    const totalMembers = await Team.countDocuments(searchQuery)

    return res.status(200).json({
      message: "Team Members fetched successfully",
      members,
      pagination: {
        currentPage: page,
        totalMembers,
        totalPages: Math.ceil(totalMembers / limit),
        MembersPerPage: limit,
      },
    });

  } catch (error) {
    console.error("List Team Members Error:", error);
    return res.status(500).json({ message: "Failed to fetch team members" });
  }
};

module.exports = listAllTeamMembers;
