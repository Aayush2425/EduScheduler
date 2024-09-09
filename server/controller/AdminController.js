const Admin = require("../model/AdminModel.js");

// Update Admin Details
const updateAdmin = async (req, res) => {
  const adminId = req.params.id;

  //  universityEmail , username , password , personalUniEmail
  const updates = req.body;

  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updates, {
      new: true,
    });
    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating admin", details: error.message });
  }
};

module.exports = { updateAdmin };
