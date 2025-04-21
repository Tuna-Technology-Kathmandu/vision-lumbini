const Joi = require("joi");

const partnerValidation = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  status: Joi.string().valid("pending", "approved").optional(), 
});

module.exports = partnerValidation;
