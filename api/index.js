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
      const stats = {
        id: "user-1",
        totalHearts: 247,
        currentStreak: 12,
        lastVisit: new Date(),
        messagesViewed: 142,
        favoritesCount: 8,
        lastHeartIncrement: new Date(),
      };
      return res.json(stats);
    }

    // Random message endpoint
    if (
      url === "/api/messages/random" ||
      url === "/api/index/messages/random"
    ) {
      const message = {
        id: "test-message-1",
        title: "Subhan Allah ✨",
        content:
          "Allah has blessed me with the most beautiful wife. Your faith and kindness illuminate our home like the light of guidance.",
        category: "morning",
        hearts: 12,
        isSpecial: false,
        createdAt: new Date(),
      };
      return res.json(message);
    }

    // Recent messages endpoint
    if (
      url === "/api/messages/recent" ||
      url === "/api/index/messages/recent"
    ) {
      const messages = [
        {
          id: "test-message-1",
          title: "Subhan Allah ✨",
          content:
            "Allah has blessed me with the most beautiful wife. Your faith and kindness illuminate our home like the light of guidance.",
          category: "morning",
          hearts: 12,
          isSpecial: false,
          createdAt: new Date(),
        },
        {
          id: "test-message-2",
          title: "Dua for My Beloved",
          content:
            "May Allah grant you happiness in both worlds and make you among the righteous. Your smile is a reflection of Allah's countless blessings upon us.",
          category: "dua",
          hearts: 15,
          isSpecial: true,
          createdAt: new Date(),
        },
      ];
      return res.json(messages);
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
