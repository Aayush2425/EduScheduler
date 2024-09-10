const express = require("express");
const {
  updateGeneralDetails,
  getAllGeneralDetails,
  createGeneralDetail,
  getGeneralDetailsById
} = require("../controller/GeneralDetailsController.js");
const router = express.Router();

// Update General Details
router.post("/creategeneraldetail", createGeneralDetail);
router.put("/:id", updateGeneralDetails);
router.get("/:uniName/get-details", getAllGeneralDetails);
router.get("/:id", getGeneralDetailsById);

module.exports = router;
