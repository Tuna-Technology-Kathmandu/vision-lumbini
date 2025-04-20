const mongoose = require("mongoose");
const User = require("../models/user_model");

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Delete User Error:", error);
    return res.status(500).json({ message: "Server error during user deletion." });
  }
};

module.exports = deleteUser;
