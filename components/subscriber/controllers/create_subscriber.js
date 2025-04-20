const Subscriber = require("../models/subscriber_model");
const subscriberValidation = require("../helper/subscriber_validator");

const createSubscriber = async (req, res) => {
  try {
    const { error, value } = subscriberValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email } = value;  

    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    return res.status(201).json({
      message: "Subscribed successfully",
      subscriber: newSubscriber,
    });
  } catch (error) {
    console.error("Error subscribing:", error);
    return res.status(500).json({ message: "Failed to subscribe" });
  }
};

module.exports = createSubscriber;
