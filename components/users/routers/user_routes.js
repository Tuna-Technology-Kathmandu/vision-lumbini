const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verify_token");
const checkRole = require("../../../middleware/check_role");

const listAllUsers = require("../controllers/list_all_users");
const getSingleUser = require("../controllers/get_single_user");
const updateUser = require("../controllers/update_user");
const deleteUser = require("../controllers/delete_user");

router.get("/", verifyToken, checkRole("admin", "editor"), listAllUsers);
router.get("/:id", verifyToken, checkRole("admin", "editor"), getSingleUser);
router.put("/:id", verifyToken, checkRole("admin", "editor"), updateUser);
router.delete("/:id", verifyToken, checkRole("admin", "editor"), deleteUser);

module.exports = router;
