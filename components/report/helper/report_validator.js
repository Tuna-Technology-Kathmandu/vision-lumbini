const Joi = require("joi");

const reportValidator = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.empty": "Title is required",
      "string.min": "Title must be at least 3 characters",
      "string.max": "Title must not exceed 100 characters",
    }),

  description: Joi.string()
    .max(1000)
    .required()
    .messages({
      "string.empty": "Description is required",
      "string.max": "Description must not exceed 1000 characters",
    }),

  fiscalYear: Joi.string()
    .pattern(/^\d{4}\/\d{2}$/)
    .required()
    .messages({
      "string.empty": "Fiscal year is required",
      "string.pattern.base": "Fiscal year must be in format YYYY/YY (e.g., 2024/25)",
    }),

  quarter: Joi.string()
    .valid("Quarter-1", "Quarter-2", "Quarter-3", "Quarter-4")
    .required()
    .messages({
      "any.only": "Quarter must be one of Quarter-1 to Quarter-4",
      "string.empty": "Quarter is required",
    }),

  status: Joi.string()
    .valid("pending", "approved")
    .optional(),
});

module.exports = reportValidator;
