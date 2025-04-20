const Testimonial = require("../models/testimonial_model");

const verifyTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    testimonial.status = "approved";
    await testimonial.save();

    return res.status(200).json({
      message: "Testimonial approved successfully",
      testimonial
    });
  } catch (error) {
    console.error("Verify Testimonial Error:", error);
    return res.status(500).json({ message: "Error verifying testimonial" });
  }
};

module.exports = verifyTestimonial;
