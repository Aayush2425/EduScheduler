const express = require("express");
const { updateFaculty, createFaculty } = require("../controller/FacultyController.js");
const router = express.Router();

// Update Faculty
router.post("/createfaculty", createFaculty)
router.put("/:id", updateFaculty);

module.exports = router;
