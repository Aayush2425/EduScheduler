const mongoose = require("mongoose");

const SlotSchema = mongoose.Schema({
  slotNumber: {
    type: Number,
    required: true,
  },
  resource: {
    type: String,
    required: true,
  },
  faculty: {
    type: String,
    required: true,
  },
  batch: [String],
});

const DaySchema = mongoose.Schema({
  dayName: {
    type: String,
    required: true,
  },
  slot: [SlotSchema],
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
