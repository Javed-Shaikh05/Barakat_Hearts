const { randomUUID } = require("crypto");
const pg = require("pg");
const { drizzle } = require("drizzle-orm/node-postgres");
const { eq, desc, sql } = require("drizzle-orm");

// Import schema types (we'll need to create JS versions)
const messages = {
  id: "varchar",
  title: "text",
  content: "text",
  category: "text",
  hearts: "integer",
  isSpecial: "boolean",
  createdAt: "timestamp",
};

const userStats = {
  id: "varchar",
  totalHearts: "integer",
  currentStreak: "integer",
  lastVisit: "timestamp",
  messagesViewed: "integer",
  favoritesCount: "integer",
  lastHeartIncrement: "timestamp",
};

const favorites = {
  id: "varchar",
  messageId: "varchar",
  createdAt: "timestamp",
};

const achievements = {
  id: "varchar",
  name: "text",
  description: "text",
  icon: "text",
  unlockedAt: "timestamp",
};

class MemStorage {
  constructor() {
    this.messages = [];
    this.userStats = {
      id: "user-1",
      totalHearts: 247,
      currentStreak: 12,
      lastVisit: new Date(),
      messagesViewed: 142,
      favoritesCount: 8,
      lastHeartIncrement: new Date(),
    };
    this.favorites = [];
    this.achievements = [];
    this.initialized = false;
  }

  async ensureInitialized() {
    if (this.initialized) return;
    await this.initializeData();
    this.initialized = true;
  }

  async initializeData() {
    const islamicMessages = [
      {
        title: "Subhan Allah ✨",
        content:
          "Allah has blessed me with the most beautiful wife. Your faith and kindness illuminate our home like the light of guidance.",
        category: "morning",
        hearts: 12,
        isSpecial: false,
      },
      {
        title: "Dua for My Beloved",
        content:
          "May Allah grant you happiness in both worlds and make you among the righteous. Your smile is a reflection of Allah's countless blessings upon us.",
        category: "dua",
        hearts: 15,
        isSpecial: true,
      },
      {
        title: "Fi Amanillah",
        content:
          "When we are apart, I place you in Allah's protection. Distance cannot diminish the bond that Allah has created between our hearts.",
        category: "missing",
        hearts: 8,
        isSpecial: false,
      },
      {
        title: "Alhamdulillahi Rabbil Alameen 💎",
        content:
          "All praise is due to Allah who blessed me with a wife who is my partner in this life and the next. You complete half of my deen.",
        category: "gratitude",
        hearts: 18,
        isSpecial: true,
      },
      {
        title: "Barakallahu laki",
        content:
          "May Allah bless you, my dear wife. You are the coolness of my eyes and the tranquility of my heart, just as the Prophet ﷺ taught us.",
        category: "blessing",
        hearts: 12,
        isSpecial: false,
      },
      {
        title: "Lailat Saeedah",
        content:
          "As you sleep tonight, I make dua that Allah grants you peaceful dreams and protection. You are my amanah from Allah.",
        category: "goodnight",
        hearts: 10,
        isSpecial: false,
      },
      {
        title: "Always in My Dua 💕",
        content:
          "In every sujood, you are remembered. In every du'a, you are mentioned. May Allah keep us together in Jannah.",
        category: "remembrance",
        hearts: 14,
        isSpecial: false,
      },
      {
        title: "Our Journey to Jannah",
        content:
          "Together we walk the path of righteousness. May Allah make our love a means of drawing closer to Him and earning His pleasure.",
        category: "future",
        hearts: 16,
        isSpecial: true,
      },
      {
        title: "Mashallah Tabarakallah",
        content:
          "Allah has made you beautiful inside and out. Your taqwa and good character make you more precious than any treasure in this world.",
        category: "appreciation",
        hearts: 13,
        isSpecial: false,
      },
      {
        title: "Bismillah",
        content:
          "With the name of Allah, we begin each day together. May He guide our steps and bless our marriage with His divine love.",
        category: "morning",
        hearts: 11,
        isSpecial: false,
      },
    ];

    this.messages = islamicMessages.map((msg) => ({
      id: randomUUID(),
      ...msg,
      hearts: msg.hearts || 0,
      isSpecial: msg.isSpecial || false,
      createdAt: new Date(),
    }));

    this.achievements = [
      {
        id: randomUUID(),
        name: "First Prayer",
        description: "Made your first du'a together",
        icon: "🤲",
        unlockedAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Heart Collector",
        description: "Collected 50+ hearts",
        icon: "💚",
        unlockedAt: null,
      },
      {
        id: randomUUID(),
        name: "Daily Dhikr",
        description: "Maintained a 7-day streak",
        icon: "📿",
        unlockedAt: null,
      },
      {
        id: randomUUID(),
        name: "Beloved Wife",
        description: "Created your first love message",
        icon: "💕",
        unlockedAt: null,
      },
    ];
  }

  async getRandomMessage() {
    await this.ensureInitialized();
    if (this.messages.length === 0) return undefined;
    const randomIndex = Math.floor(Math.random() * this.messages.length);
    return this.messages[randomIndex];
  }

  async getMessageById(id) {
    await this.ensureInitialized();
    return this.messages.find((m) => m.id === id);
  }

  async getAllMessages() {
    await this.ensureInitialized();
    return [...this.messages];
  }

  async getRecentMessages(limit = 10) {
    await this.ensureInitialized();
    return this.messages
      .sort(
        (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
      )
      .slice(0, limit);
  }

  async createMessage(messageData) {
    await this.ensureInitialized();
    const newMessage = {
      id: randomUUID(),
      ...messageData,
      hearts: messageData.hearts || 0,
      isSpecial: messageData.isSpecial || false,
      createdAt: new Date(),
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  async getUserStats() {
    await this.ensureInitialized();
    return { ...this.userStats };
  }

  async updateUserStats(stats) {
    await this.ensureInitialized();
    this.userStats = { ...this.userStats, ...stats };
    return { ...this.userStats };
  }

  async incrementHearts(amount) {
    await this.ensureInitialized();
    const now = new Date();
    const lastIncrement = this.userStats.lastHeartIncrement;

    if (lastIncrement) {
      const hoursSinceLastIncrement =
        (now.getTime() - lastIncrement.getTime()) / (1000 * 60 * 60);
      if (hoursSinceLastIncrement < 2) {
        return { ...this.userStats };
      }
    }

    this.userStats.totalHearts = (this.userStats.totalHearts || 0) + amount;
    this.userStats.lastHeartIncrement = now;
    return { ...this.userStats };
  }

  async updateStreak() {
    await this.ensureInitialized();
    const now = new Date();
    const lastVisit = this.userStats.lastVisit;

    let newStreak = this.userStats.currentStreak || 0;

    if (lastVisit) {
      const daysSinceLastVisit = Math.floor(
        (now.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceLastVisit === 1) {
        newStreak = (this.userStats.currentStreak || 0) + 1;
      } else if (daysSinceLastVisit > 1) {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }

    this.userStats.currentStreak = newStreak;
    this.userStats.lastVisit = now;
    return { ...this.userStats };
  }

  async addToFavorites(messageId) {
    await this.ensureInitialized();
    const favorite = {
      id: randomUUID(),
      messageId,
      createdAt: new Date(),
    };
    this.favorites.push(favorite);
    this.userStats.favoritesCount = (this.userStats.favoritesCount || 0) + 1;
    return favorite;
  }

  async getFavorites() {
    await this.ensureInitialized();
    return [...this.favorites];
  }

  async removeFavorite(messageId) {
    await this.ensureInitialized();
    this.favorites = this.favorites.filter((f) => f.messageId !== messageId);
    this.userStats.favoritesCount = Math.max(
      0,
      (this.userStats.favoritesCount || 0) - 1
    );
  }

  async getAchievements() {
    await this.ensureInitialized();
    return [...this.achievements];
  }

  async unlockAchievement(name) {
    await this.ensureInitialized();
    const achievement = this.achievements.find((a) => a.name === name);
    if (achievement && !achievement.unlockedAt) {
      achievement.unlockedAt = new Date();
      return { ...achievement };
    }
    return undefined;
  }
}

class DatabaseStorage {
  constructor() {
    const databaseUrl =
      process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL or SUPABASE_DATABASE_URL is required");
    }

    this.pool = new pg.Pool({
      connectionString: databaseUrl,
      ssl:
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : false,
    });
    this.db = drizzle(this.pool);
    this.initialized = false;
  }

  async ensureInitialized() {
    if (this.initialized) return;
    await this.initializeData();
    this.initialized = true;
  }

  async ensureTablesExist() {
    try {
      await this.db.execute(sql`
        CREATE TABLE IF NOT EXISTS messages (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          category TEXT NOT NULL,
          hearts INTEGER DEFAULT 0,
          is_special BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);

      await this.db.execute(sql`
        CREATE TABLE IF NOT EXISTS user_stats (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          total_hearts INTEGER DEFAULT 0,
          current_streak INTEGER DEFAULT 0,
          last_visit TIMESTAMP,
          messages_viewed INTEGER DEFAULT 0,
          favorites_count INTEGER DEFAULT 0,
          last_heart_increment TIMESTAMP DEFAULT NOW()
        );
      `);

      await this.db.execute(sql`
        CREATE TABLE IF NOT EXISTS favorites (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          message_id VARCHAR REFERENCES messages(id),
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);

      await this.db.execute(sql`
        CREATE TABLE IF NOT EXISTS achievements (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          description TEXT NOT NULL,
          icon TEXT NOT NULL,
          unlocked_at TIMESTAMP
        );
      `);
    } catch (error) {
      console.error("Error creating tables:", error);
    }
  }

  async initializeData() {
    try {
      await this.ensureTablesExist();

      const existingMessages = await this.db.execute(
        sql`SELECT COUNT(*) as count FROM messages`
      );
      const messageCount = existingMessages.rows[0]?.count || 0;

      if (messageCount === 0) {
        console.log(
          "No messages found, but tables exist. Using MemStorage fallback."
        );
        throw new Error("No messages in database");
      }
    } catch (error) {
      console.error("Failed to initialize database:", error);
      throw error;
    }
  }

  async getRandomMessage() {
    await this.ensureInitialized();
    const allMessages = await this.db.execute(
      sql`SELECT * FROM messages ORDER BY RANDOM() LIMIT 1`
    );
    return allMessages.rows[0];
  }

  async getMessageById(id) {
    await this.ensureInitialized();
    const result = await this.db.execute(
      sql`SELECT * FROM messages WHERE id = ${id} LIMIT 1`
    );
    return result.rows[0];
  }

  async getAllMessages() {
    await this.ensureInitialized();
    const result = await this.db.execute(
      sql`SELECT * FROM messages ORDER BY created_at DESC`
    );
    return result.rows;
  }

  async getRecentMessages(limit = 5) {
    await this.ensureInitialized();
    const result = await this.db.execute(
      sql`SELECT * FROM messages ORDER BY created_at DESC LIMIT ${limit}`
    );
    return result.rows;
  }

  async createMessage(insertMessage) {
    await this.ensureInitialized();
    const result = await this.db.execute(sql`
      INSERT INTO messages (title, content, category, hearts, is_special, created_at)
      VALUES (${insertMessage.title}, ${insertMessage.content}, ${
      insertMessage.category
    }, ${insertMessage.hearts || 0}, ${insertMessage.isSpecial || false}, NOW())
      RETURNING *
    `);
    return result.rows[0];
  }

  async getUserStats() {
    await this.ensureInitialized();
    const result = await this.db.execute(sql`SELECT * FROM user_stats LIMIT 1`);
    if (result.rows.length > 0) {
      return result.rows[0];
    }

    // Create default stats if none exist
    const defaultStats = {
      id: randomUUID(),
      totalHearts: 247,
      currentStreak: 12,
      lastVisit: new Date(),
      messagesViewed: 142,
      favoritesCount: 8,
      lastHeartIncrement: new Date(),
    };

    await this.db.execute(sql`
      INSERT INTO user_stats (id, total_hearts, current_streak, last_visit, messages_viewed, favorites_count, last_heart_increment)
      VALUES (${defaultStats.id}, ${defaultStats.totalHearts}, ${defaultStats.currentStreak}, ${defaultStats.lastVisit}, ${defaultStats.messagesViewed}, ${defaultStats.favoritesCount}, ${defaultStats.lastHeartIncrement})
    `);

    return defaultStats;
  }

  async updateUserStats(stats) {
    await this.ensureInitialized();
    const existing = await this.getUserStats();
    const result = await this.db.execute(sql`
      UPDATE user_stats 
      SET total_hearts = ${stats.totalHearts || existing.totalHearts},
          current_streak = ${stats.currentStreak || existing.currentStreak},
          last_visit = ${stats.lastVisit || existing.lastVisit},
          messages_viewed = ${stats.messagesViewed || existing.messagesViewed},
          favorites_count = ${stats.favoritesCount || existing.favoritesCount},
          last_heart_increment = ${
            stats.lastHeartIncrement || existing.lastHeartIncrement
          }
      WHERE id = ${existing.id}
      RETURNING *
    `);
    return result.rows[0] || existing;
  }

  async incrementHearts(amount) {
    await this.ensureInitialized();
    const existing = await this.getUserStats();
    const now = new Date();
    const lastIncrement = existing.lastHeartIncrement;

    if (lastIncrement) {
      const hoursSinceLastIncrement =
        (now.getTime() - lastIncrement.getTime()) / (1000 * 60 * 60);
      if (hoursSinceLastIncrement < 2) {
        return existing;
      }
    }

    return await this.updateUserStats({
      totalHearts: (existing.totalHearts || 0) + amount,
      lastHeartIncrement: now,
    });
  }

  async updateStreak() {
    await this.ensureInitialized();
    const now = new Date();
    const existing = await this.getUserStats();
    const lastVisit = existing.lastVisit;

    let newStreak = existing.currentStreak || 0;

    if (lastVisit) {
      const daysSinceLastVisit = Math.floor(
        (now.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceLastVisit === 1) {
        newStreak = (existing.currentStreak || 0) + 1;
      } else if (daysSinceLastVisit > 1) {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }

    return await this.updateUserStats({
      currentStreak: newStreak,
      lastVisit: now,
    });
  }

  async addToFavorites(messageId) {
    await this.ensureInitialized();
    const result = await this.db.execute(sql`
      INSERT INTO favorites (message_id, created_at)
      VALUES (${messageId}, NOW())
      RETURNING *
    `);

    await this.incrementHearts(5);
    return result.rows[0];
  }

  async getFavorites() {
    await this.ensureInitialized();
    const result = await this.db.execute(
      sql`SELECT * FROM favorites ORDER BY created_at DESC`
    );
    return result.rows;
  }

  async removeFavorite(messageId) {
    await this.ensureInitialized();
    await this.db.execute(
      sql`DELETE FROM favorites WHERE message_id = ${messageId}`
    );
  }

  async getAchievements() {
    await this.ensureInitialized();
    const result = await this.db.execute(
      sql`SELECT * FROM achievements ORDER BY unlocked_at DESC`
    );
    return result.rows;
  }

  async unlockAchievement(name) {
    await this.ensureInitialized();
    const result = await this.db.execute(sql`
      UPDATE achievements 
      SET unlocked_at = NOW() 
      WHERE name = ${name} AND unlocked_at IS NULL
      RETURNING *
    `);
    return result.rows[0];
  }
}

// Create storage instance with fallback to MemStorage if no database URL
const storage = (() => {
  const databaseUrl =
    process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL;
  if (databaseUrl) {
    try {
      console.log(
        "Initializing DatabaseStorage with URL:",
        databaseUrl.substring(0, 20) + "..."
      );
      return new DatabaseStorage();
    } catch (error) {
      console.warn(
        "Failed to initialize DatabaseStorage, falling back to MemStorage:",
        error
      );
      return new MemStorage();
    }
  } else {
    console.warn("No DATABASE_URL found, using MemStorage");
    return new MemStorage();
  }
})();

module.exports = { storage };
