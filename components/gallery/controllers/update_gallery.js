const Gallery = require("../models/gallery_model");
const galleryValidation = require("../helper/gallery_validator");

const updateGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = galleryValidation.validate(req.body, {
      allowUnknown: true,
      stripUnknown: true,
    });
    if (error) {
      return res.status(400).json({
        message: `Validation Error: ${error.details[0].message}`,
      });
    }

    const gallery = await Gallery.findById(id);
    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    const image = req.file?.path || null;

    if (value.title && value.title !== gallery.title) {
      const existing = await Gallery.findOne({ title: value.title });
      if (existing) {
        return res.status(409).json({
          message: "A gallery with this title already exists. Please choose a different title.",
        });
      }
      gallery.title = value.title;
    }

    const updatedType = value.type || gallery.type;

    if (updatedType === "video") {
      if (!value.video_url && !gallery.video_url) {
        return res.status(400).json({
          message: "Validation Error: 'video_url' is required when type is 'video'.",
        });
      }

      if (image) {
        return res.status(400).json({
          message: "Validation Error: Image upload is not allowed when type is 'video'.",
        });
      }

      gallery.video_url = value.video_url || gallery.video_url;
      gallery.image = null; 
    }

    if (updatedType === "image") {
      if (!gallery.image && !image) {
        return res.status(400).json({
          message: "Validation Error: Image file is required when type is 'image'.",
        });
      }

      if (value.video_url) {
        return res.status(400).json({
          message: "Validation Error: 'video_url' should be empty when type is 'image'.",
        });
      }

      gallery.image = image || gallery.image;
      gallery.video_url = null; 
    }

    if (value.status) gallery.status = value.status;
    if (value.type) gallery.type = value.type;

    await gallery.save();

    return res.status(200).json({
      message: "Gallery updated successfully",
      gallery,
    });
  } catch (err) {
    console.error("Update Gallery Error:", err.message);
    return res.status(500).json({
      message: "Server error while updating gallery",
    });
  }
};

module.exports = { updateGallery };