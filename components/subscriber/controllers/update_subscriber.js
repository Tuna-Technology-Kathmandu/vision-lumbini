const Subscriber = require("../models/subscriber_model");
const subscriberValidation = require("../helper/subscriber_validator");

const updateSubscriber = async (req, res) => {
  try {
    const subscriberId = req.params.id;

    const { error, value } = subscriberValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email } = value;

    const updatedSubscriber = await Subscriber.findByIdAndUpdate(
      subscriberId,
      { email }, 
      { new: true }  
    ).lean();

    if (!updatedSubscriber) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    return res.status(200).json({
      message: "Subscriber updated successfully",
      subscriber: updatedSubscriber,
    });
  } catch (error) {
    console.error("Error updating subscriber:", error);
    return res.status(500).json({ message: "Failed to update subscriber" });
  }
};

module.exports = updateSubscriber;
