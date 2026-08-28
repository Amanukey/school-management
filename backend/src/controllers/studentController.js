const Student = require("../models/Student");
const Mark = require("../models/Mark");
const Attendance = require("../models/Attendance");
const StudentPost = require("../models/StudentPost");

const getStudentProfile = async (req, res) => {
  const student = await Student.findOne({ user: req.user._id }).populate("user", "name email role");

  if (!student) {
    return res.status(404).json({ message: "Student profile not found" });
  }

  return res.status(200).json(student);
};

const getStudentMarks = async (req, res) => {
  const student = await Student.findOne({ user: req.user._id });
  if (!student) {
    return res.status(404).json({ message: "Student profile not found" });
  }

  const marks = await Mark.find({ student: student._id })
    .populate({ path: "teacher", populate: { path: "user", select: "name" } })
    .sort({ createdAt: -1 });

  return res.status(200).json(marks);
};

const getStudentAttendance = async (req, res) => {
  const student = await Student.findOne({ user: req.user._id });
  if (!student) {
    return res.status(404).json({ message: "Student profile not found" });
  }

  const attendance = await Attendance.find({ student: student._id })
    .populate({ path: "teacher", populate: { path: "user", select: "name" } })
    .sort({ date: -1 });

  return res.status(200).json(attendance);
};

const getStudentPosts = async (req, res) => {
  const student = await Student.findOne({ user: req.user._id });
  if (!student) {
    return res.status(404).json({ message: "Student profile not found" });
  }

  const posts = await StudentPost.find({ student: student._id })
    .populate({ path: "teacher", populate: { path: "user", select: "name email" } })
    .sort({ createdAt: -1 });

  return res.status(200).json(posts);
};

module.exports = {
  getStudentProfile,
  getStudentMarks,
  getStudentAttendance,
  getStudentPosts,
};
