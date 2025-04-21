const AreaInvestmentModel = require("../models/AreaInvestmentModel");

// Delete category by ID
const deleteInvestment = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await AreaInvestmentModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Investment not found" });
    }

    return res.status(200).json({
      message: "Investment deleted successfully",
      deleted,
    });
  } catch (error) {
    console.error("Delete Investment Error:", error);
    return res.status(500).json({ message: "Failed to delete investment" });
  }
};

module.exports = deleteInvestment;
