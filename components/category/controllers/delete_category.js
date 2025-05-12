const Category = require("../models/category_model");

const deleteCategoryRecursive = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the category exists
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Recursive function to delete all subcategories
    const deleteWithChildren = async (categoryId) => {
      const children = await Category.find({ parent: categoryId });

      for (const child of children) {
        await deleteWithChildren(child._id); 
      }

      await Category.findByIdAndDelete(categoryId); 
    };

    // Start recursive deletion
    await deleteWithChildren(id);

    return res.status(200).json({
      message: "Category and its subcategories deleted successfully",
    });
  } catch (error) {
    console.error("Recursive Delete Category Error:", error);
    return res.status(500).json({ message: "Failed to delete category" });
  }
};

module.exports = deleteCategoryRecursive;
