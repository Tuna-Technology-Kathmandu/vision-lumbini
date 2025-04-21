const Model = require("../models/AreaInvestmentModel");

const listAllCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortOrder = req.query.sort === "asc" ? 1 : -1; 


    const search = req.query.search || "";

    const searchQuery = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    const categories = await Model.find(searchQuery)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean();


    const totalCategories = await Model.countDocuments(searchQuery);

    return res.status(200).json({
      message: "Item fetched successfully",
      categories,
      pagination: {
        currentPage: page,
        totalCategories,
        totalPages: Math.ceil(totalCategories / limit),
        categoriesPerPage: limit,
      },
    });
  } catch (error) {
    console.error("List Error:", error);
    return res.status(500).json({ message: "Failed to fetch" });
  }
};

module.exports = listAllCategories;
