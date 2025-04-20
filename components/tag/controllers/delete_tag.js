const Tag = require("../models/tag_model");

// Delete a tag by ID
const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Tag.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Tag not found" });
    }

    return res.status(200).json({ message: "Tag deleted", deleted });
  } catch (error) {
    console.error("Delete Tag Error:", error);
    return res.status(500).json({ message: "Failed to delete tag" });
  }
};

module.exports = deleteTag;
