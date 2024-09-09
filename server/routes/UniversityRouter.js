const express = require("express");
const { updateUniversity, createUniversity } = require("../controller/UniversityController.js");
const router = express.Router();

// Update University
router.post("/createuniversity", createUniversity);
router.put("/:id", updateUniversity);

module.exports = router;
