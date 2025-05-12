const Blog = require("../models/blog_model");
const Category = require("../../category/models/category_model");

const listAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortOrder = req.query.sort === "asc" ? 1 : -1;

    const search = req.query.search || "";
    const status = req.query.status || "";
    const category = req.query.category || "";
    const tag = req.query.tag || "";
    const is_featured = req.query.is_featured; 

    let categoryFilter = {};
    if (category) {
      const catItem = await Category.findOne({ name: category });
      if (!catItem) {
        return res.status(400).json({ message: "Category not found" });
      }
      categoryFilter = { categories: catItem._id };
    }

    const searchQuery = {
      title: { $regex: search, $options: "i" },
      ...(status && { status }),
      ...(tag && { tags: tag }),
      ...(is_featured !== undefined && { is_featured: is_featured === "true" }), 
      ...categoryFilter,
    };

    const blogs = await Blog.find(searchQuery)
      .populate("author", "fullname email")
      .populate("categories", "name slug")
      .populate("tags", "name slug")
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalBlogs = await Blog.countDocuments(searchQuery);

    return res.status(200).json({
      message: "Blogs fetched successfully",
      blogs,
      pagination: {
        currentPage: page,
        totalBlogs,
        totalPages: Math.ceil(totalBlogs / limit),
        blogsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("List Blogs Error:", error);
    return res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

module.exports = listAllBlogs;
