const express = require("express");
const { body } = require("express-validator");
const { register, teacherRegister, login, teacherLogin, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/register",
  protect,
  authorize("teacher"),
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").trim().normalizeEmail().isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("admissionNo").notEmpty().withMessage("Admission number is required"),
    body("className").notEmpty().withMessage("Class is required"),
    body("section").notEmpty().withMessage("Section is required"),
  ],
  register
);

router.post(
  "/teacher-register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").trim().normalizeEmail().isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("employeeId").notEmpty().withMessage("Employee ID is required"),
    body("subjectSpecialization").notEmpty().withMessage("Subject specialization is required"),
  ],
  teacherRegister
);

router.post(
  "/login",
  [
    body("email").trim().normalizeEmail().isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

router.post(
  "/teacher-login",
  [
    body("email").trim().normalizeEmail().isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  teacherLogin
);

router.get("/me", protect, getMe);

module.exports = router;
