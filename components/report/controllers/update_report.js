const Report = require('../models/report_model');
const reportValidation = require('../helper/report_validator'); 

const updateReport = async (req, res) => {
  try {
    const { id } = req.params; 

    const { error, value } = reportValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    report.set({ ...value });

    report.status = 'pending'
    await report.save();

    return res.status(200).json({
      message: "Report updated. Awaiting admin verification.",
      report,
    });
  } catch (error) {
    console.error("Update Report Error:", error);
    return res.status(500).json({ message: "Error updating report" });
  }
};

module.exports = updateReport;
