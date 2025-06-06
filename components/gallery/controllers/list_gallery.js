const Gallery = require("../models/gallery_model");

const listAllGallery = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const sortOrder = req.query.sort === "asc" ? 1 : -1;

    const status = req.query.status || "";
    const type = req.query.type || "";

    const searchQuery = {};

    if (status) {
      searchQuery.status = { $regex: status, $options: "i" };
    }

    if (type) {
      searchQuery.type = { $regex: type, $options: "i" };
    }

    const galleries = await Gallery.find(searchQuery)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Gallery.countDocuments(searchQuery);

    return res.status(200).json({
      message: "Galleries fetched successfully",
      galleries,
      pagination: {
        currentPage: page,
        totalEntries: total,
        totalPages: Math.ceil(total / limit),
        entriesPerPage: limit,
      },
    });
  } catch (error) {
    console.error("List All Gallery Error:", error.message);
    return res.status(500).json({ message: "Failed to fetch galleries" });
  }
};

module.exports = listAllGallery;
