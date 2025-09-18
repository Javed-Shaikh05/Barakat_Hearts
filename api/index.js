const { staticStorage } = require("../server/static-data");

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const { url, method } = req;

  try {
    // Health check endpoint
    if (url === "/api/health" || url === "/api/index/health") {
      const databaseUrl =
        process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL;
      const isDatabaseConnected = !!databaseUrl;

      return res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        database: {
          connected: isDatabaseConnected,
          url: databaseUrl
            ? databaseUrl.substring(0, 20) + "..."
            : "not configured",
        },
        environment: {
          nodeEnv: process.env.NODE_ENV,
          vercel: !!process.env.VERCEL,
        },
      });
    }

    // Test endpoint
    if (url === "/api/test" || url === "/api/index/test") {
      return res.json({
        message: "API is working!",
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
      });
    }

    // Stats endpoint
    if (url === "/api/stats" || url === "/api/index/stats") {
      const stats = await staticStorage.getUserStats();
      return res.json(stats);
    }

    // Random message endpoint
    if (
      url === "/api/messages/random" ||
      url === "/api/index/messages/random"
    ) {
      const message = await staticStorage.getRandomMessage();
      if (!message) {
        return res.status(404).json({ message: "No messages found" });
      }
      
      // Update user stats when viewing a message
      await staticStorage.updateStreak();
      await staticStorage.incrementHearts(3);
      
      return res.json(message);
    }

    // Recent messages endpoint
    if (
      url === "/api/messages/recent" ||
      url === "/api/index/messages/recent"
    ) {
      const limit = parseInt(req.query.limit) || 5;
      const messages = await staticStorage.getRecentMessages(limit);
      return res.json(messages);
    }

    // Favorites endpoint
    if (url === "/api/favorites" || url === "/api/index/favorites") {
      if (method === "GET") {
        const favorites = await staticStorage.getFavorites();
        return res.json(favorites);
      }
      if (method === "POST") {
        const { messageId } = req.body;
        const favorite = await staticStorage.addToFavorites(messageId);
        return res.json(favorite);
      }
    }

    // Achievements endpoint
    if (url === "/api/achievements" || url === "/api/index/achievements") {
      const achievements = await staticStorage.getAchievements();
      return res.json(achievements);
    }

    // Default response for unmatched routes
    res.status(404).json({
      error: "Not Found",
      message: `Route ${url} not found`,
      availableRoutes: [
        "/api/health",
        "/api/test",
        "/api/stats",
        "/api/messages/random",
        "/api/messages/recent",
        "/api/favorites",
        "/api/achievements",
      ],
    });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
