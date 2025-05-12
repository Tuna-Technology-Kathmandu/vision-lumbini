const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verify_token");
const checkRole = require("../../../middleware/check_role");


const { createCompanyInfo, upload } = require("../controllers/create_company_info");
const getCompanyInfo = require("../controllers/get_company_info");
const listCompanyInfo = require("../controllers/list_company_info");
const { updateCompanyInfo }= require("../controllers/update_company_info");
const deleteCompanyInfo = require("../controllers/delete_company_info");

router.post("/",verifyToken, checkRole("admin", "editor"), upload.array("image", 3), createCompanyInfo);
router.get("/", listCompanyInfo);
router.get("/:id", getCompanyInfo);
router.put("/:id",verifyToken, checkRole("admin", "editor"), upload.array("image", 3), updateCompanyInfo);
router.delete("/:id",verifyToken, checkRole("admin", "editor"), deleteCompanyInfo);

module.exports = router;
