const Contact = require("../models/contact_us_model");

const listAllContactMessages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortOrder = req.query.sort === "asc" ? 1 : -1; 

    const search = req.query.search || "";

    const searchQuery = search
      ? { name: { $regex: search, $options: "i" } }
      : {}; 

    const messages = await Contact.find(searchQuery)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean();



    const totalMessages = await Contact.countDocuments(searchQuery);

    return res.status(200).json({
      message: "Contact messages fetched successfully",
      messages,
      pagination: {
        currentPage: page,
        totalMessages,
        totalPages: Math.ceil(totalMessages / limit),
        messagesPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Get Contact Messages Error:", error);
    return res.status(500).json({ message: "Failed to fetch contact messages" });
  }
};

module.exports = listAllContactMessages;
