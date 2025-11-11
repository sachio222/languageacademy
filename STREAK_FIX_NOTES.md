# Streak Fix - November 11, 2025

## Problem
User streaks were frozen at their October 30, 2025 values and not updating despite daily activity.

## Root Cause
**Commit:** `abfaff5` (Oct 30, 2025 1:26 PM EDT)  
**Issue:** Removed the `useEffect` that called `updateStreak()` when sessions started  
**Comment added:** "Streak calculation is handled by useStreak hook internally"  
**Reality:** The hook only exports the function, it doesn't call it automatically

## Timeline
- **Oct 30, 12:52 PM** - Analytics refactored, streak logic moved to dedicated hook
- **Oct 30, 1:26 PM** - Breaking commit removed the call to `updateStreak()`
- **153 commits later** - Bug discovered, streaks frozen for 12 days

## Fixes Applied

### 1. ✅ SQL Timezone Fix (Manual)
Updated `get_session_dates()` function to use user's timezone instead of hardcoded Pacific time.

### 2. ✅ Code Fix (Automatic)
**File:** `src/hooks/useAnalytics.js`  
**Change:** Restored the useEffect that calls `updateStreak()` when sessions start

```javascript
useEffect(() => {
  if (currentSession && isAuthenticated) {
    setTimeout(() => {
      updateStreak();
    }, 500);
  }
}, [currentSession, isAuthenticated, updateStreak]);
```

### 3. ⏳ One-Time Data Fix
**Script:** `fix-all-streaks.js`  
**Purpose:** Recalculate correct streak values for all users

## How to Run the Fix

```bash
# Fix will happen automatically on next login for each user
# But to fix all users immediately, run:
node fix-all-streaks.js
```

## Expected Results
- ✅ Streaks will update correctly going forward
- ✅ Accurate timezone-based day calculations
- ✅ All frozen streak values recalculated
- ✅ No data loss - uses existing session data

## Prevention
The removed code has been restored with proper comments explaining why it's necessary.

