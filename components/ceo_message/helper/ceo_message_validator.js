const Joi = require("joi");

const ceoMessageValidation = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters",
      "string.max": "Name must not exceed 100 characters",
    }),

  position: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      "string.empty": "Position is required",
      "string.min": "Position must be at least 3 characters",
      "string.max": "Position must not exceed 50 characters",
    }),

  photo: Joi.string()
    .uri()
    .allow("")  
    .messages({
      "string.uri": "Photo must be a valid URL",
    }),

  description: Joi.string()
    .min(10)
    .max(1500)
    .required()
    .messages({
      "string.empty": "Description is required",
      "string.min": "Description must be at least 10 characters",
      "string.max": "Description must not exceed 1500 characters",
    }),

  status: Joi.string()
    .valid("pending", "approved")
    .default("pending")
    .messages({
      "string.valid": "Status must be either 'pending' or 'approved'",
    }),
});

module.exports = ceoMessageValidation;