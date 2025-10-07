# Reading Units Setup Guide

## CRITICAL: How Hover Definitions Actually Work

**THE MOST IMPORTANT THING TO UNDERSTAND:**

Hover definitions in reading passages are **NOT** pulled from the `vocabularyReference` array in your lesson file. They come from a **centralized vocabulary file** at `/src/components/readingVocabulary.js`.

### The System Architecture (Updated 2025)

- **`vocabularyReference`** in your reading module file (e.g., `reading-10.js`) → Used for the vocabulary sidebar reference only
- **`readingVocabulary`** in `/src/components/readingVocabulary.js` → Used for actual hover definitions on ALL reading passages
- **ReadingPassage component** imports vocabulary from the separate file

These are TWO SEPARATE SYSTEMS (but vocabulary is now centralized and maintainable).

### ⚠️ AI RESPONSIBILITY

**When creating a new reading module, the AI assistant will automatically:**

1. Create the reading module file with `vocabularyReference`
2. **Extract all unique words from the passage**
3. **Add missing words to `/src/components/readingVocabulary.js`**
4. **Run `npm run vocab:sort` to alphabetize**
5. Include all verb forms, contractions, phrases, and variations

**You should NOT need to manually update vocabulary - the AI handles this!**

## Setting Up a New Reading Unit

### Step 1: Create the Reading Module File

Create your reading module in `/src/lessons/modules/reading-X.js`:

```javascript
export const readingX = {
  title: "Reading Comprehension X - Title",
  description: "Description of what students will read",

  skipStudyMode: true,
  isReadingComprehension: true,
  concepts: [],

  readingPassage: {
    title: "French Title",
    text: `Your French passage here.
    
**Name:** Dialogue format works well.

**Other Name:** Continue dialogue.`,

    translation: `Your English translation here.
    
**Name:** English dialogue.

**Other Name:** Continue.`,
  },

  vocabularyReference: [
    // Add ALL words that appear in the passage
    // These show in the sidebar reference panel
    { french: "le mot", english: "the word", note: "helpful note" },
    { french: "autre mot", english: "other word", note: "usage example" },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // Your comprehension questions
    ],
  },
};
```

### Step 2: Words Added Automatically by AI ✅

**The AI assistant will automatically add ALL words to `/src/components/readingVocabulary.js`** including:

- All verb forms (je pense, tu penses, il pense, nous pensons, etc.)
- All noun forms (singular/plural, with articles)
- All contractions and elisions (d'abord, l'étude, etc.)
- All adjective agreements (bon, bonne, bons, bonnes)
- Multi-word phrases (en fait, tout le monde, poser des questions)
- Common expressions and fixed phrases

**After adding words, AI runs:**

```bash
npm run vocab:sort      # Alphabetize the vocabulary
npm run vocab:validate  # Ensure no errors
```

**You can verify** by checking the browser console for `Missing translation for: "word"` warnings, or by looking for red/pink highlighted words in the reading passage.

### Step 3: Test Coverage (Optional)

If you want to verify completeness:

1. Run the app
2. Navigate to the reading
3. Hover over words - they should all have tooltips
4. Red/pink highlights = missing words (AI should have caught these!)
5. Check browser console for warnings

## The Vocabulary System (New Architecture)

### Centralized & Alphabetized

All vocabulary is now in **one place**: `/src/components/readingVocabulary.js`

**Benefits:**

- ✅ **2,161 entries** alphabetically sorted
- ✅ **Easy to find words** - Just Cmd+F
- ✅ **No duplicates** - Automated validation prevents them
- ✅ **Maintainable** - One file, clear rules

### Available Commands

**Sort vocabulary:**

```bash
npm run vocab:sort
```

**Validate vocabulary:**

```bash
npm run vocab:validate
```

### How to Add Words Manually

If you need to add words yourself (though AI usually handles this):

1. Open `/src/components/readingVocabulary.js`
2. Search (Cmd+F) to check if word exists
3. Add anywhere in the file (format: `'french': 'english',`)
4. Run `npm run vocab:sort` to alphabetize
5. (Optional) Run `npm run vocab:validate` to check

**Example:**

```javascript
// Add anywhere:
'nouveau-mot': 'new word',

// Then run:
npm run vocab:sort
```

The header comment in the file has full instructions.

## Common Mistakes

### ❌ WRONG: Only adding to vocabularyReference

```javascript
// This does NOT create hover definitions!
vocabularyReference: [{ french: "d'argent", english: "money" }];
```

### ✅ CORRECT: Adding to BOTH places

```javascript
// In reading-10.js
vocabularyReference: [
  { french: "d'argent", english: "(of) money", note: "with negation" },
];

// AND in /src/components/readingVocabulary.js
export const readingVocabulary = {
  // ... (alphabetically sorted)
  "d'argent": "of money / (any) money",
  // ...
};
```

**Note:** AI handles adding to readingVocabulary.js automatically when creating readings.

## Words to Watch Out For

### Contractions & Elisions

- `d'argent` (not just `argent`)
- `l'eau` (not just `eau`)
- `s'il` (not just `si`)
- `c'est` (not just `ce` and `est`)
- `qu'est-ce` (special phrase)

### Compound Phrases

Add both the phrase AND individual words:

```javascript
's'il te plaît': 'please (informal)',
's'il': 'if it',
'si': 'if',
'te': 'you (object)',
'plaît': 'pleases',
```

### All Verb Forms

If you use `voudrions`, add it separately:

```javascript
'nous voudrions': 'we would like',
'voudrions': 'would like',  // Also add without pronoun!
```

### Plural Forms

```javascript
'homme': 'man',
'hommes': 'men',  // Don't forget plurals!
'femme': 'woman',
'femmes': 'women',
```

### All Adjective Forms

```javascript
'bon': 'good (masc)',
'bonne': 'good (fem)',
'bons': 'good (masc plural)',
'bonnes': 'good (fem plural)',
```

## Writing the Passage

### Use ONLY Previously Taught Vocabulary

Reading passages should ONLY use:

- Words taught in previous modules
- No past tenses unless explicitly taught
- No new vocabulary or constructions

### Dialogue Format (Recommended)

```
**Marie:** Bonjour! Comment ça va?

**Paul:** Ça va bien, merci!
```

The component handles the speaker labels automatically.

### Keep It Simple

- Present tense only (unless past tenses taught)
- Short, clear sentences
- Reuse vocabulary from the unit
- Build on previous reading passages

## Checklist for New Reading Unit

### AI Automatically Handles:

- [x] Created module file in `/src/lessons/modules/`
- [x] Added `vocabularyReference` entries in module file
- [x] **Added ALL words to `/src/components/readingVocabulary.js`** ← AI does this!
- [x] Included all verb forms, contractions, phrases, variations
- [x] Ran `npm run vocab:sort` to alphabetize
- [x] Ran `npm run vocab:validate` to check for errors
- [x] Added to `lessonData.js` imports and `moduleConfigs` array

### Human Verifies:

- [ ] Passage uses ONLY taught vocabulary
- [ ] Comprehension questions match the passage
- [ ] (Optional) Test hover tooltips work for all words (check for red/pink highlights)

## Debug Missing Hover Definitions

If words don't have hover tooltips:

1. Check browser console for: `Missing translation for: "word"`
2. Words without definitions show with pink/red highlight
3. Add the exact word (including accents, apostrophes) to `/src/components/readingVocabulary.js`
4. Run `npm run vocab:sort` to alphabetize
5. Remember: case-insensitive matching, but exact text matters

**Quick fix:**

```bash
# Add words to readingVocabulary.js, then:
npm run vocab:sort
npm run vocab:validate
```

## Why Two Systems?

Historical reasons. The vocabulary was originally hardcoded in `ReadingPassage.jsx` for hover definitions. The `vocabularyReference` was added later for the sidebar panel.

**2025 Refactor:** Vocabulary was extracted to `/src/components/readingVocabulary.js`:

- **Before:** 3,184 lines in ReadingPassage.jsx with 595 duplicates
- **After:** 673 lines in ReadingPassage.jsx + 2,161 unique entries in readingVocabulary.js
- **Result:** Zero duplicate warnings, alphabetized, validated, maintainable

**The AI assistant now handles both systems automatically when creating readings.**

## Vocabulary Management Scripts

### `npm run vocab:sort`

Alphabetizes all vocabulary entries using French locale rules.

**When to run:**

- After adding new words
- Before committing changes
- When entries are out of order

### `npm run vocab:validate`

Validates vocabulary integrity:

- ✅ No duplicate keys
- ✅ Alphabetical order
- ✅ No empty translations
- ✅ Format correctness

**Exit codes:**

- `0` = Validation passed
- `1` = Validation failed (for CI/git hooks)

### Vocabulary File Structure

```javascript
// /src/components/readingVocabulary.js
export const readingVocabulary = {
  a: "has / have",
  à: "to / at",
  // ... 2,161 entries alphabetically sorted
  y: "there / to it",
};
```

**Header includes:**

- Instructions for adding new words
- Format rules and examples
- Commands to run (sort, validate)

## Process Summary

When you request a new reading:

1. **You specify:** Theme, difficulty, which units to include
2. **AI creates:**
   - Reading module file with passage + questions + `vocabularyReference`
   - Extracts all unique words from the passage
   - **Adds ALL missing words to `/src/components/readingVocabulary.js`**
   - Runs `npm run vocab:sort` to alphabetize (2,161+ entries)
   - Runs `npm run vocab:validate` to ensure no errors
   - Imports and registers in `lessonData.js`
3. **You verify:** The passage works as expected (no red highlights)

**No manual work required for word definitions - AI handles the entire pipeline!**

## Maintainability: The "Where Do I Add This Word?" Problem

### The Solution: One File, Alphabetical

**Question:** "I need to add 'peut-être' - where does it go?"

**Answer:** Open `/src/components/readingVocabulary.js`, add it anywhere, run `npm run vocab:sort`. Done.

### Workflow (30 seconds)

```bash
1. Open src/components/readingVocabulary.js
2. Cmd+F to search for the word - exists? Use it. Not found? Continue.
3. Add anywhere: 'peut-être': 'perhaps / maybe',
4. Save and run: npm run vocab:sort
5. Done! Ready to commit.
```

### Why Alphabetical Beats Categories

**Search is instant:**

- Finding "depuis" in 2,161 words: Cmd+F = 0.1 seconds
- Finding "depuis" in 15 category files: Which file? 2-5 minutes

**No categorization debates:**

- Is "maintenant" a time word or adverb?
- Who cares? Just add it alphabetically.

**One place, one rule:**

- No mental model needed
- New developers productive immediately
- Merge conflicts resolve themselves

### Current Stats

- **2,161 unique entries** (as of Reading 10)
- **Alphabetically sorted** using French locale
- **Zero duplicates** (validated automatically)
- **One file** - easy to maintain
