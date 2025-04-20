const Blog = require("../models/blog_model");

const verifyBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.status = "approved";
    await blog.save();

    return res.status(200).json({
      message: "Blog approved successfully",
      blog,
    });
  } catch (error) {
    console.error("Verify Blog Error:", error);
    return res.status(500).json({ message: "Error approving blog" });
  }
};

module.exports = verifyBlog;
