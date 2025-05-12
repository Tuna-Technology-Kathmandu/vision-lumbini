const Team = require("../models/team_model");

// Delete a team member by ID
const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Team.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Team member not found" });
    }

    return res.status(200).json({
      message: "Team member deleted successfully",
      deleted,
    });
  } catch (error) {
    console.error("Delete Team Member Error:", error);
    return res.status(500).json({ message: "Failed to delete team member" });
  }
};

module.exports = deleteTeamMember;
