const Report = require('../models/report_model');

const deleteReport = async (req, res) => {
  try {
    const { id } = req.params; 

   
    const deleted = await Report.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Report not found" });
    }

    return res.status(200).json({
      message: "Report deleted successfully",
      deleted,
    });
  } catch (error) {
    console.error("Delete Report Error:", error);
    return res.status(500).json({ message: "Failed to delete report" });
  }
};

module.exports = deleteReport;
