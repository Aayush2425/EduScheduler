const mongoose = require("mongoose");

const TimeSlotSchema = mongoose.Schema({
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
});

const ResourceSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const DepartmentSchema = mongoose.Schema({
  deptName: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  batches: [String],
});

const GeneralDetailsSchema = mongoose.Schema({
  time: {
    break: [TimeSlotSchema],
    slots: [TimeSlotSchema],
    resources: [TimeSlotSchema],
  },
  days: {
    type: Number,
    required: true,
  },
  depts: [DepartmentSchema],
  numberOfResources: [ResourceSchema],
});

const GeneralDetails = mongoose.model("GeneralDetails", GeneralDetailsSchema);
module.exports = GeneralDetails;
