const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verify_token");
const checkRole = require("../../../middleware/check_role");

const { createTeamMember, upload } = require("../controllers/create_team_member");
const listAllTeamMembers = require("../controllers/list_all_team_members");
const getSingleTeamMember = require("../controllers/get_single_team_member");
const updateTeamMember = require("../controllers/update_team_member");
const deleteTeamMember = require("../controllers/delete_team_member");
const verifyTeamMember = require("../controllers/verify_team_member"); 


router.post("/", upload.single("photo"), createTeamMember);
router.get("/:id", getSingleTeamMember);
router.get("/", listAllTeamMembers);
router.put("/:id", verifyToken, checkRole("admin", "editor"), updateTeamMember);
router.put("/verify/:id", verifyToken, checkRole("admin"), verifyTeamMember);
router.delete("/:id", verifyToken, checkRole("admin"), deleteTeamMember);

module.exports = router;
