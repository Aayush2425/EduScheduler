const express = require("express");
const { updateTimetable } = require("../controller/TimeTableController.js");
const router = express.Router();

// Update Timetable
router.put("/:id", updateTimetable);

module.exports = router;
