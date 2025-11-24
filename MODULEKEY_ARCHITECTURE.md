# Module Key Architecture Fix

## The Problem

Your system uses two identifiers for modules:
1. **`id`** - Changes when modules are reordered (ephemeral)
2. **`module_key`** - Permanent identifier like "2024-01-02-etre" (stable)

The database MUST use `module_key` for tracking progress, but some schema files show `module_id`.

## The Reality

Your **actual production database** uses:
- `module_progress.module_key` ✅
- `section_progress.module_key` ✅

But your **repository schema files** show:
- `module_progress.module_id` ❌ (outdated)

## The Fix

### 1. Created Module Key Mapper (`src/utils/moduleKeyMapper.js`)

```javascript
// Maps between permanent module_key and changeable lesson id
getModuleIdFromKey(moduleKey) // "2024-01-02-etre" → 3
getModuleKeyFromId(lessonId)  // 3 → "2024-01-02-etre"
getLessonByModuleKey(key)     // Get full lesson object
getUnitIdForModule(key)       // Get which unit it belongs to
```

### 2. Updated ReportCardEnhanced.jsx

- Now uses `getLessonByModuleKey()` for mapping
- Properly handles `module_key` from database
- Falls back to lesson id if needed

### 3. Data Flow (Correct Architecture)

```
Database (Permanent IDs)
├─ module_progress.module_key = "2024-01-02-etre"
├─ section_progress.module_key = "2024-01-02-etre"
└─ unit_id = "unit1"

      ↓ (Module Key Mapper)

Lessons (Dynamic IDs)
├─ lessons[2].id = 3 (changes if modules shift)
├─ lessons[2].moduleKey = "2024-01-02-etre" (permanent)
└─ lessons[2].title = "Module 3: Essential Verb - être (to be)"

      ↓

UI Display
└─ "Module 3: Essential Verb - être (to be)" (correct current number)
```

## Key Principles

### ✅ DO Use `module_key` For:
- Database storage
- Cross-references
- Progress tracking
- Analytics queries
- Any persistent data

### ❌ DON'T Use Lesson `id` For:
- Database storage
- Cross-module references
- Progress tracking

### 🎯 Lesson `id` Is Only For:
- Display purposes ("Module 3")
- Ordering in UI
- Navigation within current session

## Migration Status

✅ **Enhanced Report Card** - Now uses module_key correctly
✅ **Module Key Mapper** - Provides bidirectional mapping
✅ **RPC Functions** - Already use module_key from database
⚠️ **Schema Files** - Need updating to reflect actual DB structure

## Next Steps

1. ✅ Module key mapper created
2. ✅ Report card updated to use mapper
3. 🔄 Test with real data
4. 📝 Update schema documentation files to match reality
5. 🔍 Audit other components for incorrect id usage

## Files Changed

- `src/utils/moduleKeyMapper.js` (new)
- `src/components/ReportCardEnhanced.jsx` (updated)
- `MODULEKEY_ARCHITECTURE.md` (this file)

