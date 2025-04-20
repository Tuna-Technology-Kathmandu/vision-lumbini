const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verify_token");
const checkRole = require("../../../middleware/check_role");

const createSubscriber = require("../controllers/create_subscriber");
const listAllSubscribers = require("../controllers/list_all_subscribers");
const getSingleSubscriber = require("../controllers/get_single_subscriber");
const updateSubscriber = require("../controllers/update_subscriber");
const deleteSubscriber = require("../controllers/delete_subscriber");


router.post("/", createSubscriber);

router.get("/", verifyToken, checkRole("admin", "editor"), listAllSubscribers);

router.get("/:id", verifyToken, checkRole("admin", "editor"), getSingleSubscriber);

router.put("/:id", verifyToken, checkRole("admin", "editor"), updateSubscriber);

router.delete("/:id", verifyToken, checkRole("admin", "editor"), deleteSubscriber);

module.exports = router;
