const bcrypt = require("bcryptjs");
const User = require("../../users/models/user_model");
const { resetPasswordValidation } = require("../helper/reset_password_validator");

const resetPassword = async (req, res) => {
  try {
    const { error, value } = resetPasswordValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, newPassword, resetToken } = value;

    const user = await User.findOne({ email });
    if (!user || user.resetPasswordToken !== resetToken) {
      return res.status(401).json({ message: "Invalid or expired reset token." });
    }

    if (!user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
      return res.status(401).json({ message: "Reset token has expired." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.status(200).json({ message: "Password has been reset successfully." });

  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Server error during password reset." });
  }
};

module.exports = resetPassword;
