const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loginValidation } = require("../helper/auth_validator");
const User = require("../../users/models/user_model");

const loginUser = async (req, res) => {
  try {
    const { error, value } = loginValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: value.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(value.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!user.is_security_qxn_added) {
      return res.status(200).json({
        message: "Please set your security questions.",
        firstTimeLogin: true
      });
    }

    const accessToken = jwt.sign(
      { unique_id: user.unique_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "15m" }
    );

    const refreshToken = jwt.sign(
      { unique_id: user.unique_id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    user.lastLogin = new Date();
    await user.save();

    return res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
};

module.exports = loginUser;
