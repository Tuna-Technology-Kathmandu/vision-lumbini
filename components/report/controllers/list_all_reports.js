const Report = require("../models/report_model");

const listAllReports = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status || "approved";
    const skip = (page - 1) * limit;
    const sortOrder = req.query.sort === "asc" ? 1 : -1;

    const search = req.query.search || "";
    const searchQuery = {};

    if (search) {
      searchQuery.title = { $regex: search, $options: "i" };
    }

    if (status) {
      searchQuery.status = status;
    }

    const reports = await Report.find(searchQuery)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalReports = await Report.countDocuments(searchQuery);

    return res.status(200).json({
      message: "Reports fetched successfully",
      reports,
      pagination: {
        currentPage: page,
        totalReports,
        totalPages: Math.ceil(totalReports / limit),
        reportsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("List Reports Error:", error);
    return res.status(500).json({ message: "Failed to fetch reports" });
  }
};

module.exports = listAllReports;