const Resource = require("../model/ResourceModel.js");

const createResource = async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const { type, name, availability } = req.body;

    // Create a new resource instance using the Resource model
    const newResource = new Resource({
      type,
      name,
      availability,
    });

    // Save the new resource to the database
    const savedResource = await newResource.save();

    // Send a success response with the created resource data
    return res.status(201).json({
      message: 'Resource created successfully',
      data: savedResource,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error creating resource',
      error: error.message,
    });
  }
};

// Update Resource Details
const updateResource = async (req, res) => {
  const resourceId = req.params.id;

  // day , slots [] , type , name , availability []

  const updates = req.body;

  try {
    const updatedResource = await Resource.findByIdAndUpdate(
      resourceId,
      updates,
      { new: true }
    );
    if (!updatedResource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json(updatedResource);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating resource", details: error.message });
  }
};

module.exports = { createResource, updateResource };
const getAllResource = async (req, res) => {
  const universityName = req.params.uniName;
  try {
    const resources = await University.find({ name: universityName }).populate(
      "resources"
    );
    res.status(200).json(resources);
  }
  catch (error) {
    res.status(500).json({ error: "Error getting resources", details: error.message });
  }
}


module.exports = { updateResource, getAllResource };
