const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verify_token");
const checkRole = require("../../../middleware/check_role");

const { createTestimonial, upload } = require("../controllers/create_testimonial");
const listAllTestimonials = require("../controllers/list_all_testimonials");
const getSingleTestimonial = require("../controllers/get_single_testimonial");
const updateTestimonial = require("../controllers/update_testimonial");
const deleteTestimonial = require("../controllers/delete_testimonial");
const verifyTestimonial = require("../controllers/verify_testimonial"); 

router.post("/", verifyToken, checkRole("editor", "admin"), upload.single("photo"), createTestimonial);

router.get("/", listAllTestimonials);

router.get("/:id", getSingleTestimonial);

router.put("/:id", verifyToken, checkRole("editor", "admin"), updateTestimonial);

router.delete("/:id", verifyToken, checkRole("admin"), deleteTestimonial);

router.put("/verify/:id", verifyToken, checkRole("admin"), verifyTestimonial);

module.exports = router;
