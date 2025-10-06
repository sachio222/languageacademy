# Reading Units Setup Guide

## CRITICAL: How Hover Definitions Actually Work

**THE MOST IMPORTANT THING TO UNDERSTAND:**

Hover definitions in reading passages are **NOT** pulled from the `vocabularyReference` array in your lesson file. They are **HARDCODED** in `/src/components/ReadingPassage.jsx` in the `wordTranslations` object.

### The Confusing Truth

- **`vocabularyReference`** in your reading module file (e.g., `reading-7.js`) → Used for the vocabulary sidebar reference only
- **`wordTranslations`** in `ReadingPassage.jsx` → Used for actual hover definitions on words in the passage

These are TWO SEPARATE SYSTEMS.

### ⚠️ AI RESPONSIBILITY

**When creating a new reading module, the AI assistant will automatically:**

1. Create the reading module file with `vocabularyReference`
2. **Immediately add ALL words to `wordTranslations` in `ReadingPassage.jsx`**
3. Include all verb forms, contractions, phrases, and variations

**You should NOT need to manually update `ReadingPassage.jsx` - the AI handles this!**

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

**The AI assistant will automatically add ALL words to `ReadingPassage.jsx`** including:

- All verb forms (je pense, tu penses, il pense, nous pensons, etc.)
- All noun forms (singular/plural, with articles)
- All contractions and elisions (d'abord, l'étude, etc.)
- All adjective agreements (bon, bonne, bons, bonnes)
- Multi-word phrases (en fait, tout le monde, poser des questions)
- Common expressions and fixed phrases

**You can verify** by checking the browser console for `Missing translation for: "word"` warnings.

### Step 3: Test Coverage (Optional)

If you want to verify completeness:

1. Run the app
2. Navigate to the reading
3. Hover over words - they should all have tooltips
4. Red/pink highlights = missing words (AI should have caught these!)
5. Check browser console for warnings

## Common Mistakes

### ❌ WRONG: Only adding to vocabularyReference

```javascript
// This does NOT create hover definitions!
vocabularyReference: [{ french: "d'argent", english: "money" }];
```

### ✅ CORRECT: Adding to BOTH places

```javascript
// In reading-4.js
vocabularyReference: [
  { french: "d'argent", english: "(of) money", note: "with negation" },
];

// AND in ReadingPassage.jsx
const wordTranslations = {
  "d'argent": "of money / (any) money",
};
```

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
- [x] **Added ALL words to `wordTranslations` in `ReadingPassage.jsx`** ← AI does this!
- [x] Included all verb forms, contractions, phrases, variations

### Human Verifies:

- [ ] Added to `lessonData.js` imports and `moduleConfigs` array (or AI does this)
- [ ] Passage uses ONLY taught vocabulary
- [ ] Comprehension questions match the passage
- [ ] (Optional) Test hover tooltips work for all words

## Debug Missing Hover Definitions

If words don't have hover tooltips:

1. Check browser console for: `Missing translation for: "word"`
2. Words without definitions show with pink/red highlight
3. Add the exact word (including accents, apostrophes) to `wordTranslations`
4. Remember: case-insensitive matching, but exact text matters

## Why Two Systems?

Historical reasons. The `wordTranslations` object was created first for hardcoded definitions. The `vocabularyReference` was added later for the sidebar panel. They were never unified.

**The AI assistant now handles both systems automatically when creating readings.**

## Process Summary

When you request a new reading:

1. **You specify:** Theme, difficulty, which units to include
2. **AI creates:**
   - Reading module file with passage + questions
   - Adds `vocabularyReference` for sidebar
   - **Automatically adds ALL words to `ReadingPassage.jsx` wordTranslations**
   - Imports and registers in `lessonData.js`
3. **You verify:** The passage works as expected

**No manual work required for word definitions - AI handles the entire pipeline!**
