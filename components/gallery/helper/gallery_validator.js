const Joi = require("joi");

const galleryValidation = Joi.object({
  title: Joi.string().min(5).max(100).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 5 characters",
    "string.max": "Title must not exceed 100 characters",
  }),
  type: Joi.string().valid("image", "video").required().messages({
    "any.only": "Type must be either 'image' or 'video'",
    "string.empty": "Type is required",
  }),
  video_url: Joi.string()
    .uri()
    .pattern(/(youtube\.com\/.*v=|youtu\.be\/)/)
    .allow(null, "")
    .optional()
    .messages({
      "string.pattern.base": "Only YouTube URLs are allowed",
      "string.uri": "Invalid video URL format",
    }),
  video_id: Joi.string().optional().allow(null, ""),
  status: Joi.string().valid("pending", "approved").optional().messages({
    "any.only": "Status must be either 'pending' or 'approved'",
  }),
});

module.exports = galleryValidation;