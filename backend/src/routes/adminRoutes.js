const express = require("express");
const { body } = require("express-validator");
const {
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
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect, authorize("admin"));

router.get("/users", getUsers);
router.post(
  "/users",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("role").isIn(["student", "teacher", "admin"]).withMessage("Invalid role"),
  ],
  createUser
);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.get("/school-data", getSchoolData);
router.post(
  "/school-data",
  [
    body("type").isIn(["course", "class", "section"]).withMessage("Invalid type"),
    body("name").notEmpty().withMessage("Name is required"),
  ],
  createSchoolData
);
router.delete("/school-data/:id", deleteSchoolData);

router.get("/overview", getOverview);

router.get("/testimonials", listTestimonials);
router.patch("/testimonials/:id", approveTestimonial);

router.delete("/gallery/:id", deleteGalleryImage);

module.exports = router;
