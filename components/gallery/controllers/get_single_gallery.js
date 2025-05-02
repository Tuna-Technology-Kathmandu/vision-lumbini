const Gallery = require("../models/gallery_model");

const getSingleGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findById(id).lean();

    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    return res.status(200).json({
      message: "Gallery fetched successfully",
      gallery,
    });
  } catch (error) {
    console.error("Get Single Gallery Error:", error.message);
    return res.status(500).json({ message: "Failed to fetch gallery" });
  }
};

module.exports = getSingleGallery;
