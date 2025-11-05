# Dictionary Migration Summary

## What Changed

The Language Academy dictionary has migrated from **static .js files** to **Supabase PostgreSQL database**.

### Before (Old System)
```bash
# Generated .js Map files
node generate-lesson-words.js --file words.json
# → Wrote to src/data/dictionary/words/cambridge/nouns.js
```

### After (New System)
```bash
# Inserts directly into database
node add-words-to-database.js --file words.json
# → Inserts into Supabase dictionary_words table
```

## Key Changes

| Aspect | Old System | New System |
|--------|-----------|------------|
| **Storage** | .js files with Map() | PostgreSQL database |
| **Script** | `generate-lesson-words.js` | `add-words-to-database.js` |
| **Guide** | `DICTIONARY_GENERATOR_GUIDE.md` | `DICTIONARY_DATABASE_GUIDE.md` |
| **Lookup** | Import from .js files | `useDictionary` hook queries DB |
| **Updates** | Edit .js files manually | Database UPDATE queries |
| **Search** | Client-side filtering | PostgreSQL full-text search |

## What Stayed the Same

✅ **Data format** - JSON structure is nearly identical
✅ **Part-of-speech fields** - Same verb_phrases, noun_articles, etc.
✅ **Relationships** - Same relationship system
✅ **Examples** - Same example format
✅ **Tags** - Same tagging system

## Migration Status

✅ All 2,396 Cambridge entries migrated to database
✅ Frontend using `useDictionary` hook
✅ Cambridge .js files kept for reference (not imported)
✅ New workflow documented

## Quick Reference

### Adding Words

```bash
# Single word
node add-words-to-database.js \
  --word "chat" \
  --translation "cat" \
  --pos "noun" \
  --gender "masculine"

# From file
node add-words-to-database.js --file lesson-words.json

# Update existing
node add-words-to-database.js --file words.json --upsert
```

### File Format (Same as Before!)

```json
[
  {
    "word": "chat",
    "translation": "cat",
    "partOfSpeech": "noun",
    "gender": "masculine",
    "noun_articles": {
      "definite": "le",
      "indefinite": "un"
    }
  }
]
```

### In Your Code

```javascript
// Old way (deprecated)
import { nounsCambridge } from './dictionary/words/cambridge/nouns';

// New way
import { useDictionary } from '../hooks/useDictionary';

function MyComponent() {
  const { searchWords } = useDictionary();
  const results = await searchWords('chat');
}
```

## Benefits of New System

1. **Real-time updates** - No rebuild needed to add words
2. **Better search** - PostgreSQL full-text search
3. **Scalability** - Database handles large dictionaries
4. **Multi-user** - Multiple people can add words
5. **Query flexibility** - Complex filters (by unit, CEFR, etc.)
6. **Smaller bundles** - Dictionary not in production build

## Files Status

### Active (New System)
- ✅ `add-words-to-database.js` - Add words to database
- ✅ `DICTIONARY_DATABASE_GUIDE.md` - New workflow guide
- ✅ `database-dictionary-schema.sql` - Database schema
- ✅ `src/hooks/useDictionary.js` - Dictionary query hook

### Legacy (Kept for Reference)
- 📦 `generate-lesson-words.js` - Old .js file generator
- 📦 `src/data/dictionary/words/cambridge/*.js` - Cambridge files
- 📦 `DICTIONARY_GENERATOR_GUIDE.md` - Old workflow guide

### Utility Scripts
- 🔧 `migrate-cambridge-to-database.js` - One-time migration (complete)

## For Developers

### src/data/dictionary/index.js
```javascript
// Cambridge imports COMMENTED OUT (not loaded)
/*
import { nounsCambridge } from "./words/cambridge/nouns.js";
// ... etc
*/

// Dictionary now returns empty Map (uses database instead)
export const dictionary = new Map([]);
```

### Vite Build
- Cambridge chunk removed from build
- Dictionary data not bundled
- Faster builds, smaller bundles

## FAQ

**Q: Can I still use the old .js files?**
A: They're kept for reference but not imported. The app uses the database exclusively.

**Q: What if I need to update a word?**
A: Use `--upsert` flag:
```bash
node add-words-to-database.js --file updated-words.json --upsert
```

**Q: How do I search the dictionary now?**
A: Use the `useDictionary` hook in React components, or query Supabase directly.

**Q: Are redirects still supported?**
A: Yes! Same redirect format works in the database.

**Q: Can I export the database back to .js files?**
A: Not currently needed, but could create an export script if required.

## See Also

- [DICTIONARY_DATABASE_GUIDE.md](./DICTIONARY_DATABASE_GUIDE.md) - Complete new workflow guide
- [database-dictionary-schema.sql](./database-dictionary-schema.sql) - Database schema
- [src/hooks/useDictionary.js](./src/hooks/useDictionary.js) - Dictionary hook

---

**Updated**: November 2025
**Status**: ✅ Migration Complete


