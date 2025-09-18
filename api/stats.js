const { storage } = require("../server/storage");

module.exports = async (req, res) => {
  try {
    const stats = await storage.getUserStats();
    res.json(stats);
  } catch (error) {
    console.error("Error in /api/stats:", error);
    res.status(500).json({
      message: "Failed to get user stats",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
