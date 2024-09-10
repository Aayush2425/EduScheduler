const mongoose = require("mongoose");
const UniversitySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  generalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GeneralDetails"
  },
  facultyDetails: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
    },
  ],
  resources: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
    },
  ],
  timetables: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Timetable",
    },
  ],
});

const University = mongoose.model("University", UniversitySchema);
module.exports = University;
