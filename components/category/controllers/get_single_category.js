const Category = require("../models/category_model");

// Get a single category by ID
const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json(category);
  } catch (error) {
    console.error("Get Single Category Error:", error);
    return res.status(500).json({ message: "Failed to retrieve category" });
  }
};

module.exports = getSingleCategory;
