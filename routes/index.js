// index.js
const express = require("express");
const router = express.Router();

// Import route handlers
const organizationRoutes = require("./organization");
const otpRoutes = require("./otpController");

router.use("/organization", organizationRoutes);
router.use("/otp", otpRoutes);

module.exports = router;