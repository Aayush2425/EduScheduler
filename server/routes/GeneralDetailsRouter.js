const express = require("express");
const {
  updateGeneralDetails, createGeneralDetail
} = require("../controller/GeneralDetailsController.js");
const router = express.Router();

// Update General Details
router.post("/creategeneraldetail", createGeneralDetail);
router.put("/:id", updateGeneralDetails);

module.exports = router;
