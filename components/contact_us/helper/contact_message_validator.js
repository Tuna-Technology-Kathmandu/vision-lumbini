const Joi = require("joi");

const contactUsValidator = Joi.object({
  fullname: Joi.string()
      .min(3)
      .max(100)
      .required()
      .messages({
        'string.empty': 'Full name is required',
        'string.min': 'Full name must be at least 3 characters',
        'string.max': 'Full name must be at most 100 characters'
      }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please enter a valid email address'
    }),
    phone: Joi.string()
    .pattern(/^[0-9]{7,15}$/)
    .required()
    .messages({
      'string.empty': 'Phone number is required',
      'string.pattern.base': 'Phone number must only contain 7-15 digits and no letters or symbols',
    }),  
  subject: Joi.string()
    .required()
    .max(150)
    .allow("")
    .messages({
      "string.max": "Subject must be at most 150 characters",
    }),

  message: Joi.string()
    .min(10)
    .max(1000)
    .required()
    .messages({
      "string.empty": "Message cannot be empty",
      "string.min": "Message must be at least 10 characters",
      "string.max": "Message must be at most 1000 characters",
    }),

  status: Joi.string()
    .valid("unread", "read", "responded")
    .default("unread")
    .messages({
      "any.only": "Status must be one of unread, read, or responded",
    }),
});

module.exports = contactUsValidator;