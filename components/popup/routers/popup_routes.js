
const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verify_token");
const checkRole = require("../../../middleware/check_role");

const { createPopup, upload } = require("../controllers/create_popup");
const { updatePopup } = require("../controllers/update_popup");
const listAllPopup = require("../controllers/list_popup");
const getSinglePopup = require("../controllers/get_single_popup");
const deletePopup = require("../controllers/delete_popup");

router.post("/", verifyToken, checkRole("admin", "editor"), upload.single("image"), createPopup);
router.put("/:id", verifyToken, checkRole("admin", "editor"), upload.single("image"), updatePopup);
router.get("/", listAllPopup);
router.get("/:id", getSinglePopup);
router.delete("/:id", verifyToken, checkRole("admin", "editor"), deletePopup);

module.exports = router;
