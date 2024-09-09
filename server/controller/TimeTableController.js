const Timetable = require("../model/TimetableModel.js");

// !!!!!!!!!! WORK IN PROGRESS

const createTimetable = async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const { deptName, sem, day } = req.body;

    // Create a new timetable instance using the Timetable model
    const newTimetable = new Timetable({
      deptName,
      sem,
      day,
    });

    // Save the new timetable to the database
    const savedTimetable = await newTimetable.save();

    // Send a success response with the created timetable data
    return res.status(201).json({
      message: 'Timetable created successfully',
      data: savedTimetable,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error creating timetable',
      error: error.message,
    });
  }
};

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

module.exports = { createTimetable, updateTimetable };
