const Category = require("../models/category_model");

// Delete category by ID
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({
      message: "Category deleted successfully",
      deleted,
    });
  } catch (error) {
    console.error("Delete Category Error:", error);
    return res.status(500).json({ message: "Failed to delete category" });
  }
};

module.exports = deleteCategory;
