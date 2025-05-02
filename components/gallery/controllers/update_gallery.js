const Gallery = require("../models/gallery_model");
const galleryValidation = require("../helper/gallery_validator");

const updateGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = galleryValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const gallery = await Gallery.findById(id);
    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    const updatedData = {};

    if (value && value.title) {
      updatedData.title = value.title;
    }

    const image = req.file?.path; 

    if (image) {
      updatedData.image = image; 
    }

    Object.assign(gallery, updatedData);

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
