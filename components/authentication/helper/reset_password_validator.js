const Joi = require("joi");

const resetPasswordValidation = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address"
    }),

  newPassword: Joi.string()
    .min(8)
    .max(128)
    .required()
    .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d@$.!%*#?&]{6,}$'))
    .messages({
      'string.empty': 'New password is required',
      'string.min': 'Password must be at least 8 characters',
      'string.max': 'Password must be at most 128 characters',
      'string.pattern.base': 'Password must contain at least one letter and one number'
    }),

  resetToken: Joi.string()
    .required()
    .messages({
      "string.empty": "Reset token is required"
    })
});

module.exports = { resetPasswordValidation };
