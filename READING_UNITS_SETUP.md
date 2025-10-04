# Reading Units Setup Guide

## CRITICAL: How Hover Definitions Actually Work

**THE MOST IMPORTANT THING TO UNDERSTAND:**

Hover definitions in reading passages are **NOT** pulled from the `vocabularyReference` array in your lesson file. They are **HARDCODED** in `/src/components/ReadingPassage.jsx` in the `wordTranslations` object.

### The Confusing Truth

- **`vocabularyReference`** in your reading module file (e.g., `reading-4.js`) → Used for the vocabulary sidebar reference only
- **`wordTranslations`** in `ReadingPassage.jsx` → Used for actual hover definitions on words in the passage

These are TWO SEPARATE SYSTEMS. You must update BOTH.

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

### Step 2: Add Words to ReadingPassage.jsx (CRITICAL!)

**Open `/src/components/ReadingPassage.jsx`** and find the `wordTranslations` object (around line 9).

Add EVERY SINGLE WORD that appears in your passage:

```javascript
const wordTranslations = {
  // ... existing words ...
  
  // Your new words from Reading X
  'nouveaumot': 'new word',
  'autremot': 'other word',
  "d'exemple": 'of example',  // Include contractions!
  'hommes': 'men',            // Include ALL forms!
  'femmes': 'women',
  // etc.
};
```

### Step 3: Test EVERY Word

1. Run the app
2. Navigate to your reading
3. Hover over EVERY SINGLE WORD
4. If you see a red/pink highlight with no tooltip → MISSING FROM `wordTranslations`
5. Add the missing word to `ReadingPassage.jsx`
6. Repeat until every word has a definition

## Common Mistakes

### ❌ WRONG: Only adding to vocabularyReference

```javascript
// This does NOT create hover definitions!
vocabularyReference: [
  { french: "d'argent", english: "money" },
]
```

### ✅ CORRECT: Adding to BOTH places

```javascript
// In reading-4.js
vocabularyReference: [
  { french: "d'argent", english: "(of) money", note: "with negation" },
]

// AND in ReadingPassage.jsx
const wordTranslations = {
  "d'argent": 'of money / (any) money',
}
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

- [ ] Created module file in `/src/lessons/modules/`
- [ ] Added to `lessonData.js` imports and `moduleConfigs` array
- [ ] Wrote passage using ONLY taught vocabulary
- [ ] Added `vocabularyReference` entries in module file
- [ ] Added ALL words to `wordTranslations` in `ReadingPassage.jsx`
- [ ] Created comprehension questions
- [ ] Tested by hovering over EVERY word in the passage
- [ ] Fixed any missing hover definitions
- [ ] Verified questions match the actual passage content

## Debug Missing Hover Definitions

If words don't have hover tooltips:

1. Check browser console for: `Missing translation for: "word"`
2. Words without definitions show with pink/red highlight
3. Add the exact word (including accents, apostrophes) to `wordTranslations`
4. Remember: case-insensitive matching, but exact text matters

## Why Two Systems?

Historical reasons. The `wordTranslations` object was created first for hardcoded definitions. The `vocabularyReference` was added later for the sidebar panel. They were never unified. 

**Don't try to fix it - just understand it and use both.**

## Final Warning

**ALWAYS ADD WORDS TO `ReadingPassage.jsx`**

The `vocabularyReference` array in your module file is nice for documentation, but it does NOTHING for hover definitions. Every single time you add a reading, you MUST update `ReadingPassage.jsx`.

No exceptions. No shortcuts. Update both.



