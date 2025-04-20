const Contact = require("../models/contact_us_model");

// Get a single contact message by ID
const getSingleContactMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Contact.findById(id);

    if (!message) {
      return res.status(404).json({ message: "Contact message not found" });
    }

    return res.status(200).json(message);
  } catch (error) {
    console.error("Get Single Contact Message Error:", error);
    return res.status(500).json({ message: "Failed to retrieve contact message" });
  }
};

module.exports = getSingleContactMessage;
