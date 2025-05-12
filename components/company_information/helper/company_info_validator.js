const Joi = require("joi");

const companyInformationValidation = Joi.object({
  company_info_title: Joi.string().min(5).max(40).required().messages({
    "string.empty": "Company Info Title is required",
    "string.min": "Company Info Title must be at least 5 characters",
    "string.max": "Company Info Title must not exceed 40 characters"
  }),
  company_info: Joi.string().min(10).required().messages({
    "string.empty": "Company Info is required",
    "string.min": "Company Info must be at least 10 characters"
  }),
  history_title: Joi.string().min(5).max(40).required().messages({
    "string.empty": "History Title is required",
    "string.min": "History Title must be at least 5 characters",
    "string.max": "History Title must not exceed 40 characters"
  }),
  history_description: Joi.string().min(10).required().messages({
    "string.empty": "History Description is required",
    "string.min": "History Description must be at least 10 characters"
  })
});

module.exports = companyInformationValidation;
