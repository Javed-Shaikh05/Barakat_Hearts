import { type Message, type InsertMessage, type UserStats, type InsertUserStats, type Favorite, type InsertFavorite, type Achievement, type InsertAchievement } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Messages
  getRandomMessage(): Promise<Message | undefined>;
  getMessageById(id: string): Promise<Message | undefined>;
  getAllMessages(): Promise<Message[]>;
  getRecentMessages(limit?: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  
  // User Stats
  getUserStats(): Promise<UserStats>;
  updateUserStats(stats: Partial<UserStats>): Promise<UserStats>;
  incrementHearts(amount: number): Promise<UserStats>;
  updateStreak(): Promise<UserStats>;
  
  // Favorites
  addToFavorites(messageId: string): Promise<Favorite>;
  getFavorites(): Promise<Favorite[]>;
  removeFavorite(messageId: string): Promise<void>;
  
  // Achievements
  getAchievements(): Promise<Achievement[]>;
  unlockAchievement(name: string): Promise<Achievement | undefined>;
}

export class MemStorage implements IStorage {
  private messages: Map<string, Message>;
  private userStats: UserStats;
  private favorites: Map<string, Favorite>;
  private achievements: Map<string, Achievement>;
  private viewedMessages: Set<string>;

  constructor() {
    this.messages = new Map();
    this.favorites = new Map();
    this.achievements = new Map();
    this.viewedMessages = new Set();
    
    // Initialize user stats
    this.userStats = {
      id: randomUUID(),
      totalHearts: 247,
      currentStreak: 12,
      lastVisit: new Date(),
      messagesViewed: 142,
      favoritesCount: 8,
    };
    
    // Initialize with romantic messages
    this.initializeMessages();
    this.initializeAchievements();
  }

  private initializeMessages() {
    const romanticMessages = [
      {
        title: "Good Morning, Beautiful ✨",
        content: "Every morning I wake up grateful for another day to love you. Your smile lights up my world brighter than the sun ever could. You are my forever and always, my darling.",
        category: "morning",
        hearts: 12,
        isSpecial: false,
      },
      {
        title: "You are my sunshine",
        content: "Your laughter fills my heart with joy and makes every day brighter than I could have ever imagined. You turn ordinary moments into magical memories.",
        category: "appreciation",
        hearts: 5,
        isSpecial: false,
      },
      {
        title: "Missing you terribly",
        content: "Distance means nothing when someone means everything to you. Every second apart feels like an eternity, but every reunion makes it all worthwhile.",
        category: "missing",
        hearts: 8,
        isSpecial: false,
      },
      {
        title: "Forever grateful 💎",
        content: "Thank you for being the most amazing partner I could ever ask for. Your love makes me want to be the best version of myself every single day.",
        category: "gratitude",
        hearts: 12,
        isSpecial: true,
      },
      {
        title: "You're my everything",
        content: "In a world full of temporary things, you are my forever. Your love is the anchor that keeps me grounded and the wings that help me soar.",
        category: "love",
        hearts: 15,
        isSpecial: false,
      },
      {
        title: "Sweet Dreams, My Love",
        content: "As you close your eyes tonight, know that you are the last thing on my mind and the first when I wake. Dream of us, darling.",
        category: "goodnight",
        hearts: 7,
        isSpecial: false,
      },
      {
        title: "Thinking of You 💕",
        content: "No matter where I am or what I'm doing, you're always on my mind. Your love follows me everywhere like a beautiful, comforting shadow.",
        category: "thinking",
        hearts: 9,
        isSpecial: false,
      },
      {
        title: "Our Love Story",
        content: "Every day with you is a new chapter in the most beautiful love story ever written. I can't wait to see how our story unfolds.",
        category: "future",
        hearts: 11,
        isSpecial: true,
      },
    ];

    romanticMessages.forEach((msg, index) => {
      const id = randomUUID();
      const message: Message = {
        ...msg,
        id,
        createdAt: new Date(Date.now() - (index * 24 * 60 * 60 * 1000)), // Spread over past days
      };
      this.messages.set(id, message);
    });
  }

  private initializeAchievements() {
    const achievementsList = [
      {
        name: "First Love",
        description: "Read your first love message",
        icon: "fa-heart",
        unlockedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      },
      {
        name: "Streak Master",
        description: "Maintain a 7-day streak",
        icon: "fa-fire",
        unlockedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        name: "Heart Collector",
        description: "Collect 100 hearts",
        icon: "fa-gem",
        unlockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        name: "Memory Keeper",
        description: "Save 5 favorite messages",
        icon: "fa-bookmark",
        unlockedAt: null, // Not yet unlocked
      },
    ];

    achievementsList.forEach(achievement => {
      const id = randomUUID();
      this.achievements.set(id, { ...achievement, id });
    });
  }

  async getRandomMessage(): Promise<Message | undefined> {
    const messagesArray = Array.from(this.messages.values());
    if (messagesArray.length === 0) return undefined;
    
    const randomIndex = Math.floor(Math.random() * messagesArray.length);
    return messagesArray[randomIndex];
  }

  async getMessageById(id: string): Promise<Message | undefined> {
    return this.messages.get(id);
  }

  async getAllMessages(): Promise<Message[]> {
    return Array.from(this.messages.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getRecentMessages(limit: number = 5): Promise<Message[]> {
    const allMessages = await this.getAllMessages();
    return allMessages.slice(0, limit);
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const message: Message = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.messages.set(id, message);
    return message;
  }

  async getUserStats(): Promise<UserStats> {
    return { ...this.userStats };
  }

  async updateUserStats(stats: Partial<UserStats>): Promise<UserStats> {
    this.userStats = { ...this.userStats, ...stats };
    return { ...this.userStats };
  }

  async incrementHearts(amount: number): Promise<UserStats> {
    this.userStats.totalHearts = (this.userStats.totalHearts || 0) + amount;
    return { ...this.userStats };
  }

  async updateStreak(): Promise<UserStats> {
    const now = new Date();
    const lastVisit = this.userStats.lastVisit;
    
    if (lastVisit) {
      const daysSinceLastVisit = Math.floor((now.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysSinceLastVisit === 1) {
        // Consecutive day - increment streak
        this.userStats.currentStreak = (this.userStats.currentStreak || 0) + 1;
      } else if (daysSinceLastVisit > 1) {
        // Broke streak - reset to 1
        this.userStats.currentStreak = 1;
      }
      // If same day (daysSinceLastVisit === 0), don't change streak
    } else {
      // First visit
      this.userStats.currentStreak = 1;
    }
    
    this.userStats.lastVisit = now;
    return { ...this.userStats };
  }

  async addToFavorites(messageId: string): Promise<Favorite> {
    const id = randomUUID();
    const favorite: Favorite = {
      id,
      messageId,
      createdAt: new Date(),
    };
    this.favorites.set(id, favorite);
    this.userStats.favoritesCount = (this.userStats.favoritesCount || 0) + 1;
    return favorite;
  }

  async getFavorites(): Promise<Favorite[]> {
    return Array.from(this.favorites.values());
  }

  async removeFavorite(messageId: string): Promise<void> {
    for (const [id, favorite] of this.favorites.entries()) {
      if (favorite.messageId === messageId) {
        this.favorites.delete(id);
        this.userStats.favoritesCount = Math.max((this.userStats.favoritesCount || 0) - 1, 0);
        break;
      }
    }
  }

  async getAchievements(): Promise<Achievement[]> {
    return Array.from(this.achievements.values());
  }

  async unlockAchievement(name: string): Promise<Achievement | undefined> {
    for (const achievement of this.achievements.values()) {
      if (achievement.name === name && !achievement.unlockedAt) {
        achievement.unlockedAt = new Date();
        return achievement;
      }
    }
    return undefined;
  }
}

export const storage = new MemStorage();
