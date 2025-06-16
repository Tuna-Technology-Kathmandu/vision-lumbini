const Joi = require("joi");

const popupValidation = Joi.object({
  title: Joi.string().min(5).max(100).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 5 characters",
    "string.max": "Title must not exceed 100 characters",
  }),
  status: Joi.string().valid("pending", "approved", "draft").default("draft").messages({
    "string.valid": "Status must be either 'pending' or 'approved'",
  }),
});

module.exports = popupValidation;
