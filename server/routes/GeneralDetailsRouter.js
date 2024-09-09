const express = require("express");
const {
  updateGeneralDetails,
} = require("../controller/GeneralDetailsController.js");
const router = express.Router();

// Update General Details
router.put("/:id", updateGeneralDetails);

module.exports = router;
