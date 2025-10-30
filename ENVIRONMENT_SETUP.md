# Environment Setup Guide

## Required Environment Variables

Create a `.env` file in the project root with the following variables:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Microsoft Clarity Analytics (Optional)
VITE_CLARITY_PROJECT_ID=your_clarity_project_id
```

## Setup Steps

### 1. Supabase Setup
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Go to Settings > API to find your URL and anon key
3. Go to SQL Editor and run the `database-schema.sql` file to create tables
4. Add your URL and anon key to the `.env` file

### 2. Clerk Setup
1. Go to [clerk.com](https://clerk.com) and create a new application
2. Enable Email/Password, Google, and Facebook authentication providers
3. Copy your publishable key to the `.env` file
4. Configure your application settings (redirect URLs, etc.)

### 3. Database Schema
Run the SQL commands from `database-schema.sql` in your Supabase SQL Editor to create:
- All required tables for progress tracking
- Row Level Security (RLS) policies
- Indexes for optimal performance
- Triggers for automatic timestamp updates

## Development
After setting up the environment variables, restart your development server:
```bash
npm run dev
```
