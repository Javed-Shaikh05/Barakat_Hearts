#!/usr/bin/env node

/**
 * Database initialization script for Vercel deployment
 * This script ensures the database tables exist and are populated with initial data
 */

import { drizzle } from "drizzle-orm/node-postgres";
import { sql } from "drizzle-orm";
import pg from "pg";

const { Pool } = pg;

async function initializeDatabase() {
  const databaseUrl = process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('❌ No DATABASE_URL found. Please set SUPABASE_DATABASE_URL or DATABASE_URL environment variable.');
    process.exit(1);
  }

  console.log('🔗 Connecting to database...');
  
  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });
  
  const db = drizzle(pool);

  try {
    // Create tables
    console.log('📋 Creating tables...');
    
    await db.execute(sql`
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
    
    await db.execute(sql`
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
    
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS favorites (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        message_id VARCHAR REFERENCES messages(id),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS achievements (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        icon TEXT NOT NULL,
        unlocked_at TIMESTAMP
      );
    `);

    console.log('✅ Tables created successfully');

    // Check if we have messages
    const existingMessages = await db.execute(sql`SELECT COUNT(*) as count FROM messages`);
    const messageCount = existingMessages.rows[0]?.count || 0;

    if (messageCount === 0) {
      console.log('📝 Inserting initial messages...');
      
      const islamicMessages = [
        {
          title: "Subhan Allah ✨",
          content: "Allah has blessed me with the most beautiful wife. Your faith and kindness illuminate our home like the light of guidance.",
          category: "morning",
          hearts: 12,
          is_special: false,
        },
        {
          title: "Dua for My Beloved",
          content: "May Allah grant you happiness in both worlds and make you among the righteous. Your smile is a reflection of Allah's countless blessings upon us.",
          category: "dua",
          hearts: 15,
          is_special: true,
        },
        {
          title: "Fi Amanillah",
          content: "When we are apart, I place you in Allah's protection. Distance cannot diminish the bond that Allah has created between our hearts.",
          category: "missing",
          hearts: 8,
          is_special: false,
        },
        {
          title: "Alhamdulillahi Rabbil Alameen 💎",
          content: "All praise is due to Allah who blessed me with a wife who is my partner in this life and the next. You complete half of my deen.",
          category: "gratitude",
          hearts: 18,
          is_special: true,
        },
        {
          title: "Barakallahu laki",
          content: "May Allah bless you, my dear wife. You are the coolness of my eyes and the tranquility of my heart, just as the Prophet ﷺ taught us.",
          category: "blessing",
          hearts: 12,
          is_special: false,
        },
        {
          title: "Lailat Saeedah",
          content: "As you sleep tonight, I make dua that Allah grants you peaceful dreams and protection. You are my amanah from Allah.",
          category: "goodnight",
          hearts: 10,
          is_special: false,
        },
        {
          title: "Always in My Dua 💕",
          content: "In every sujood, you are remembered. In every du'a, you are mentioned. May Allah keep us together in Jannah.",
          category: "remembrance",
          hearts: 14,
          is_special: false,
        },
        {
          title: "Our Journey to Jannah",
          content: "Together we walk the path of righteousness. May Allah make our love a means of drawing closer to Him and earning His pleasure.",
          category: "future",
          hearts: 16,
          is_special: true,
        },
        {
          title: "Mashallah Tabarakallah",
          content: "Allah has made you beautiful inside and out. Your taqwa and good character make you more precious than any treasure in this world.",
          category: "appreciation",
          hearts: 13,
          is_special: false,
        },
        {
          title: "Bismillah",
          content: "With the name of Allah, we begin each day together. May He guide our steps and bless our marriage with His divine love.",
          category: "morning",
          hearts: 11,
          is_special: false,
        },
      ];

      for (const message of islamicMessages) {
        await db.execute(sql`
          INSERT INTO messages (title, content, category, hearts, is_special, created_at)
          VALUES (${message.title}, ${message.content}, ${message.category}, ${message.hearts}, ${message.is_special}, NOW())
        `);
      }

      console.log('✅ Initial messages inserted successfully');
    } else {
      console.log(`✅ Database already has ${messageCount} messages`);
    }

    // Initialize user stats if not exists
    const existingStats = await db.execute(sql`SELECT COUNT(*) as count FROM user_stats`);
    const statsCount = existingStats.rows[0]?.count || 0;

    if (statsCount === 0) {
      console.log('📊 Initializing user stats...');
      
      await db.execute(sql`
        INSERT INTO user_stats (total_hearts, current_streak, last_visit, messages_viewed, favorites_count, last_heart_increment)
        VALUES (247, 12, NOW(), 142, 8, NOW())
      `);

      console.log('✅ User stats initialized successfully');
    } else {
      console.log('✅ User stats already exist');
    }

    console.log('🎉 Database initialization completed successfully!');

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run the initialization
initializeDatabase().catch(console.error);
