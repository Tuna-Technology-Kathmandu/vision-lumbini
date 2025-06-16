const Popup = require("../models/popup_models");

const deletePopup = async (req, res) => {
  try {
    const { id } = req.params;

    const popup = await Popup.findById(id);

    if (!popup) {
      return res.status(404).json({ message: "Popup not found" });
    }

    await Popup.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Popup deleted successfully",
    });
  } catch (error) {
    console.error("Delete Popup Error:", error.message);
    return res.status(500).json({ message: "Failed to delete popup" });
  }
};

module.exports = deletePopup;
