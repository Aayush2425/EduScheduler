const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  universityEmail: {
    type: String,
    required: true,
    unique:true
  },
  universityName: {
    type: String,
    required: true,
    unique:true
  },
  token: {
    type: String,
  }
});

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
