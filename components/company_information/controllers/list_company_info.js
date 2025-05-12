const CompanyInformation = require("../models/company_info_model");

const listCompanyInformation = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortOrder = req.query.sort === "asc" ? 1 : -1;
    const search = req.query.search || "";

    const searchQuery = search
      ? {
          $or: [
            { company_info_title: { $regex: search, $options: "i" } },
            { history_title: { $regex: search, $options: "i" } }
          ]
        }
      : {};

    const companyInfo = await CompanyInformation.find(searchQuery)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await CompanyInformation.countDocuments(searchQuery);

    return res.status(200).json({
      message: "Company Information fetched successfully",
      company_information: companyInfo,
      pagination: {
        currentPage: page,
        totalEntries: total,
        totalPages: Math.ceil(total / limit),
        entriesPerPage: limit,
      },
    });
  } catch (error) {
    console.error("List Company Information Error:", error);
    return res.status(500).json({ message: "Failed to fetch Company Information" });
  }
};

module.exports = listCompanyInformation;
