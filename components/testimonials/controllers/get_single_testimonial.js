const Testimonial = require("../models/testimonial_model");

// Get a single testimonial by ID
const getSingleTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    return res.status(200).json(testimonial);
  } catch (error) {
    console.error("Get Testimonial Error:", error);
    return res.status(500).json({ message: "Failed to retrieve testimonial" });
  }
};

module.exports = getSingleTestimonial;
