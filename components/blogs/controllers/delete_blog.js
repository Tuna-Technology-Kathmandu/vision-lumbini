const Blog = require("../models/blog_model");

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Blog.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ message: "Blog deleted", deleted });
  } catch (error) {
    console.error("Delete Blog Error:", error);
    return res.status(500).json({ message: "Error deleting blog" });
  }
};

module.exports = deleteBlog;
