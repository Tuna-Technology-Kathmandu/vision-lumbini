const mongoose = require("mongoose");

const ceoMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    position: {
      type: String,
      required: [true, "Position is required"],  
      trim: true,
    },
    photo: {
      type: String,
      trim: true,
      default: "",  
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("CEOMessage", ceoMessageSchema);
