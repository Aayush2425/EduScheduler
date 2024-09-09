const University = require("../model/UniversityModel.js");

// Update University Details (e.g., admin, generalDetails, etc.)
const updateUniversity = async (req, res) => {
  const universityId = req.params.id;
  const updates = req.body;

  try {
    const updatedUniversity = await University.findByIdAndUpdate(
      universityId,
      updates,
      { new: true }
    );
    if (!updatedUniversity) {
      return res.status(404).json({ message: "University not found" });
    }
    res.status(200).json(updatedUniversity);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating university", details: error.message });
  }
};

module.exports = { updateUniversity };
