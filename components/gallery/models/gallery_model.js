const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: true,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
      default: null,
    },
      video_url: {
      type: String,
      trim: true,
      default: null, 
    },
    video_id: {
      type: String,
      trim: true,
      default: null, 
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
  },
  { timestamps: true }
);

gallerySchema.pre("save", function (next) {
  if (this.video_url) {
    const match = this.video_url.match(
      /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    this.video_id = match ? match[1] : null;
  }
  next();
});

module.exports = mongoose.model("Gallery", gallerySchema);
