const Joi = require("joi");

const forgotPasswordValidation = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address"
    }),

  answers: Joi.array()
    .items(
      Joi.object({
        question: Joi.string().required().messages({
          "string.empty": "Each question must be a valid string"
        }),
        answer: Joi.string().required().messages({
          "string.empty": "Answer to each question is required"
        })
      })
    )
    .length(3)
    .required()
    .messages({
      "array.length": "Exactly 3 security answers must be provided.",
      "array.base": "Answers must be an array of objects with question and answer."
    })
});

module.exports = { forgotPasswordValidation };
