const Joi = require("joi");

const tagValidation = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "Tag name is required",
      "string.min": "Tag name must be at least 2 characters",
      "string.max": "Tag name must not exceed 50 characters",
    }),
});

module.exports = tagValidation;
