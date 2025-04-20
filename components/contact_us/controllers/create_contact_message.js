const Contact = require("../models/contact_us_model");
const contactUsValidator = require("../helper/contact_message_validator");

// Create a new contact message
const createContactMessage = async (req, res) => {
  try {
    const { error, value } = contactUsValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newContact = new Contact({ ...value });
    await newContact.save();

    return res.status(201).json({ message: "Message submitted successfully." });
  } catch (error) {
    console.error("Create Contact Message Error:", error);
    return res.status(500).json({ message: "Server error while submitting message" });
  }
};

module.exports = createContactMessage;
