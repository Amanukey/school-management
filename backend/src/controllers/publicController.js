const path = require("path");
const Testimonial = require("../models/Testimonial");
const GalleryImage = require("../models/GalleryImage");

const submitTestimonial = async (req, res) => {
  const { name, role, content } = req.body;

  if (!name || !role || !content) {
    return res.status(400).json({ message: "All testimonial fields are required" });
  }

  const testimonial = await Testimonial.create({ name, role, content, approved: false });
  return res.status(201).json({ message: "Testimonial submitted for review", testimonial });
};

const getApprovedTestimonials = async (_req, res) => {
  const testimonials = await Testimonial.find({ approved: true }).sort({ createdAt: -1 });
  return res.status(200).json(testimonials);
};

const uploadGalleryImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Image file is required" });
  }

  const title = req.body.title || "Gallery Image";
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${path.basename(req.file.path)}`;

  const image = await GalleryImage.create({
    title,
    imageUrl,
  });

  return res.status(201).json(image);
};

const getGalleryImages = async (_req, res) => {
  const images = await GalleryImage.find().sort({ createdAt: -1 });
  return res.status(200).json(images);
};

const getHomeContent = async (_req, res) => {
  return res.status(200).json({
    schoolName: "Atish Central Residential School",
    heroTagline: "Learning today, leading tomorrow.",
    mission:
      "ACRS builds a supportive residential learning environment focused on discipline, creativity, and excellence.",
  });
};

module.exports = {
  submitTestimonial,
  getApprovedTestimonials,
  uploadGalleryImage,
  getGalleryImages,
  getHomeContent,
};
