const CompanyInformation = require("../models/company_info_model");

const deleteCompanyInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const companyInfo = await CompanyInformation.findById(id);
    if (!companyInfo) {
      return res.status(404).json({ message: "Company Information not found" });
    }

    await companyInfo.deleteOne();

    return res.status(200).json({
      message: "Company Information deleted successfully",
    });
  } catch (error) {
    console.error("Delete Company Information Error:", error);
    return res.status(500).json({
      message: "Error deleting Company Information",
    });
  }
};

module.exports = deleteCompanyInfo;
