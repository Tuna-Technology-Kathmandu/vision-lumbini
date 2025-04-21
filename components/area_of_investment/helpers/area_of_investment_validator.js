const Joi = require("joi");

const areaofInvestmentValidation = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name must not exceed 50 characters",
  }),
});

module.exports = areaofInvestmentValidation;
