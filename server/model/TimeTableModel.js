const mongoose = require("mongoose");

// const SlotSchema = mongoose.Schema({
//   type:Array,
// });

const DaySchema = mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  studySlot:[Array],
});

const TimetableSchema = mongoose.Schema({
  deptName: {
    type: String,
    required: true,
  },
  sem: {
    type: String,
    required: true,
  },
  day: [DaySchema],
});

const Timetable = mongoose.model("Timetable", TimetableSchema);
module.exports = Timetable;
