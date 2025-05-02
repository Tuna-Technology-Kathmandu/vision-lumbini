const Category = require("../models/category_model");
const slugify = require("slugify");
const categoryValidation = require("../helper/category_validator");

const createCategory = async (req, res) => {
  try {
    const { error, value } = categoryValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existing = await Category.findOne({ name: value.name });
    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const slug = slugify(value.name, { lower: true });

    const categoryData = {
      name: value.name,
      slug,
      parent: value.parent || null, // parent is optional
    };

    const newCategory = new Category(categoryData);
    await newCategory.save();

    return res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error("Create Category Error:", error);
    return res.status(500).json({ message: "Server error while creating category" });
  }
};

module.exports = createCategory;
