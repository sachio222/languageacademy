# Dictionary Database Guide

## Overview

The Language Academy dictionary is now stored in **Supabase PostgreSQL** database. All dictionary operations work directly with the database - no more .js file editing!

## Quick Start

### Adding Words to Database

```bash
# Add words from a JSON file
node add-words-to-database.js --file my-words.json

# Add a single word
node add-words-to-database.js --word "chat" --translation "cat" --pos "noun" --gender "masculine"

# Update existing entries
node add-words-to-database.js --file words.json --upsert
```

### Basic Input Format

```json
[
  {
    "word": "chat",
    "translation": "cat",
    "partOfSpeech": "noun",
    "gender": "masculine"
  }
]
```

## Part-of-Speech Specific Features

### Verbs

Verbs support conjugations, phrases, and infinitive relationships.

#### Required Fields

- `word`: The conjugated verb form
- `translation`: English translation
- `partOfSpeech`: "verb"

#### Optional Fields

- `infinitive`: The infinitive form (e.g., "être" for "est")
- `verb_phrases`: Array of common phrases using this verb form
- `conjugation`: Full conjugation tables
- `conjugation_group`: "er", "ir", "re", "irregular"

#### Example

```json
{
  "word": "est",
  "translation": "is",
  "partOfSpeech": "verb",
  "infinitive": "être",
  "conjugation_group": "irregular",
  "verb_phrases": [
    {
      "phrase": "il est",
      "type": "pronoun_verb",
      "context": "he is / it is",
      "frequency": "common"
    },
    {
      "phrase": "n'est pas",
      "type": "negation",
      "context": "is not",
      "frequency": "common"
    }
  ]
}
```

#### Verb Phrase Types

- `pronoun_verb`: Pronoun + verb combinations (il est, je suis)
- `negation`: Negative constructions (n'est pas, ne suis pas)
- `question`: Question formations (est-il, est-ce que)
- `compound`: Compound tenses or auxiliary usage (est allé)

### Nouns

Nouns support articles, plural forms, and gender.

#### Required Fields

- `word`: The noun
- `translation`: English translation
- `partOfSpeech`: "noun"

#### Optional Fields

- `gender`: "masculine", "feminine", or "neuter"
- `plural_form`: The plural form of the noun
- `noun_articles`: Object with definite, indefinite, and plural articles
- `noun_phrases`: Array of common phrases with articles

#### Example

```json
{
  "word": "chat",
  "translation": "cat",
  "partOfSpeech": "noun",
  "gender": "masculine",
  "noun_articles": {
    "definite": "le",
    "indefinite": "un",
    "plural": "les"
  },
  "noun_phrases": [
    {
      "phrase": "le chat",
      "type": "definite_article",
      "context": "the cat",
      "frequency": "common"
    },
    {
      "phrase": "un chat",
      "type": "indefinite_article",
      "context": "a cat",
      "frequency": "common"
    }
  ]
}
```

### Adjectives

Adjectives support gender/number agreement forms.

#### Required Fields

- `word`: The adjective (typically masculine singular)
- `translation`: English translation
- `partOfSpeech`: "adjective"

#### Optional Fields

- `adjective_forms`: Object with all gender/number combinations
- `adjective_phrases`: Array of common phrases and constructions
- `adjective_position`: "before_noun", "after_noun", or "either"

#### Example

```json
{
  "word": "grand",
  "translation": "big/tall",
  "partOfSpeech": "adjective",
  "adjective_position": "before_noun",
  "adjective_forms": {
    "masculine_singular": "grand",
    "feminine_singular": "grande",
    "masculine_plural": "grands",
    "feminine_plural": "grandes"
  },
  "adjective_phrases": [
    {
      "phrase": "très grand",
      "type": "intensifier",
      "context": "very big/tall",
      "frequency": "common"
    }
  ]
}
```

## Redirect System (Word Variants)

For word variants (plurals, feminine forms, conjugations), use the redirect system.

### Redirect Entry Format

```json
{
  "word": "belle",
  "partOfSpeech": "adjective",
  "redirect_to": "beau-fr",
  "redirect_type": "feminine_form",
  "base_word": "beau",
  "gender": "feminine",
  "number": "singular",
  "examples": [
    { "text": "une belle fille", "trans": "a beautiful girl", "lang": "en" }
  ]
}
```

### Complete Example: Adjective with Variants

```json
[
  {
    "word": "beau",
    "translation": "beautiful/handsome",
    "partOfSpeech": "adjective",
    "gender": "masculine",
    "number": "singular"
  },
  {
    "word": "belle",
    "partOfSpeech": "adjective",
    "redirect_to": "beau-fr",
    "redirect_type": "feminine_form",
    "base_word": "beau",
    "gender": "feminine",
    "number": "singular"
  }
]
```

## Database Schema Overview

### Core Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | TEXT | Primary key (e.g., "chat-fr") |
| `lang` | TEXT | Language code (default: "fr") |
| `word` | TEXT | The actual word |
| `part_of_speech` | TEXT | noun, verb, adjective, etc. |
| `gender` | TEXT | masculine, feminine, neuter |

### JSONB Fields (Flexible Nested Data)

| Field | Description |
|-------|-------------|
| `translations` | Array of translation objects |
| `relationships` | Array of word relationships |
| `examples` | Array of usage examples |
| `verb_phrases` | Common verb phrases |
| `noun_articles` | Article associations |
| `adjective_forms` | Gender/number forms |

## Curriculum Integration

### Tracking Fields

```json
{
  "word": "chat",
  "translation": "cat",
  "partOfSpeech": "noun",
  "unit": "unit1",
  "module": "2024-01-15-animals",
  "lesson": "lesson-7",
  "cefr_level": "A1",
  "difficulty": 2
}
```

## Advanced Features

### Relationships

Link related words using the `relationships` array:

```json
{
  "word": "dire",
  "translation": "to say",
  "partOfSpeech": "verb",
  "relationships": [
    {
      "type": "conjugation_pair",
      "targetId": "dis-fr",
      "targetWord": "dis",
      "note": "present - je/tu"
    },
    {
      "type": "conjugation_pair",
      "targetId": "dit-fr",
      "targetWord": "dit",
      "note": "present - il/elle"
    }
  ]
}
```

### Examples

Add usage examples:

```json
{
  "word": "chat",
  "translation": "cat",
  "partOfSpeech": "noun",
  "examples": [
    {
      "text": "Le chat dort sur le canapé",
      "trans": "The cat sleeps on the sofa",
      "lang": "en",
      "source": "manual"
    }
  ]
}
```

### Tags

Organize words with tags:

```json
{
  "word": "chat",
  "translation": "cat",
  "partOfSpeech": "noun",
  "tags": ["lesson", "animals", "common", "unit1"]
}
```

## Common Patterns

### Adding Lesson Vocabulary

```json
[
  {
    "word": "école",
    "translation": "school",
    "partOfSpeech": "noun",
    "gender": "feminine",
    "unit": "unit2",
    "cefr_level": "A1",
    "tags": ["lesson", "places"]
  },
  {
    "word": "étudier",
    "translation": "to study",
    "partOfSpeech": "verb",
    "unit": "unit2",
    "cefr_level": "A1",
    "conjugation_group": "er"
  }
]
```

### Adding Verb Conjugations

```json
[
  {
    "word": "être",
    "translation": "to be",
    "partOfSpeech": "verb",
    "conjugation_group": "irregular",
    "relationships": [
      {"type": "conjugation_pair", "targetId": "suis-fr", "targetWord": "suis"},
      {"type": "conjugation_pair", "targetId": "es-fr", "targetWord": "es"},
      {"type": "conjugation_pair", "targetId": "est-fr", "targetWord": "est"}
    ]
  },
  {
    "word": "suis",
    "translation": "am",
    "partOfSpeech": "verb",
    "infinitive": "être"
  },
  {
    "word": "es",
    "translation": "are",
    "partOfSpeech": "verb",
    "infinitive": "être"
  },
  {
    "word": "est",
    "translation": "is",
    "partOfSpeech": "verb",
    "infinitive": "être"
  }
]
```

## Querying the Database

### Using Supabase Client

```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Get a word
const { data } = await supabase
  .from('dictionary_words')
  .select('*')
  .eq('word', 'chat')
  .eq('part_of_speech', 'noun')
  .single();

// Search words
const { data } = await supabase
  .from('dictionary_words')
  .select('*')
  .ilike('word', '%chat%')
  .limit(10);

// Get words by unit
const { data } = await supabase
  .from('dictionary_words')
  .select('*')
  .eq('unit', 'unit1')
  .order('word');
```

### In the Application

Use the `useDictionary` hook:

```javascript
import { useDictionary } from '../hooks/useDictionary';

function MyComponent() {
  const { searchWords, getWordById, loading } = useDictionary();
  
  // Search
  const results = await searchWords('chat');
  
  // Get specific word
  const word = await getWordById('chat-fr');
}
```

## Troubleshooting

### Common Errors

**Duplicate ID Error**
- Each word + part of speech combination must be unique
- Use `--upsert` flag to update existing entries

**Missing Required Fields**
- Ensure `word`, `translation`, and `partOfSpeech` are provided

**JSONB Format Errors**
- Ensure arrays and objects are valid JSON
- Use double quotes for strings

### Validation

The database enforces:
- NOT NULL constraints on core fields
- Valid part of speech values
- Proper JSONB structure

## Migration from Cambridge Files

If you have old Cambridge .js files to migrate:

```bash
# Migrate all Cambridge entries to database
node migrate-cambridge-to-database.js
```

The old files remain for reference but are no longer imported by the application.

## Best Practices

1. **Always include translations** - At minimum, add an English translation
2. **Tag lesson vocabulary** - Use `tags: ["lesson"]` for curriculum words
3. **Link conjugations** - Use relationships to connect verb forms
4. **Add examples** - Real usage examples help learners
5. **Specify curriculum fields** - Include unit/module/cefr when relevant

## See Also

- `database-dictionary-schema.sql` - Full database schema
- `migrate-cambridge-to-database.js` - Migration script
- `useDictionary` hook documentation - Frontend integration

