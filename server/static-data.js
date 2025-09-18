const { randomUUID } = require("crypto");

// Static Islamic messages data (from your database)
const islamicMessages = [
  {
    id: "msg-1",
    title: "Subhan Allah ✨",
    content: "Allah has blessed me with the most beautiful wife. Your faith and kindness illuminate our home like the light of guidance.",
    category: "morning",
    hearts: 12,
    isSpecial: false,
    createdAt: new Date("2024-01-21T08:00:00Z"),
  },
  {
    id: "msg-2", 
    title: "Dua for My Beloved",
    content: "May Allah grant you happiness in both worlds and make you among the righteous. Your smile is a reflection of Allah's countless blessings upon us.",
    category: "dua",
    hearts: 15,
    isSpecial: true,
    createdAt: new Date("2024-01-22T09:00:00Z"),
  },
  {
    id: "msg-3",
    title: "Fi Amanillah",
    content: "When we are apart, I place you in Allah's protection. Distance cannot diminish the bond that Allah has created between our hearts.",
    category: "missing",
    hearts: 8,
    isSpecial: false,
    createdAt: new Date("2024-01-23T10:00:00Z"),
  },
  {
    id: "msg-4",
    title: "Alhamdulillahi Rabbil Alameen 💎",
    content: "All praise is due to Allah who blessed me with a wife who is my partner in this life and the next. You complete half of my deen.",
    category: "gratitude",
    hearts: 18,
    isSpecial: true,
    createdAt: new Date("2024-01-24T11:00:00Z"),
  },
  {
    id: "msg-5",
    title: "Barakallahu laki",
    content: "May Allah bless you, my dear wife. You are the coolness of my eyes and the tranquility of my heart, just as the Prophet ﷺ taught us.",
    category: "blessing",
    hearts: 12,
    isSpecial: false,
    createdAt: new Date("2024-01-25T12:00:00Z"),
  },
  {
    id: "msg-6",
    title: "Lailat Saeedah",
    content: "As you sleep tonight, I make dua that Allah grants you peaceful dreams and protection. You are my amanah from Allah.",
    category: "goodnight",
    hearts: 10,
    isSpecial: false,
    createdAt: new Date("2024-01-26T22:00:00Z"),
  },
  {
    id: "msg-7",
    title: "Always in My Dua 💕",
    content: "In every sujood, you are remembered. In every du'a, you are mentioned. May Allah keep us together in Jannah.",
    category: "remembrance",
    hearts: 14,
    isSpecial: false,
    createdAt: new Date("2024-01-27T13:00:00Z"),
  },
  {
    id: "msg-8",
    title: "Our Journey to Jannah",
    content: "Together we walk the path of righteousness. May Allah make our love a means of drawing closer to Him and earning His pleasure.",
    category: "future",
    hearts: 16,
    isSpecial: true,
    createdAt: new Date("2024-01-28T14:00:00Z"),
  },
  {
    id: "msg-9",
    title: "Mashallah Tabarakallah",
    content: "Allah has made you beautiful inside and out. Your taqwa and good character make you more precious than any treasure in this world.",
    category: "appreciation",
    hearts: 13,
    isSpecial: false,
    createdAt: new Date("2024-01-29T15:00:00Z"),
  },
  {
    id: "msg-10",
    title: "Bismillah",
    content: "With the name of Allah, we begin each day together. May He guide our steps and bless our marriage with His divine love.",
    category: "morning",
    hearts: 11,
    isSpecial: false,
    createdAt: new Date("2024-01-30T08:30:00Z"),
  }
];

// Static user stats with demo streaks
const userStats = {
  id: "user-1",
  totalHearts: 347, // Increased for more impressive display
  currentStreak: 18, // Good streak to show progress
  lastVisit: new Date(),
  messagesViewed: 156,
  favoritesCount: 12,
  lastHeartIncrement: new Date(),
  longestStreak: 25, // Best streak achieved
  weeklyGoal: 7,
  monthlyGoal: 30,
  totalDaysActive: 45,
  streakHistory: [
    { date: new Date("2024-01-21"), visited: true },
    { date: new Date("2024-01-22"), visited: true },
    { date: new Date("2024-01-23"), visited: true },
    { date: new Date("2024-01-24"), visited: true },
    { date: new Date("2024-01-25"), visited: true },
    { date: new Date("2024-01-26"), visited: true },
    { date: new Date("2024-01-27"), visited: true },
    { date: new Date("2024-01-28"), visited: true },
    { date: new Date("2024-01-29"), visited: true },
    { date: new Date("2024-01-30"), visited: true },
    { date: new Date("2024-01-31"), visited: true },
    { date: new Date("2024-02-01"), visited: true },
    { date: new Date("2024-02-02"), visited: true },
    { date: new Date("2024-02-03"), visited: true },
    { date: new Date("2024-02-04"), visited: true },
    { date: new Date("2024-02-05"), visited: true },
    { date: new Date("2024-02-06"), visited: true },
    { date: new Date("2024-02-07"), visited: true }, // Current streak: 18 days
  ]
};

// Static achievements with streak-focused rewards
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
    unlockedAt: null, // Goal for the future
  },
  {
    id: "ach-8",
    name: "Beloved Wife",
    description: "Create your first love message",
    icon: "💕",
    unlockedAt: null, // Feature not implemented yet
  },
  {
    id: "ach-9",
    name: "Islamic Scholar",
    description: "Read 100+ Islamic messages",
    icon: "📚",
    unlockedAt: new Date("2024-02-05T10:00:00Z"),
  },
  {
    id: "ach-10",
    name: "Barakah Seeker",
    description: "Collect 500+ hearts",
    icon: "✨",
    unlockedAt: null, // Future goal
  }
];

// Static favorites (user's saved messages)
const favorites = [
  {
    id: "fav-1",
    messageId: "msg-2", // Dua for My Beloved
    createdAt: new Date("2024-01-22T10:00:00Z"),
  },
  {
    id: "fav-2", 
    messageId: "msg-4", // Alhamdulillahi Rabbil Alameen
    createdAt: new Date("2024-01-24T12:00:00Z"),
  },
  {
    id: "fav-3",
    messageId: "msg-8", // Our Journey to Jannah
    createdAt: new Date("2024-01-28T15:00:00Z"),
  }
];

// Helper functions to simulate database operations
class StaticStorage {
  constructor() {
    this.messages = [...islamicMessages];
    this.userStats = { ...userStats };
    this.achievements = [...achievements];
    this.favorites = [...favorites];
  }

  async getRandomMessage() {
    if (this.messages.length === 0) return undefined;
    const randomIndex = Math.floor(Math.random() * this.messages.length);
    return this.messages[randomIndex];
  }

  async getMessageById(id) {
    return this.messages.find(m => m.id === id);
  }

  async getAllMessages() {
    return [...this.messages];
  }

  async getRecentMessages(limit = 5) {
    return this.messages
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  async getUserStats() {
    // Simulate dynamic streak calculation
    const now = new Date();
    const lastVisit = this.userStats.lastVisit;
    const daysSinceLastVisit = Math.floor((now.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24));
    
    // Update streak based on visit pattern
    if (daysSinceLastVisit <= 1) {
      // Keep current streak or increment if it's a new day
      this.userStats.currentStreak = Math.min(this.userStats.currentStreak + (daysSinceLastVisit === 1 ? 1 : 0), 30);
    } else if (daysSinceLastVisit > 1) {
      // Reset streak if more than a day has passed
      this.userStats.currentStreak = 1;
    }

    this.userStats.lastVisit = now;
    this.userStats.messagesViewed += 1;

    return { ...this.userStats };
  }

  async updateStreak() {
    return await this.getUserStats();
  }

  async incrementHearts(amount) {
    const now = new Date();
    const lastIncrement = this.userStats.lastHeartIncrement;
    
    // Check if 2 hours have passed since last increment
    if (lastIncrement) {
      const hoursSinceLastIncrement = (now.getTime() - lastIncrement.getTime()) / (1000 * 60 * 60);
      if (hoursSinceLastIncrement < 2) {
        return { ...this.userStats };
      }
    }
    
    this.userStats.totalHearts = (this.userStats.totalHearts || 0) + amount;
    this.userStats.lastHeartIncrement = now;
    return { ...this.userStats };
  }

  async addToFavorites(messageId) {
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
    // Return favorites with full message data
    return this.favorites.map(fav => {
      const message = this.messages.find(m => m.id === fav.messageId);
      return {
        ...fav,
        message
      };
    });
  }

  async removeFavorite(messageId) {
    this.favorites = this.favorites.filter(f => f.messageId !== messageId);
    this.userStats.favoritesCount = Math.max(0, (this.userStats.favoritesCount || 0) - 1);
  }

  async getAchievements() {
    return [...this.achievements];
  }

  async unlockAchievement(name) {
    const achievement = this.achievements.find(a => a.name === name);
    if (achievement && !achievement.unlockedAt) {
      achievement.unlockedAt = new Date();
      return { ...achievement };
    }
    return undefined;
  }

  async createMessage(messageData) {
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
}

// Create a single instance to maintain state across requests
const staticStorage = new StaticStorage();

module.exports = { staticStorage };
