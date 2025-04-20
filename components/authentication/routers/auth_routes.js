const express = require("express");
const router = express.Router();

const registerUser = require("../controllers/signup_controller.js");
const loginUser = require("../controllers/signin_controller.js");
const forgotPassword = require("../controllers/forgot_password_controller");
const resetPassword = require("../controllers/reset_password_controller.js");
const { getSecurityQuestions, setSecurityQuestions } = require("../controllers/security_questions.js");
const refreshToken = require("../controllers/refresh_token")

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword); 
router.post("/reset-password", resetPassword);
router.get("/security-questions", getSecurityQuestions);
router.post("/set-security-questions", setSecurityQuestions);
router.post("/refresh-token", refreshToken)

module.exports = router;
