const Tag = require("../models/tag_model");
const slugify = require("slugify");
const tagValidator = require("../helper/tag_validator");

// Update a tag
const updateTag = async (req, res) => {
  try {
    const { error, value } = tagValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { id } = req.params;
    const { name } = value;

    const tag = await Tag.findById(id);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    tag.name = name;
    tag.slug = slugify(name, { lower: true });
    await tag.save();

    return res.status(200).json({ message: "Tag updated", tag });
  } catch (error) {
    console.error("Update Tag Error:", error);
    return res.status(500).json({ message: "Error updating tag" });
  }
};

module.exports = updateTag;
