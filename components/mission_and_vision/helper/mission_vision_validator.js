const Joi = require("joi");

const missionVisionValidation = Joi.object({
  mission: Joi.array().required().messages({
    "array.empty": "Mission is required",
    "array.min": "Mission must be at least 5 characters",
  }),
  vision: Joi.array().required().messages({
    "array.empty": "Vision is required",
    "array.min": "Vision must be at least 5 characters",
  }),
});

module.exports = missionVisionValidation;
