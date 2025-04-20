const mongoose = require("mongoose");
const User = require("../models/user_model");

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await User.findById(id).select("-password -resetPasswordToken -resetPasswordExpires");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Get Single User Error:", error);
    return res.status(500).json({ message: "Failed to fetch user" });
  }
};

module.exports = getSingleUser;
