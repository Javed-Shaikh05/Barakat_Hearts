module.exports = async (req, res) => {
  try {
    // Return mock stats for testing
    const stats = {
      id: "user-1",
      totalHearts: 247,
      currentStreak: 12,
      lastVisit: new Date(),
      messagesViewed: 142,
      favoritesCount: 8,
      lastHeartIncrement: new Date(),
    };
    res.json(stats);
  } catch (error) {
    console.error("Error in /api/stats:", error);
    res.status(500).json({
      message: "Failed to get user stats",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
