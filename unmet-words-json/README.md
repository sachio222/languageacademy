# Unmet Words for Cambridge Dictionary

This directory contains JSON files for adding unmet words to the Cambridge dictionary.

## Files Created

- **noun.json**: 70 noun words
- **proper_noun.json**: 42 proper_noun words
- **verb.json**: 110 verb words
- **adjective.json**: 34 adjective words
- **adverb.json**: 10 adverb words
- **preposition.json**: 7 preposition words
- **conjunction.json**: 3 conjunction words
- **interjection.json**: 2 interjection words
- **pronoun.json**: 2 pronoun words
- **unknown.json**: 27 unknown words

- **all-unmet-words.json**: All 307 words in one file

## Usage

To add these words to the Cambridge dictionary:

```bash
# Add all words at once
node generate-lesson-words.js --file unmet-words-json/all-unmet-words.json

# Add by part of speech
node generate-lesson-words.js --file unmet-words-json/noun.json
node generate-lesson-words.js --file unmet-words-json/verb.json
node generate-lesson-words.js --file unmet-words-json/adjective.json
```

## Manual Steps Required

After generating, you'll need to:

1. **Update translations**: Replace "TODO: Add translation" with actual English translations
2. **Add gender information**: Update gender for nouns and adjectives
3. **Add infinitive forms**: For verbs, add the infinitive form
4. **Add adjective forms**: Complete the adjective_forms object
5. **Add relationships**: Link conjugated verbs to their infinitives

## Priority Words

Based on frequency and importance, prioritize these categories:

1. **High Priority**: Common verbs and nouns
2. **Medium Priority**: Adjectives and adverbs  
3. **Lower Priority**: Proper nouns and unknown words

## Statistics

- **noun**: 70 words
- **proper_noun**: 42 words
- **verb**: 110 words
- **adjective**: 34 words
- **adverb**: 10 words
- **preposition**: 7 words
- **conjunction**: 3 words
- **interjection**: 2 words
- **pronoun**: 2 words
- **unknown**: 27 words

**Total**: 307 words
