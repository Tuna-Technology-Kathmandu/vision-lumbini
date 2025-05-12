const Report = require('../models/report_model');

const getSingleReport = async (req, res) => {
  try {
    const { id } = req.params; 

    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    return res.status(200).json(report);
  } catch (error) {
    console.error("Get Single Report Error:", error);
    return res.status(500).json({ message: "Failed to retrieve report" });
  }
};

module.exports = getSingleReport;
