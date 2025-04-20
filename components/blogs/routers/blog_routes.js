const express = require("express");
const router = express.Router();

const multer = require("multer");
const { storage } = require("../../../config/cloudinary");
const upload = multer({ storage });

const verifyToken = require("../../../middleware/verify_token");
const checkRole = require("../../../middleware/check_role");

const createBlog = require("../controllers/create_blog");
const listAllBlogs = require("../controllers/list_all_blogs");
const getSingleBlog = require("../controllers/get_single_blog");
const updateBlog = require("../controllers/update_blog");
const deleteBlog = require("../controllers/delete_blog");
const verifyBlog = require("../controllers/verify_blog");
const getBlogBySlug = require("../controllers/get_blog_by_slug");

router.post("/", verifyToken, checkRole("admin", "editor"), upload.fields([{ name: "image", maxCount: 10 }]), createBlog);
router.get("/", listAllBlogs);
router.get("/:id", getSingleBlog);
router.put("/:id", verifyToken, checkRole("admin", "editor"), updateBlog);
router.delete("/:id", verifyToken, checkRole("admin"), deleteBlog);
router.put("/verify/:id", verifyToken, checkRole("admin"), verifyBlog);
router.get("/slug/:slug", getBlogBySlug);

module.exports = router;
