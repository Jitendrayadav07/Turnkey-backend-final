const express = require("express");
const router = express.Router();
const OtpController = require("../controllers/otpController");

router.post("/email-auth",OtpController.emailAuth);

router.post("/verify-otp",OtpController.verifyOtp);

router.post("/generate-otp",OtpController.generateOtp);


module.exports = router;