const GeneralDetails = require("../model/GeneralDetailModel.js");

// Update General Details
const updateGeneralDetails = async (req, res) => {
  const generalDetailsId = req.params.id;

  // time { break[] , slots[], resources[]} , days , depts [] , numberOfResources []
  const updates = req.body;

  try {
    const updatedGeneralDetails = await GeneralDetails.findByIdAndUpdate(
      generalDetailsId,
      updates,
      { new: true }
    );
    if (!updatedGeneralDetails) {
      return res.status(404).json({ message: "General Details not found" });
    }
    res.status(200).json(updatedGeneralDetails);
  } catch (error) {
    res.status(500).json({
      error: "Error updating general details",
      details: error.message,
    });
  }
};

module.exports = { updateGeneralDetails };
