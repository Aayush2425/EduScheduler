const express = require("express");
const { updateUniversity } = require("../controller/UniversityController.js");
const router = express.Router();

// Update University
router.put("/:id", updateUniversity);

module.exports = router;
