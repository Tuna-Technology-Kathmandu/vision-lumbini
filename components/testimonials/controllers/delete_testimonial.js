const Testimonial = require("../models/testimonial_model");

// Delete a testimonial by ID
const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Testimonial.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    return res.status(200).json({
      message: "Testimonial deleted successfully",
      deleted,
    });
  } catch (error) {
    console.error("Delete Testimonial Error:", error);
    return res.status(500).json({ message: "Failed to delete testimonial" });
  }
};

module.exports = deleteTestimonial;
