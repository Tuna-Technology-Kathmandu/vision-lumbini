const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const User = require("../models/user_model");


const updateSchema = Joi.object({
  fullname: Joi.string().min(3).max(100),
  email: Joi.string().email(),
  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d@$.!%*#?&]{6,}$"))
    .messages({
      "string.pattern.base": "Password must contain at least one letter and one number",
    }),
  role: Joi.string().valid("admin", "editor", "subscriber"),
});

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const { error, value } = updateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (value.email && value.email !== user.email) {
      const existing = await User.findOne({ email: value.email });
      if (existing) {
        return res.status(400).json({ message: "Email is already taken." });
      }
    }

    if (value.fullname) user.fullname = value.fullname;
    if (value.email) user.email = value.email;
    if (value.role) user.role = value.role;

    if (value.password) {
      const hashedPassword = await bcrypt.hash(value.password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    return res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    console.error("Update User Error:", error);
    return res.status(500).json({ message: "Server error during user update." });
  }
};

module.exports = updateUser;
