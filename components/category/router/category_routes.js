const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verify_token");
const checkRole = require("../../../middleware/check_role");

const createCategory = require("../controllers/create_category");
const listAllCategories = require("../controllers/list_all_category");
const getSingleCategory = require("../controllers/get_single_category");
const updateCategory = require("../controllers/update_category");
const deleteCategory = require("../controllers/delete_category");

router.post("/", verifyToken, checkRole("admin", "editor"), createCategory);

router.get("/", listAllCategories);

router.get("/:id", verifyToken, checkRole("admin", "editor"), getSingleCategory);

router.put("/:id", verifyToken, checkRole("admin", "editor"), updateCategory);

router.delete("/:id", verifyToken, checkRole("admin", "editor"), deleteCategory);

module.exports = router;
