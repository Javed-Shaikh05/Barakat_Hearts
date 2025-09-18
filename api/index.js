// Inline static data for Vercel compatibility
const { randomUUID } = require("crypto");

// Static Islamic messages data
const islamicMessages = [
  {
    id: "msg-1",
    title: "Subhan Allah ✨",
    content:
      "Allah has blessed me with the most beautiful wife. Your faith and kindness illuminate our home like the light of guidance.",
    category: "morning",
    hearts: 12,
    isSpecial: false,
    createdAt: new Date("2024-01-21T08:00:00Z"),
  },
  {
    id: "msg-2",
    title: "Dua for My Beloved",
    content:
      "May Allah grant you happiness in both worlds and make you among the righteous. Your smile is a reflection of Allah's countless blessings upon us.",
    category: "dua",
    hearts: 15,
    isSpecial: true,
    createdAt: new Date("2024-01-22T09:00:00Z"),
  },
  {
    id: "msg-3",
    title: "Fi Amanillah",
    content:
      "When we are apart, I place you in Allah's protection. Distance cannot diminish the bond that Allah has created between our hearts.",
    category: "missing",
    hearts: 8,
    isSpecial: false,
    createdAt: new Date("2024-01-23T10:00:00Z"),
  },
  {
    id: "msg-4",
    title: "Alhamdulillahi Rabbil Alameen 💎",
    content:
      "All praise is due to Allah who blessed me with a wife who is my partner in this life and the next. You complete half of my deen.",
    category: "gratitude",
    hearts: 18,
    isSpecial: true,
    createdAt: new Date("2024-01-24T11:00:00Z"),
  },
  {
    id: "msg-5",
    title: "Barakallahu laki",
    content:
      "May Allah bless you, my dear wife. You are the coolness of my eyes and the tranquility of my heart, just as the Prophet ﷺ taught us.",
    category: "blessing",
    hearts: 12,
    isSpecial: false,
    createdAt: new Date("2024-01-25T12:00:00Z"),
  },
  {
    id: "msg-6",
    title: "Lailat Saeedah",
    content:
      "As you sleep tonight, I make dua that Allah grants you peaceful dreams and protection. You are my amanah from Allah.",
    category: "goodnight",
    hearts: 10,
    isSpecial: false,
    createdAt: new Date("2024-01-26T22:00:00Z"),
  },
  {
    id: "msg-7",
    title: "Always in My Dua 💕",
    content:
      "In every sujood, you are remembered. In every du'a, you are mentioned. May Allah keep us together in Jannah.",
    category: "remembrance",
    hearts: 14,
    isSpecial: false,
    createdAt: new Date("2024-01-27T13:00:00Z"),
  },
  {
    id: "msg-8",
    title: "Our Journey to Jannah",
    content:
      "Together we walk the path of righteousness. May Allah make our love a means of drawing closer to Him and earning His pleasure.",
    category: "future",
    hearts: 16,
    isSpecial: true,
    createdAt: new Date("2024-01-28T14:00:00Z"),
  },
  {
    id: "msg-9",
    title: "Mashallah Tabarakallah",
    content:
      "Allah has made you beautiful inside and out. Your taqwa and good character make you more precious than any treasure in this world.",
    category: "appreciation",
    hearts: 13,
    isSpecial: false,
    createdAt: new Date("2024-01-29T15:00:00Z"),
  },
  {
    id: "msg-10",
    title: "Bismillah",
    content:
      "With the name of Allah, we begin each day together. May He guide our steps and bless our marriage with His divine love.",
    category: "morning",
    hearts: 11,
    isSpecial: false,
    createdAt: new Date("2024-01-30T08:30:00Z"),
  },
];

// Static user stats
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

// Static achievements
const achievements = [
  {
    id: "ach-1",
    name: "First Prayer",
    description: "Made your first du'a together",
    icon: "🤲",
    unlockedAt: new Date("2024-01-21T10:00:00Z"),
  },
  {
    id: "ach-2",
    name: "Heart Collector",
    description: "Collected 50+ hearts",
    icon: "💚",
    unlockedAt: new Date("2024-01-25T14:00:00Z"),
  },
  {
    id: "ach-3",
    name: "Daily Dhikr",
    description: "Maintained a 7-day streak",
    icon: "📿",
    unlockedAt: new Date("2024-01-28T09:00:00Z"),
  },
  {
    id: "ach-4",
    name: "Consistent Love",
    description: "Achieved a 14-day streak",
    icon: "🔥",
    unlockedAt: new Date("2024-02-04T12:00:00Z"),
  },
  {
    id: "ach-5",
    name: "Devoted Heart",
    description: "Collected 200+ hearts",
    icon: "💖",
    unlockedAt: new Date("2024-02-01T15:00:00Z"),
  },
  {
    id: "ach-6",
    name: "Love Champion",
    description: "Maintained an 18-day streak",
    icon: "🏆",
    unlockedAt: new Date("2024-02-07T18:00:00Z"),
  },
  {
    id: "ach-7",
    name: "Faithful Companion",
    description: "Visit daily for 30 days",
    icon: "👑",
    unlockedAt: null,
  },
  {
    id: "ach-8",
    name: "Beloved Wife",
    description: "Create your first love message",
    icon: "💕",
    unlockedAt: null,
  },
];

// Static favorites
let favorites = [
  {
    id: "fav-1",
    messageId: "msg-2",
    createdAt: new Date("2024-01-22T10:00:00Z"),
  },
  {
    id: "fav-2",
    messageId: "msg-4",
    createdAt: new Date("2024-01-24T12:00:00Z"),
  },
  {
    id: "fav-3",
    messageId: "msg-8",
    createdAt: new Date("2024-01-28T15:00:00Z"),
  },
];

// Helper functions
function getRandomMessage() {
  if (islamicMessages.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * islamicMessages.length);
  return islamicMessages[randomIndex];
}

function getRecentMessages(limit = 5) {
  return islamicMessages
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, limit);
}

function getUserStats() {
  // Update stats dynamically
  const now = new Date();
  userStats.lastVisit = now;
  userStats.messagesViewed += 1;
  return { ...userStats };
}

function incrementHearts(amount) {
  const now = new Date();
  const lastIncrement = userStats.lastHeartIncrement;

  if (lastIncrement) {
    const hoursSinceLastIncrement =
      (now.getTime() - lastIncrement.getTime()) / (1000 * 60 * 60);
    if (hoursSinceLastIncrement < 2) {
      return { ...userStats };
    }
  }

  userStats.totalHearts = (userStats.totalHearts || 0) + amount;
  userStats.lastHeartIncrement = now;
  return { ...userStats };
}

function updateStreak() {
  const now = new Date();
  userStats.lastVisit = now;
  return { ...userStats };
}

function getFavorites() {
  return favorites.map((fav) => {
    const message = islamicMessages.find((m) => m.id === fav.messageId);
    return {
      ...fav,
      message,
    };
  });
}

function addToFavorites(messageId) {
  const favorite = {
    id: randomUUID(),
    messageId,
    createdAt: new Date(),
  };
  favorites.push(favorite);
  userStats.favoritesCount = (userStats.favoritesCount || 0) + 1;
  return favorite;
}

function getAchievements() {
  return [...achievements];
}

// Main API handler
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
      const stats = getUserStats();
      return res.json(stats);
    }

    // Random message endpoint
    if (
      url === "/api/messages/random" ||
      url === "/api/index/messages/random"
    ) {
      const message = getRandomMessage();
      if (!message) {
        return res.status(404).json({ message: "No messages found" });
      }

      // Update user stats when viewing a message
      updateStreak();
      incrementHearts(3);

      return res.json(message);
    }

    // Recent messages endpoint
    if (
      url === "/api/messages/recent" ||
      url === "/api/index/messages/recent"
    ) {
      const limit = parseInt(req.query.limit) || 5;
      const messages = getRecentMessages(limit);
      return res.json(messages);
    }

    // Favorites endpoint
    if (url === "/api/favorites" || url === "/api/index/favorites") {
      if (method === "GET") {
        const userFavorites = getFavorites();
        return res.json(userFavorites);
      }
      if (method === "POST") {
        const { messageId } = req.body;
        const favorite = addToFavorites(messageId);
        return res.json(favorite);
      }
    }

    // Achievements endpoint
    if (url === "/api/achievements" || url === "/api/index/achievements") {
      const userAchievements = getAchievements();
      return res.json(userAchievements);
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
