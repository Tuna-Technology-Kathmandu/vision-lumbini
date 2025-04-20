const Blog = require("../models/blog_model");
const slugify = require("slugify");

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.title) {
      updates.slug = slugify(updates.title, { lower: true });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updates, {
      new: true,
    })
      .populate("author", "fullname email")
      .populate("categories", "name slug")
      .populate("tags", "name slug");

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({
      message: "Blog updated successfully",
      updatedBlog,
    });
  } catch (error) {
    console.error("Update Blog Error:", error);
    return res.status(500).json({ message: "Error updating blog" });
  }
};

module.exports = updateBlog;
