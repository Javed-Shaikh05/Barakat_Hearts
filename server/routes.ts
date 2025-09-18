import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFavoriteSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get random message
  app.get("/api/messages/random", async (req, res) => {
    try {
      const message = await storage.getRandomMessage();
      if (!message) {
        return res.status(404).json({ message: "No messages found" });
      }
      
      // Update user stats when viewing a message
      await storage.updateStreak();
      await storage.incrementHearts(3); // Daily hearts for viewing
      
      res.json(message);
    } catch (error) {
      res.status(500).json({ message: "Failed to get random message" });
    }
  });

  // Get recent messages
  app.get("/api/messages/recent", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 5;
      const messages = await storage.getRecentMessages(limit);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to get recent messages" });
    }
  });

  // Get user stats
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getUserStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user stats" });
    }
  });

  // Add message to favorites
  app.post("/api/favorites", async (req, res) => {
    try {
      const validatedData = insertFavoriteSchema.parse(req.body);
      const favorite = await storage.addToFavorites(validatedData.messageId!);
      
      // Award hearts for favoriting
      await storage.incrementHearts(5);
      
      res.json(favorite);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
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

  const httpServer = createServer(app);
  return httpServer;
}
