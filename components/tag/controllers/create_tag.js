const Tag = require("../models/tag_model");
const slugify = require("slugify");
const tagValidator = require("../helper/tag_validator");

// Create a tag
const createTag = async (req, res) => {
  try {
    const { error, value } = tagValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name } = value;

    const existing = await Tag.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Tag already exists" });
    }

    const slug = slugify(name, { lower: true });
    const newTag = new Tag({ name, slug });
    await newTag.save();

    return res.status(201).json({ message: "Tag created", tag: newTag });
  } catch (error) {
    console.error("Create Tag Error:", error);
    return res.status(500).json({ message: "Server error while creating tag" });
  }
};

module.exports = createTag;
