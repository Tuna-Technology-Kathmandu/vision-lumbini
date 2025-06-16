const Popup = require("../models/popup_models");

const listAllPopup = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const sortOrder = req.query.sort === "asc" ? 1 : -1;

    const status = req.query.status || "";
    const searchQuery = status
      ? { status: { $regex: status, $options: "i" } }
      : {};

    const popup = await Popup.find(searchQuery)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Popup.countDocuments(searchQuery);

    return res.status(200).json({
      message: "Popup fetched successfully",
      popup,
      pagination: {
        currentPage: page,
        totalEntries: total,
        totalPages: Math.ceil(total / limit),
        entriesPerPage: limit,
      },
    });
  } catch (error) {
    console.error("List All Popup Error:", error.message);
    return res.status(500).json({ message: "Failed to fetch popup" });
  } 
};

module.exports = listAllPopup;
