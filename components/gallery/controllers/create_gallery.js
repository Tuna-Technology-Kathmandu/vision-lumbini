const Gallery = require("../models/gallery_model");
const galleryValidation = require("../helper/gallery_validator");
const multer = require("multer");
const { storage } = require("../../../config/cloudinary");
const upload = multer({ storage });

const createGallery = async (req, res) => {
  try {
    const { error, value } = galleryValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: `Validation Error: ${error.details[0].message}`,
      });
    }

    const existing = await Gallery.findOne({ title: value.title });
    if (existing) {
      return res.status(409).json({
        message: "A gallery with this title already exists. Please choose a different title.",
      });
    }

    const image = req.file?.path || null;

    if (value.type === "video") {
      if (!value.video_url || value.video_url.trim() === "") {
        return res.status(400).json({
          message: "Validation Error: 'video_url' is required when type is 'video'.",
        });
      }

      if (image) {
        return res.status(400).json({
          message: "Validation Error: Image upload is not allowed when type is 'video'.",
        });
      }
    }

    if (value.type === "image") {
      if (!image) {
        return res.status(400).json({
          message: "Validation Error: Image file is required when type is 'image'.",
        });
      }

      if (value.video_url && value.video_url.trim() !== "") {
        return res.status(400).json({
          message: "Validation Error: 'video_url' should be empty when type is 'image'.",
        });
      }
    }

    const newGallery = new Gallery({
      ...value,
      image,
    });

    await newGallery.save();

    return res.status(201).json({
      message: "Gallery created successfully.",
      gallery: newGallery,
    });
  } catch (err) {
    console.error("Create Gallery Error:", err);

    if (err.code === 11000 && err.keyPattern?.title) {
      return res.status(409).json({
        message: "Gallery title must be unique. This title already exists.",
      });
    }

    return res.status(500).json({
      message: "Internal Server Error: Unable to create gallery.",
    });
  }
};

module.exports = { createGallery, upload };
