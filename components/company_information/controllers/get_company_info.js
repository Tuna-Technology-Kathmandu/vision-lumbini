const CompanyInformation = require("../models/company_info_model");

const getCompanyInformation = async (req, res) => {
  try {
    const { id } = req.params;

    const companyInfo = await CompanyInformation.findById(id);
    if (!companyInfo) {
      return res.status(404).json({ message: "Company Information not found" });
    }

    return res.status(200).json({
      message: "Company Information fetched successfully",
      company_information: companyInfo,
    });
  } catch (error) {
    console.error("Get Company Information Error:", error);
    return res.status(500).json({ message: "Error fetching Company Information" });
  }
};

module.exports = getCompanyInformation;
