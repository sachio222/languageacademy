# 📚 Dictionary Utilities

Official tools for managing the Language Academy dictionary system.

## 🛠️ Available Utilities

### 1. Add Single Word (`add-word-to-dictionary.js`)

Add a single word to the dictionary with full metadata.

```bash
# From project root
node src/data/dictionary/utils/add-word-to-dictionary.js --interactive

# Or from utils directory
cd src/data/dictionary/utils
node add-word-to-dictionary.js --interactive
```

### 2. Batch Add Words (`add-words-batch.js`)

Add multiple words from a JSON or CSV file.

```bash
# From project root
node src/data/dictionary/utils/add-words-batch.js --file example-words.json

# Or from utils directory
cd src/data/dictionary/utils
node add-words-batch.js --file example-words.json
```

## 📁 File Structure

```
src/data/dictionary/utils/
├── add-word-to-dictionary.js    # Single word addition utility
├── add-words-batch.js          # Batch word addition utility
├── example-words.json         # Example batch file
├── DICTIONARY_UTILITIES.md    # Complete documentation
└── README.md                  # This file
```

## 🚀 Quick Start

1. **Add a single word:**

   ```bash
   node src/data/dictionary/utils/add-word-to-dictionary.js --interactive
   ```

2. **Add multiple words:**

   ```bash
   node src/data/dictionary/utils/add-words-batch.js --file example-words.json --dry-run
   ```

3. **Get help:**
   ```bash
   node src/data/dictionary/utils/add-word-to-dictionary.js --help
   node src/data/dictionary/utils/add-words-batch.js --help
   ```

## 📋 Features

- ✅ **Interactive mode** for guided word addition
- ✅ **Command-line interface** for automation
- ✅ **Batch processing** from JSON/CSV files
- ✅ **Full validation** and error handling
- ✅ **Automatic file management** and updates
- ✅ **Frequency array maintenance**
- ✅ **Duplicate detection**

## 📖 Documentation

See `DICTIONARY_UTILITIES.md` for complete documentation including:

- Detailed usage examples
- Supported parts of speech
- CEFR levels and difficulty settings
- File format specifications
- Troubleshooting guide

## 🎯 What These Utilities Do

- **Proper categorization** - Words go to correct dictionary files
- **Frequency array updates** - Priority loading maintained
- **Duplicate detection** - Prevents conflicts
- **File creation** - Creates new dictionary files when needed
- **Metadata generation** - Auto-generates IDs, timestamps, etc.
- **Validation** - Ensures data integrity

Your words become part of the Language Academy dictionary system and are available for vocabulary learning, spaced repetition, progress tracking, and lesson generation!
