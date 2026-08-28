const mongoose = require("mongoose");

const markSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
    subject: { type: String, required: true },
    examType: { type: String, required: true },
    score: { type: Number, required: true, min: 0, max: 100 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mark", markSchema);
