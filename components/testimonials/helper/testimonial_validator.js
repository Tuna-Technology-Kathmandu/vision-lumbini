const Joi = require("joi");

const testimonialValidator = Joi.object({
  full_name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.empty": "Full name is required",
      "string.min": "Full name must be at least 3 characters",
      "string.max": "Full name must be at most 100 characters",
    }),

  description: Joi.string()
    .min(10)
    .max(1000)
    .required()
    .messages({
      "string.empty": "Testimonial message is required",
      "string.min": "Message must be at least 10 characters",
      "string.max": "Message must be at most 1000 characters",
    }),

  photo_url: Joi.string()
    .uri()
    .allow("")
    .messages({
      "string.uri": "Photo must be a valid URL",
    }),
});

module.exports = testimonialValidator;
