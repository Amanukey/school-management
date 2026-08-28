const express = require("express");
const {
  getStudentProfile,
  getStudentMarks,
  getStudentAttendance,
  getStudentPosts,
} = require("../controllers/studentController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect, authorize("student"));
router.get("/profile", getStudentProfile);
router.get("/marks", getStudentMarks);
router.get("/attendance", getStudentAttendance);
router.get("/posts", getStudentPosts);

module.exports = router;
