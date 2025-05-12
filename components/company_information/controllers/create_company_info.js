const CompanyInformation = require("../models/company_info_model");
const companyInfoValidation = require("../helper/company_info_validator");
const multer = require("multer");
const { storage } = require("../../../config/cloudinary");
const upload = multer({ storage });

const createCompanyInfo = async (req, res) => {
  try {
    const { error, value } = companyInfoValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const images = req.files?.map(file => file.path);
    if (!images || images.length === 0) {
      return res.status(400).json({ message: "At least one image is required." });
    }

    const newCompanyInfo = new CompanyInformation({
      ...value,
      image: images,
    });

    await newCompanyInfo.save();

    return res.status(201).json({
      message: "Company information created successfully",
      companyInfo: newCompanyInfo,
    });
  } catch (err) {
    console.error("Create Company Info Error:", err);
    return res.status(500).json({
      message: "Server error while creating company information",
    });
  }
};

module.exports = { createCompanyInfo, upload };
