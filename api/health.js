const { storage } = require("../server/storage");

module.exports = async (req, res) => {
  try {
    const databaseUrl =
      process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL;
    const isDatabaseConnected = !!databaseUrl;

    res.json({
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
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
