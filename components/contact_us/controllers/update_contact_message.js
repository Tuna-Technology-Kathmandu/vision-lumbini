const Contact = require("../models/contact_us_model");

const updateContactMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["unread", "read", "response"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedMessage = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ message: "Contact message not found" });
    }

    return res.status(200).json({
      message: "Contact message updated successfully",
      updatedMessage,
    });
  } catch (error) {
    console.error("Update Contact Message Error:", error);
    return res.status(500).json({ message: "Failed to update contact message" });
  }
};

module.exports = updateContactMessage;
