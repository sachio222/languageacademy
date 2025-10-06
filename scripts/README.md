# Vocabulary Management Scripts

Scripts to maintain and validate the reading vocabulary.

## Available Commands

### `npm run vocab:sort`

**Alphabetizes the vocabulary file**

Sorts all entries in `src/components/readingVocabulary.js` alphabetically using French locale rules.

```bash
npm run vocab:sort
```

**When to use:**

- After adding new words
- When entries are out of order
- Before committing vocabulary changes

**Output:**

```
📖 Reading vocabulary file...
📊 Found 2018 vocabulary entries
🔤 Sorting alphabetically...
✅ Vocabulary alphabetized successfully!
```

### `npm run vocab:validate`

**Validates vocabulary is properly formatted**

Checks for:

- ✅ No duplicate keys
- ✅ Alphabetical order
- ✅ No empty translations
- ✅ Basic format issues

```bash
npm run vocab:validate
```

**Exit codes:**

- `0` - Validation passed
- `1` - Validation failed (for CI/git hooks)

**Output:**

```
🔍 Validating vocabulary...
📊 Total entries: 2018
✅ No duplicates
✅ Alphabetically sorted
✅ No empty translations
✅ Format looks good
✅ VALIDATION PASSED
```

## Workflow for Adding New Words

### Quick Method (Recommended)

1. **Add words anywhere in the file** (don't worry about order)

   ```javascript
   // Just add them, any position works
   'nouveau': 'new',
   'maintenant': 'now',
   ```

2. **Run sort command**

   ```bash
   npm run vocab:sort
   ```

3. **Validate (optional)**

   ```bash
   npm run vocab:validate
   ```

4. **Commit**
   ```bash
   git add src/components/readingVocabulary.js
   git commit -m "Add new vocabulary"
   ```

### Manual Method

1. **Search for the word first** (Cmd/Ctrl+F)

   - If found: reuse it
   - If not found: continue

2. **Find alphabetical position**

   - Scroll to the right letter
   - Insert in alphabetical order

3. **Save and validate**
   ```bash
   npm run vocab:validate
   ```

## Tips

### Finding Words Quickly

```bash
# Search in vocabulary file
grep "'maintenant'" src/components/readingVocabulary.js

# Or use your editor's search (Cmd+F)
```

### Checking Before Adding

Always search first to avoid duplicates:

1. Open `src/components/readingVocabulary.js`
2. Press Cmd/Ctrl+F
3. Type the French word
4. If not found → add it
5. If found → reuse existing translation

### Format Rules

- Keys: Lowercase French words or phrases
- Values: English translation(s)
- Multiple translations: Separated by " / "
- No trailing commas on last entry

**Good:**

```javascript
'être': 'to be',
'avoir': 'to have',
'peut-être': 'perhaps / maybe',
```

**Bad:**

```javascript
'Être': 'to be',              // ❌ Don't capitalize
'avoir' : 'to have',          // ❌ Extra spaces
'peut-être': 'perhaps/maybe', // ❌ No space around /
```

## Git Hook (Optional)

To automatically validate before commits, add to `.git/hooks/pre-commit`:

```bash
#!/bin/sh
echo "Validating vocabulary..."
npm run vocab:validate

if [ $? -ne 0 ]; then
  echo "❌ Vocabulary validation failed"
  echo "💡 Run: npm run vocab:sort"
  exit 1
fi
```

Make executable:

```bash
chmod +x .git/hooks/pre-commit
```

## Troubleshooting

### "Out of order" error

```bash
npm run vocab:sort
```

### "Duplicate keys" error

This shouldn't happen with JavaScript objects, but if it does:

1. Search for the duplicate word
2. Keep the better translation
3. Remove the other
4. Run `npm run vocab:sort`

### File too large / slow editor

Current file is ~2000 lines (~60KB). Modern editors handle this fine. If it becomes an issue:

- Consider splitting by letter ranges (a-m.js, n-z.js)
- Or use the full "Option 2" strategy discussed earlier
