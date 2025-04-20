const Tag = require("../models/tag_model");

// Get a single tag by ID
const getSingleTag = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await Tag.findById(id);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    return res.status(200).json(tag);
  } catch (error) {
    console.error("Get Single Tag Error:", error);
    return res.status(500).json({ message: "Failed to retrieve tag" });
  }
};

module.exports = getSingleTag;
