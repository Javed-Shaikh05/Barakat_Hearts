const { z } = require("zod");

// Schema definitions for validation
const insertMessageSchema = z.object({
  title: z.string(),
  content: z.string(),
  category: z.string(),
  hearts: z.number().optional(),
  isSpecial: z.boolean().optional(),
});

const insertUserStatsSchema = z.object({
  totalHearts: z.number().optional(),
  currentStreak: z.number().optional(),
  lastVisit: z.date().optional(),
  messagesViewed: z.number().optional(),
  favoritesCount: z.number().optional(),
  lastHeartIncrement: z.date().optional(),
});

const insertFavoriteSchema = z.object({
  messageId: z.string(),
});

const insertAchievementSchema = z.object({
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  unlockedAt: z.date().optional(),
});

module.exports = {
  insertMessageSchema,
  insertUserStatsSchema,
  insertFavoriteSchema,
  insertAchievementSchema,
};
