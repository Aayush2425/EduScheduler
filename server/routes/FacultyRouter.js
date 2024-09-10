const express = require("express");
const {
  updateFaculty,
  getAllFaculty,
  createFaculty,
} = require("../controller/FacultyController.js");
const router = express.Router();

// Update Faculty
router.post("/createfaculty", createFaculty);
router.put("/:id", updateFaculty);
router.get("/:uniName/get-all-faculty", getAllFaculty);

module.exports = router;
