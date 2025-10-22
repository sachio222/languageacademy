# 📚 Phrases Dictionary System

## 🎯 Purpose

Organized phrase categories for the Language Academy dictionary system, based on linguistic principles rather than misclassified data.

## 📁 Phrase Categories

### 1. **Expressions** (`expressions.js`)

- Common French expressions and idiomatic phrases
- Examples: "ça va", "bien sûr", "c'est la vie"

### 2. **Prepositional Phrases** (`prepositional-phrases.js`)

- Phrases starting with prepositions (à, de, dans, sur, etc.)
- Examples: "à cause de", "à côté de", "au-dessus de"

### 3. **Verb Phrases** (`verb-phrases.js`)

- Verb conjugations and verb combinations
- Examples: "je crois", "avoir besoin de", "aller mal"

### 4. **Time Expressions** (`time-expressions.js`)

- Time-related phrases and temporal expressions
- Examples: "aujourd'hui", "à ce moment-là", "après le film"

### 5. **Location Phrases** (`location-phrases.js`)

- Spatial expressions and directions
- Examples: "à droite", "au restaurant", "au coin de"

### 6. **Greetings** (`greetings.js`)

- Greetings, farewells, and social interactions
- Examples: "au revoir", "bonne journée", "bonne nuit"

### 7. **Questions** (`questions.js`)

- Question phrases and interrogative expressions
- Examples: "Comment allez-vous?", "Qu'est-ce que c'est?"

### 8. **Idioms** (`idioms.js`)

- French idioms and figurative expressions
- Examples: "voir la vie en rose", "avoir une peur bleue"

### 9. **Conjunctions** (`conjunctions.js`)

- Conjunctive phrases and linking expressions
- Examples: "bien que", "avant que", "après que"

### 10. **Numbers** (`numbers.js`)

- Number phrases and mathematical expressions
- Examples: "vingt-et-un", "un peu", "beaucoup de"

## 🏗️ Structure

Each phrase file follows this pattern:

```javascript
export const categoryName = new Map([
  // Phrase entries
]);

export const categoryNameByFrequency = [
  // Frequency-ordered IDs
];
```

## 🔧 Usage

```javascript
import { phrases, PhrasesLookup } from "./phrases/index.js";

// Get all phrases
const allPhrases = phrases;

// Get phrases by type
const expressions = PhrasesLookup.getPhrasesByType("expressions");

// Search phrases
const results = PhrasesLookup.searchPhrases("bonjour");

// Get statistics
const stats = PhrasesLookup.getStatistics();
```

## 📊 Current Status

- **Total Categories**: 10
- **Total Phrases**: 0 (ready for migration)
- **Structure**: Complete and organized

## 🎯 Next Steps

1. Migrate phrases from the old `phrases.js` file
2. Classify phrases into appropriate categories
3. Update frequency arrays
4. Test phrase lookup functionality
