const Contact = require("../models/contact_us_model");

// Delete contact message 
const deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Contact message not found" });
    }

    return res.status(200).json({
      message: "Contact message deleted successfully",
      deleted,
    });
  } catch (error) {
    console.error("Delete Contact Message Error:", error);
    return res.status(500).json({ message: "Failed to delete contact message" });
  }
};

module.exports = deleteContactMessage;
