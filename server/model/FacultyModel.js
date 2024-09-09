const mongoose = require("mongoose");

const FacultySchema = mongoose.Schema({
  factName: {
    type: String,
    required: true,
  },
  dept: {
    type: Array,
  },
  subjects: {
    type: Array,
  },
  availability: [
    {
      day: {
        type: String,
        required: true,
      },
      slots: [Number],
    },
  ],
  teachingType: {
    type: Array,
  },
});

const Faculty = mongoose.model("Faculty", FacultySchema);
module.exports = Faculty;
