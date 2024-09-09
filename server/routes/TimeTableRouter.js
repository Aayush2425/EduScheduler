const express = require("express");
const { updateTimetable, createTimetable } = require("../controller/TimeTableController.js");
const router = express.Router();

// Update Timetable
router.post("/createtimetable", createTimetable);
router.put("/:id", updateTimetable);
router.get("/:uniName/get-timetable", getAllTimetable);

module.exports = router;
