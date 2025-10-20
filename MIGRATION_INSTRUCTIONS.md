# Exercise ID Migration Instructions

## Why Migration is Needed

The mapping approach has a critical flaw: it only works for existing modules that had old numeric IDs. When new modules are added, they won't have entries in the mapping table, making the system break down over time.

**Solution**: One-time migration to convert all existing exercise IDs to the stable moduleKey format.

## Migration Process

### 1. Set Environment Variables

```bash
# Add to your .env file or set in your environment
export VITE_SUPABASE_URL="your-supabase-url"
export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

### 2. Run Migration Script

```bash
node migrate-exercise-ids.js
```

### 3. Verify Migration

The script will output:

- ✅ Number of records migrated
- ⏭️ Number of records skipped (already in new format)
- ❌ Number of errors (if any)

### 4. Clean Up (After Migration)

Once migration is complete, you can:

1. **Remove mapping file**: `src/lessons/moduleIdMapping.js`
2. **Remove fallback logic**: Already simplified in `ExercisePane.jsx`
3. **Update documentation**: Remove references to mapping approach

## What the Migration Does

### Before Migration

```
Database contains mixed formats:
- "8.1" (old numeric - breaks when modules shift)
- "2024-01-08-connectors.1" (new moduleKey - stable)
```

### After Migration

```
Database contains only stable format:
- "2024-01-08-connectors.1" (all records converted)
- "2024-10-20-liaison-help.1" (new modules work seamlessly)
```

## Benefits After Migration

### ✅ **Truly Future-Proof**

- New modules work immediately without any mapping
- No maintenance of mapping tables
- System scales infinitely

### ✅ **Clean Architecture**

- No complex fallback logic needed
- Simplified codebase
- Better performance (no conversion overhead)

### ✅ **Zero Risk**

- Migration preserves all existing data
- Rollback possible if needed
- Non-destructive operation

## Rollback Plan (If Needed)

If something goes wrong, you can rollback by:

1. **Restore database backup** (recommended)
2. **Or reverse the migration** with a script that converts moduleKey IDs back to numeric

## Post-Migration Verification

After migration, test that:

1. ✅ Existing users see their saved answers
2. ✅ New exercise completions save correctly
3. ✅ Adding new modules doesn't break anything
4. ✅ No performance issues

## Timeline

- **Preparation**: 5 minutes (set environment variables)
- **Migration**: 1-5 minutes (depends on data size)
- **Verification**: 5 minutes (test key functionality)
- **Total**: ~15 minutes for complete migration

This one-time migration eliminates the mapping dependency and makes your system truly future-proof for unlimited module additions.
