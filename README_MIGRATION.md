# Module ID to ModuleKey Migration Guide

## Overview

This migration converts all `module_id` values in your database from numeric IDs (like `"1"`, `"2"`, `"3"`) to stable moduleKeys (like `"2024-01-01-famous-words"`).

## Why This Migration?

- **Stability**: ModuleKeys never change, even when modules are reordered
- **Data Integrity**: User progress won't break when you add/remove/reorder modules
- **Future-Proof**: New modules work seamlessly without special handling

## Steps to Migrate

### Step 1: Generate Complete Mapping

Run this in your browser console (on your app) or create a temporary script:

```javascript
// In browser console on your app:
import('./src/lessons/lessonData.js').then(m => {
  const mappings = m.lessons.map((lesson, index) => ({
    id: lesson.id,
    moduleKey: lesson.moduleKey,
    title: lesson.title
  }));
  
  console.log('-- Complete Module ID to ModuleKey Mapping');
  console.log('VALUES');
  mappings.forEach((m, i) => {
    const comma = i < mappings.length - 1 ? ',' : '';
    console.log(`  (${m.id}, '${m.moduleKey}')${comma}  -- ${m.title}`);
  });
});
```

Or manually check each unit config file:
- `src/lessons/modules/unit1/unit-config.js` → check module order
- Each module file has `moduleKey: "..."` property
- Map position in array (1-indexed) to moduleKey

### Step 2: Update SQL Migration

1. Open `migrate-module-ids-to-modulekeys.sql`
2. Replace the `VALUES` section in `module_id_mapping` CTE with your complete mapping
3. Make sure all modules are included

### Step 3: Run Pre-Migration Check

Uncomment and run the pre-migration analysis query in the SQL file to see:
- Which numeric IDs exist in your database
- How many records will be affected

### Step 4: Execute Migration

1. Open Supabase SQL Editor
2. Copy the entire `migrate-module-ids-to-modulekeys.sql` file
3. Paste and execute
4. Review the migration summary at the end

### Step 5: Verify

Run the verification queries at the bottom of the SQL file to confirm:
- No numeric IDs remain
- All records successfully migrated

## Rollback (If Needed)

If something goes wrong, you can rollback by converting moduleKeys back to numeric IDs. However, this requires knowing the original mapping, so **backup your database first**.

## After Migration

Once migration is complete:

1. ✅ Update `extractModuleId()` in `src/utils/progressSync.js` to return `moduleKey` instead of `id`
2. ✅ Test that user progress loads correctly
3. ✅ Verify module completion emails/webhooks still work
4. ✅ Remove old mapping code if no longer needed

## Files Modified

- `migrate-module-ids-to-modulekeys.sql` - Main migration script
- `src/utils/progressSync.js` - Update `extractModuleId()` function (after migration)

