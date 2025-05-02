const CEOMessage = require("../models/ceo_message_model");
const ceoMessageValidation = require("../helper/ceo_message_validator");
const multer = require("multer");
const { storage } = require("../../../config/cloudinary");
const upload = multer({ storage });

const createCEOMessage = async (req, res) => {
  try {
    const { error, value } = ceoMessageValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Photo is required." });
    }
    const photo = req.file?.path || "";

    const newMessage = new CEOMessage({
      ...value,
      photo,  
    });

    await newMessage.save();

    return res.status(201).json({
      message: "CEO Message created successfully.",
      newMessage,
    });
  } catch (error) {
    console.error("Create CEO Message Error:", error);
    return res.status(500).json({ message: "Server error while creating CEO message" });
  }
};

module.exports = { createCEOMessage, upload };
