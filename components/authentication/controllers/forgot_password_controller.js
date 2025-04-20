const { v4: uuidv4 } = require("uuid");
const User = require("../../users/models/user_model");
const { forgotPasswordValidation } = require("../helper/forgot_password_validator");

const forgotPassword = async (req, res) => {
  try {
    const { error, value } = forgotPasswordValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, answers } = value;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user || !user.securityQuestions || user.securityQuestions.length === 0) {
      return res.status(404).json({ message: "User or security data not found." });
    }

    const storedQuestions = user.securityQuestions; 

    for (const { question, answer } of answers) {
      const stored = storedQuestions.find(q => q.question === question);
      if (!stored) {
        return res.status(401).json({ message: `Invalid question: "${question}".` });
      }

      if (answer.trim().toLowerCase() !== stored.answer.trim().toLowerCase()) {
        return res.status(401).json({ message: `Incorrect answer for: "${question}".` });
      }
    }

    const resetToken = uuidv4();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000); 

    await user.save();

    return res.status(200).json({
      message: "Security answers verified. Use this token to reset your password.",
      token: resetToken,
    });

  } catch (err) {
    console.error("Forgot password error:", err);
    return res.status(500).json({ message: "Server error during verification." });
  }
};

module.exports = forgotPassword;
