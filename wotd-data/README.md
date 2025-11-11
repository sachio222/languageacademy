# WOTD Data Directory

Store Word of the Day JSON files here for insertion.

## Foolproof Workflow

### **Step 1: Generate with LLM**

1. Copy prompt from `../wotd-llm-prompt.md`
2. Replace `[WORD]` with your word (e.g., "faire")
3. Replace `[DATE]` with date (e.g., "2025-11-12")
4. Paste into Claude/GPT
5. Copy JSON output
6. Save as `word.json` in this folder

### **Step 2: Insert into Database**

```bash
node insert-wotd.js wotd-data/tenir.json
```

**That's it!** The script:
- ✅ Validates JSON format
- ✅ Checks required fields
- ✅ Verifies date format
- ✅ Ensures 3 wrong answers
- ✅ Checks for duplicates
- ✅ Inserts into database
- ✅ Shows preview URL

### **Example: Add "tenir"**

```bash
# File is already here: tenir.json
node insert-wotd.js wotd-data/tenir.json
```

Output:
```
📄 Reading from: wotd-data/tenir.json

📝 Word Summary:
   Date: 2025-11-10
   Word: tenir
   Translation: to hold
   ...

🚀 Inserting into database...

✅ Word of the Day created successfully!

🔗 View in app:
   http://localhost:5173/?wotd=true&date=2025-11-10

✨ Ready to send in daily email!
```

### **Batch Generation**

Create multiple JSON files:
```
wotd-data/
  tenir.json     (2025-11-10)
  faire.json     (2025-11-11)
  être.json      (2025-11-12)
  avoir.json     (2025-11-13)
```

Insert all:
```bash
node insert-wotd.js wotd-data/tenir.json
node insert-wotd.js wotd-data/faire.json
node insert-wotd.js wotd-data/être.json
node insert-wotd.js wotd-data/avoir.json
```

Or create a batch script:
```bash
for file in wotd-data/*.json; do
  node insert-wotd.js "$file"
done
```

## File Naming Convention

Use the word name for clarity:
- `aller.json`
- `tenir.json`
- `faire.json`
- `être.json`

## Validation Checklist

Before inserting, verify:
- [ ] Date is YYYY-MM-DD format
- [ ] word_id matches pattern: "word-fr"
- [ ] 2-3 definitions minimum
- [ ] 4-5 examples minimum
- [ ] Exactly 3 wrong_options
- [ ] All French text has proper accents (é, è, à, ç, etc.)
- [ ] CEFR levels are appropriate (A1-C2)
- [ ] correct_answer matches translation field

## Troubleshooting

### "Missing Supabase credentials"
→ Check `.env` file has VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

### "A word already exists for this date"
→ Each date can only have one word. Change the date or delete the existing entry.

### "Edge function error"
→ Make sure you've deployed the function: `supabase functions deploy create-wotd`

### "Invalid JSON"
→ Check for trailing commas, missing quotes, or syntax errors in your JSON file

## Current Entries

- `tenir.json` - Ready to insert for 2025-11-10

