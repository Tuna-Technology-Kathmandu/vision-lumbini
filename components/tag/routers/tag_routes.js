const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verify_token");
const checkRole = require("../../../middleware/check_role");

const createTag = require("../controllers/create_tag");
const listAllTags = require("../controllers/list_all_tags");
const getSingleTag = require("../controllers/get_single_tag");
const updateTag = require("../controllers/update_tag");
const deleteTag = require("../controllers/delete_tag");

router.post("/", verifyToken, checkRole("admin", "editor"), createTag);
router.get("/", verifyToken, checkRole("admin", "editor"), listAllTags);
router.get("/:id", verifyToken, checkRole("admin", "editor"), getSingleTag);
router.put("/:id", verifyToken, checkRole("admin", "editor"), updateTag);
router.delete("/:id", verifyToken, checkRole("admin", "editor"), deleteTag);

module.exports = router;
