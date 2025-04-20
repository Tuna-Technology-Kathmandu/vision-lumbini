const Subscriber = require("../models/subscriber_model");

const deleteSubscriber = async (req, res) => {
  try {
    const subscriberId = req.params.id;

    const deletedSubscriber = await Subscriber.findByIdAndDelete(subscriberId);

    if (!deletedSubscriber) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    return res.status(200).json({
      message: "Subscriber deleted successfully",
      subscriber: deletedSubscriber,
    });
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    return res.status(500).json({ message: "Failed to delete subscriber" });
  }
};

module.exports = deleteSubscriber;
