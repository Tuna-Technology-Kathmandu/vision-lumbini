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
      return res.status(400).json({ message: error.details[0].message });
    }

    const gallery = await Gallery.findById(id);
    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    const image = req.file?.path;

    if (value.title) gallery.title = value.title;
    if (value.status) gallery.status = value.status;
    if (value.video_url) gallery.video_url = value.video_url;
    if (image) gallery.image = image;

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