import { type Message, type InsertMessage, type UserStats, type InsertUserStats, type Favorite, type InsertFavorite, type Achievement, type InsertAchievement, messages, userStats, favorites, achievements } from "@shared/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, desc } from "drizzle-orm";
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

export class DatabaseStorage implements IStorage {
  private db;
  private initialized = false;

  constructor() {
    const sql = neon(process.env.DATABASE_URL!);
    this.db = drizzle(sql);
  }

  private async ensureInitialized() {
    if (this.initialized) return;
    await this.initializeData();
    this.initialized = true;
  }

  private async initializeData() {
    // Check if we already have data
    const existingMessages = await this.db.select().from(messages).limit(1);
    if (existingMessages.length > 0) return;

    // Initialize with romantic messages
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

    // Insert messages
    await this.db.insert(messages).values(romanticMessages);

    // Initialize user stats
    await this.db.insert(userStats).values({
      totalHearts: 247,
      currentStreak: 12,
      lastVisit: new Date(),
      messagesViewed: 142,
      favoritesCount: 8,
    });

    // Initialize achievements
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
        unlockedAt: null,
      },
    ];

    await this.db.insert(achievements).values(achievementsList);
  }

  async getRandomMessage(): Promise<Message | undefined> {
    await this.ensureInitialized();
    const allMessages = await this.db.select().from(messages);
    if (allMessages.length === 0) return undefined;
    
    const randomIndex = Math.floor(Math.random() * allMessages.length);
    return allMessages[randomIndex];
  }

  async getMessageById(id: string): Promise<Message | undefined> {
    await this.ensureInitialized();
    const result = await this.db.select().from(messages).where(eq(messages.id, id)).limit(1);
    return result[0];
  }

  async getAllMessages(): Promise<Message[]> {
    await this.ensureInitialized();
    return await this.db.select().from(messages).orderBy(desc(messages.createdAt));
  }

  async getRecentMessages(limit: number = 5): Promise<Message[]> {
    await this.ensureInitialized();
    return await this.db.select().from(messages).orderBy(desc(messages.createdAt)).limit(limit);
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    await this.ensureInitialized();
    const result = await this.db.insert(messages).values(insertMessage).returning();
    return result[0];
  }

  async getUserStats(): Promise<UserStats> {
    await this.ensureInitialized();
    const result = await this.db.select().from(userStats).limit(1);
    return result[0] || {
      id: randomUUID(),
      totalHearts: 0,
      currentStreak: 0,
      lastVisit: null,
      messagesViewed: 0,
      favoritesCount: 0,
    };
  }

  async updateUserStats(stats: Partial<UserStats>): Promise<UserStats> {
    await this.ensureInitialized();
    const existing = await this.getUserStats();
    const result = await this.db.update(userStats)
      .set(stats)
      .where(eq(userStats.id, existing.id))
      .returning();
    return result[0] || existing;
  }

  async incrementHearts(amount: number): Promise<UserStats> {
    await this.ensureInitialized();
    const existing = await this.getUserStats();
    return await this.updateUserStats({
      totalHearts: (existing.totalHearts || 0) + amount
    });
  }

  async updateStreak(): Promise<UserStats> {
    await this.ensureInitialized();
    const now = new Date();
    const existing = await this.getUserStats();
    const lastVisit = existing.lastVisit;
    
    let newStreak = existing.currentStreak || 0;
    
    if (lastVisit) {
      const daysSinceLastVisit = Math.floor((now.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysSinceLastVisit === 1) {
        // Consecutive day - increment streak
        newStreak = (existing.currentStreak || 0) + 1;
      } else if (daysSinceLastVisit > 1) {
        // Broke streak - reset to 1
        newStreak = 1;
      }
      // If same day (daysSinceLastVisit === 0), don't change streak
    } else {
      // First visit
      newStreak = 1;
    }
    
    return await this.updateUserStats({
      currentStreak: newStreak,
      lastVisit: now
    });
  }

  async addToFavorites(messageId: string): Promise<Favorite> {
    await this.ensureInitialized();
    const result = await this.db.insert(favorites).values({ messageId }).returning();
    const favorite = result[0];
    
    // Update favorites count
    const existing = await this.getUserStats();
    await this.updateUserStats({
      favoritesCount: (existing.favoritesCount || 0) + 1
    });
    
    return favorite;
  }

  async getFavorites(): Promise<Favorite[]> {
    await this.ensureInitialized();
    return await this.db.select().from(favorites).orderBy(desc(favorites.createdAt));
  }

  async removeFavorite(messageId: string): Promise<void> {
    await this.ensureInitialized();
    await this.db.delete(favorites).where(eq(favorites.messageId, messageId));
    
    // Update favorites count
    const existing = await this.getUserStats();
    await this.updateUserStats({
      favoritesCount: Math.max((existing.favoritesCount || 0) - 1, 0)
    });
  }

  async getAchievements(): Promise<Achievement[]> {
    await this.ensureInitialized();
    return await this.db.select().from(achievements);
  }

  async unlockAchievement(name: string): Promise<Achievement | undefined> {
    await this.ensureInitialized();
    const result = await this.db.update(achievements)
      .set({ unlockedAt: new Date() })
      .where(eq(achievements.name, name))
      .returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();