# Fill-in-the-Blank Module Guide

## Overview

Fill-in-the-blank modules provide a Typeform-style interactive experience where students complete sentences one at a time. This guide explains how to create new fill-in-the-blank modules for any unit.

## Quick Start

### 1. Create a New Module File

Create a new file in `src/lessons/modules/` (e.g., `unit-2-practice.js`):

```javascript
/**
 * Unit 2 Practice - Fill in the blank exercise
 * Typeform-style interactive sentence completion covering Unit 2 material
 */

export const unit2Practice = {
  title: "Unit 2 Practice - Fill in the Blanks",
  description: "Complete sentences using everything you've learned in Unit 2!",

  // Special flags - REQUIRED for fill-in-blank modules
  isFillInTheBlank: true,
  skipStudyMode: true,

  // Leave empty - not used for fill-in-blank
  concepts: [],
  vocabularyReference: [],
  exercises: [],

  // Your sentences go here
  sentences: [
    // See "Sentence Format" section below
  ],
};
```

### 2. Add to `lessonData.js`

Import and add to the module list:

```javascript
// Import the module
import { unit2Practice } from "./modules/unit-2-practice.js";

// Add to moduleConfigs array (before the unit exam)
const moduleConfigs = [
  // ... other modules
  reading2, // Last regular module in unit
  unit2Practice, // ← Add your fill-in-blank module here
  unit2Exam, // Unit exam comes last
  // ... next unit
];

// Update the unit structure lessonRange
export const unitStructure = [
  // ...
  {
    id: 2,
    title: "Unit 2: Composition",
    lessonRange: [12, 23], // Update the end number to include new module
    // ...
  },
];
```

## Sentence Format

### Basic Structure

Each sentence has:

- `text`: The sentence with spaces where blanks go
- `instruction`: Help text shown to the user
- `blanks`: Array of blank definitions

### Simple Example (One Blank)

```javascript
{
  text: "Je  un chat.",
  instruction: "Complete: 'I have a cat'",
  blanks: [
    {
      position: 3,           // Character position where blank starts
      answer: "ai",          // Expected answer
      hint: "avoir for je",  // Hint shown below the blank
    },
  ],
}
```

### Multiple Blanks Example

```javascript
{
  text: "Tu  un livre  une voiture.",
  instruction: "Complete: 'You have a book or a car'",
  blanks: [
    {
      position: 3,
      answer: "as",
      hint: "avoir conjugated for tu",
    },
    {
      position: 13,
      answer: "ou",
      hint: "connector meaning 'or'",
    },
  ],
}
```

## Calculating Positions

**CRITICAL**: Position is the index (0-based) where the blank should appear in the text string.

### Method 1: Count Characters

```javascript
text: "Elle  une femme."
      0123456789...
```

The first blank at position 5 replaces the space after "Elle".

### Method 2: Use a Helper (Recommended)

```javascript
// Create a helper to verify positions
const text = "Nous  les livres.";
console.log(text.indexOf("  ")); // Finds the blank position
```

### Important Rules:

1. **Use ONE space** character where each blank goes
2. **Position points to the space character**
3. **Blanks are sorted by position** (earliest first)
4. **Each blank replaces exactly 1 character**

## Best Practices

### 1. Variety is Key

Don't repeat the same answer multiple times. Mix different concepts:

```javascript
sentences: [
  // Different verbs
  {
    /* être */
  },
  {
    /* avoir */
  },
  {
    /* aller */
  },

  // Different connectors
  {
    /* et */
  },
  {
    /* mais */
  },
  {
    /* ou */
  },

  // Different articles
  {
    /* un/une */
  },
  {
    /* le/la */
  },
  {
    /* des */
  },
];
```

### 2. Progressive Difficulty

Start simple, then increase complexity:

```javascript
sentences: [
  // Easy: One blank, common word
  { text: "Je  un chat." /* ... */ },

  // Medium: One blank, less common
  { text: "Nous  les livres." /* ... */ },

  // Hard: Multiple blanks
  { text: "Tu  un livre  une voiture." /* ... */ },
];
```

### 3. Clear Instructions

Make instructions explicit:

```javascript
instruction: "Complete: 'I am a man'",  // ✅ Good
instruction: "Fill in the blank",       // ❌ Too vague
```

### 4. Helpful Hints

Provide context, not just definitions:

```javascript
hint: "avoir conjugated for nous",     // ✅ Specific
hint: "a verb",                        // ❌ Too generic
```

### 5. Scoring

Students need **80% correct** to pass (all blanks in a sentence must be correct for that sentence to count).

## Complete Example

Here's a complete unit practice module:

```javascript
export const unit3Practice = {
  title: "Unit 3 Practice - Fill in the Blanks",
  description: "Master contractions, motion verbs, and possessive pronouns!",

  isFillInTheBlank: true,
  skipStudyMode: true,
  concepts: [],
  vocabularyReference: [],
  exercises: [],

  sentences: [
    // Contraction practice
    {
      text: "Je vais  café.",
      instruction: "Complete: 'I go to the café' (use contraction)",
      blanks: [
        {
          position: 8,
          answer: "au",
          hint: "à + le = ?",
        },
      ],
    },

    // Motion verb practice
    {
      text: "Tu  à Paris.",
      instruction: "Complete: 'You go to Paris'",
      blanks: [
        {
          position: 3,
          answer: "vas",
          hint: "aller conjugated for tu",
        },
      ],
    },

    // Possessive pronouns
    {
      text: "C'est  livre.",
      instruction: "Complete: 'It's my book'",
      blanks: [
        {
          position: 6,
          answer: "mon",
          hint: "possessive adjective for 'my' (masculine)",
        },
      ],
    },

    // Complex: Multiple blanks
    {
      text: "Il  voir  amis.",
      instruction: "Complete: 'He wants to see his friends'",
      blanks: [
        {
          position: 3,
          answer: "veut",
          hint: "vouloir conjugated for il",
        },
        {
          position: 13,
          answer: "ses",
          hint: "possessive for 'his' (plural)",
        },
      ],
    },
  ],
};
```

## Testing Your Module

### 1. Verify Positions

Add console logging to check positions:

```javascript
const text = "Je  un chat.";
console.log("Position of blank:", text.indexOf("  "));
console.log("Character at position:", text[3]); // Should be a space
```

### 2. Test in Browser

1. Save your module file
2. Import it in `lessonData.js`
3. Add to `moduleConfigs` array
4. Load the app and navigate to your module
5. Complete a few sentences to verify:
   - Blanks appear in correct positions
   - Text doesn't get cut off
   - Answers are validated correctly
   - Scoring works (all blanks correct = sentence counts)

### 3. Common Issues

**Problem**: Text is cut off or misplaced
**Solution**: Check your position values - they should point to single spaces in the text

**Problem**: Answers not being accepted
**Solution**: The linter handles accents automatically, but check spelling exactly matches expected answer

**Problem**: Module not appearing
**Solution**: Verify you imported it and added to `moduleConfigs` AND updated the unit's `lessonRange`

## File Structure Reference

```
src/
├── components/
│   └── FillInTheBlank.jsx       # Main component (don't modify)
├── styles/
│   └── FillInTheBlank.css       # Styles (don't modify)
└── lessons/
    ├── lessonData.js            # Import and register here
    └── modules/
        ├── unit-1-practice.js   # Example
        ├── unit-2-practice.js   # Your new module
        └── unit-3-practice.js   # Future module
```

## Tips for Creating Great Fill-in-Blank Modules

1. **Aim for 10-15 sentences** per module
2. **Cover all major concepts** from the unit
3. **Avoid excessive repetition** of the same answer
4. **Test with actual users** if possible
5. **Keep sentences realistic** - things people would actually say
6. **Mix difficulty levels** to maintain engagement
7. **Use the full range of vocabulary** from the unit

## Module Placement

Best practices for when to use fill-in-blank modules:

- **End of unit**: Right before the unit exam
- **After reading**: Good transition from reading to exam
- **Never first**: Students need to learn content first

Typical unit structure:

```
1. Regular lessons (teach concepts)
2. Reading comprehension (apply knowledge)
3. Fill-in-blank practice (reinforce patterns) ← Your module here
4. Unit exam (comprehensive test)
```

## Need Help?

If you run into issues:

1. Check this guide's examples
2. Look at `unit-1-practice.js` as a reference
3. Verify your module structure matches the required format
4. Test positions by logging the text string indices

---

**Happy module building! 🎉**
