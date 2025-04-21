const Partner = require("../models/partner_model");

const getAllPartners = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const sortOrder = req.query.sort === "asc" ? 1 : -1;

    const search = req.query.search || "";
    const searchQuery = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    const partners = await Partner.find(searchQuery)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Partner.countDocuments(searchQuery);

    return res.status(200).json({
      message: "Partners fetched successfully",
      partners,
      pagination: {
        currentPage: page,
        totalEntries: total,
        totalPages: Math.ceil(total / limit),
        entriesPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Get All Partners Error:", error);
    return res.status(500).json({ message: "Failed to fetch partners" });
  }
};

module.exports = getAllPartners;