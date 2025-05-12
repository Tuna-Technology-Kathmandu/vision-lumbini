const Blog = require("../models/blog_model");

const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug })
      .populate("author", "fullname email")
      .populate("categories", "name slug _id") 
      .populate("tags", "name slug");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const recommendations = await Blog.find({
      _id: { $ne: blog._id },
      categories: blog.categories._id
    })
      .populate("author", "fullname")
      .populate("categories", "name slug")
      .limit(3);

    return res.status(200).json({ blog, recommendations });
  } catch (error) {
    console.error("Get Blog by Slug Error:", error);
    return res
      .status(500)
      .json({ message: "Error fetching blog and recommendations" });
  }
};

module.exports = getBlogBySlug;
