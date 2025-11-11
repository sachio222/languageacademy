# Word of the Day Schema Guide

## Overview

Optimized schema for LLM-generated daily French words with authoritative linguistic depth.

## Files Created

1. **`src/schemas/wotd-schema.js`** - Zod validation schema
2. **`supabase/migrations/create-wotd-tables.sql`** - Database tables

## Database Setup

### Step 1: Create Tables

Go to Supabase SQL Editor and run:

```bash
supabase/migrations/create-wotd-tables.sql
```

This creates:
- ✅ `word_of_the_day` - Main word entries
- ✅ `wotd_attempts` - User quiz tracking
- ✅ Helper functions for queries
- ✅ RLS policies (public read, admin write)
- ✅ Indexes for performance

### Step 2: Verify Tables

```sql
-- Check tables exist
SELECT * FROM word_of_the_day LIMIT 1;
SELECT * FROM wotd_attempts LIMIT 1;

-- Test helper functions
SELECT * FROM get_todays_word();
SELECT get_user_wotd_streak('user-uuid-here');
```

## Schema Structure

### Word of the Day Entry

```javascript
{
  // Core data
  id: "aller-fr",
  date: "2025-11-11",
  word: "aller",
  phonetic: "a.le",
  part_of_speech: "verb",
  translation: "to go",
  
  // Definitions (2-3 senses)
  definitions: [
    {
      sense: "1",
      text: "To move from one place to another",
      register: "universal",
      example: "Je vais à Paris"
    }
  ],
  
  // Examples (4-5 contextual)
  examples: [
    {
      french: "Je vais au cinéma.",
      english: "I'm going to the cinema.",
      context: "Movement · A1",
      note: "Basic usage"
    }
  ],
  
  // Grammar notes
  grammar: [
    "Irregular verb · Three stems: all-, v-, ir-",
    "Auxiliary: être"
  ],
  
  // Collocations
  collocations: [
    "aller à pied (walk)",
    "aller voir (go see)"
  ],
  
  // Idioms
  idioms: [
    {
      expression: "Allons-y !",
      meaning: "Let's go!",
      level: "A2"
    }
  ],
  
  // Etymology
  etymology: {
    origin: "Latin ambulāre",
    period: "9th century",
    evolution: "ambulāre → *alāre → aler → aller",
    note: "Highly irregular"
  },
  
  // Related words
  related_words: [
    {
      word: "venir",
      translation: "to come",
      relationship: "antonym"
    }
  ],
  
  // Metadata
  difficulty_level: "A1",
  difficulty_label: "A1-C2 · Essential",
  frequency_rank: "#8",
  frequency_note: "8th most common word",
  usage_notes: "Essential verb...",
  
  // Quiz data
  correct_answer: "to go",
  wrong_options: ["to have", "to want", "to make"]
}
```

## LLM Generation Workflow

### 1. Generate with LLM

```javascript
import { generateLLMPrompt, validateWOTD } from './src/schemas/wotd-schema.js';

// Create prompt for LLM
const prompt = generateLLMPrompt('aller', '2025-11-11');

// Send to Claude/GPT
const response = await llm.generate(prompt);
const wordData = JSON.parse(response);

// Validate
const validation = validateWOTD(wordData);
if (!validation.success) {
  console.error('Validation errors:', validation.errors);
}
```

### 2. Insert into Supabase

```javascript
const { data, error } = await supabase
  .from('word_of_the_day')
  .insert({
    date: wordData.date,
    word_id: wordData.id,
    word: wordData.word,
    phonetic: wordData.phonetic,
    part_of_speech: wordData.part_of_speech,
    translation: wordData.translation,
    definitions: wordData.definitions,
    examples: wordData.examples,
    grammar: wordData.grammar,
    collocations: wordData.collocations,
    idioms: wordData.idioms,
    etymology: wordData.etymology,
    related_words: wordData.related_words,
    difficulty_level: wordData.difficulty_level,
    difficulty_label: wordData.difficulty_label,
    frequency_rank: wordData.frequency_rank,
    frequency_note: wordData.frequency_note,
    usage_notes: wordData.usage_notes,
    correct_answer: wordData.correct_answer,
    wrong_options: wordData.wrong_options,
    social_hook: wordData.social_hook,
    generated_by: 'llm',
    llm_model: 'claude-3-opus',
    reviewed: false
  });
```

### 3. Send Email (n8n)

Use the quiz data for email template:
- `correct_answer` → Option A
- `wrong_options[0]` → Option B
- `wrong_options[1]` → Option C
- `wrong_options[2]` → Option D

## Quality Control

### Required Fields
- ✅ 2-3 definitions minimum
- ✅ 4-5 examples minimum
- ✅ Grammar notes (for verbs/adjectives)
- ✅ 3-5 collocations
- ✅ 2-4 idioms
- ✅ Etymology with evolution
- ✅ 3 plausible wrong answers

### Validation Checklist
- [ ] All French text has proper accents
- [ ] IPA pronunciation is accurate
- [ ] Examples span multiple contexts
- [ ] CEFR levels are appropriate
- [ ] Idioms include "Allons-y" if applicable
- [ ] Etymology chain is historically accurate
- [ ] Wrong answers are plausible (not obviously wrong)
- [ ] Usage notes are comprehensive

## Querying Examples

### Get today's word
```javascript
const { data } = await supabase.rpc('get_todays_word');
```

### Get word by date
```javascript
const { data } = await supabase.rpc('get_word_by_date', {
  target_date: '2025-11-10'
});
```

### Get archive (last 30 days)
```javascript
const { data } = await supabase
  .from('word_of_the_day')
  .select('*')
  .order('date', { ascending: false })
  .limit(30);
```

### Save user attempt
```javascript
const { data: userProfile } = await supabase
  .from('user_profiles')
  .select('id')
  .eq('clerk_user_id', clerkUserId)
  .single();

const { data } = await supabase
  .from('wotd_attempts')
  .insert({
    user_id: userProfile.id,
    wotd_id: wordId,
    word_date: wordDate,
    word: wordText,
    selected_answer: userAnswer,
    is_correct: isCorrect,
    answer_key: answerKey, // A, B, C, D, or X
    source: 'email',
    utm_source: params.get('utm_source')
  });
```

### Get user's streak
```javascript
const { data } = await supabase.rpc('get_user_wotd_streak', {
  p_user_id: userId
});

console.log('Streak:', data); // Returns integer
```

## Data Size Estimates

**Per word entry:** ~5-8 KB (JSON)
**365 words per year:** ~2-3 MB
**1000 users × 365 attempts:** ~1-2 MB

Very lightweight, scales easily.

## LLM Optimization Tips

### Prompt Engineering
- Request JSON output directly
- Specify exact field names
- Provide examples in prompt
- Request variety in examples (contexts/levels)
- Ask for 3 plausible wrong answers

### Quality Validation
- Run through Zod schema
- Check for proper accents
- Verify CEFR levels make sense
- Ensure idioms are authentic
- Review etymology accuracy

### Batch Generation
Generate 30 days at once, review, schedule:

```javascript
const words = ['aller', 'faire', 'être', ...]; // 30 words
const results = await Promise.all(
  words.map((word, i) => generateWOTD(word, getDate(i)))
);

// Review all, then bulk insert
```

## Next Steps

1. ✅ Run SQL migration in Supabase
2. ⏳ Generate first word with LLM
3. ⏳ Validate with schema
4. ⏳ Insert into database
5. ⏳ Test frontend retrieval
6. ⏳ Set up n8n daily automation

---

**Status:** Schema ready, tables ready, frontend ready. Just needs word generation!

