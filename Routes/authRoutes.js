const express = require("express");
const router = express.Router();
const authentication = require("../Authentication/authentication");

router.route("/sendotp").post(authentication.sendOTP);
router.route("/verifyotp").post(authentication.VerifyOTP);
router.route("/auth").get(authentication.authenticated);

module.exports = router;
