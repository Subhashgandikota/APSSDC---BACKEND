const Student = require("../models/Student");
const calculateGrade = require("../utils/calculateGrade");

// Add Student
exports.addStudent = async (req, res) => {
  try {
    const { name, rollNo, subject, marks } = req.body;

    const grade = calculateGrade(marks);

    const student = new Student({
      name,
      rollNo,
      subject,
      marks,
      grade,
    });

    await student.save();

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Student by Roll No
exports.getStudentByRollNo = async (req, res) => {
  try {
    const student = await Student.findOne({ rollNo: req.params.rollNo });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLoginStats = async (req, res) => {
  const LoginLog = require("../models/LoginLog");

  const totalLogins = await LoginLog.countDocuments({ action: "login" });
  const totalSignups = await LoginLog.countDocuments({ action: "signup" });

  res.json({
    logins: totalLogins,
    signups: totalSignups,
  });
};