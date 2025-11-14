# n8n: Post WOTD to Instagram

## Workflow Overview

Creates a 4-slide carousel post for Word of the Day on Instagram using Pexels images with clean typography.

```
┌─────────────────────┐
│ When Executed by    │  Receives WOTD data from parent
│ Another Workflow    │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│ Get Used Images     │  Fetch list from Airtable
│ from Airtable       │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│ Get Pexels Image    │  HTTP Request (15 results)
│ (HTTP Request)      │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│ Filter Used Images  │  Code: Skip already used
│ (Code)              │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│ IF: is_fallback?    │  Check if fallback needed
└──────┬──────────────┘
       │
   ┌───┴───┐
   │       │
 TRUE   FALSE
   │       │
┌──▼───┐   │
│Broader│   │
│Search │   │
│(HTTP) │   │
└───┬───┘   │
    │       │
┌───▼───┐   │
│Filter │   │
│Fallback│   │
└───┬───┘   │
    │       │
    └───┬───┘
        │
┌───────▼───────┐
│ Store Image   │  Save selected image to Airtable
│ in Airtable   │
└───────┬───────┘
           │
┌──────────▼──────────┐
│ Prepare 4 Slides    │  Word, Definition, Uses, CTA
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│ Generate Images     │  HTML to Image (white border)
│ (4 slides)          │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│ Post to Instagram   │  Carousel post via Graph API
└─────────────────────┘
```

---

## 🚀 Infrastructure Setup (Docker Services)

Before setting up the workflow, you need three Docker services running:

### Required Services:

1. **n8n** - Workflow automation platform
2. **cloudflared** - Creates public tunnel to expose images
3. **static-server** - Auto-detects tunnel URL and serves images ⭐ NEW

### Quick Setup:

```bash
# 1. Build static-server
cd supabase/functions/static-server
docker build -t static-server:latest .

# 2. Add to docker-compose.yml (see docker-compose.snippet.yml)
# 3. Start services
docker-compose up -d

# 4. Verify auto-detection worked
curl http://localhost:3001/health
```

**Expected response:**

```json
{
  "status": "ready",
  "configured": true,
  "tunnelUrl": "https://abc123xyz.trycloudflare.com",
  "autoInitSucceeded": true
}
```

### What's Different?

**🎉 No more manual tunnel URL configuration!**

- **Old way:** n8n had to fetch cloudflared metrics and configure static-server every time
- **New way:** static-server auto-detects on startup, n8n just checks if it's ready

**Benefits:**

- ⚡ Faster workflow execution (skips 3 nodes when auto-detection works)
- 🛡️ Resilient (falls back to manual if auto-detection fails)
- 🔄 Zero maintenance (auto-configures on every Docker restart)

**📖 Full setup guide:** See `/supabase/functions/DOCKER_SETUP_GUIDE.md`

---

## Calling This Workflow from Another Workflow

When calling this workflow from another workflow (e.g., from "Verify WOTD"), you **must** map the inputs explicitly.

### Setup in the "Call Workflow" Node

1. **Source:** Database
2. **Workflow:** Select "Generate Instagram Post" (or your workflow name)
3. **Workflow Inputs:** Click "Add input to send"
4. **Map the data:** Since "Verify WOTD" outputs `{ success: true, data: { ... } }`, you need to map `$json.data` to the workflow input:

**Option 1: Pass entire data object** (Recommended)

- Input name: `data` (or leave blank to pass as root)
- Value: `{{ $json.data }}`

**Option 2: Map individual fields**

- Input name: `word`, Value: `{{ $json.data.word }}`
- Input name: `phonetic`, Value: `{{ $json.data.phonetic }}`
- Input name: `translation`, Value: `{{ $json.data.translation }}`
- Input name: `part_of_speech`, Value: `{{ $json.data.part_of_speech }}`
- Input name: `difficulty_level`, Value: `{{ $json.data.difficulty_level }}`
- Input name: `examples`, Value: `{{ $json.data.definitions }}` (or transform as needed)
- Input name: `date`, Value: `{{ $json.data.date }}`

**Important:** The "Verify WOTD" node outputs data nested in a `data` property. If you don't map `$json.data`, the sub-workflow will receive `undefined` and fail with "Cannot read properties of undefined".

---

## Airtable Setup for Image Tracking

### Step 1: Create Airtable Base

1. Go to [Airtable.com](https://airtable.com) and create a new base
2. Name it "Social Media Assets" or similar

### Step 2: Import Table Structure

**Option A: Import CSV (Recommended)**

1. Download the CSV file: `airtable-used-pexels-images.csv` (included in this repo)
2. In Airtable, click **"Add a base"** → **"Import data"** → **"CSV file"**
3. Upload `airtable-used-pexels-images.csv`
4. Airtable will auto-detect the column types:
   - `pexels_id` → Single line text
   - `image_url` → URL
   - `thumbnail_url` → URL
   - `photographer` → Single line text
   - `photographer_url` → URL
   - `search_query` → Single line text
   - `word` → Single line text
   - `used_date` → Date
5. Rename the table to "Used Pexels Images"
6. **Important:** After import, edit the `pexels_id` field:
   - Click the field header → **"Customize field type"**
   - Check **"This field is unique"** to prevent duplicates

**Option B: Manual Creation**

If you prefer to create manually, use this schema:

| Field Name         | Field Type       | Description                         |
| ------------------ | ---------------- | ----------------------------------- |
| `pexels_id`        | Single line text | Pexels photo ID (unique identifier) |
| `image_url`        | URL              | Full image URL (for reference)      |
| `thumbnail_url`    | URL              | Thumbnail URL (optional)            |
| `photographer`     | Single line text | Photographer name                   |
| `photographer_url` | URL              | Photographer profile URL            |
| `search_query`     | Single line text | Original search query used          |
| `word`             | Single line text | Word of the day it was used for     |
| `used_date`        | Date             | Date when image was first used      |

**Note:** `created_at` is automatically added by Airtable as a "Created time" field - you don't need to create it manually.

### Step 3: Get Airtable Credentials

1. Go to [Airtable API](https://airtable.com/api)
2. Select your base
3. Copy your **Base ID** (starts with `app...`) - e.g., `appYOUR_BASE_ID_HERE`
4. Create an API token:
   - Go to [Account Settings](https://airtable.com/account) → Personal access tokens
   - Create a new token with `data.records:read` and `data.records:write` scopes
   - Copy the token (starts with `pat...`) - e.g., `patYOUR_TOKEN_HERE`

### Step 4: Add to n8n Credentials

1. In n8n, go to **Credentials** → **Add Credential**
2. Search for "Airtable"
3. Add your credentials:
   - **Access Token**: Your personal access token
   - **Base ID**: Your base ID (for this workflow)

### Troubleshooting 403 Forbidden Error

If you get a `403 Forbidden` error when creating records, check:

1. **Token Scopes (Most Common Issue):**

   - Go to [Airtable Personal Access Tokens](https://airtable.com/account)
   - Click on your token → **"Edit"** or **"View"**
   - Verify both scopes are checked:
     - ✅ `data.records:read`
     - ✅ `data.records:write` (this is critical for creating records!)
   - Make sure your "Social Media Assets" base is selected in the **"Access"** section
   - If not, edit the token and add the base

2. **Base ID:**

   - Verify the Base ID in n8n matches exactly (no extra spaces)
   - Get it from: [Airtable API](https://airtable.com/api) → Select your base → Copy Base ID
   - Should look like: `appYOUR_BASE_ID_HERE`

3. **Table Name:**

   - Make sure the table name in n8n matches exactly: `Used Pexels Images`
   - Check for typos or extra spaces
   - Table names are case-sensitive

4. **Token Permissions:**

   - The token must have explicit access to the "Social Media Assets" base
   - If you selected "All bases", make sure your account has access to the base
   - Try recreating the token with explicit base access selected

5. **Test Connection:**

   - In n8n, try using "Search Records" operation first (Node 2)
   - If that works but "Create Record" doesn't, it's a write permission issue → check `data.records:write` scope
   - If neither works, it's a base/table access issue → check base selection in token settings

6. **Recreate Token (If Still Not Working):**
   - Delete the old token
   - Create a new one with:
     - Name: "n8n Social Media"
     - Scopes: `data.records:read` AND `data.records:write`
     - Access: Select "Social Media Assets" base specifically
   - Update the credential in n8n with the new token

---

## Node 1: When Executed by Another Workflow

**Type:** Trigger  
**Mode:** Run Once for Each Item

**Expected Input:**

```json
{
  "word": "parler",
  "phonetic": "paʁ.le",
  "translation": "to speak",
  "part_of_speech": "verb",
  "difficulty_level": "A2",
  "examples": [
    {
      "french": "Je parle français.",
      "english": "I speak French."
    },
    {
      "french": "Elle parle plusieurs langues.",
      "english": "She speaks several languages."
    }
  ],
  "date": "2025-11-12"
}
```

---

## Node 2: Get Used Images from Airtable

**Type:** Airtable  
**Operation:** Search Records  
**Base:** Your Social Media Assets base  
**Table:** Used Pexels Images

**Options:**

- **Fields:** Select `pexels_id` (or leave blank to get all fields)
- **Filter By Formula:** Leave empty (to get all records)
- **Max Records:** Set to a high number (e.g., 10000) or leave default

**Purpose:** Fetch all previously used Pexels image IDs to avoid reusing them.

**Note:** "Search Records" without a filter formula will return all records, effectively listing all used images.

---

## Node 3: Get Pexels Image (HTTP Request)

**Type:** HTTP Request  
**Method:** GET  
**URL:** `https://api.pexels.com/v1/search`

**Headers:**

```json
{
  "Authorization": "YOUR_PEXELS_API_KEY"
}
```

**Query Parameters:**

```json
{
  "query": "{{ $('When Executed by Another Workflow').first().json.data.definitions.first().text }} OR french culture",
  "per_page": 15,
  "orientation": "square"
}
```

**Purpose:** Fetch multiple Pexels images (15 results) to increase chances of finding an unused one.

**Note:** This matches your current query format, but requests 15 images instead of 1 to allow deduplication.

---

## Node 3b: Filter Out Used Images (Code)

**Type:** Code  
**Language:** JavaScript  
**Placement:** After "Get Pexels Image" (Node 3)

**Purpose:** Filter out images that have already been used, selecting the first unused one.

```javascript
// Get WOTD data
const wotdData = $("When Executed by Another Workflow").first().json;
const wotd = wotdData.data || wotdData;
const word = wotd.word;

// Get list of used image IDs from Airtable
const usedImages = $("Get Used Images from Airtable").all();
// Normalize all IDs to strings for consistent comparison
const usedPexelsIds = new Set(
  usedImages
    .map((item) => {
      // Handle different Airtable response structures
      const id =
        item.json.fields?.pexels_id || item.json.pexels_id || item.json.id;
      return id ? String(id).trim() : null;
    })
    .filter((id) => id != null && id !== "")
);

console.log(`Found ${usedPexelsIds.size} previously used images`);
if (usedPexelsIds.size > 0) {
  console.log(
    `Sample used IDs: ${Array.from(usedPexelsIds).slice(0, 5).join(", ")}`
  );
}

// Get Pexels API response from Merge (could be original search OR broader search)
const mergedData = $input.all();
// Find the item with photos array (the Pexels response)
const pexelsItem = mergedData.find((item) => item.json.photos);
const pexelsData = pexelsItem ? pexelsItem.json : mergedData[0].json;

if (!pexelsData.photos || pexelsData.photos.length === 0) {
  throw new Error(`No images found in Pexels response`);
}

// Find first unused image
let selectedPhoto = null;
for (const photo of pexelsData.photos) {
  const photoId = String(photo.id).trim();
  const isUsed = usedPexelsIds.has(photoId);

  console.log(`Checking photo ID: ${photoId}, Used: ${isUsed}`);

  if (!isUsed) {
    selectedPhoto = photo;
    console.log(`Selected unused photo: ${photoId}`);
    break;
  }
}

// Fallback: If all images are used, set flag for broader search
// The broader search will be handled by Node 3c (see below)
if (!selectedPhoto) {
  console.warn(
    `All ${pexelsData.photos.length} images from this search have been used.`
  );
  // Set flag to trigger fallback search in next node
  // For now, use first image but mark as fallback
  selectedPhoto = pexelsData.photos[0];
}

// Build search query for reference (same format as HTTP Request)
const firstDefinition =
  wotd.definitions && Array.isArray(wotd.definitions)
    ? wotd.definitions[0]
    : null;
const definitionText = firstDefinition?.text || word;
const searchQuery = `${definitionText} OR french culture`;

// Determine if this was a fallback selection
// Check if the selected photo was already used (meaning we had to use fallback)
const selectedPhotoId = String(selectedPhoto.id).trim();
const isFallback = usedPexelsIds.has(selectedPhotoId);

if (isFallback) {
  console.warn(
    `WARNING: Selected photo ${selectedPhotoId} is already in used list!`
  );
}

return {
  json: {
    pexels_id: selectedPhoto.id.toString(),
    image_url: selectedPhoto.src.large2x,
    thumbnail_url: selectedPhoto.src.medium,
    photographer: selectedPhoto.photographer,
    photographer_url: selectedPhoto.photographer_url,
    search_query: searchQuery,
    word: word,
    used_date: wotd.date || new Date().toISOString().split("T")[0],
    is_fallback: isFallback, // Flag to indicate if this was a fallback selection
    // Keep original WOTD data for next nodes
    _wotd: wotd,
  },
};
```

---

## Node 3c: IF - Check if Fallback Needed

**Type:** IF  
**Placement:** After Node 3b (Filter Out Used Images)

**Condition:** `{{ $json.is_fallback }} === true`

**Purpose:** Only execute broader search if all images from the word-specific search were used.

**If TRUE** → Continue to Node 3d (Broader Search)  
**If FALSE** → Skip to Node 4 (Store Image in Airtable)

---

## Node 3d: Broader Search (HTTP Request)

**Type:** HTTP Request  
**Method:** GET  
**URL:** `https://api.pexels.com/v1/search`  
**Placement:** After IF node (Node 3c), only executes when `is_fallback: true`

**Headers:**

```json
{
  "Authorization": "YOUR_PEXELS_API_KEY"
}
```

**Query Parameters:**

```json
{
  "query": "french culture OR france OR paris",
  "per_page": 15,
  "orientation": "square"
}
```

**Purpose:** If all images from the word-specific search are used, try a broader generic search to find different images.

**Workflow Structure:**

```
Get Pexels Image → Merge → Filter → Check if Fallback → FALSE → Store Image
                     ↑                      ↓ TRUE
                     └── Broader Search ────┘
```

**How it works:** When Broader Search runs, it loops back to Merge as Input 1. The same "Filter out used images" node handles both original and broader search results.

---

## Alternative Strategies (Future Enhancements)

Create a separate workflow that runs monthly to:

- Archive old used images (older than X days)
- Or reset the entire list
- Or mark images as "reusable" after a certain period

### Option 4: Use Different Search Terms Per Word

Instead of always using `definition OR french culture`, rotate through different search strategies:

- Word-specific: `{{ word }}`
- Definition-based: `{{ definition }}`
- Generic: `french culture`
- Random: `france OR paris OR french`

**Current Implementation:** The code uses the first image as fallback and sets `is_fallback: true` flag. You can use this flag in Node 4 to optionally skip saving fallback images to Airtable, or mark them differently.

---

## Node 4: Store Image in Airtable

**Type:** Airtable  
**Operation:** Create Record  
**Base:** Your Social Media Assets base  
**Table:** Used Pexels Images

**Fields to Set:**

| Field              | Value                          |
| ------------------ | ------------------------------ |
| `pexels_id`        | `{{ $json.pexels_id }}`        |
| `image_url`        | `{{ $json.image_url }}`        |
| `thumbnail_url`    | `{{ $json.thumbnail_url }}`    |
| `photographer`     | `{{ $json.photographer }}`     |
| `photographer_url` | `{{ $json.photographer_url }}` |
| `search_query`     | `{{ $json.search_query }}`     |
| `word`             | `{{ $json.word }}`             |
| `used_date`        | `{{ $json.used_date }}`        |

**Purpose:** Save the selected image to Airtable so it won't be reused in future posts.

**Note:** If the image already exists (duplicate `pexels_id`), Airtable will return an error. You can either:

1. Ignore the error (use "Continue On Fail")
2. Use "Update Record" operation with a filter instead
3. Handle duplicates in code before this node

**Error Handling:** Enable "Continue On Fail" on this node so the workflow doesn't stop if there's a duplicate (which shouldn't happen, but good to be safe).

---

## Alternative Storage Solutions

If you prefer not to use Airtable, here are other options:

### Option 1: Separate Supabase Table

Create a table in your Supabase database (but keep it separate from main app data):

```sql
CREATE TABLE social_media_used_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pexels_id TEXT UNIQUE NOT NULL,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  photographer TEXT,
  photographer_url TEXT,
  search_query TEXT,
  word TEXT,
  used_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_pexels_id ON social_media_used_images(pexels_id);
```

Then use Supabase HTTP Request nodes in n8n instead of Airtable nodes.

### Option 2: Google Sheets

Use Google Sheets API:

- Create a sheet with columns: `pexels_id`, `image_url`, `word`, `used_date`
- Use n8n's Google Sheets node to read/write
- Simple but less robust than Airtable

### Option 3: n8n Database Node

n8n has a built-in database node, but it's less user-friendly for viewing/managing data.

**Recommendation:** Airtable is the best choice for this use case - it's designed for tracking lists, has a great UI, and integrates seamlessly with n8n.

---

## Node 5: Prepare 4 Slides (Code)

**Type:** Code  
**Language:** JavaScript

```javascript
// Get WOTD data - handle both direct input and nested data structure
const wotdData = $("When Executed by Another Workflow").first().json;
const wotd = wotdData.data || wotdData; // Handle nested data structure

// Get Pexels image from Filter node (handles both normal and fallback paths)
const pexelsImageData = $("Filter Out Used Images").first().json;
const pexelsImage = pexelsImageData.image_url;

// Debug: log to verify data structure
console.log("WOTD data:", JSON.stringify(wotd, null, 2));
console.log("Word string:", wotd.word);
console.log("Phonetic:", wotd.phonetic);

// Slide 1: Word over background
const slide1 = {
  type: "word",
  word: wotd.word, // IMPORTANT: Extract the string, not the whole object
  phonetic: wotd.phonetic,
  backgroundImage: pexelsImage,
};

// Slide 2: Definition
const slide2 = {
  type: "definition",
  word: wotd.word, // String, not object
  translation: wotd.translation,
  pos: wotd.part_of_speech,
  level: wotd.difficulty_level,
};

// Slide 3: Common Uses (2 examples)
const slide3 = {
  type: "examples",
  examples: (wotd.examples || []).slice(0, 2), // Ensure examples exist
};

// Slide 4: CTA
const slide4 = {
  type: "cta",
  word: wotd.word, // String, not object
};

// Return each slide as a separate item (n8n will auto-loop over these)
// This way we don't need a "Split In Batches" node
const slides = [slide1, slide2, slide3, slide4];

return slides.map((slide) => ({
  json: {
    ...slide,
    // Keep metadata for later reference
    _metadata: {
      word: wotd.word,
      date: wotd.date,
    },
  },
}));
```

**Alternative (if you need to keep the original structure):**

If you need to keep the original structure for other nodes, you can use **"Item Lists"** → **"Split Out Items"** after "Prepare 4 Slides":

- **Type:** Item Lists → Split Out Items
- **Field to Split Out:** `json.slides`
- This will extract each slide from the array as a separate item

---

## Node 6: Generate Images (Auto-Loop)

**Important:** With the updated "Prepare 4 Slides" code, n8n automatically loops over the 4 slides. **You don't need a "Split In Batches" or "Loop Over Items" node!**

**How it works:**

- "Prepare 4 Slides" outputs 4 separate items (one per slide)
- n8n automatically runs the next node once for each item
- Each iteration of "Create HTML for Current Slide" receives one slide object

**Workflow:**

```
Prepare 4 Slides (outputs 4 items)
    ↓
Create HTML for Current Slide (runs 4 times automatically)
    ↓
Collect All HTML Slides (collects all 4 HTML outputs)
```

### 4a. Create HTML for Current Slide (Code)

**Type:** Code  
**Language:** JavaScript
**Mode:** Run Once for Each Item (IMPORTANT!)

**Critical:** Make sure the mode is set to **"Run Once for Each Item"**, NOT "Run Once for All Items". This ensures n8n runs this node 4 times (once per slide).

**Design Notes:**

- **Slide 1 (Word)**: Ultra-thin typography (200 weight), glassmorphic phonetic pill, darker overlay for better text contrast
- **Slide 2 (Definition)**: Subtle gradient background, clean hierarchy, pill-shaped meta container
- **Slide 3 (Examples)**: Context labels in brand blue, generous spacing, gradient divider
- **Slide 4 (CTA)**: Premium gradient, includes logo, glassmorphic URL container

**Logo URL:** Replace `https://raw.githubusercontent.com/yourusername/languageacademy/main/public/img/TLA_CoreMark_Blue_tm_v1.1.1.png` with your actual hosted logo URL or use a data URI for the logo.

```javascript
// Get the current slide - n8n automatically loops, so $json is already a single slide object
let slide = $json;

// Debug: log what we received (check browser console)
console.log("Raw $json:", JSON.stringify($json, null, 2));
console.log("Slide type:", slide?.type);

// Handle case where slide might be nested in json property (shouldn't happen with new structure)
if (slide && slide.json && slide.json.type) {
  slide = slide.json;
  console.log(
    "Extracted slide from json property:",
    JSON.stringify(slide, null, 2)
  );
}

// Validate we have a slide object
if (!slide || !slide.type) {
  console.error(
    "Invalid slide structure. Received:",
    JSON.stringify($json, null, 2)
  );
  console.error("Slide after processing:", JSON.stringify(slide, null, 2));
  return {
    json: {
      html: `<html><body><h1>Error: Invalid slide structure</h1><pre>${JSON.stringify(
        $json,
        null,
        2
      )}</pre></body></html>`,
      error: "Invalid slide structure",
      received: $json,
      processed: slide,
    },
  };
}

console.log("Processing slide type:", slide.type);

// Helper function to safely extract word string (handles both string and object)
const getWordString = (slide) => {
  if (typeof slide.word === "string") {
    return slide.word;
  }
  if (slide.word && typeof slide.word === "object" && slide.word.word) {
    console.warn("Word is an object, extracting word.word");
    return slide.word.word;
  }
  return "Unknown";
};

let html = "";

if (slide.type === "word") {
  // Slide 1: Word over Pexels background - Elegant, minimal
  const wordStr = getWordString(slide);
  const styles = `body { margin: 0; padding: 0; width: 1080px; height: 1080px; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; } .container { width: 100%; height: 100%; background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${slide.backgroundImage}'); background-size: cover; background-position: center; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; position: relative; } .word { font-size: 140px; font-weight: 200; letter-spacing: -0.05em; margin: 0 0 24px 0; line-height: 1; text-align: center; text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); } .phonetic-container { display: flex; align-items: center; gap: 12px; background: rgba(255, 255, 255, 0.12); backdrop-filter: blur(12px); padding: 16px 32px; border-radius: 50px; border: 1px solid rgba(255, 255, 255, 0.2); } .phonetic { font-size: 36px; font-weight: 400; letter-spacing: 0.02em; opacity: 0.98; }`;
  html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${styles}</style></head><body><div class="container"><div class="word">${wordStr}</div><div class="phonetic-container"><div class="phonetic">/${
    slide.phonetic || ""
  }/</div></div></div></body></html>`;
} else if (slide.type === "definition") {
  // Slide 2: Definition - Clean, elegant typography
  const wordStr = getWordString(slide);
  const styles = `body { margin: 0; padding: 0; width: 1080px; height: 1080px; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; } .container { width: 100%; height: 100%; background: linear-gradient(135deg, #ffffff 0%, #f8faff 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px; box-sizing: border-box; } .word { font-size: 96px; font-weight: 200; letter-spacing: -0.04em; margin: 0 0 60px 0; color: #1a1a1a; line-height: 1; text-align: center; } .translation { font-size: 64px; font-weight: 500; letter-spacing: -0.025em; color: #665665; margin: 0 0 48px 0; text-align: center; line-height: 1.2; } .meta-container { display: flex; align-items: center; gap: 20px; background: #fafbfc; padding: 20px 40px; border-radius: 60px; border: 1px solid #e0e0e0; } .meta { font-size: 28px; font-weight: 500; color: #999999; letter-spacing: -0.01em; } .dot { color: #e0e0e0; font-size: 20px; }`;
  html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${styles}</style></head><body><div class="container"><div class="word">${wordStr}</div><div class="translation">${
    slide.translation || ""
  }</div><div class="meta-container"><div class="meta">${
    slide.pos || ""
  }</div><div class="dot">•</div><div class="meta">${
    slide.level || ""
  }</div></div></div></body></html>`;
} else if (slide.type === "examples") {
  // Slide 3: Examples - Clean, spacious layout with context
  const styles = `body { margin: 0; padding: 0; width: 1080px; height: 1080px; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; } .container { width: 100%; height: 100%; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 100px; box-sizing: border-box; gap: 80px; } .example { text-align: center; max-width: 800px; } .context { font-size: 22px; font-weight: 600; color: #3b82f6; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 32px 0; } .french { font-size: 52px; font-weight: 500; letter-spacing: -0.025em; margin: 0 0 24px 0; color: #1a1a1a; line-height: 1.3; } .english { font-size: 40px; font-weight: 400; color: #665665; line-height: 1.4; margin: 0; } .divider { width: 120px; height: 3px; background: linear-gradient(90deg, transparent, #e0e0e0, transparent); margin: 0 auto; }`;
  html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${styles}</style></head><body><div class="container"><div class="example"><div class="context">${
    slide.examples[0].context || "Example"
  }</div><div class="french">${
    slide.examples[0].french
  }</div><div class="english">${
    slide.examples[0].english
  }</div></div><div class="divider"></div><div class="example"><div class="context">${
    slide.examples[1].context || "Example"
  }</div><div class="french">${
    slide.examples[1].french
  }</div><div class="english">${
    slide.examples[1].english
  }</div></div></div></body></html>`;
} else if (slide.type === "cta") {
  // Slide 4: CTA - Premium design with logo
  const wordStr = getWordString(slide);
  const styles = `body { margin: 0; padding: 0; width: 1080px; height: 1080px; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; } .container { width: 100%; height: 100%; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px; box-sizing: border-box; color: white; position: relative; } .logo { width: 180px; height: auto; margin-bottom: 60px; } .title { font-size: 56px; font-weight: 600; letter-spacing: -0.025em; margin: 0 0 16px 0; text-align: center; line-height: 1.25; } .subtitle { font-size: 40px; font-weight: 300; letter-spacing: -0.02em; margin: 0 0 64px 0; text-align: center; opacity: 0.95; font-style: italic; } .url-container { background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(12px); padding: 24px 48px; border-radius: 60px; border: 1px solid rgba(255, 255, 255, 0.25); } .url { font-size: 36px; font-weight: 500; letter-spacing: -0.01em; margin: 0; }`;
  html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${styles}</style></head><body><div class="container"><img src="https://languageacademy.io/img/TLA_CoreMark_White_tm_v1.1.1.png" alt="Language Academy" class="logo"><div class="title">Master French</div><div class="subtitle">"${wordStr}" and 1000+ words</div><div class="url-container"><div class="url">languageacademy.io</div></div></div></body></html>`;
} else {
  // Fallback for unknown slide types
  console.warn("Unknown slide type:", slide.type);
  const styles = `body { margin: 0; padding: 0; width: 1080px; height: 1080px; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; } .container { width: 100%; height: 100%; background: #f0f0f0; color: #1a1a1a; display: flex; align-items: center; justify-content: center; } .error { font-size: 48px; font-weight: 600; text-align: center; }`;
  html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${styles}</style></head><body><div class="container"><div class="error">Unknown slide type: ${slide.type}</div></div></body></html>`;
}

// Final validation - ensure we have HTML
if (!html || html.trim() === "") {
  console.error("HTML is empty after processing!");
  const errorStyles = `body { padding: 40px; font-family: monospace; }`;
  html = `<!DOCTYPE html><html><head><style>${errorStyles}</style></head><body><h1>Error: Empty HTML</h1><pre>${JSON.stringify(
    slide,
    null,
    2
  )}</pre></body></html>`;
}

console.log("Generated HTML length:", html.length);

// Clean up HTML: normalize excessive whitespace but preserve CSS structure
// This prevents literal \n characters while keeping the HTML readable
html = html
  .replace(/\n{4,}/g, "\n\n") // Max 2 consecutive newlines
  .replace(/[ \t]{4,}/g, "  ") // Collapse excessive spaces but keep some indentation
  .trim();

console.log("Cleaned HTML length:", html.length);

return { json: { html } };
```

**Logo:** The CTA slide now uses your logo from `https://languageacademy.io/img/TLA_CoreMark_Blue_tm_v1.1.1.png` (same as your email template). The CSS applies a white filter since it's on a blue background.

---

### 4b. Collect All HTML Slides

**Type:** Code  
**Placement:** Connect this node directly after "Create HTML for Current Slide"

**Purpose:** Collects all 4 HTML slides after n8n finishes looping through all slides

**Important:** Since "Prepare 4 Slides" outputs 4 separate items, n8n automatically runs "Create HTML for Current Slide" 4 times. This node collects all those outputs.

```javascript
// Collect all HTML slides - n8n automatically loops, so $input.all() gets all 4 items
let allSlides = $input.all();

console.log(`DEBUG: $input.all() returned ${allSlides.length} items`);

// Log structure of each item to debug
allSlides.forEach((item, index) => {
  console.log(`DEBUG: Item ${index + 1} structure:`, {
    hasJson: !!item.json,
    jsonKeys: item.json ? Object.keys(item.json) : [],
    hasHtml: !!(item.json?.html || item.html),
    htmlLength: (item.json?.html || item.html || "").length,
  });
});

// If we got 4 items but they don't have HTML, try getting from the node directly
if (allSlides.length === 4) {
  // Check if items have HTML
  const itemsWithHtml = allSlides.filter(
    (item) => item.json?.html || item.html
  );

  if (itemsWithHtml.length < 4) {
    console.warn(
      `⚠️ Got ${allSlides.length} items but only ${itemsWithHtml.length} have HTML`
    );
    console.warn(
      "Trying to get items from 'Create HTML for Current Slide' node directly..."
    );

    try {
      const createHtmlNode = $("Create HTML for Current Slide");
      if (createHtmlNode && createHtmlNode.all) {
        const allFromNode = createHtmlNode.all();
        console.log(
          `DEBUG: Got ${allFromNode.length} items from node directly`
        );
        if (allFromNode.length === 4) {
          allSlides = allFromNode;
          console.log("✅ Using items from node directly");
        }
      }
    } catch (e) {
      console.log("Could not get items from node directly:", e.message);
    }
  }
}

// If we still only have 1 item, that's a problem
if (allSlides.length === 1) {
  console.error("❌ ERROR: Only got 1 item from $input.all()");
  console.error("This means 'Create HTML for Current Slide' only ran once!");
  console.error(
    "SOLUTION: Set 'Create HTML for Current Slide' mode to 'Run Once for Each Item'"
  );
}

// Get metadata from the first slide (stored in _metadata by "Prepare 4 Slides")
const firstSlide = allSlides[0];
const metadata = firstSlide?.json?._metadata || {};
const word = metadata.word || $("Prepare 4 Slides").first().json.word;
const date = metadata.date || $("Prepare 4 Slides").first().json.date;

console.log(`Final: Collected ${allSlides.length} slides`);

// Verify we got all 4 slides
if (allSlides.length !== 4) {
  console.error(`❌ ERROR: Expected 4 slides, but got ${allSlides.length}`);
  console.error(
    "This means 'Create HTML for Current Slide' did not run 4 times."
  );
  console.error(
    "SOLUTION: Check that 'Create HTML for Current Slide' mode is 'Run Once for Each Item'"
  );
}

// Map all slides - filter out any that don't have HTML
const mappedSlides = allSlides
  .map((item, index) => {
    const html = item.json?.html || item.html || "";
    console.log(`Slide ${index + 1}: HTML length = ${html.length}`);
    return {
      slideNumber: index + 1,
      html: html,
    };
  })
  .filter((slide) => slide.html.length > 0); // Only keep slides with HTML

console.log(`Mapped ${mappedSlides.length} slides with HTML content`);

// Return all slides as an array
return {
  json: {
    word: word,
    date: date,
    slideCount: allSlides.length,
    slidesWithHtml: mappedSlides.length,
    slides: mappedSlides,
  },
};
```

**How it works:**

- "Prepare 4 Slides" outputs 4 separate items
- n8n automatically runs "Create HTML for Current Slide" 4 times (once per item)
- This node uses `$input.all()` to collect all 4 HTML outputs
- Each output contains the HTML for one slide

**Troubleshooting:**

If you only get 1 slide:

1. **Check "Prepare 4 Slides" output:**

   - Execute "Prepare 4 Slides" node
   - Verify it outputs 4 separate items (not 1 item with a `slides` array)
   - Each item should be a single slide object

2. **Verify the code:**

   - Make sure "Prepare 4 Slides" uses the updated code that returns `slides.map(...)`
   - The return should create 4 separate items, not wrap them in an object

3. **Check node connections:**
   - "Prepare 4 Slides" → "Create HTML for Current Slide" (direct connection, no loop node)
   - "Create HTML for Current Slide" → "Collect All HTML Slides" (direct connection)

### 4c. Preview HTML Slides (Optional - For Testing)

**Type:** Code  
**Placement:** Add this node after "Collect All HTML Slides", before image generation

**Purpose:** Creates a single HTML preview page showing all slides so you can see how they look before generating images.

```javascript
// Collect all slides from the loop
const allSlides = $input.all();
const originalData = $("Prepare 4 Slides").first().json;

// Create preview HTML with all slides - build without newlines to avoid \n in JSON
const styles = `* { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #1a1a1a; padding: 40px 20px; min-height: 100vh; } .header { text-align: center; color: white; margin-bottom: 40px; } .header h1 { font-size: 32px; margin-bottom: 10px; } .header p { color: #999; font-size: 16px; } .slides-container { display: flex; flex-direction: column; gap: 40px; align-items: center; max-width: 1200px; margin: 0 auto; padding: 20px; } .slide-wrapper { background: #f8f9fa; border-radius: 16px; padding: 24px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); transition: transform 0.2s, box-shadow 0.2s; width: 100%; max-width: 1080px; } .slide-wrapper:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18); } .slide-label { text-align: center; color: #3b82f6; font-size: 16px; margin-bottom: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; } .slide-preview { width: 100%; max-width: 1080px; height: 1080px; border: 2px solid #ddd; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15); background: white; margin: 0 auto; position: relative; } .slide-preview iframe { width: 100%; height: 100%; border: none; display: block; } .slide-info { text-align: center; margin-top: 16px; color: #666; font-size: 14px; font-weight: 500; } .instructions { text-align: center; color: #666; margin-top: 40px; padding: 20px; background: #2a2a2a; border-radius: 8px; max-width: 800px; margin-left: auto; margin-right: auto; } .instructions h2 { color: white; margin-bottom: 10px; } .instructions code { background: #1a1a1a; padding: 2px 6px; border-radius: 3px; font-family: 'Monaco', 'Courier New', monospace; }`;

const slidesHtml = allSlides
  .map((item, index) => {
    const slideTypes = ["Word Slide", "Definition", "Examples", "CTA"];
    const slideType = slideTypes[index] || `Slide ${index + 1}`;
    let htmlContent = item.json.html || "";

    // Clean up HTML: decode escape sequences
    if (typeof htmlContent === "string") {
      // Replace literal escape sequences with actual characters
      let changed = true;
      let iterations = 0;
      while (changed && iterations < 5) {
        const before = htmlContent;
        htmlContent = htmlContent
          .replace(/\\n/g, "\n")
          .replace(/\\t/g, "\t")
          .replace(/\\r/g, "\r")
          .replace(/\\\\/g, "\\")
          .replace(/\\"/g, '"')
          .replace(/\\'/g, "'");
        changed = htmlContent !== before;
        iterations++;
      }
    }

    const dataUrl =
      "data:text/html;charset=utf-8," + encodeURIComponent(htmlContent);

    return `<div class="slide-wrapper"><div class="slide-label">${slideType}</div><div class="slide-preview"><iframe src="${dataUrl}"></iframe></div><div class="slide-info">Slide ${
      index + 1
    } of ${allSlides.length}</div></div>`;
  })
  .join("");

const previewHTML = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Instagram Slides Preview - ${originalData.word}</title><style>${styles}</style></head><body><div class="header"><h1>Instagram Slides Preview</h1><p>Word: <strong>${originalData.word}</strong> | Date: ${originalData.date}</p></div><div class="slides-container">${slidesHtml}</div><div class="instructions"><h2>How to Use This Preview</h2><p>This preview shows all ${allSlides.length} slides at full size (1080x1080px). Each slide is rendered in an iframe.</p><p><strong>To view full size:</strong> Right-click on any slide → "Inspect" → Copy the iframe src → Paste in a new browser tab</p><p><strong>To save this preview:</strong> Copy the HTML from the n8n output and save as <code>preview.html</code></p></div></body></html>`;

return {
  json: {
    preview_html: previewHTML,
    slide_count: allSlides.length,
    word: originalData.word,
    date: originalData.date,
    // Also include individual slides for reference
    slides: allSlides.map((item, index) => ({
      slide_number: index + 1,
      html: item.json.html,
    })),
  },
};
```

**Usage:**

1. Add this node after your "Create HTML for Current Slide" loop completes
2. The output will contain `preview_html` field
3. **To view the preview:**
   - Copy the `preview_html` value from the output JSON
   - Save it as `preview.html` on your computer
   - Open it in any web browser
   - Or use n8n's "Write to File" node to save it automatically

**Quick View Option - Write to File:**

The "Read/Write Files from Disk" node needs binary data. Add a Code node before it to convert the HTML string to binary:

**Step 1: Add Code Node (Convert to Binary)**

Add a Code node after "Preview HTML Slides":

```javascript
const previewHtml = $json.preview_html;
const word = $json.word || "preview";
const date = $json.date || new Date().toISOString().split("T")[0];

// Convert HTML string to Buffer (binary)
const htmlBuffer = Buffer.from(previewHtml, "utf8");

// Create filename
const fileName = `preview-${word}-${date}.html`;

// Save to Desktop (easier to find!)
const os = require("os");
const path = require("path");
const desktopPath = path.join(os.homedir(), "Desktop");
const filePath = path.join(desktopPath, fileName);

return {
  json: {
    fileName: fileName,
    filePath: filePath,
    word: word,
    date: date,
  },
  binary: {
    data: {
      data: htmlBuffer,
      mimeType: "text/html",
      fileName: fileName,
    },
  },
};
```

**Step 2: Add "Read/Write Files from Disk" Node**

After the Code node above:

- **Operation:** `Write`
- **File Name:** `{{ $json.fileName }}`
- **File Path:** `{{ $json.filePath.replace($json.fileName, '') }}` (extracts directory from full path)
- **File Data:** Leave as default (it will use the binary data automatically)

**OR simpler - just set File Path to Desktop directly:**

- **File Path:** `/Users/YOUR_USERNAME/Desktop/` (replace YOUR_USERNAME with your Mac username)

The file will be saved to your Desktop and you can open it in your browser!

**How to Find Files:**

- **If saved to Desktop:** Just look on your Desktop! The file will be there.
- **If saved to `/tmp/`:**
  - Open Terminal
  - Type: `open /tmp/preview-parler-2025-11-12.html` (replace with your actual filename)
  - Or: `open /tmp` to open the folder in Finder
  - Or: In Finder, press `Cmd+Shift+G` and type `/tmp`

**Alternative: Simplest Solution - Copy from Output**

If the file node still doesn't work, just copy the HTML:

1. Run the "Preview HTML Slides" node
2. In OUTPUT panel, copy the `preview_html` value
3. Paste into a text editor
4. Save as `preview.html`
5. Open in browser

**Simplest Option: Copy HTML from Output**

The easiest way is to just copy the HTML from n8n's output:

1. Run the preview node
2. In the OUTPUT panel, expand the JSON
3. Copy the entire `preview_html` value (it's a long string)
4. Paste into a text editor
5. Save as `preview.html`
6. Open in browser

**Alternative: View Individual Slides**
If you just want to see one slide at a time in n8n:

- After the "Create HTML for Current Slide" loop, add a "Set" node
- Set a field `html_preview` to `{{ $json.html }}`
- Click "Execute step" and view the HTML in the output panel
- You can copy/paste individual slide HTML into a browser to preview

---

## Node 6: Check Tunnel Status (Smart Auto-Detection)

**Type:** HTTP Request  
**Placement:** RIGHT AFTER "Collect All HTML Slides" - BEFORE "Split Out"  
**Method:** GET  
**URL:** `http://static-server:3001/tunnel-status`

**What this does:** Checks if static-server has auto-configured the tunnel URL on startup.

**Response:**

```json
{
  "configured": true,
  "tunnelUrl": "https://abc123.trycloudflare.com",
  "autoInitAttempted": true,
  "autoInitSucceeded": true
}
```

---

## Node 6a: Check If Manual Setup Needed (IF Node)

**Type:** IF  
**Placement:** After "Check Tunnel Status"

**Condition:** `{{ $json.configured }}` equals `false`

**What this does:** If auto-detection failed, we'll manually configure it. If it succeeded, we skip straight to image generation.

**Branches:**

- **TRUE** (not configured) → Go to Node 6b (Manual Setup)
- **FALSE** (already configured) → Skip to Node 6d (Split Out)

---

## Node 6b: Get Tunnel URL from Cloudflared (Manual Fallback)

**Type:** HTTP Request  
**Placement:** Only runs if Node 6a = TRUE (manual setup needed)  
**Method:** GET  
**URL:** `http://n8n-cloudflared:2000/metrics`

**Response Format:** String

Gets cloudflared metrics which contains the current tunnel URL.

**Settings:**

- **Retry On Fail:** Yes
- **Max Retries:** 3
- **Retry Wait:** 2000ms (2 seconds)

---

## Node 6b2: Extract and Set Tunnel URL (Manual Fallback)

**Type:** Code  
**Placement:** After "Get Tunnel URL" (Node 6b)

```javascript
// Extract tunnel URL from cloudflared metrics
const metrics = $input.first().json;
const metricsText =
  typeof metrics === "string" ? metrics : JSON.stringify(metrics);
const tunnelMatch = metricsText.match(
  /https:\/\/[a-z0-9-]+\.trycloudflare\.com/
);

if (!tunnelMatch) {
  console.error("No tunnel URL found in metrics");
  throw new Error("Tunnel URL not found - cloudflared may not be ready yet");
}

const tunnelUrl = tunnelMatch[0];
console.log("Manually extracted tunnel URL:", tunnelUrl);

return { json: { tunnelUrl: tunnelUrl } };
```

---

## Node 6b3: Set Tunnel URL in Static Server (Manual Fallback)

**Type:** HTTP Request  
**Placement:** After "Extract Tunnel URL" (Node 6b2)  
**Method:** POST  
**URL:** `http://static-server:3001/set-tunnel-url`

**Body (JSON):**

```json
{
  "url": "{{ $json.tunnelUrl }}"
}
```

**Response:**

```json
{
  "success": true,
  "tunnelUrl": "https://abc123.trycloudflare.com",
  "method": "manual"
}
```

After this node completes, the static-server is manually configured and ready.

---

## 🎯 Summary: Auto vs Manual Flow

**✅ Auto-Detection Path (90% of the time):**

```
Check Tunnel Status → Already configured → Split Out → Convert to Image
```

**🔧 Manual Fallback Path (if auto fails):**

```
Check Tunnel Status → Not configured → Get from Cloudflared → Extract URL → Set in Static Server → Split Out → Convert to Image
```

**Benefits:**

- ⚡ Faster: Skips 3 nodes when auto-detection works
- 🛡️ Resilient: Falls back to manual if needed
- 🔍 Visible: You can see which path was used in logs
- 🚀 Zero maintenance: Auto-detects on every Docker restart

---

## Node 6d: Split Out (Item Lists)

**Type:** Item Lists → Split Out  
**Placement:** Connect from "Collect All HTML Slides" (goes to "Convert to Image")  
**Field to Split:** `slides`

Splits the 4 slides into separate items for the next node to loop through.

---

## Node 6e: Convert to Image

**Type:** HTTP Request  
**Placement:** After "Split Out"  
**Method:** POST  
**URL:** `http://n8n-plus:3000/api/html-to-image`  
**Mode:** Run Once for Each Item

**Body (JSON):**

```json
 u
```

**Response:** Returns `{ "url": "https://tunnel.trycloudflare.com/images/..." }` - public URL ready for Instagram.

---

## Node 7: Collect Image URLs

**Type:** Code

```javascript
const images = $input.all();

// Get tunnel URL from Check Tunnel Status
const tunnelData = $("Check Tunnel Status").first().json;
const tunnelUrl = tunnelData.tunnelUrl;

// Get word/date from first image (Convert to Image returns this)
const firstImage = images[0].json;
const word = firstImage.word;
const date = firstImage.date;

console.log("Tunnel URL:", tunnelUrl);
console.log("Word:", word);
console.log("Date:", date);
console.log("Images received:", images.length);

// Construct public URLs using tunnel URL + file paths from server response
const imageUrls = images.map((img, index) => {
  const imgData = img.json;
  const filePath = imgData.filePath; // e.g., "/shared/images/languageacademy/socials/instagram/2025-11-16-utiliser/2025-11-16-utiliser-slide-1.png"

  // Extract subfolder, date-word folder, and filename (last 3 parts of path)
  const pathParts = filePath.split("/").filter((part) => part !== ""); // Remove empty strings from leading/trailing slashes
  const subfolder = pathParts[pathParts.length - 3]; // e.g., "instagram"
  const folder = pathParts[pathParts.length - 2]; // e.g., "2025-11-16-utiliser"
  const filename = pathParts[pathParts.length - 1]; // e.g., "2025-11-16-utiliser-slide-1.png"

  // Static server serves /app/images/languageacademy/socials at /images/
  // Include subfolder (instagram) in the URL path
  const publicUrl = `${tunnelUrl}/images/${subfolder}/${folder}/${filename}`;

  console.log(`Image ${index + 1}: ${publicUrl}`);
  return publicUrl;
});

return {
  json: {
    word: word,
    date: date,
    imageUrls: imageUrls,
  },
};
```

---

## Node 7b: Generate Instagram Caption

**Type:** Code  
**Placement:** After "Collect Image URLs" (Node 7)

**Purpose:** Creates an engaging, algorithm-optimized Instagram caption with emojis, hashtags, and clear CTA.

```javascript
const data = $json;
const wotdData = $("When Executed by Another Workflow").first().json.data;

const word = data.word || wotdData.word;
const pos = wotdData.part_of_speech;
const level = wotdData.difficulty_level;
const socialHook = wotdData.social_hook || `How well do you know "${word}"?`;

// Algorithm-optimized caption structure - build with actual newlines, not template literal newlines
const captionParts = [
  `🇫🇷 French Word of the Day: ${word}`,
  "",
  socialHook,
  "",
  "Swipe through to discover:",
  "✨ The meaning",
  "📝 Real examples",
  "💡 How to use it",
  "",
  `Level: ${level} • ${pos}`,
  "",
  "Ready to master French? Visit the link in bio! 👆",
  "",
  "━━━━━━━━━━━━━━━━",
  "#FrenchLanguage #LearnFrench #FrenchVocabulary #LanguageLearning #FrenchWords #StudyFrench #FrenchLearning #LanguageAcademy #WOTD #WordOfTheDay #FrenchLessons #SpeakFrench #FrenchGrammar #LearnLanguages #PolyglotLife #LanguageLovers #FrenchStudy #BilingualLife #FrenchTeacher #LanguageGoals",
];

const caption = captionParts.join("\n");

// Instagram best practices applied:
// - Hook in first line (emoji + clear value prop)
// - Line breaks for readability (algorithm favors longer captions with breaks)
// - Emojis (but not excessive - 5-7 total)
// - Clear CTA
// - 15-20 relevant hashtags (optimal for reach)
// - Mix of popular and niche hashtags
// - Hashtags at the end (keeps caption clean)

// Suggested location IDs for French content (boosts reach by 30%):
// Paris, France: 213385402 (most popular)
// France: 106315219 (broader reach)
// Use whichever fits your brand better

return {
  json: {
    ...data,
    caption: caption,
    captionLength: caption.length,
    hashtagCount: (caption.match(/#/g) || []).length,
    // Add location for Instagram API
    // location_id: "213385402", // Paris, France
    // location_name: "Paris, France",
  },
};
```

**Instagram Optimization Notes:**

- **First 125 characters** are crucial (shown before "more")
- **3-5 line breaks** improve readability and engagement
- **15-30 hashtags** is optimal (we use 20)
- **Mix hashtag sizes:** Popular (#LearnFrench 500K+), medium (#FrenchVocabulary 50K+), niche (#LanguageAcademy)
- **Emojis improve engagement** by 47% (studies show)
- **CTA above hashtags** for better visibility
- **Caption length 1500-2000 chars** is ideal (ours is ~600, perfect)
- **Location tag** boosts reach by 20-30% (especially for language/travel content)

---

## Node 8: Upload Images to Instagram (HTTP Request Method - SIMPLER!)

**Yes, you can skip the Facebook Graph node entirely!** Just use HTTP Request nodes. Much simpler.

#

### Step 1: Prepare Image URLs for Upload

**Type:** Code  
**Placement:** After "Generate Instagram Caption" (Node 7b)

**Purpose:** Prepare each image URL as a separate item so n8n can loop through them.

```javascript
// Get data from previous node - use $input.first() instead of $json for "Run Once for All Items" mode
const data = $input.first().json;
const imageUrls = data.imageUrls; // Already converted to public URLs by "Collect Image URLs" node
const captionData = $("Generate Instagram Caption").first().json;

console.log("Image URLs for Instagram:", imageUrls);

// Create array of upload items (one per image)
const uploadItems = imageUrls.map((url, index) => ({
  image_url: url,
  is_carousel_item: true,
  slide_number: index + 1,
  // Keep caption and metadata for later
  caption: captionData.caption,
  word: captionData.word,
  date: captionData.date,
  location_id: index === 0 ? captionData.location_id : null, // Only first image gets location
}));

// Return as separate items (n8n will auto-loop)
return uploadItems.map((item) => ({ json: item }));
```

---

### Step 2: Create Media Container for Each Image

**Type:** HTTP Request  
**Method:** POST  
**Mode:** Run Once for Each Item (IMPORTANT!)

**URL:** `https://graph.facebook.com/v18.0/886081941249744/media`

**Replace `886081941249744` with your Instagram Business Account ID!**

**Authentication:** None (we'll pass token in body)

**Body (JSON):**

```json
{
  "image_url": "{{ $json.image_url }}",
  "is_carousel_item": true,
  "access_token": "YOUR_LONG_LIVED_TOKEN_HERE"
}
```

**To add location to first image only:**

**Body (JSON):**

```json
{
  "image_url": "{{ $json.image_url }}",
  "is_carousel_item": true,
  "access_token": "YOUR_LONG_LIVED_TOKEN_HERE",
  "location_id": "{{ $json.location_id }}"
}
```

**Note:** The `location_id` will be `null` for images 2-4, which is fine - Instagram ignores it.

**Response:** Each call returns `{ "id": "123456789" }` - this is your media container ID.

---

### Step 3: Collect Media Container IDs

**Type:** Code  
**Placement:** After "Create Media Container" (Step 2)

**Purpose:** Collect all 4 media container IDs and prepare for carousel creation.

```javascript
// Collect all media container IDs from the loop
const mediaContainers = $input.all();
const mediaIds = mediaContainers.map((container) => container.json.id);

// Get caption and metadata from first item
const firstItem = $("Prepare Image URLs for Upload").first().json;

console.log(`Collected ${mediaIds.length} media container IDs:`, mediaIds);

return {
  json: {
    media_ids: mediaIds,
    children: mediaIds.join(","), // Comma-separated for API
    caption: firstItem.caption,
    word: firstItem.word,
    date: firstItem.date,
    location_id: firstItem.location_id,
  },
};
```

---

### Step 4: Create Carousel Container

**Type:** HTTP Request  
**Method:** POST

**URL:** `https://graph.facebook.com/v18.0/886081941249744/media`

**Replace `886081941249744` with your Instagram Business Account ID!**

**Specify Body:** Fixed (not "Using JSON")

**Add these fields manually:**

| Key            | Value                        |
| -------------- | ---------------------------- |
| `media_type`   | `CAROUSEL`                   |
| `children`     | `{{ $json.children }}`       |
| `caption`      | `{{ $json.caption }}`        |
| `access_token` | `YOUR_LONG_LIVED_TOKEN_HERE` |
| `location_id`  | `{{ $json.location_id }}`    |

**Why Fixed mode?** The caption contains newlines and emojis that break JSON syntax. Fixed mode properly escapes them.

**Alternative - Using Expression mode:**

Switch "Specify Body" to "Using Expression" and use:

```javascript
({
  media_type: "CAROUSEL",
  children: $json.children,
  caption: $json.caption,
  access_token: "YOUR_LONG_LIVED_TOKEN_HERE",
  location_id: $json.location_id,
});
```

**Response:** Returns `{ "id": "987654321" }` - this is your carousel container ID (also called `creation_id`).

---

### Step 5: Publish Carousel Post

**Type:** HTTP Request  
**Method:** POST

**URL:** `https://graph.facebook.com/v18.0/886081941249744/media_publish`

**Replace `886081941249744` with your Instagram Business Account ID!**

**Body (JSON):**

```json
{
  "creation_id": "{{ $('Create Carousel Container').first().json.id }}",
  "access_token": "YOUR_LONG_LIVED_TOKEN_HERE"
}
```

**Response:** Returns `{ "id": "111222333" }` - this is your published post ID! 🎉

---

## 🔐 Using n8n Credentials (Recommended!)

Instead of hardcoding the token, store it securely in n8n credentials:

### Setup: Create Instagram Credential

1. In n8n, go to **Credentials** → **Add Credential**
2. Search for **"Generic Credential Type"**
3. Click **"Add Credential"**
4. Set these values:
   - **Credential Name:** `instagram_access_token` (or any name you prefer)
   - **Generic Credential Fields:**
     - **Name:** `access_token`
     - **Value:** Your long-lived Instagram access token (starts with `EAAL...`)
5. Click **"Save"**

### Usage: Reference in HTTP Request Nodes

**In all HTTP Request nodes (Step 2, Step 4, Step 5), replace:**

```
"access_token": "YOUR_LONG_LIVED_TOKEN_HERE"
```

**With:**

```
"access_token": "{{ $credentials.instagram_access_token.access_token }}"
```

**Full example for Step 4 (Expression mode):**

```javascript
({
  media_type: "CAROUSEL",
  children: $json.children,
  caption: $json.caption,
  access_token: $credentials.instagram_access_token.access_token,
  location_id: $json.location_id,
});
```

**Benefits:**

- ✅ More secure (no hardcoded tokens in workflow)
- ✅ Easier to update token when it expires
- ✅ Can reuse same credential across multiple workflows

---

## Complete Workflow for Instagram Upload

```
Generate Instagram Caption (Node 7b)
    ↓
Prepare Image URLs for Upload (Code - creates 4 items)
    ↓
Create Media Container (HTTP Request - runs 4 times automatically)
    ↓
Collect Media Container IDs (Code)
    ↓
Create Carousel Container (HTTP Request)
    ↓
Publish Carousel Post (HTTP Request)
    ↓
✅ Post is live on Instagram!
```

---

---

### Quick Reference: What You Need for n8n

Save these values:

1. **Instagram Business Account ID:** `17841405309211844` (example - use yours from Step 5)
2. **Long-Lived Access Token:** `EAAB...` (60-day token from Step 6)
3. **Facebook App ID:** `123456789` (optional, from App Dashboard)
4. **Facebook App Secret:** `abc123...` (optional, from App Dashboard)

---

## Setup Checklist

- [ ] Create Airtable base for tracking used images (see "Airtable Setup" section)
- [ ] Get Airtable API token and Base ID
- [ ] Configure Airtable credentials in n8n
- [ ] Get Pexels API key (free)
- [ ] Get HTML to Image API key (HTMLCSStoImage.com)
- [ ] **Instagram API Setup** (see "Facebook Graph API Setup Guide" above):
  - [ ] Convert Instagram to Business Account
  - [ ] Create Facebook App (or use existing)
  - [ ] Get Instagram Business Account ID (Step 5) → `886081941249744`
  - [ ] Get long-lived access token (Step 6) → Save token for HTTP Request nodes
  - [ ] **Optional:** Store token in n8n Generic Credential (or use directly in HTTP Request body)
  - [ ] Test Instagram API access (Step 8)
- [ ] Test with a sample word
- [ ] Schedule from main WOTD workflow
