const GenerateTimeTable = require("../logic/TimeTableGenerater.js");
const Timetable = require("../model/TimetableModel.js");
const University = require("../model/UniversityModel.js");

// !!!!!!!!!! WORK IN PROGRESS

const createTimetable = async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const {dept,sem,batch,resources,numOfStudentPerBatch,faculties,uniName} = req.body;


    // Create a new timetable instance using the Timetable model

    console.log(dept,sem,batch,resources,numOfStudentPerBatch,faculties,uniName);
    
    ans=await GenerateTimeTable(dept,sem,batch,resources,numOfStudentPerBatch,faculties,uniName);
    console.log(ans);
    const newTimetable = new Timetable({
      deptName:ans.department,
      sem:ans.sem,
      day:ans.timetable,
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


const getAllTimetable = async (req, res) => {
  const universityName = req.params.uniName;
  try {
    const university = await University.find({ name: universityName }).populate(
      "timetables"
    );
    const timetables = university.timetables;
    return res.status(200).json(timetables);
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error fetching timetable',
      error: error.message,
    });
  }
}

module.exports = { createTimetable, updateTimetable, getAllTimetable };
