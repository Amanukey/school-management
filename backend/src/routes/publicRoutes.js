const express = require("express");
const {
  submitTestimonial,
  getApprovedTestimonials,
  uploadGalleryImage,
  getGalleryImages,
  getHomeContent,
} = require("../controllers/publicController");
const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/home", getHomeContent);
router.get("/testimonials", getApprovedTestimonials);
router.post("/testimonials", submitTestimonial);
router.get("/gallery", getGalleryImages);
router.post("/gallery", protect, authorize("admin"), upload.single("image"), uploadGalleryImage);

module.exports = router;
