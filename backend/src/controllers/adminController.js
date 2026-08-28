const { validationResult } = require("express-validator");
const User = require("../models/User");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const SchoolData = require("../models/SchoolData");
const Mark = require("../models/Mark");
const Attendance = require("../models/Attendance");
const Testimonial = require("../models/Testimonial");
const GalleryImage = require("../models/GalleryImage");

const getUsers = async (req, res) => {
  const { role, page = 1, limit = 10, search = "" } = req.query;

  const query = {};
  if (role) {
    query.role = role;
  }
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const users = await User.find(query)
    .select("-password")
    .sort({ createdAt: -1 })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));

  const total = await User.countDocuments(query);

  return res.status(200).json({
    data: users,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
    },
  });
};

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    name,
    email,
    password,
    role,
    admissionNo,
    className,
    section,
    employeeId,
    subjectSpecialization,
  } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: "User email already exists" });
  }

  const user = await User.create({ name, email, password, role });

  if (role === "student") {
    await Student.create({
      user: user._id,
      admissionNo,
      className,
      section,
    });
  }

  if (role === "teacher") {
    await Teacher.create({
      user: user._id,
      employeeId,
      subjectSpecialization,
    });
  }

  return res.status(201).json({ message: "User created successfully", user });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.role = role || user.role;
  await user.save();

  return res.status(200).json({ message: "User updated", user });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await Student.deleteOne({ user: id });
  await Teacher.deleteOne({ user: id });
  await User.findByIdAndDelete(id);

  return res.status(200).json({ message: "User deleted" });
};

const createSchoolData = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const schoolData = await SchoolData.create(req.body);
  return res.status(201).json(schoolData);
};

const getSchoolData = async (_req, res) => {
  const items = await SchoolData.find().sort({ type: 1, name: 1 });
  return res.status(200).json(items);
};

const deleteSchoolData = async (req, res) => {
  const item = await SchoolData.findById(req.params.id);
  if (!item) {
    return res.status(404).json({ message: "Data item not found" });
  }

  await SchoolData.findByIdAndDelete(req.params.id);
  return res.status(200).json({ message: "Item removed" });
};

const getOverview = async (_req, res) => {
  const [users, students, teachers, marks, attendance, testimonials, gallery] = await Promise.all([
    User.countDocuments(),
    Student.countDocuments(),
    Teacher.countDocuments(),
    Mark.countDocuments(),
    Attendance.countDocuments(),
    Testimonial.countDocuments(),
    GalleryImage.countDocuments(),
  ]);

  return res.status(200).json({
    users,
    students,
    teachers,
    marks,
    attendance,
    testimonials,
    gallery,
  });
};

const listTestimonials = async (_req, res) => {
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  return res.status(200).json(testimonials);
};

const approveTestimonial = async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) {
    return res.status(404).json({ message: "Testimonial not found" });
  }

  testimonial.approved = req.body.approved;
  await testimonial.save();

  return res.status(200).json(testimonial);
};

const deleteGalleryImage = async (req, res) => {
  const image = await GalleryImage.findById(req.params.id);
  if (!image) {
    return res.status(404).json({ message: "Image not found" });
  }

  await GalleryImage.findByIdAndDelete(req.params.id);
  return res.status(200).json({ message: "Image deleted" });
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  createSchoolData,
  getSchoolData,
  deleteSchoolData,
  getOverview,
  listTestimonials,
  approveTestimonial,
  deleteGalleryImage,
};
