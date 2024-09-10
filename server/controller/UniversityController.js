const University = require("../model/UniversityModel.js");

const createUniversity = async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const { name, admin, generalDetails, facultyDetails, resources, timetables } = req.body;

    // Create a new university instance using the University model
    const newUniversity = new University({
      name,
      admin,
      generalDetails,
      facultyDetails,
      resources,
      timetables,
    });

    // Save the new university to the database
    const savedUniversity = await newUniversity.save();

    // Send a success response with the created university data
    return res.status(201).json({
      message: 'University created successfully',
      data: savedUniversity,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error creating university',
      error: error.message,
    });
  }
};
// Update University Details (e.g., admin, generalDetails, etc.)
const updateUniversity = async (req, res) => {
  const uniName = req.params.id;
  const updates = req.body;

  try {
    // const updatedUniversity = await University.findByOneAndUpdate(
    //   universityId,
    //   updates,
    //   { new: true }
    // );
    const updatedUniversity = await University.findOneAndUpdate(
      { name: uniName },  // Find by name
      { $set: updates },  // Apply the updates (generalDetails or others)
      { new: true }  // Return the updated document
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

const getUniByName = async (req,res) => {
  const uniName = req.params.uniName
  try {
    const uni = await University.find({name : uniName})
    console.log(uni[0]);
    
    if (!uni) {
      return res.status(500).json({message : "No such university"})
    }
    res.status(200).json(uni[0])
  } catch (err) {
    res.status(500)
    .json({ error: "Error Getting A university", details: err.message });
  }
}

module.exports = { createUniversity, updateUniversity, getUniByName };
