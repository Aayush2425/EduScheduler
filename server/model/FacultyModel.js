const mongoose = require("mongoose");

const FacultySchema = mongoose.Schema({
  factName: {
    type: String,
    required: true,
  },
  dept: [
    {
      deptName: {
        type: String,
        required: true,
      },
    },
  ],
  subjects: [
    {
      subjectName: {
        type: String,
        required: true,
      },
    },
  ],
  availability: [
    {
      day: {
        type: String,
        required: true,
      },
      slots: [Number],
    },
  ],
  teachingType: [
    {
      typeName: {
        type: String,
        required: true,
      },
    },
  ],
});

const Faculty = mongoose.model("Faculty", FacultySchema);
module.exports = Faculty;
