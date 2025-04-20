const User = require("../models/user_model");

const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortOrder = req.query.sort === "asc" ? 1 : -1; 

    const search = req.query.search || "";
    const searchQuery = {
      fullname: { $regex: search, $options: "i" }
    };

    const users = await User.find(searchQuery, "-password -resetPasswordToken -resetPasswordExpires")
      .sort({ createdAt: sortOrder }) 
      .skip(skip)
      .limit(limit)
      .lean();

    const totalUsers = await User.countDocuments(searchQuery);

    return res.status(200).json({
      message: "Users fetched successfully",
      users,
      pagination: {
        currentPage: page,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        usersPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Get Users Error:", error);
    return res.status(500).json({ message: "Failed to fetch users" });
  }
};

module.exports = getAllUsers;
