# Cambridge Dictionary Migration Guide

Complete guide for migrating 2,396 Cambridge dictionary entries from JavaScript files to PostgreSQL database.

## 🎯 Overview

**What we're migrating:**
- **Source:** 12 Cambridge dictionary JavaScript files (2,396 entries)
- **Destination:** PostgreSQL database in Supabase
- **Structure:** JSONB for nested data + direct columns for fast queries

## 📋 Prerequisites

### 1. Environment Variables
```bash
# Required for migration script
VITE_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 2. Dependencies
```bash
npm install @supabase/supabase-js
```

## 🚀 Migration Steps

### Step 1: Create Database Schema
```bash
# Run the schema in your Supabase SQL editor
cat database-dictionary-schema.sql
```

**What this creates:**
- `dictionary_words` table with JSONB columns
- Performance indexes for common queries
- Row Level Security (RLS) policies
- Useful views for curriculum and relationships
- Automatic timestamp triggers

### Step 2: Run Migration Script
```bash
# Migrate all Cambridge dictionary entries
node migrate-cambridge-to-database.js
```

**What this does:**
- Loads all 12 Cambridge dictionary files
- Transforms 2,396 entries to database format
- Batch inserts with error handling
- Creates detailed migration report

### Step 3: Verify Migration
```sql
-- Check total count
SELECT COUNT(*) FROM dictionary_words;

-- Check by part of speech
SELECT part_of_speech, COUNT(*) 
FROM dictionary_words 
GROUP BY part_of_speech 
ORDER BY COUNT(*) DESC;

-- Test a sample query
SELECT word, part_of_speech, translations 
FROM dictionary_words 
WHERE unit = 'unit1' 
LIMIT 5;
```

## 📊 Database Schema Details

### Core Table Structure
```sql
dictionary_words (
  -- Direct columns (fast queries)
  id TEXT PRIMARY KEY,
  word TEXT NOT NULL,
  part_of_speech TEXT NOT NULL,
  unit TEXT,
  module TEXT,
  lesson TEXT,
  
  -- JSONB columns (flexible nested data)
  translations JSONB,
  relationships JSONB,
  examples JSONB,
  tags JSONB,
  cambridge_data JSONB
)
```

### Key Indexes
- **Word lookups:** `idx_dictionary_words_word`
- **Curriculum queries:** `idx_dictionary_words_unit_module`
- **JSONB searches:** GIN indexes on all JSONB columns
- **Full-text search:** `idx_dictionary_words_search`

### Useful Views
- `dictionary_basic` - Simple word lookups
- `dictionary_curriculum` - Words organized by unit/module
- `dictionary_relationships` - Word relationship graph

## 🔍 Common Queries

### Basic Word Lookup
```sql
SELECT word, part_of_speech, gender, phonetic, translations 
FROM dictionary_words 
WHERE word = 'chat';
```

### Curriculum Queries
```sql
-- All nouns in unit1
SELECT word, gender, translations 
FROM dictionary_words 
WHERE part_of_speech = 'noun' AND unit = 'unit1';

-- Word count by unit
SELECT unit, COUNT(*) as word_count 
FROM dictionary_words 
WHERE unit IS NOT NULL 
GROUP BY unit 
ORDER BY unit;
```

### Search Queries
```sql
-- Words containing 'chat'
SELECT word, part_of_speech, translations 
FROM dictionary_words 
WHERE word ILIKE '%chat%';

-- Words with specific translations
SELECT word, part_of_speech 
FROM dictionary_words 
WHERE translations @> '[{"text": "cat"}]';
```

### Relationship Queries
```sql
-- Find all conjugation relationships
SELECT * FROM dictionary_relationships 
WHERE relationship_type = 'conjugation_pair';

-- Words related to 'être'
SELECT target_word, relationship_type 
FROM dictionary_relationships 
WHERE word = 'être';
```

## 🛡️ Security & Permissions

### Row Level Security (RLS)
- **Read access:** All authenticated users
- **Write access:** Admin users only (via Clerk metadata)

### Admin Access
Users need `role: 'admin'` in their Clerk user metadata to modify dictionary entries.

## 📈 Performance Considerations

### Optimized For:
- **Word lookups** - Direct index on `word` column
- **Curriculum filtering** - Composite index on `unit`, `module`, `lesson`
- **JSONB queries** - GIN indexes on all JSONB columns
- **Full-text search** - Trigram indexes for fuzzy matching

### Query Performance:
- Simple word lookups: **O(1)** with index
- Curriculum queries: **O(log n)** with composite index
- JSONB searches: **O(log n)** with GIN index
- Full-text search: **O(log n)** with trigram index

## 🔄 API Integration

### Update Dictionary Lookup Functions
After migration, update your dictionary lookup code:

```javascript
// Before (JavaScript Map)
const word = dictionary.get('chat-fr');

// After (Database query)
const { data: word } = await supabase
  .from('dictionary_words')
  .select('*')
  .eq('id', 'chat-fr')
  .single();
```

### Maintain Backward Compatibility
Keep the existing JavaScript files during transition period for fallback.

## 📝 Migration Checklist

- [ ] Set environment variables
- [ ] Install dependencies
- [ ] Run database schema (`database-dictionary-schema.sql`)
- [ ] Execute migration script (`migrate-cambridge-to-database.js`)
- [ ] Verify data integrity (check counts and sample queries)
- [ ] Update API endpoints to use database
- [ ] Test application functionality
- [ ] Monitor performance
- [ ] Create backup of JavaScript files
- [ ] Update documentation

## 🚨 Rollback Plan

If issues occur:
1. **Keep JavaScript files** as backup during transition
2. **Revert API calls** to use JavaScript Map lookups
3. **Drop database table** if needed: `DROP TABLE dictionary_words;`
4. **Restore from backup** if data corruption occurs

## 📊 Expected Results

After successful migration:
- **2,396 dictionary entries** in PostgreSQL
- **Fast queries** with proper indexing
- **Flexible JSONB** for nested data
- **Curriculum integration** with direct columns
- **Full-text search** capabilities
- **Scalable architecture** for future growth

## 🎉 Benefits

1. **Performance:** Database indexes vs in-memory Map lookups
2. **Scalability:** SQL queries vs hardcoded JavaScript functions  
3. **Flexibility:** Complex queries vs simple key-value lookups
4. **Integration:** Direct API access vs file loading
5. **Consistency:** ACID guarantees vs file-based updates
6. **Search:** Full-text search vs string matching
