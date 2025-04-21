const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verify_token");
const checkRole = require("../../../middleware/check_role");

const { createPartner, upload } = require("../controllers/create_partner");
const getAllPartners = require("../controllers/list_all_partners");
const updatePartner = require("../controllers/update_partner");
const deletePartner = require("../controllers/delete_partner");

router.post("/",verifyToken, checkRole("admin", "editor"), upload.single("image"), createPartner);
router.get("/", getAllPartners);
router.put("/:id",verifyToken, checkRole("admin", "editor"), updatePartner);
router.delete("/:id",verifyToken, checkRole("admin", "editor"), deletePartner);



module.exports = router;