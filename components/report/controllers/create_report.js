const Report = require("../models/report_model");
const reportValidator = require("../helper/report_validator");
const multer = require("multer");
const { storage } = require("../../../config/cloudinary");
const upload = multer({ storage });

const createReport = async (req, res) => {
  try {
    const { error, value } = reportValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingReport = await Report.findOne({ title: value.title });
    if (existingReport) {
      return res.status(409).json({ message: "A report with this title already exists." });
    }

    const fileUrl = req.file?.path || "";

    if (!fileUrl) {
      return res.status(400).json({ message: '"file" is required' });
    }

    const newReport = new Report({
      ...value,
      file: fileUrl,
    });

    await newReport.save();

    return res.status(201).json({
      message: "Report created successfully.",
      newReport,
    });

  } catch (error) {
    console.error("Create Report Error:", error);
    return res.status(500).json({ message: "Server error while creating report" });
  }
};

module.exports = { createReport, upload };
