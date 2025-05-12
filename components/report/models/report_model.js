const { required } = require("joi");
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    fiscalYear: {
      type: String,
      required: true,
      match: [/^\d{4}\/\d{2}$/, "Fiscal year must be in format YYYY/YY"], 
    },
    quarter: {
      type: String,
      enum: ["Quarter-1", "Quarter-2", "Quarter-3", "Quarter-4"],
      required: true,
    },
    file: { 
      type: String, 
      trim: true, 
      default: "" 
    },
    status: {
      type: String, 
      enum: ["pending", "approved"], 
      default: "pending", 
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
