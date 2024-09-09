const express = require("express");
const { updateFaculty } = require("../controller/FacultyController.js");
const router = express.Router();

// Update Faculty
router.put("/:id", updateFaculty);

module.exports = router;
