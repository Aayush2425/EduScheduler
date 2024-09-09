const Resource = require("../model/ResourceModel.js");

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

module.exports = { updateResource };
