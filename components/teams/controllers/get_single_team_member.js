const Team = require("../models/team_model");

const getSingleTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await Team.findById(id);

    if (!member) {
      return res.status(404).json({ message: "Team member not found" });
    }

    return res.status(200).json(member);
  } catch (error) {
    console.error("Get Single Team Member Error:", error);
    return res.status(500).json({ message: "Failed to retrieve team member" });
  }
};

module.exports = getSingleTeamMember;
