const Gallery = require("../models/gallery_model");
const galleryValidation = require("../helper/gallery_validator");
const multer = require("multer");
const { storage } = require("../../../config/cloudinary");
const upload = multer({ storage });

const createGallery = async (req, res) => {
  try {
    const { error, value } = galleryValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const image = req.file?.path;  

    if (!image) {
      return res.status(400).json({ message: "Image is required." });
    }

    const newGallery = new Gallery({
      ...value,
      image: image,   
    });

    await newGallery.save();

    return res.status(201).json({
      message: "Gallery created successfully",
      gallery: newGallery,
    });
  } catch (err) {
    console.error("Create Gallery Error:", err);
    return res.status(500).json({
      message: "Server error while creating gallery",
    });
  }
};

module.exports = { createGallery, upload };
