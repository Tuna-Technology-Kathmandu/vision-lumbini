const express = require("express");
const router = express.Router();


const verifyToken = require("../../../middleware/verify_token");
const checkRole = require("../../../middleware/check_role");

const {createReport, upload } = require("../controllers/create_report");  
const listAllReports = require("../controllers/list_all_reports");
const getSingleReport = require("../controllers/get_single_report");
const updateReport = require("../controllers/update_report");
const deleteReport = require("../controllers/delete_report");
const verifyReport = require("../controllers/verify_report");

router.post("/", verifyToken, checkRole("admin", "editor"), upload.single("file"), createReport);

router.get("/", listAllReports);

router.get("/:id", getSingleReport);

router.put("/:id", verifyToken, checkRole("admin", "editor"), updateReport);

router.put("/verify/:id", verifyToken, checkRole("admin"), verifyReport);

router.delete("/:id", verifyToken, checkRole("admin"), deleteReport);

module.exports = router;
