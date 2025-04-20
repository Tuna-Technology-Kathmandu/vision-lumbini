const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verify_token");
const checkRole = require("../../../middleware/check_role");

const createContactMessage = require("../controllers/create_contact_message");
const listAllContactMessages = require("../controllers/list_all_contact_messages");
const getSingleContactMessage = require("../controllers/get_single_contact_message");
const updateContactMessage = require("../controllers/update_contact_message");
const deleteContactMessage = require("../controllers/delete_contact_message");

router.post("/", createContactMessage);

router.get("/", verifyToken, checkRole("admin", "editor"), listAllContactMessages);

router.get("/:id", verifyToken, checkRole("admin", "editor"), getSingleContactMessage);

router.put("/:id", updateContactMessage);

router.delete("/:id", verifyToken, checkRole("admin"), deleteContactMessage);

module.exports = router;
