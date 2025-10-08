# 🚀 Development Mode Guide

## Quick Start (No Auth Required!)

Your app now has a **Development Mode** that lets you test everything immediately without setting up authentication.

## How It Works

When `VITE_DEV_MODE=true` in your `.env` file:

✅ **No authentication required** - bypass Clerk login
✅ **Database integration** - progress saved to Supabase (not localStorage!)
✅ **Instant testing** - start using the app immediately
✅ **Full functionality** - all features work including analytics
✅ **Dev banner** - visible indicator you're in dev mode
✅ **Real user in database** - creates "dev-user" profile in Supabase

## Toggle Dev Mode

### Enable Dev Mode (Default for quick testing):

```bash
VITE_DEV_MODE=true
```

### Disable Dev Mode (Use real auth and database):

```bash
VITE_DEV_MODE=false
```

After changing, restart your dev server:

```bash
npm run dev
```

## What's Different in Dev Mode?

| Feature               | Dev Mode          | Production Mode   |
| --------------------- | ----------------- | ----------------- |
| **Authentication**    | Bypassed ✨       | Clerk required    |
| **Progress Storage**  | Supabase database | Supabase database |
| **User ID**           | "dev-user"        | Real Clerk ID     |
| **Multi-device Sync** | ✅ Yes            | ✅ Yes            |
| **Analytics**         | ✅ Full tracking  | ✅ Full tracking  |
| **Offline Sync**      | ✅ Automatic      | ✅ Automatic      |
| **Visual Indicator**  | Purple banner     | User profile icon |

## Testing Progress Tracking

In dev mode, your progress is automatically saved to Supabase database under a "dev-user" profile:

```javascript
// View your dev user in Supabase:
// Go to your Supabase dashboard → Table Editor → user_profiles
// Look for clerk_user_id = "dev-user-default"

// All your exercise completions, module progress, and analytics are tracked
// just like a real user, but without authentication!
```

### Creating Multiple Dev Users

You can test with multiple dev users:

```javascript
// In browser console:
localStorage.setItem("dev_user_id", "alice"); // Creates "dev-user-alice"
localStorage.setItem("dev_user_id", "bob"); // Creates "dev-user-bob"

// Then refresh the page
```

## When to Use Each Mode

### Use Dev Mode When:

- 🛠️ Developing new features
- 🧪 Testing the UI/UX
- 🏃 Quick iterations and debugging
- 📱 Testing on a single device
- 🎓 Learning the codebase

### Use Production Mode When:

- 🚀 Deploying to production
- 👥 Testing multi-user features
- 📊 Testing analytics
- 🔄 Testing cross-device sync
- 🧪 Testing authentication flows

## Current Setup

Your `.env` is configured with:

- ✅ Dev Mode: `ENABLED`
- ✅ Supabase credentials: `CONFIGURED`
- ✅ Clerk credentials: `CONFIGURED`

You can switch between modes anytime by changing `VITE_DEV_MODE`!

## Troubleshooting

### Dev mode banner not showing?

- Restart your dev server after changing `.env`
- Check browser console for any errors
- Verify `VITE_DEV_MODE=true` (exact spelling)

### Progress not saving?

- Check browser console for localStorage errors
- Try clearing localStorage and starting fresh
- Make sure you're completing exercises correctly

### Want to switch to production mode?

1. Set `VITE_DEV_MODE=false` in `.env`
2. Restart dev server
3. You'll see the Clerk authentication screen

## 🎉 You're Ready!

Start your dev server and you'll be able to use the app immediately:

```bash
npm run dev
```

No signup, no login, no database setup needed - just start learning French!
