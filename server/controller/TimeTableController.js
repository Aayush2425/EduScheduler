const Timetable = require("../model/TimetableModel.js");

// !!!!!!!!!! WORK IN PROGRESS

// Update Timetable
const updateTimetable = async (req, res) => {
  const timetableId = req.params.id;

  // deptName, sem, day[dayName, slot[slotNumber, resource, faculty, batch[]]]
  const updates = req.body;

  try {
    const updatedTimetable = await Timetable.findByIdAndUpdate(
      timetableId,
      updates,
      { new: true }
    );
    if (!updatedTimetable) {
      return res.status(404).json({ message: "Timetable not found" });
    }
    res.status(200).json(updatedTimetable);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating timetable", details: error.message });
  }
};

module.exports = { updateTimetable };
