const { storage } = require("../../server/storage");

module.exports = async (req, res) => {
  try {
    const message = await storage.getRandomMessage();
    if (!message) {
      return res.status(404).json({ message: "No messages found" });
    }

    // Update user stats when viewing a message
    await storage.updateStreak();
    await storage.incrementHearts(3); // Hearts every 2 hours for viewing

    res.json(message);
  } catch (error) {
    console.error("Error in /api/messages/random:", error);
    res.status(500).json({
      message: "Failed to get random message",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
