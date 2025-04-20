const express = require("express");
const router = express.Router();

// Auth Routes
const authRoutes = require("./components/authentication/routers/auth_routes");
router.use("/auth", authRoutes);

// Category Routes
const categoryRoutes = require("./components/category/router/category_routes");
router.use("/categories", categoryRoutes);

// Tag Routes
const tagRoutes = require("./components/tag/routers/tag_routes.js");
router.use("/tags", tagRoutes);

// Blog Routes
const blogRoutes = require("./components/blogs/routers/blog_routes");
router.use("/blogs", blogRoutes);

//Contact Us Routes
const contactRoutes = require("./components/contact_us/routers/contact_us_routes.js");
router.use("/contact", contactRoutes);

//Testimonial Routes
const testimonialRoutes = require("./components/testimonials/routers/testimonial_routes.js");
router.use("/testimonials", testimonialRoutes);

// User Routes
const userRoutes = require("./components/users/routers/user_routes.js");
router.use("/users", userRoutes);

//Subscriber Routes
const subscriberRoutes = require("./components/subscriber/routers/subscriber_routes.js");
router.use("/subscribers", subscriberRoutes);

module.exports = router;