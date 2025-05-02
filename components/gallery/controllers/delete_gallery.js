const Gallery = require("../models/gallery_model");

const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    await Gallery.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Gallery deleted successfully",
    });
  } catch (error) {
    console.error("Delete Gallery Error:", error.message);
    return res.status(500).json({ message: "Failed to delete gallery" });
  }
};

module.exports = deleteGallery;
