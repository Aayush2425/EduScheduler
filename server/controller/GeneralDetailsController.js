const GeneralDetails = require("../model/GeneralDetailModel.js");

const createGeneralDetail = async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const { time, days, depts, numberOfResources } = req.body;

    // Create a new general details instance using the GeneralDetails model
    const newGeneralDetail = new GeneralDetails({
      time,
      days,
      depts,
      numberOfResources,
    });

    // Save the new general details to the database
    const savedGeneralDetail = await newGeneralDetail.save();

    // Send a success response with the created general detail data
    return res.status(201).json({
      message: 'General details created successfully',
      data: savedGeneralDetail,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error creating general details',
      error: error.message,
    });
  }
};

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

const getAllGeneralDetails = async (req, res) => {
  const universityName = req.params.uniName;
  try {
    const generalDetails = await University.find({ name: universityName }).populate(
      "generalDetails"
    );
    res.status(200).json(generalDetails);
  }
  catch (error) {
    res.status(500).json({ error: "Error getting general details", details: error.message });
  }
}

module.exports = { updateGeneralDetails, getAllGeneralDetails, createGeneralDetail };
