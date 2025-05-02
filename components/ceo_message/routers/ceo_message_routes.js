const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verify_token");
const checkRole = require("../../../middleware/check_role");

const { createCEOMessage, upload } = require("../controllers/create_ceo_message");
const listAllCEOMessages = require("../controllers/list_all_ceo_messages");
const getSingleCEOMessage = require("../controllers/get_single_ceo_message");
const updateCEOMessage = require("../controllers/update_ceo_message");
const deleteCEOMessage = require("../controllers/delete_ceo_message");

router.post("/", verifyToken, checkRole("admin", "editor"), upload.single("photo"), createCEOMessage);

router.get("/", listAllCEOMessages);

router.get("/:id", getSingleCEOMessage);

router.put("/:id", verifyToken, checkRole("admin", "editor"), upload.single("photo"), updateCEOMessage);

router.delete("/:id", verifyToken, checkRole("admin", "editor"), deleteCEOMessage);

module.exports = router;
