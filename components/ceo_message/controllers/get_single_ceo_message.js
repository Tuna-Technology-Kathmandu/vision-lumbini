const CEOMessage = require("../models/ceo_message_model");

const getSingleCEOMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const ceoMessage = await CEOMessage.findById(id);

    if (!ceoMessage) {
      return res.status(404).json({ message: "CEO Message not found" });
    }

    return res.status(200).json({
      message: "CEO Message fetched successfully.",
      ceoMessage,
    });
  } catch (error) {
    console.error("Get CEO Message Error:", error);
    return res.status(500).json({ message: "Server error while fetching CEO message" });
  }
};

module.exports = getSingleCEOMessage;
