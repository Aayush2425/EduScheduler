const express = require("express");
const { updateUniversity, createUniversity, getUniByName } = require("../controller/UniversityController.js");
const router = express.Router();

// Update University
router.post("/createuniversity", createUniversity);
router.put("/:id", updateUniversity);
router.get("/:uniName", getUniByName)

module.exports = router;
