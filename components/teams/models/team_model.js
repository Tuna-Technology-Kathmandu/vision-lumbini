const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    salutation: {
      type: String,
      enum: ["Mr.", "Ms.", "Mrs.", "Dr.", "Prof."],
      required: [true, "Salutation is required"],
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
    },
    contactNo: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true,
    },
    photoUrl: {
      type: String,
      default: "",
      trim: true,
    },
    is_board_member: {
      type: Boolean,
      default: false,
    },
    display_position: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Team", teamSchema);
