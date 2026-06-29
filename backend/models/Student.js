const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: String,
    rollNo: String,
    subject: String,
    marks: Number,
    grade: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);