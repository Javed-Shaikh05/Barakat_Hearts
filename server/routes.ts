import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFavoriteSchema, insertMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", async (req, res) => {
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
  });

  // Get random message
  app.get("/api/messages/random", async (req, res) => {
    try {
      const message = await storage.getRandomMessage();
      if (!message) {
        return res.status(404).json({ message: "No messages found" });
      }

      // Update user stats when viewing a message
      await storage.updateStreak();
      await storage.incrementHearts(3); // Hearts every 2 hours for viewing

      res.json(message);
    } catch (error) {
      console.error("Error in /api/messages/random:", error);
      res
        .status(500)
        .json({
          message: "Failed to get random message",
          error: error instanceof Error ? error.message : "Unknown error",
        });
    }
  });

  // Get recent messages
  app.get("/api/messages/recent", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 5;
      const messages = await storage.getRecentMessages(limit);
      res.json(messages);
    } catch (error) {
      console.error("Error in /api/messages/recent:", error);
      res
        .status(500)
        .json({
          message: "Failed to get recent messages",
          error: error instanceof Error ? error.message : "Unknown error",
        });
    }
  });

  // Get user stats
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getUserStats();
      res.json(stats);
    } catch (error) {
      console.error("Error in /api/stats:", error);
      res
        .status(500)
        .json({
          message: "Failed to get user stats",
          error: error instanceof Error ? error.message : "Unknown error",
        });
    }
  });

  // Add message to favorites
  app.post("/api/favorites", async (req, res) => {
    try {
      const validatedData = insertFavoriteSchema.parse(req.body);
      const favorite = await storage.addToFavorites(validatedData.messageId!);

      // Award hearts for favoriting (if 2 hours have passed)
      await storage.incrementHearts(5);

      res.json(favorite);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid request data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add to favorites" });
    }
  });

  // Get favorites
  app.get("/api/favorites", async (req, res) => {
    try {
      const favorites = await storage.getFavorites();
      res.json(favorites);
    } catch (error) {
      res.status(500).json({ message: "Failed to get favorites" });
    }
  });

  // Remove from favorites
  app.delete("/api/favorites/:messageId", async (req, res) => {
    try {
      await storage.removeFavorite(req.params.messageId);
      res.json({ message: "Removed from favorites" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove from favorites" });
    }
  });

  // Get achievements
  app.get("/api/achievements", async (req, res) => {
    try {
      const achievements = await storage.getAchievements();
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: "Failed to get achievements" });
    }
  });

  // Create custom message
  app.post("/api/messages", async (req, res) => {
    try {
      const validatedData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(validatedData);

      // Award hearts for creating custom message (if 2 hours have passed)
      await storage.incrementHearts(10);

      res.json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid message data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
