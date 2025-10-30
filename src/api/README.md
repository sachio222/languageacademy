# Word Data API

A comprehensive API for accessing French dictionary data with search, filtering, and relationship capabilities.

## Features

- **Search**: Find words by French text or English translation
- **Filtering**: Filter by part of speech, CEFR level, difficulty, unit, module, lesson
- **Curriculum Support**: Get words by curriculum unit, module, or lesson
- **Pagination**: Limit results with offset/limit
- **Relationships**: Get word conjugations, forms, and related words
- **Caching**: Built-in caching for performance
- **Type Safety**: Full TypeScript support

## Quick Start

### Using the Hook

```jsx
import { useWordDataApi, useWordSearch } from '../hooks/useWordDataApi';

function MyComponent() {
  const { searchWords, getWordById, loading, error } = useWordDataApi();
  
  const handleSearch = async () => {
    const results = await searchWords('bonjour', { 
      partOfSpeech: 'interjection',
      limit: 10 
    });
    console.log(results);
  };
}
```

### Using the API Directly

```javascript
import * as wordDataApi from '../api/wordDataApi';

// Search words
const results = await wordDataApi.searchWords('bonjour', {
  partOfSpeech: 'interjection',
  cefrLevel: 'A1',
  limit: 10,
  offset: 0
});

// Get specific word
const word = await wordDataApi.getWordById('word-123');
const wordByText = await wordDataApi.getWordByText('bonjour');

// Get related words
const conjugations = await wordDataApi.getRelatedWords('word-123', 'conjugation_pair');
```

## API Reference

### `searchWords(searchTerm, options)`

Search for words with optional filtering.

**Parameters:**
- `searchTerm` (string): Search term (French or English)
- `options` (object):
  - `partOfSpeech` (string): Filter by part of speech ('all', 'noun', 'verb', etc.)
  - `cefrLevel` (string): Filter by CEFR level ('all', 'A1', 'A2', etc.)
  - `difficulty` (string): Filter by difficulty ('all', '1', '2', etc.)
  - `unit` (string): Filter by curriculum unit ('all', 'unit1', 'unit2', etc.)
  - `module` (string): Filter by module ('all', '2024-01-01-pronouns', etc.)
  - `lesson` (string): Filter by lesson ('all', 'lesson1', etc.)
  - `limit` (number): Maximum results (default: 50)
  - `offset` (number): Skip results (default: 0)

**Returns:**
```javascript
{
  words: [...], // Array of word objects
  total: 150,   // Total matching words
  limit: 50,    // Applied limit
  offset: 0,    // Applied offset
  hasMore: true // Whether more results available
}
```

### `getWordById(wordId)`

Get a specific word by its ID.

**Parameters:**
- `wordId` (string): The word's unique ID

**Returns:** Word object or `undefined` if not found

### `getWordByText(wordText)`

Get a specific word by its French text.

**Parameters:**
- `wordText` (string): The French word text

**Returns:** Word object or `undefined` if not found

### `getWordsByPartOfSpeech(partOfSpeech, limit)`

Get all words of a specific part of speech.

**Parameters:**
- `partOfSpeech` (string): Part of speech to filter by
- `limit` (number): Maximum results (default: 50)

**Returns:** Same format as `searchWords`

### `getWordsByUnit(unit, options)`

Get all words from a specific curriculum unit.

**Parameters:**
- `unit` (string): Unit identifier (e.g., 'unit1', 'unit2')
- `options` (object): Additional filtering options

**Returns:** Same format as `searchWords`

### `getWordsByModule(module, options)`

Get all words from a specific module.

**Parameters:**
- `module` (string): Module identifier (e.g., '2024-01-01-pronouns')
- `options` (object): Additional filtering options

**Returns:** Same format as `searchWords`

### `getWordsByLesson(lesson, options)`

Get all words from a specific lesson.

**Parameters:**
- `lesson` (string): Lesson identifier
- `options` (object): Additional filtering options

**Returns:** Same format as `searchWords`

### `getWordRelationships(wordId)`

Get all relationships for a word.

**Parameters:**
- `wordId` (string): The word's unique ID

**Returns:** Array of relationship objects

### `getRelatedWords(wordId, relationshipType)`

Get words related to a specific word.

**Parameters:**
- `wordId` (string): The word's unique ID
- `relationshipType` (string, optional): Filter by relationship type

**Returns:** Array of related word objects with relationship metadata

### `getFilterOptions()`

Get filter options for part of speech, CEFR level, and difficulty.

**Returns:** Object with available filter options

### `getAvailableUnits()`

Get all available curriculum units with word counts.

**Returns:**
```javascript
[
  { value: "unit1", label: "Unit 1", count: 56 },
  { value: "unit2", label: "Unit 2", count: 62 },
  // ...
]
```

### `getAvailableModules()`

Get all available modules with word counts.

**Returns:**
```javascript
[
  { value: "2024-01-01-pronouns", label: "2024-01-01-pronouns", count: 9 },
  { value: "2024-01-02-etre", label: "2024-01-02-etre", count: 1 },
  // ...
]
```

### `getAvailableLessons()`

Get all available lessons with word counts.

**Returns:**
```javascript
[
  { value: "lesson1", label: "lesson1", count: 15 },
  { value: "lesson2", label: "lesson2", count: 23 },
  // ...
]
```

## Word Object Structure

```javascript
{
  id: "word-123",
  word: "bonjour",
  partOfSpeech: "interjection",
  translations: [
    { text: "hello", lang: "en" }
  ],
  cefr_level: "A1",
  difficulty: 1,
  relationships: [
    {
      type: "conjugation_pair",
      targetId: "word-456",
      targetWord: "bonsoir",
      note: "evening greeting"
    }
  ],
  // ... other properties
}
```

## Performance

- **Caching**: Results are cached for 5 minutes
- **Pagination**: Use `limit` and `offset` for large datasets
- **Search**: Optimized text normalization for accent-insensitive matching

## Example Usage

See `WordDataApiExample.jsx` for a complete working example.

## Integration

The API is designed to work alongside the existing `useDictionary` hook. You can use both:

- `useDictionary`: For the full dictionary UI with search/filter state
- `useWordDataApi`: For programmatic access to word data

This allows you to build custom word-related features while maintaining the existing dictionary functionality.
