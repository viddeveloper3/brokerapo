const express = require("express");
const router = express.Router();
const authentication = require("../Authentication/authentication");

// router.route("/signup").post(authentication.signup);
// router.route("/login").post(authentication.login);

router.route("/sendotp").post(authentication.sendOTP);
router.route("/verifyotp").post(authentication.VerifyOTP);

module.exports = router;
