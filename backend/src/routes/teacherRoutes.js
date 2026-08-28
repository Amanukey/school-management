const express = require("express");
const { body } = require("express-validator");
const {
  getStudentsList,
  upsertMarks,
  upsertAttendance,
  getTeacherMarks,
  createStudentPost,
  getTeacherPosts,
} = require("../controllers/teacherController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect, authorize("teacher"));

router.get("/students", getStudentsList);
router.get("/marks", getTeacherMarks);

router.post(
  "/marks",
  [
    body("studentId").notEmpty().withMessage("Student is required"),
    body("subject").notEmpty().withMessage("Subject is required"),
    body("examType").notEmpty().withMessage("Exam type is required"),
    body("score").isFloat({ min: 0, max: 100 }).withMessage("Score should be between 0 and 100"),
  ],
  upsertMarks
);

router.post(
  "/attendance",
  [
    body("studentId")
      .optional()
      .notEmpty()
      .withMessage("Student ID cannot be empty"),
    body("studentEmail")
      .optional()
      .isEmail()
      .withMessage("Student email must be valid"),
    body().custom((value) => {
      if (!value.studentId && !value.studentEmail) {
        throw new Error("Student ID or student email is required");
      }
      return true;
    }),
    body("date").isISO8601().withMessage("Valid date is required"),
    body("status").isIn(["present", "absent", "late"]).withMessage("Invalid attendance status"),
  ],
  upsertAttendance
);

router.get("/posts", getTeacherPosts);

router.post(
  "/posts",
  [
    body("studentId").notEmpty().withMessage("Student is required"),
    body("category").isIn(["academic", "sports"]).withMessage("Category must be academic or sports"),
    body("title").notEmpty().withMessage("Post title is required"),
    body("content").notEmpty().withMessage("Post content is required"),
  ],
  createStudentPost
);

module.exports = router;
