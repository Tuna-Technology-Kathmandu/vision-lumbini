const CEOMessage = require("../models/ceo_message_model");

const deleteCEOMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const ceoMessage = await CEOMessage.findById(id);
    if (!ceoMessage) {
      return res.status(404).json({ message: "CEO Message not found" });
    }

    await ceoMessage.deleteOne();

    return res.status(200).json({ message: "CEO Message deleted successfully" });
  } catch (error) {
    console.error("Delete CEO Message Error:", error);
    return res.status(500).json({ message: "Server error while deleting CEO message" });
  }
};

module.exports = deleteCEOMessage;