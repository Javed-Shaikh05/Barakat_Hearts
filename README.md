# Barakat Hearts - Islamic Messages App

A beautiful Islamic messaging application featuring daily romantic messages, duas, quotes, and a counter starting from January 21st, 2024. Built with React, Express.js, and PostgreSQL.

## Features

- 🕌 Islamic themed with authentic content
- 💕 5 tabs: Home (counter), Messages, Stats, Duas, Love
- 📿 Gamification with hearts collection and daily streaks
- 🎯 Mobile-first responsive design
- 🌙 Beautiful Islamic welcome popups

## Tech Stack

- **Frontend**: React + TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Deployment**: Vercel + Supabase

## Environment Setup

1. Copy `.env.example` to `.env.local` for local development
2. Configure your database URL:
   ```
   DATABASE_URL=postgresql://user:password@host:5432/database
   SESSION_SECRET=your_secure_random_session_secret
   ```

## Deployment on Vercel with Supabase

1. Create a new Supabase project and get your database URL
2. In Vercel, set these environment variables:
   - `DATABASE_URL` or `SUPABASE_DATABASE_URL`: Your Supabase database connection string
   - `SESSION_SECRET`: A secure random string for session encryption
   - `NODE_ENV`: `production`
3. Run `npm run db:push` locally against your Supabase database to create tables
4. Deploy to Vercel

The app will automatically fall back to in-memory storage if no database URL is provided.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Database Setup

The app uses Drizzle ORM with PostgreSQL. The database schema includes:

- `messages` - Islamic content and messages
- `user_stats` - Gamification metrics (hearts, streaks)
- `favorites` - User's saved messages
- `achievements` - Unlockable rewards

## Deployment

This app is configured for deployment on Vercel with Supabase as the database provider.

## Islamic Content

All Islamic content includes authentic Quran verses and Hadith with proper Arabic text, English translations, and source citations to maintain accuracy and respect for the sacred texts.