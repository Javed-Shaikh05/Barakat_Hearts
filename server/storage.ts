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
    // Use Supabase URL in production, fallback to local for development
    const databaseUrl = process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL!;
    const sql = neon(databaseUrl);
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

    // Initialize with Islamic messages and duas
    const islamicMessages = [
      {
        title: "Subhan Allah ✨",
        content: "Allah has blessed me with the most beautiful wife. Your faith and kindness illuminate our home like the light of guidance.",
        category: "morning",
        hearts: 12,
        isSpecial: false,
      },
      {
        title: "Dua for My Beloved",
        content: "May Allah grant you happiness in both worlds and make you among the righteous. Your smile is a reflection of Allah's countless blessings upon us.",
        category: "dua",
        hearts: 15,
        isSpecial: true,
      },
      {
        title: "Fi Amanillah",
        content: "When we are apart, I place you in Allah's protection. Distance cannot diminish the bond that Allah has created between our hearts.",
        category: "missing",
        hearts: 8,
        isSpecial: false,
      },
      {
        title: "Alhamdulillahi Rabbil Alameen 💎",
        content: "All praise is due to Allah who blessed me with a wife who is my partner in this life and the next. You complete half of my deen.",
        category: "gratitude",
        hearts: 18,
        isSpecial: true,
      },
      {
        title: "Barakallahu laki",
        content: "May Allah bless you, my dear wife. You are the coolness of my eyes and the tranquility of my heart, just as the Prophet ﷺ taught us.",
        category: "blessing",
        hearts: 12,
        isSpecial: false,
      },
      {
        title: "Lailat Saeedah",
        content: "As you sleep tonight, I make dua that Allah grants you peaceful dreams and protection. You are my amanah from Allah.",
        category: "goodnight",
        hearts: 10,
        isSpecial: false,
      },
      {
        title: "Always in My Dua 💕",
        content: "In every sujood, you are remembered. In every du'a, you are mentioned. May Allah keep us together in Jannah.",
        category: "remembrance",
        hearts: 14,
        isSpecial: false,
      },
      {
        title: "Our Journey to Jannah",
        content: "Together we walk the path of righteousness. May Allah make our love a means of drawing closer to Him and earning His pleasure.",
        category: "future",
        hearts: 16,
        isSpecial: true,
      },
      {
        title: "Mashallah Tabarakallah",
        content: "Allah has made you beautiful inside and out. Your taqwa and good character make you more precious than any treasure in this world.",
        category: "appreciation",
        hearts: 13,
        isSpecial: false,
      },
      {
        title: "Bismillah",
        content: "With the name of Allah, we begin each day together. May He guide our steps and bless our marriage with His divine love.",
        category: "morning",
        hearts: 11,
        isSpecial: false,
      },
    ];

    // Insert messages
    await this.db.insert(messages).values(islamicMessages);

    // Initialize user stats
    await this.db.insert(userStats).values({
      totalHearts: 247,
      currentStreak: 12,
      lastVisit: new Date(),
      messagesViewed: 142,
      favoritesCount: 8,
      lastHeartIncrement: new Date(),
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
    const now = new Date();
    const lastIncrement = existing.lastHeartIncrement;
    
    // Check if 2 hours have passed since last increment
    if (lastIncrement) {
      const hoursSinceLastIncrement = (now.getTime() - lastIncrement.getTime()) / (1000 * 60 * 60);
      if (hoursSinceLastIncrement < 2) {
        // Not enough time has passed, return existing stats
        return existing;
      }
    }
    
    // Update hearts and last increment time
    return await this.updateUserStats({
      totalHearts: (existing.totalHearts || 0) + amount,
      lastHeartIncrement: now
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