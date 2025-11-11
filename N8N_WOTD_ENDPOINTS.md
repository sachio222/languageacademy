# n8n WOTD Endpoints Reference

## 🔗 Endpoint URLs

Replace `YOUR_PROJECT_URL` with your Supabase project URL (e.g., `https://feewuhbtaowgpasszyjp.supabase.co`)

### **1. Create WOTD**

```
POST https://YOUR_PROJECT_URL/functions/v1/create-wotd
```

### **2. Get Used Words (Check Duplicates)**

```
GET https://YOUR_PROJECT_URL/functions/v1/get-used-words
```

### **3. Get WOTD by Date**

```
GET https://YOUR_PROJECT_URL/functions/v1/get-wotd?date=2025-11-10
```

---

## 📋 n8n Workflow Setup

### **Daily WOTD Generation Workflow**

```
┌─────────────────────┐
│   Schedule Trigger  │  Every day at midnight UTC
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│  Get Used Words     │  Check what's already featured
│  GET /get-used-words│
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│  LLM Node (Claude)  │  Generate new word (not in used list)
│  Use wotd-llm-prompt│
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│  Create WOTD        │  Insert into database
│  POST /create-wotd  │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│  Get WOTD (verify)  │  Fetch to get DB ID
│  GET /get-wotd      │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│  Send Emails        │  Send to opted-in users
│  (existing workflow)│
└─────────────────────┘
```

---

## 📝 Detailed n8n Node Configurations

### **Node 1: Schedule Trigger**

**Type:** Schedule Trigger  
**Cron:** `0 0 * * *` (midnight UTC)  
**Note:** Adjust timezone as needed

---

### **Node 2: Get Used Words**

**Type:** HTTP Request  
**Method:** GET  
**URL:** `https://YOUR_PROJECT_URL/functions/v1/get-used-words`  
**Authentication:** Generic Credential Type (or None)  
**Headers:**

```json
{
  "Authorization": "Bearer {{$env.SUPABASE_ANON_KEY}}",
  "Content-Type": "application/json"
}
```

**Note:** The `Authorization` header MUST start with `Bearer ` followed by your anon key.

**Output:**

```json
{
  "success": true,
  "total": 15,
  "used_word_ids": ["aller-fr", "tenir-fr", ...],
  "used_words": ["aller", "tenir", ...],
  "used_dates": ["2025-11-11", "2025-11-10", ...]
}
```

---

### **Node 3: LLM Generation (Claude/OpenAI)**

**Type:** HTTP Request (OpenAI/Anthropic)  
**Method:** POST  
**URL:** `https://api.anthropic.com/v1/messages` (or OpenAI)

**Headers:**

```json
{
  "x-api-key": "{{$env.ANTHROPIC_API_KEY}}",
  "anthropic-version": "2023-06-01",
  "content-type": "application/json"
}
```

**Body:**

```json
{
  "model": "claude-3-5-sonnet-20241022",
  "max_tokens": 4096,
  "messages": [
    {
      "role": "user",
      "content": "You are a French linguistics expert...\n\n[PASTE FULL PROMPT FROM wotd-llm-prompt.md]\n\nGenerate for word: {{$json.suggested_word}} and date: {{$json.target_date}}\n\nIMPORTANT: Do not use any of these already-used words: {{$node[\"Get Used Words\"].json.used_words}}"
    }
  ]
}
```

**Code node before LLM to prepare:**

```javascript
// Suggest next word (you'll need a word list)
const commonWords = [
  "faire",
  "être",
  "avoir",
  "pouvoir",
  "devoir",
  "vouloir",
  "savoir",
  "dire",
  "prendre",
  "venir",
];
const usedWords = $node["Get Used Words"].json.used_words;
const availableWords = commonWords.filter((w) => !usedWords.includes(w));

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const targetDate = tomorrow.toISOString().split("T")[0];

return {
  suggested_word: availableWords[0] || "faire",
  target_date: targetDate,
  used_words: usedWords,
};
```

---

### **Node 4: Parse LLM Response**

**Type:** Code  
**JavaScript:**

````javascript
const llmResponse = $input.item.json;
const content = llmResponse.content[0].text; // Claude format
// const content = llmResponse.choices[0].message.content; // OpenAI format

// Extract JSON from response (might have markdown)
const jsonMatch =
  content.match(/```json\n([\s\S]+?)\n```/) || content.match(/(\{[\s\S]+\})/);

if (!jsonMatch) {
  throw new Error("No JSON found in LLM response");
}

const wordData = JSON.parse(jsonMatch[1] || jsonMatch[0]);

return { json: wordData };
````

---

### **Node 5: Create WOTD**

**Type:** HTTP Request  
**Method:** POST  
**URL:** `https://YOUR_PROJECT_URL/functions/v1/create-wotd`  
**Authentication:** None  
**Headers:**

```json
{
  "apikey": "{{$env.SUPABASE_ANON_KEY}}",
  "Content-Type": "application/json"
}
```

**Body:**

```json
{{$json}}
```

(Passes the entire word data object from previous node)

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "date": "2025-11-12",
    "word": "faire",
    ...
  },
  "message": "Word of the Day created for 2025-11-12: faire"
}
```

---

### **Node 6: Get WOTD (Verify)**

**Type:** HTTP Request  
**Method:** GET  
**URL:** `https://YOUR_PROJECT_URL/functions/v1/get-wotd?date={{$json.data.date}}`  
**Headers:**

```json
{
  "apikey": "{{$env.SUPABASE_ANON_KEY}}"
}
```

**Use this data for email:**

- `word`, `phonetic`, `translation`
- `correct_answer` → optionA
- `wrong_options[0]` → optionB
- `wrong_options[1]` → optionC
- `wrong_options[2]` → optionD

---

## 🔐 Authentication

All endpoints require this header format:

```
Authorization: Bearer your-supabase-anon-key
```

**IMPORTANT:** Must include `Bearer ` prefix!

**In n8n:**

- Header name: `Authorization`
- Header value: `Bearer {{$env.SUPABASE_ANON_KEY}}`

Or use n8n's built-in "Header Auth" credential:

- Name: `Authorization`
- Value: `Bearer YOUR_ANON_KEY`

---

## 📊 Testing Endpoints

### Test Get Used Words:

```bash
curl https://YOUR_PROJECT_URL/functions/v1/get-used-words \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

### Test Get WOTD:

```bash
curl "https://YOUR_PROJECT_URL/functions/v1/get-wotd?date=2025-11-10" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

### Test Create WOTD:

```bash
curl -X POST https://YOUR_PROJECT_URL/functions/v1/create-wotd \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d @wotd-data/tenir.json
```

---

## 🎯 n8n Environment Variables

Set these in n8n:

```
SUPABASE_URL=https://feewuhbtaowgpasszyjp.supabase.co
SUPABASE_ANON_KEY=your-anon-key
ANTHROPIC_API_KEY=your-claude-key
```

---

## 🚀 Quick Start

1. Deploy functions:

```bash
supabase functions deploy get-used-words
supabase functions deploy get-wotd
```

2. Test in n8n:

   - Add HTTP Request node
   - GET `https://YOUR_URL/functions/v1/get-used-words`
   - Execute to see current words

3. Build workflow as shown above

---

## 📅 Suggested Word List (Top 100 Frequency)

For n8n to cycle through:

```
être, avoir, faire, dire, pouvoir, aller, voir, savoir, vouloir, venir,
devoir, prendre, trouver, donner, falloir, parler, aimer, passer, mettre,
croire, demander, tenir, porter, comprendre, rester, sentir, vivre, arriver,
écrire, permettre, chercher, connaître, laisser, entendre, suivre, montrer,
recevoir, tomber, ouvrir, sembler, partir, regarder, sortir, penser, garder,
courir, attendre, appeler, servir, rendre, perdre, agir, étudier, descendre,
changer, jouer, tourner, commencer, devenir, essayer, revenir, offrir, compter
```

Each gets rich treatment like "tenir" and "aller"!
