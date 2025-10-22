# 📚 Dictionary Utilities

Official tools for managing the Language Academy dictionary system.

## 🛠️ Available Utilities

### 1. Add Single Word (`add-word-to-dictionary.js`)

Add a single word to the dictionary with full metadata.

#### Usage

```bash
node add-word-to-dictionary.js [options]
```

#### Options

- `--word <word>` - The French word to add
- `--partOfSpeech <pos>` - Part of speech (noun, verb, adjective, etc.)
- `--translation <text>` - English translation
- `--definition <text>` - Definition/context (optional)
- `--cefr <level>` - CEFR level: A1, A2, B1, B2, C1, C2 (default: A1)
- `--difficulty <number>` - Difficulty level 1-5 (default: 2)
- `--gender <gender>` - Gender: masculine, feminine, none (default: none)
- `--source <path>` - Source file path (default: manual-entry)
- `--interactive` - Interactive mode for guided input
- `--help` - Show help message

#### Examples

**Command Line:**

```bash
# Add a noun
node add-word-to-dictionary.js --word "chat" --partOfSpeech "noun" --translation "cat" --gender "masculine"

# Add a verb with full details
node add-word-to-dictionary.js --word "manger" --partOfSpeech "verb" --translation "to eat" --definition "consume food" --cefr "A1"

# Interactive mode
node add-word-to-dictionary.js --interactive
```

**Interactive Mode:**
The interactive mode guides you through adding a word step by step:

```bash
node add-word-to-dictionary.js --interactive
```

### 2. Batch Add Words (`add-words-batch.js`)

Add multiple words from a JSON or CSV file.

#### Usage

```bash
node add-words-batch.js [options]
```

#### Options

- `--file <path>` - Path to JSON or CSV file with words
- `--format <format>` - File format: json, csv (default: json)
- `--dry-run` - Show what would be added without actually adding
- `--help` - Show help message

#### File Formats

**JSON Format:**

```json
[
  {
    "word": "chien",
    "partOfSpeech": "noun",
    "translation": "dog",
    "definition": "domestic canine animal",
    "cefr": "A1",
    "difficulty": 1,
    "gender": "masculine",
    "source": "lesson-1"
  }
]
```

**CSV Format:**

```csv
word,partOfSpeech,translation,definition,cefr,difficulty,gender,source
chien,noun,dog,domestic canine animal,A1,1,masculine,lesson-1
```

#### Examples

```bash
# Add words from JSON file
node add-words-batch.js --file words.json

# Add words from CSV file
node add-words-batch.js --file words.csv --format csv

# Dry run to see what would be added
node add-words-batch.js --file words.json --dry-run
```

## 📋 Supported Parts of Speech

- `noun` - Nouns (with gender support)
- `verb` - Verbs
- `adjective` - Adjectives
- `adverb` - Adverbs
- `pronoun` - Pronouns
- `article` - Articles
- `preposition` - Prepositions
- `conjunction` - Conjunctions
- `interjection` - Interjections
- `interrogative` - Interrogative words
- `alphabet` - Alphabet letters
- `expression` - Expressions

## 🎯 CEFR Levels

- `A1` - Beginner (default)
- `A2` - Elementary
- `B1` - Intermediate
- `B2` - Upper Intermediate
- `C1` - Advanced
- `C2` - Proficient

## 📊 Difficulty Levels

- `1` - Very Easy
- `2` - Easy (default)
- `3` - Medium
- `4` - Hard
- `5` - Very Hard

## 🔧 What the Utilities Do

### Automatic Features

- ✅ **Proper categorization** - Words go to correct dictionary files
- ✅ **Frequency array updates** - New words added to frequency lists
- ✅ **Duplicate detection** - Prevents adding existing words
- ✅ **File creation** - Creates new dictionary files if needed
- ✅ **Metadata generation** - Auto-generates IDs, timestamps, etc.
- ✅ **Validation** - Ensures all required fields are present

### File Management

- Updates `src/data/dictionary/words/[partOfSpeech]s.js`
- Updates frequency arrays for priority loading
- Maintains proper file structure and formatting
- Preserves existing entries and metadata

## 🚀 Quick Start

1. **Add a single word:**

   ```bash
   node add-word-to-dictionary.js --interactive
   ```

2. **Add multiple words:**

   ```bash
   # Create your words.json file
   node add-words-batch.js --file words.json --dry-run
   # Remove --dry-run when ready to add
   ```

3. **Check the results:**
   - Words appear in appropriate dictionary files
   - Frequency arrays are updated
   - Dictionary index includes new words

## 🔍 Troubleshooting

### Common Issues

**"Word already exists"**

- The word is already in the dictionary
- Check existing dictionary files before adding

**"Invalid part of speech"**

- Use one of the supported parts of speech
- Check the list above

**"File not found"**

- Ensure the target dictionary file exists
- The utility will create it if needed

**"Validation errors"**

- Ensure all required fields are provided
- Check the examples above for proper format

### Getting Help

```bash
# Show help for single word utility
node add-word-to-dictionary.js --help

# Show help for batch utility
node add-words-batch.js --help
```

## 📁 File Structure

After adding words, the dictionary structure looks like:

```
src/data/dictionary/words/
├── nouns.js              # Contains nouns + nounsByFrequency
├── verbs.js              # Contains verbs + verbsByFrequency
├── adjectives.js         # Contains adjectives + adjectivesByFrequency
├── adverbs.js           # Contains adverbs + adverbsByFrequency
├── pronouns.js          # Contains pronouns + pronounsByFrequency
├── articles.js          # Contains articles + articlesByFrequency
├── prepositions.js      # Contains prepositions + prepositionsByFrequency
├── conjunctions.js      # Contains conjunctions + conjunctionsByFrequency
├── interjections.js     # Contains interjections + interjectionsByFrequency
├── interrogatives.js    # Contains interrogatives + interrogativesByFrequency
├── alphabet.js          # Contains alphabet + alphabetByFrequency
└── expressions.js       # Contains expressions + expressionsByFrequency
```

Each file contains:

- A `Map` with all word entries
- A `*ByFrequency` array for priority loading
- Proper metadata and relationships

## 🎉 Success!

Your words are now part of the Language Academy dictionary system and will be available for:

- Vocabulary learning
- Spaced repetition
- Progress tracking
- Lesson generation
- And much more!
