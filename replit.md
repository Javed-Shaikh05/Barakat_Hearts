# Love Letters - Romantic Messages App

## Overview

Love Letters is a romantic messaging application built with a full-stack TypeScript architecture. The app delivers daily romantic messages to users with gamification elements including daily streaks, heart collection, and achievement unlocks. It features a modern React frontend with Express.js backend, PostgreSQL database management via Drizzle ORM, and a romantic pink-themed UI built with shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite for development and building
- **UI Library**: shadcn/ui components with Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom romantic color scheme (pink, rose, blush tones)
- **State Management**: TanStack Query for server state and React hooks for local state
- **Routing**: Wouter for lightweight client-side routing
- **Animations**: Framer Motion for smooth transitions and floating heart effects

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon serverless PostgreSQL
- **API Design**: RESTful endpoints for messages, user stats, favorites, and achievements
- **Session Management**: Express sessions with PostgreSQL session store

### Data Storage Solutions
- **Primary Database**: PostgreSQL via Neon serverless platform
- **Schema Management**: Drizzle migrations with schema-first approach
- **Tables**: 
  - `messages` - romantic content with categories and special flags
  - `user_stats` - gamification metrics (hearts, streaks, views)
  - `favorites` - user's saved messages
  - `achievements` - unlockable rewards system

### Authentication and Authorization
- **Session-based**: Using connect-pg-simple for PostgreSQL session storage
- **Simple Model**: Single-user application with session persistence
- **Security**: CORS configuration and request validation with Zod schemas

### External Dependencies
- **Database**: Neon PostgreSQL serverless database
- **Fonts**: Google Fonts (Playfair Display, Dancing Script, Poppins)
- **Development**: Replit-specific plugins for development environment
- **Build Tools**: esbuild for server bundling, Vite for client bundling

The application uses a monorepo structure with shared TypeScript schemas, separate client/server directories, and environment-based configuration for development and production deployments.