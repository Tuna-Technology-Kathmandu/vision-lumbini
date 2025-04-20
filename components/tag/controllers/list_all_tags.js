const Tag = require("../models/tag_model");

const listAllTags = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortOrder = req.query.sort === "asc" ? 1 : -1; 


    const search = req.query.search || "";

    const searchQuery = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    const tags = await Tag.find(searchQuery)
      .sort({ createdAt: sortOrder}) 
      .skip(skip)
      .limit(limit)
      .lean();

    const totalTags = await Tag.countDocuments(searchQuery);

    return res.status(200).json({
      message: "Tags fetched successfully",
      tags,
      pagination: {
        currentPage: page,
        totalTags,
        totalPages: Math.ceil(totalTags / limit),
        tagsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("List Tags Error:", error);
    return res.status(500).json({ message: "Failed to fetch tags" });
  }
};

module.exports = listAllTags;
