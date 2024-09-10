const mongoose = require("mongoose");

const TimeSlotSchema = mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
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
  subjects: [{
    subjectName: String,
    faculty: String,
    credit: [
      {
        resourceName: String,
        quantity: Number 
      }
    ],

  }],
});

const GeneralDetailsSchema = mongoose.Schema({
  time: {
    break: [TimeSlotSchema],
    slots: [TimeSlotSchema],
    resources: [TimeSlotSchema],        // lab - 2h  audi - 1 h   
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
