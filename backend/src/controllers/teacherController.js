const { validationResult } = require("express-validator");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const User = require("../models/User");
const Mark = require("../models/Mark");
const Attendance = require("../models/Attendance");
const StudentPost = require("../models/StudentPost");

const getTeacherModel = async (userId) => {
  return Teacher.findOne({ user: userId });
};

const getStudentsList = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;

  const query = search
    ? {
        $or: [
          { admissionNo: { $regex: search, $options: "i" } },
          { className: { $regex: search, $options: "i" } },
          { section: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const students = await Student.find(query)
    .populate("user", "name email")
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  const total = await Student.countDocuments(query);

  return res.status(200).json({
    data: students,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
    },
  });
};

const upsertMarks = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const teacher = await getTeacherModel(req.user._id);
  if (!teacher) {
    return res.status(404).json({ message: "Teacher profile not found" });
  }

  const { studentId, subject, examType, score } = req.body;

  const mark = await Mark.findOneAndUpdate(
    { student: studentId, subject, examType },
    {
      student: studentId,
      teacher: teacher._id,
      subject,
      examType,
      score,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return res.status(201).json(mark);
};

const upsertAttendance = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const teacher = await getTeacherModel(req.user._id);
  if (!teacher) {
    return res.status(404).json({ message: "Teacher profile not found" });
  }

  const { studentId, studentEmail, date, status } = req.body;

  let resolvedStudentId = studentId;

  if (!resolvedStudentId && studentEmail) {
    const studentUser = await User.findOne({ email: String(studentEmail).toLowerCase(), role: "student" });
    if (!studentUser) {
      return res.status(404).json({ message: "Student not found with this email" });
    }

    const studentProfile = await Student.findOne({ user: studentUser._id });
    if (!studentProfile) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    resolvedStudentId = studentProfile._id;
  }

  if (!resolvedStudentId) {
    return res.status(400).json({ message: "Student ID or student email is required" });
  }

  const attendance = await Attendance.findOneAndUpdate(
    { student: resolvedStudentId, date },
    {
      student: resolvedStudentId,
      teacher: teacher._id,
      date,
      status,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return res.status(201).json(attendance);
};

const getTeacherMarks = async (req, res) => {
  const teacher = await getTeacherModel(req.user._id);
  if (!teacher) {
    return res.status(404).json({ message: "Teacher profile not found" });
  }

  const query = { teacher: teacher._id };
  if (req.query.studentId) {
    query.student = req.query.studentId;
  }

  const marks = await Mark.find(query)
    .populate({ path: "student", populate: { path: "user", select: "name email" } })
    .sort({ createdAt: -1 });

  return res.status(200).json(marks);
};

const createStudentPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const teacher = await getTeacherModel(req.user._id);
  if (!teacher) {
    return res.status(404).json({ message: "Teacher profile not found" });
  }

  const { studentId, category, title, content } = req.body;
  const student = await Student.findById(studentId);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const post = await StudentPost.create({
    teacher: teacher._id,
    student: student._id,
    category,
    title,
    content,
  });

  return res.status(201).json(post);
};

const getTeacherPosts = async (req, res) => {
  const teacher = await getTeacherModel(req.user._id);
  if (!teacher) {
    return res.status(404).json({ message: "Teacher profile not found" });
  }

  const posts = await StudentPost.find({ teacher: teacher._id })
    .populate({ path: "student", populate: { path: "user", select: "name email" } })
    .sort({ createdAt: -1 });

  return res.status(200).json(posts);
};

module.exports = {
  getStudentsList,
  upsertMarks,
  upsertAttendance,
  getTeacherMarks,
  createStudentPost,
  getTeacherPosts,
};
