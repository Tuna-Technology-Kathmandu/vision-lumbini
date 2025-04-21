const Partner = require("../models/partner_model");

const deletePartner = async (req, res) => {
  try {
    const partnerId = req.params.id;

    const deletedPartner = await Partner.findByIdAndDelete(partnerId);

    if (!deletedPartner) {
      return res.status(404).json({ message: "Partner not found" });
    }

    return res.status(200).json({
      message: "Partner deleted successfully",
      partner: deletedPartner,
    });
  } catch (error) {
    console.error("Delete Partner Error:", error);
    return res.status(500).json({ message: "Server error while deleting partner" });
  }
};

module.exports = deletePartner;
