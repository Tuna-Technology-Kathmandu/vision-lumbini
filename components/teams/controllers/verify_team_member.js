const Team = require("../models/team_model");

const verifyTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await Team.findById(id);
    if (!member) {
      return res.status(404).json({ message: "Team member not found" });
    }

    member.status = "approved";
    await member.save();

    return res.status(200).json({
      message: "Team member verified successfully",
      member,
    });
  } catch (error) {
    console.error("Verify Team Member Error:", error);
    return res.status(500).json({ message: "Error verifying team member" });
  }
};

module.exports = verifyTeamMember;
