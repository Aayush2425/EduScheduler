const Faculty = require("../model/FacultyModel.js");

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

module.exports = { updateFaculty };
