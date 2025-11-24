# Module Completion Migration to Section System

## Overview

This migration enables users who completed modules under the old system to see their progress in the new section-based report card. Without this migration, their completed modules wouldn't appear because the new report card requires section-level completion data.

## Problem Statement

**Old System:**
- Module completion tracked in `module_progress.completed_at`
- Module time in `module_progress.time_spent_seconds`
- No section-level tracking

**New System:**
- Section completion required in `section_progress` table
- Module is considered complete when ALL sections are complete
- Time calculated from section totals
- Report card filters out modules without section activity

**Result:** Users with completed modules but no section data couldn't see their progress or access subsequent modules.

## Solution: Option B - Fallback with Data Integrity

We chose to:
1. Create `section_progress` entries for all sections of completed modules
2. Set `time_spent_seconds = 0` to indicate section-level time is N/A
3. Store migration metadata in `progress_data` JSONB field
4. Update report card code to fall back to module time when section times are 0

### Why Option B?

- **Data Integrity:** Clearly marks that section-level data is not available
- **Accurate Time:** Preserves actual module time instead of creating fake section times
- **Clear Attribution:** Visual indicator (*) shows users when time is from old system
- **Transparent:** Migration metadata in database for debugging

## Migration Script

**File:** `supabase/migrations/20251124000008_migrate_completed_modules_to_sections.sql`

### What It Does

1. **Determines Sections:** Uses pattern matching (exam, practice, help, reading, phonics) to identify module types
2. **Creates Entries:** For each completed module, creates `section_progress` rows with:
   - `time_spent_seconds = 0` (N/A marker)
   - `completed_at = module.completed_at` (preserves completion date)
   - `progress_data = { migrated: true, accuracy: exam_score || 85 }`
3. **Idempotent:** Skips sections that already have data
4. **Safe:** Read-only queries to `module_progress`, only inserts into `section_progress`

### Running the Migration

```bash
# Apply migration via Supabase CLI
npx supabase migration up

# Or apply directly in Supabase dashboard
# Copy contents of migration file and run in SQL editor
```

### Module Type Detection

The migration uses pattern matching to determine which sections each module needs:

| Module Type | Pattern Match | Sections Created |
|-------------|---------------|------------------|
| Unit Exam | Contains 'exam' or 'unit-' | `exam-questions` |
| Fill-in-Blank | Contains 'practice' or 'fill' | `practice-exercises` |
| Help Module | Contains 'help' | `interactive-help` |
| Reading | Contains 'reading' | `reading-passage` |
| Phonics Reference | Contains 'phonics' or 'reference' | `reference-content` |
| Standard (default) | Everything else | `vocabulary-intro`, `flash-cards`, `speed-match`, `writing`, `pronunciation` |

**Note:** For better accuracy, run `scripts/analyze-module-sections.js` to generate exact CASE statements based on actual lesson data.

## Code Changes

### 1. progressService.js - Time Fallback Logic

```javascript
// Before: Only used section time
const displayTime = totalSectionTime;

// After: Fall back to module time when section time is 0
const hasSectionTimeData = totalSectionTime > 0;
const displayTime = hasSectionTimeData 
  ? totalSectionTime 
  : (module.time_spent_seconds || 0);
```

**Changes Made:**
- `getUnitModules()`: Falls back to module time for display
- `getUnitProgress()`: Includes completed modules even if section time = 0
- `getRecentActivity()`: Falls back to module time
- `getHeroStats()`: Sums time intelligently (section if > 0, else module)

### 2. ModuleRow.jsx - Visual Indicator

Added asterisk (*) indicator when time is from old system:

```jsx
{module.time_source === 'module' && (
  <span className="time-source-badge" title="Time data from old system">*</span>
)}
```

### 3. ModuleRow.css - Badge Styling

```css
.time-source-badge {
  color: #999;
  font-size: 0.875rem;
  opacity: 0.7;
  cursor: help;
}
```

## Data Model

### section_progress (migrated entries)

```sql
{
  user_id: UUID,
  module_key: TEXT,
  section_id: TEXT,
  time_spent_seconds: 0,  -- Indicates N/A
  completed_at: TIMESTAMP, -- From module.completed_at
  progress_data: {
    "migrated": true,
    "accuracy": 85,  -- exam_score or default 85%
    "migrated_from_module_progress": true,
    "note": "Section-level data not available - migrated from old system"
  }
}
```

## Testing

### 1. Run Analysis Script

```bash
node scripts/analyze-module-sections.js
```

This will:
- Show module type breakdown
- Generate accurate SQL CASE statement
- Help verify section mappings

### 2. Test Migration (Dry Run)

Before running the full migration, test on a single user:

```sql
-- Test query: See what would be created for a specific user
SELECT 
  mp.module_key,
  mp.completed_at,
  mp.exam_score,
  mp.time_spent_seconds,
  -- Add your module type detection logic here
  CASE 
    WHEN mp.module_key LIKE '%exam%' THEN 'exam'
    WHEN mp.module_key LIKE '%practice%' THEN 'fill-in-blank'
    ELSE 'standard'
  END as detected_type
FROM module_progress mp
WHERE mp.user_id = '<test_user_id>'
  AND mp.completed_at IS NOT NULL
ORDER BY mp.completed_at;
```

### 3. Verify After Migration

```sql
-- Check migrated entries
SELECT 
  sp.module_key,
  sp.section_id,
  sp.time_spent_seconds,
  sp.completed_at,
  sp.progress_data->>'migrated' as is_migrated,
  sp.progress_data->>'accuracy' as accuracy
FROM section_progress sp
WHERE sp.progress_data->>'migrated' = 'true'
LIMIT 20;

-- Count migrated vs organic sections
SELECT 
  CASE 
    WHEN progress_data->>'migrated' = 'true' THEN 'Migrated'
    ELSE 'Organic'
  END as data_source,
  COUNT(*) as section_count
FROM section_progress
GROUP BY data_source;
```

### 4. Test Report Card Display

1. Log in as user with migrated data
2. Open Report Card (Enhanced)
3. Verify:
   - Completed modules appear
   - Module time displays correctly
   - Asterisk (*) shows for migrated time
   - Hovering shows "Time data from old system"
   - All sections show as complete
   - User can access next modules

## Rollback Plan

If needed, remove migrated section data:

```sql
-- Remove all migrated section_progress entries
DELETE FROM section_progress
WHERE progress_data->>'migrated' = 'true';

-- Verify
SELECT COUNT(*) FROM section_progress WHERE progress_data->>'migrated' = 'true';
-- Should return 0
```

The code changes handle both cases gracefully:
- With migrated data: Falls back to module time
- Without migrated data: Modules won't show (pre-migration state)

## Future Improvements

1. **Better Module Type Detection:**
   - Use `analyze-module-sections.js` output for exact mappings
   - Update migration with generated CASE statement
   
2. **Data Cleanup:**
   - After all users have new section data, remove migration markers
   - Consider flagging modules as "legacy" in module_progress

3. **UI Enhancement:**
   - Add tooltip explaining migrated data
   - Option to hide asterisk if user doesn't care

4. **Analytics:**
   - Track how many users have migrated vs organic data
   - Monitor if users re-do migrated modules for better data

## Summary

This migration ensures:
✅ Users keep their completed module credits
✅ Users can access next modules without redoing work
✅ Module time data is preserved accurately
✅ Clear indication when section-level detail is unavailable
✅ System handles both old and new data gracefully
✅ Migration is reversible and safe

The approach maintains data integrity while providing a smooth transition from the old module-based system to the new section-based reporting.

