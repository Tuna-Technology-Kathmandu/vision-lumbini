const Subscriber = require("../models/subscriber_model");

const listAllSubscribers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;  
    const limit = parseInt(req.query.limit) || 10;  
    const skip = (page - 1) * limit;  

    const sortOrder = req.query.sort === "asc" ? 1 : -1;

    const search = req.query.search || "";
    const searchQuery = search
      ? { email: { $regex: search, $options: "i" } }  
      : {};  

    const subscribers = await Subscriber.find(searchQuery)
      .sort({ createdAt: sortOrder })  
      .skip(skip) 
      .limit(limit) 
      .lean(); 

    const totalSubscribers = await Subscriber.countDocuments(searchQuery);

    return res.status(200).json({
      message: "Subscribers fetched successfully",
      subscribers,
      pagination: {
        currentPage: page,
        totalSubscribers,
        totalPages: Math.ceil(totalSubscribers / limit),  
        subscribersPerPage: limit,
      },
    });
  } catch (error) {
    console.error("List Subscribers Error:", error);
    return res.status(500).json({ message: "Failed to fetch subscribers" });
  }
};

module.exports = listAllSubscribers;
