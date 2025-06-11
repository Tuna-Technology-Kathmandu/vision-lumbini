const Team = require("../models/team_model");
const teamValidator = require("../helper/team_validator");
const multer = require("multer");
const { storage } = require("../../../config/cloudinary");
const upload = multer({ storage });

const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = teamValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const member = await Team.findById(id);
    if (!member) {
      return res.status(404).json({ message: "Team member not found" });
    }
    const photoUrl = req.file?.path || member.photoUrl;

    member.set({
      ...value,
      photoUrl,
    });

    await member.save();

    return res.status(200).json({
      message: "Team member updated successfully.",
      member,
    });
  } catch (error) {
    console.error("Update Team Member Error:", error);
    return res.status(500).json({ message: "Error updating team member" });
  }
};

module.exports = { updateTeamMember, upload };
