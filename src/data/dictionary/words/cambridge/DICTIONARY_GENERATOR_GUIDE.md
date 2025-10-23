# Dictionary Generator Guide

## Overview

The Dictionary Generator is a comprehensive tool for creating and managing dictionary entries in the Language Academy application. It supports all parts of speech with specialized fields for verbs, nouns, adjectives, and more.

## Quick Start

### Basic Usage

```bash
# Add words from a JSON file
node generate-lesson-words.js --file my-words.json

# Add a single word
node generate-lesson-words.js --word "chat" --translation "cat" --pos "noun" --gender "masculine"

# Interactive mode
node generate-lesson-words.js --interactive
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

Verbs support specialized fields for phrases and conjugation relationships.

#### Required Fields

- `word`: The conjugated verb form
- `translation`: English translation
- `partOfSpeech`: "verb"

#### Optional Fields

- `infinitive`: The infinitive form (creates bidirectional relationships)
- `verb_phrases`: Array of common phrases using this verb form

#### Example

```json
{
  "word": "est",
  "translation": "is",
  "partOfSpeech": "verb",
  "infinitive": "être",
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
    },
    {
      "phrase": "est-ce que",
      "type": "question",
      "context": "question formation",
      "frequency": "common"
    }
  ]
}
```

#### Verb Phrase Types

- `pronoun_verb`: Pronoun + verb combinations (il est, je suis)
- `negation`: Negative constructions (n'est pas, ne suis pas)
- `question`: Question formations (est-il, suis-je)
- `compound`: Compound tenses or auxiliary usage (est allé, est en train de)

### Nouns

Nouns support articles, plural forms, and common phrases.

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
  "plural_form": "chats",
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
    },
    {
      "phrase": "des chats",
      "type": "plural_article",
      "context": "some cats",
      "frequency": "common"
    }
  ]
}
```

#### Noun Phrase Types

- `definite_article`: With definite articles (le, la, les)
- `indefinite_article`: With indefinite articles (un, une, des)
- `plural_article`: Plural forms with articles
- `possessive`: With possessive adjectives (mon chat, sa maison)
- `demonstrative`: With demonstrative adjectives (ce chat, cette maison)

### Adjectives

Adjectives support gender/number agreement forms and common phrases.

#### Required Fields

- `word`: The adjective (typically masculine singular)
- `translation`: English translation
- `partOfSpeech`: "adjective"

#### Optional Fields

- `adjective_forms`: Object with all gender/number combinations
- `adjective_phrases`: Array of common phrases and constructions

#### Example

```json
{
  "word": "grand",
  "translation": "big/tall",
  "partOfSpeech": "adjective",
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
    },
    {
      "phrase": "plus grand que",
      "type": "comparative",
      "context": "bigger than",
      "frequency": "common"
    },
    {
      "phrase": "le plus grand",
      "type": "superlative",
      "context": "the biggest",
      "frequency": "common"
    }
  ]
}
```

#### Adjective Phrase Types

- `intensifier`: With adverbs of intensity (très grand, assez petit)
- `comparative`: Comparative constructions (plus grand que, moins cher que)
- `superlative`: Superlative constructions (le plus grand, la moins chère)
- `agreement`: Agreement examples (grand garçon, grande fille)
- `position`: Position examples (before/after noun)

## Advanced Features

### Cambridge Dictionary Integration

The generator automatically scrapes Cambridge Dictionary for additional data:

```bash
# Enable auto-scraping (default)
node generate-lesson-words.js --file words.json

# Disable auto-scraping
node generate-lesson-words.js --file words.json --no-scrape
```

### Duplicate Detection

The system checks for duplicates based on both word AND part of speech:

- "est" (verb) and "est" (noun) are considered different entries
- "chat" (noun) and "chat" (noun) would be flagged as duplicates

### Validation

All entries are validated against the Zod schema:

- Required fields are enforced
- Enum values are validated (part of speech, frequency, etc.)
- Optional fields follow proper structure

## Common Patterns

### Conjugated Verbs

When adding conjugated verbs, always include the infinitive:

```json
[
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
  }
]
```

### Gendered Nouns

Always specify gender for French nouns:

```json
{
  "word": "maison",
  "translation": "house",
  "partOfSpeech": "noun",
  "gender": "feminine",
  "noun_articles": {
    "definite": "la",
    "indefinite": "une",
    "plural": "les"
  }
}
```

### Variable Adjectives

Include all forms for adjectives that change:

```json
{
  "word": "beau",
  "translation": "beautiful/handsome",
  "partOfSpeech": "adjective",
  "adjective_forms": {
    "masculine_singular": "beau",
    "feminine_singular": "belle",
    "masculine_plural": "beaux",
    "feminine_plural": "belles"
  }
}
```

## Troubleshooting

### Common Validation Errors

1. **Invalid part of speech**: Use one of the valid values (noun, verb, adjective, etc.)
2. **Missing required fields**: Ensure word, translation, and partOfSpeech are provided
3. **Invalid frequency**: Use "common", "uncommon", or "rare"
4. **Invalid phrase type**: Check the allowed types for each part of speech

### File Format Issues

1. **JSON syntax errors**: Validate your JSON using a JSON validator
2. **Encoding issues**: Ensure files are saved as UTF-8
3. **Missing commas**: Check array and object syntax

### Duplicate Warnings

If you see duplicate warnings but believe the entries are different:

- Check that the part of speech is correctly specified
- Verify the word spelling is exactly as intended

## Schema Reference

### Core Fields (All Parts of Speech)

- `word` (required): The French word
- `translation` (required): English translation
- `partOfSpeech` (required): Part of speech
- `definition`: Additional definition text
- `gender`: For gendered words (masculine, feminine, neuter)

### Verb-Specific Fields

- `infinitive`: The infinitive form
- `verb_phrases`: Array of verb phrase objects

### Noun-Specific Fields

- `plural_form`: Plural form of the noun
- `noun_articles`: Object with article types
- `noun_phrases`: Array of noun phrase objects

### Adjective-Specific Fields

- `adjective_forms`: Object with gender/number forms
- `adjective_phrases`: Array of adjective phrase objects

### Phrase Object Structure

All phrase objects share this structure:

```json
{
  "phrase": "the complete phrase",
  "type": "phrase_type",
  "context": "optional context or meaning",
  "frequency": "common|uncommon|rare"
}
```

## Examples by Use Case

### Adding Lesson Vocabulary

```json
[
  {
    "word": "école",
    "translation": "school",
    "partOfSpeech": "noun",
    "gender": "feminine",
    "noun_articles": { "definite": "l'", "indefinite": "une", "plural": "les" }
  },
  {
    "word": "étudier",
    "translation": "to study",
    "partOfSpeech": "verb"
  },
  {
    "word": "intelligent",
    "translation": "intelligent",
    "partOfSpeech": "adjective",
    "adjective_forms": {
      "masculine_singular": "intelligent",
      "feminine_singular": "intelligente",
      "masculine_plural": "intelligents",
      "feminine_plural": "intelligentes"
    }
  }
]
```

### Adding Verb Conjugations

```json
[
  {
    "word": "mange",
    "translation": "eat/eats",
    "partOfSpeech": "verb",
    "infinitive": "manger",
    "verb_phrases": [
      { "phrase": "je mange", "type": "pronoun_verb", "frequency": "common" },
      { "phrase": "il mange", "type": "pronoun_verb", "frequency": "common" },
      { "phrase": "ne mange pas", "type": "negation", "frequency": "common" }
    ]
  }
]
```

This guide provides comprehensive coverage of the Dictionary Generator's capabilities. For additional help, run `node generate-lesson-words.js --help` or examine the existing dictionary files for more examples.
