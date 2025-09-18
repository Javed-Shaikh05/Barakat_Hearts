// Static user stats embedded directly
let userStats = {
  id: "user-1",
  totalHearts: 347,
  currentStreak: 18,
  lastVisit: new Date(),
  messagesViewed: 156,
  favoritesCount: 12,
  lastHeartIncrement: new Date(),
  longestStreak: 25,
  weeklyGoal: 7,
  monthlyGoal: 30,
  totalDaysActive: 45,
};

function getUserStats() {
  // Update stats dynamically
  const now = new Date();
  userStats.lastVisit = now;
  userStats.messagesViewed += 1;
  return { ...userStats };
}

module.exports = async (req, res) => {
  try {
    const stats = getUserStats();
    res.json(stats);
  } catch (error) {
    console.error("Error in /api/stats:", error);
    res.status(500).json({
      message: "Failed to get user stats",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
