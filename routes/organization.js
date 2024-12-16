const express = require("express");
const router = express.Router();
const OrganizationController = require("../controllers/organizationController");

router.post("/create-sub-organization",OrganizationController.createOrganization);


module.exports = router;