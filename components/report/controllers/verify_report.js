const Report = require('../models/report_model');

const verifyReport = async (req, res) => {
  try {
    const { id } = req.params; 

    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    report.status = 'approved';
    
    await report.save();

    return res.status(200).json({
      message: "Report verified successfully",
      report,
    });
  } catch (error) {
    console.error("Verify Report Error:", error);
    return res.status(500).json({ message: "Error verifying report" });
  }
};

module.exports = verifyReport;
