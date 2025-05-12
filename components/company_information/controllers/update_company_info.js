const CompanyInformation = require("../models/company_info_model");
const companyInformationValidation = require("../helper/company_info_validator");
const multer = require("multer");
const { storage } = require("../../../config/cloudinary");
const upload = multer({ storage });

const updateCompanyInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = companyInformationValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const companyInfo = await CompanyInformation.findById(id);
    if (!companyInfo) {
      return res.status(404).json({ message: "Company Information not found" });
    }

    const updatedData = {
      ...value,
    };

    const images = req.files?.map(file => file.path);
    if (images && images.length > 0) {
      updatedData.image = images;
    }

    Object.assign(companyInfo, updatedData);
    await companyInfo.save();

    return res.status(200).json({
      message: "Company Information updated successfully",
      company_information: companyInfo,
    });
  } catch (err) {
    console.error("Update Company Information Error:", err);
    return res.status(500).json({
      message: "Server error while updating Company Information",
    });
  }
};

module.exports = { updateCompanyInfo, upload };
