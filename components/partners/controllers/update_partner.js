const Partner = require("../models/partner_model");
const partnerValidation = require("../helper/partner_validator");

const updatePartner = async (req, res) => {
  try {
    const partnerId = req.params.id;

    const { error, value } = partnerValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedData = { ...value };

    if (req.file?.path) {
      updatedData.image = req.file.path;
    }

    const updatedPartner = await Partner.findByIdAndUpdate(partnerId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPartner) {
      return res.status(404).json({ message: "Partner not found" });
    }

    return res.status(200).json({
      message: "Partner updated successfully",
      partner: updatedPartner,
    });
  } catch (error) {
    console.error("Update Partner Error:", error);
    return res.status(500).json({ message: "Server error while updating partner" });
  }
};

module.exports = updatePartner;
