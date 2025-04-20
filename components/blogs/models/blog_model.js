const { required } = require("joi");
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    categories: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    image_url: { type: String, trim: true, default: "" },
    status: {type: String, enum: ["draft", "pending", "published"], default: "published"},
    is_featured: { type: Boolean, default: false }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
