const Faculty = require("../model/FacultyModel.js");
const University = require("../model/UniversityModel.js");

const createFaculty = async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const { factName, dept, subjects, availability, teachingType } = req.body;

    // Create a new faculty instance using the Faculty model
    const newFaculty = new Faculty({
      factName,
      dept,
      subjects,
      availability,
      teachingType,
    });

    // Save the new faculty to the database
    const savedFaculty = await newFaculty.save();

    // Send a success response with the created faculty data
    return res.status(201).json({
      message: 'Faculty created successfully',
      data: savedFaculty,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error creating faculty',
      error: error.message,
    });
  }
};

// Update Faculty Details
const updateFaculty = async (req, res) => {
  const facultyId = req.params.id;

  // factName:
  // dept: [],
  // subjects: [],
  // availability: [
  //   {
  //     day,
  //     slots: [Number],
  //   },
  // ],
  // teachingType: [],
  const updates = req.body;

  try {
    const updatedFaculty = await Faculty.findByIdAndUpdate(facultyId, updates, {
      new: true,
    });
    if (!updatedFaculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    res.status(200).json(updatedFaculty);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating faculty", details: error.message });
  }
};

const getAllFaculty = async (req, res) => {
  const universityName = req.params.uniName;
  try {
    const faculties = await University.find({ name: universityName }).populate(
      "facultyDetails"
    );
    res.status(200).json(faculties);
  } catch (error) {
    res.status(500).json({ error: "Error getting faculty", details: error.message });
  }
};


module.exports = { updateFaculty, getAllFaculty,createFaculty };
