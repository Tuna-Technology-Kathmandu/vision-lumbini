const Blog = require("../models/blog_model");

const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ blog });
  } catch (error) {
    console.error("Get Blog by Slug Error:", error);
    return res.status(500).json({ message: "Error fetching blog" });
  }
};

module.exports = getBlogBySlug;
