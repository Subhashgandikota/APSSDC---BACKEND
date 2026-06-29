const express = require("express");
const router = express.Router();

const {
  addStudent,
  getStudents,
  getStudentByRollNo,
} = require("../controllers/studentController");

router.post("/add", addStudent);
router.get("/", getStudents);
router.get("/:rollNo", getStudentByRollNo);

module.exports = router;