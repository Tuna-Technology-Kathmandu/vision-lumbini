const Subscriber = require("../models/subscriber_model");

const getSingleSubscriber = async (req, res) => {
  try {
    const subscriberId = req.params.id;

    const subscriber = await Subscriber.findById(subscriberId).lean();

    if (!subscriber) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    return res.status(200).json({
      message: "Subscriber fetched successfully",
      subscriber,
    });
  } catch (error) {
    console.error("Error fetching subscriber:", error);
    return res.status(500).json({ message: "Failed to fetch subscriber" });
  }
};

module.exports = getSingleSubscriber;
