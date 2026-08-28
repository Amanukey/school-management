const mongoose = require("mongoose");

const schoolDataSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["course", "class", "section"],
      required: true,
    },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

schoolDataSchema.index({ type: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("SchoolData", schoolDataSchema);
