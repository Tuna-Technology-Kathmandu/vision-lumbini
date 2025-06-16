const mongoose = require("mongoose");

const popupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "draft"],
      default: "draft",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Popup", popupSchema);
