const mongoose = require("mongoose");

const ResourceAvailabilitySchema = mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  slots: [Number],
});

const ResourceSchema = mongoose.Schema({
  type: {
    type: String,k
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  availability: [ResourceAvailabilitySchema],
});

const Resource = mongoose.model("Resource", ResourceSchema);
module.exports = Resource;
