const User = require("../../users/models/user_model");
const Joi = require("joi");

const predefinedSecurityQuestions = [
  "What was your favorite movie as a teenager?",
  "What was the name of your first school?",
  "What is your father’s middle name?",
  "What was your favorite childhood cartoon?",
  "In what city were you born?",
  "What is the name of your childhood best friend?",
  "What was your first job?",
  "What was your childhood nickname?",
  "Who was your favorite teacher in high school?",
  "What was your favorite food growing up?"
];

exports.getSecurityQuestions = (req, res) => {
  res.status(200).json({ questions: predefinedSecurityQuestions });
};

const securityQuestionsValidation = Joi.object({
  email: Joi.string().email().required(),
  securityQuestions: Joi.array()
    .items(
      Joi.object({
        question: Joi.string().valid(...predefinedSecurityQuestions).required(),
        answer: Joi.string().min(1).required()
      })
    )
    .unique((a, b) => a.question === b.question)
    .messages({
      "array.base": "Security questions are required.",
      "array.empty": "Please provide answers to the security questions.",
      "object.base": "Each security question must be an object with question and answer.",
      "array.unique": "Security questions must be unique. Duplicate questions are not allowed."
    })
});

exports.setSecurityQuestions = async (req, res) => {
  try {
    const { error, value } = securityQuestionsValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, securityQuestions } = value;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const areValidQuestions = securityQuestions.every(({ question }) =>
      predefinedSecurityQuestions.includes(question)
    );

    if (!areValidQuestions) {
      return res.status(400).json({ message: "One or more security questions are invalid." });
    }

    const plainQuestions = securityQuestions.map(({ question, answer }) => {
      return { question, answer };
    });

    user.securityQuestions = plainQuestions;
    user.is_security_qxn_added = true;
    user.securityQuestionsUpdatedAt = new Date();

    await user.save();

    return res.status(200).json({ message: "Security questions set successfully." });
  } catch (err) {
    console.error("Error setting security questions:", err);
    return res.status(500).json({ message: "Server error while setting security questions." });
  }
};
