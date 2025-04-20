const bcrypt = require("bcryptjs");
const User = require("../../users/models/user_model");
const { registerValidation } = require("../helper/auth_validator");

const registerUser = async (req, res) => {
  try {
    const { error, value } = registerValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password, role } = value;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User with this email already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      ...value, 
      password: hashedPassword, 
      is_security_qxn_added: false,  
      securityQuestionsUpdatedAt: null 
    });

    await newUser.save();

    return res.status(201).json({ message: "User registered successfully." });

  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ message: "Internal server error during registration." });
  }
};

module.exports = registerUser;
