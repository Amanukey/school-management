const { validationResult } = require("express-validator");
const User = require("../models/User");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, admissionNo, className, section } = req.body;
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    return res.status(409).json({ message: "Email already in use" });
  }

  const user = await User.create({
    name,
    email: normalizedEmail,
    password,
    role: "student",
  });

  const student = await Student.create({
    user: user._id,
    admissionNo,
    className,
    section,
  });

  return res.status(201).json({
    message: "Student registered successfully",
    student: {
      id: student._id,
      admissionNo: student.admissionNo,
      className: student.className,
      section: student.section,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    },
  });
};

const teacherRegister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, employeeId, subjectSpecialization, classTeacherOf, phone } = req.body;
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    return res.status(409).json({ message: "Email already in use" });
  }

  const existingTeacher = await Teacher.findOne({ employeeId });
  if (existingTeacher) {
    return res.status(409).json({ message: "Employee ID already in use" });
  }

  const user = await User.create({
    name,
    email: normalizedEmail,
    password,
    role: "teacher",
  });

  await Teacher.create({
    user: user._id,
    employeeId,
    subjectSpecialization,
    classTeacherOf: classTeacherOf || "",
    phone: phone || "",
  });

  return res.status(201).json({
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({ email: normalizedEmail });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  return res.status(200).json({
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

const teacherLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({ email: normalizedEmail });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (user.role !== "teacher") {
    return res.status(403).json({ message: "This login is for teachers only" });
  }

  return res.status(200).json({
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

const getMe = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  let profile = null;
  if (user.role === "student") {
    profile = await Student.findOne({ user: user._id });
  }
  if (user.role === "teacher") {
    profile = await Teacher.findOne({ user: user._id });
  }

  return res.status(200).json({ user, profile });
};

module.exports = {
  register,
  teacherRegister,
  login,
  teacherLogin,
  getMe,
};
