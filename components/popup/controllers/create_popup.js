const Popup = require("../models/popup_models");
const popupValidation = require("../helper/popup_validator");
const multer = require("multer");
const { storage } = require("../../../config/cloudinary");
const upload = multer({ storage });

const createPopup = async (req, res) => {
  try {
    const { error, value } = popupValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const image = req.file?.path;  

    if (!image) {
      return res.status(400).json({ message: "Image is required." });
    }

    const newPopup = new Popup({
      ...value,
      image: image,   
    });

    await newPopup.save();

    return res.status(201).json({
      message: "Popup created successfully",
      popup: newPopup,
    });
  } catch (err) {
    console.error("Create Popup Error:", err);
    return res.status(500).json({
      message: "Server error while creating popup",
    });
  }
};

module.exports = { createPopup, upload };
