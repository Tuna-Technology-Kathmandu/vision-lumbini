const Testimonial = require("../models/testimonial_model");

const listAllTestimonials = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortOrder = req.query.sort === "asc" ? 1 : -1; 

    const search = req.query.search || "";
    const searchQuery =  search
    ? { fullname: { $regex: search, $options: "i" } }
    : {};

    const testimonials = await Testimonial.find(searchQuery)
    .sort({ createdAt: sortOrder }) 
    .skip(skip)
    .limit(limit)
    .lean();

    const totalTestimonials = await Testimonial.countDocuments(searchQuery)

    return res.status(200).json({
      message: "Testimonials fetched successfully",
      testimonials,
      pagination: {
        currentPage: page,
        totalTestimonials,
        totalPages: Math.ceil(totalTestimonials / limit),
        TestimonialsPerPage: limit,
      },
    });

  } catch (error) {
    console.error("List Testimonials Error:", error);
    return res.status(500).json({ message: "Failed to fetch testimonials" });
  }
};

module.exports = listAllTestimonials;
