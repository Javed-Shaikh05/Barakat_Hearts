const { storage } = require("../../server/storage");

module.exports = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const messages = await storage.getRecentMessages(limit);
    res.json(messages);
  } catch (error) {
    console.error("Error in /api/messages/recent:", error);
    res.status(500).json({
      message: "Failed to get recent messages",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
