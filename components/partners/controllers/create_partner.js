const Partner = require("../models/partner_model");
const partnerValidation = require("../helper/partner_validator");
const multer = require("multer");
const { storage } = require("../../../config/cloudinary");
const upload = multer({ storage });

const createPartner = async (req, res) => {
  try {
    const { error, value } = partnerValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const image = req.file?.path;
    if (!image) {
      return res.status(400).json({ message: "Image upload is required." });
    }

    const newPartner = new Partner({
      ...value,
      image,
    });

    await newPartner.save();

    return res.status(201).json({
      message: "Partner created successfully",
      partner: newPartner,
    });
  } catch (err) {
    console.error("Create Partner Error:", err);
    return res.status(500).json({
      message: "Server error while creating partner",
    });
  }
};

module.exports = {createPartner, upload};
