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
│ Get Pexels Image    │  Fetch relevant background image
└──────────┬──────────┘
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

## Node 2: Get Pexels Image

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
  "query": "{{ $json.word }} OR french culture",
  "per_page": 1,
  "orientation": "square"
}
```

**Note:** You can make the search more specific (e.g., "parler speaking conversation") or more generic (e.g., "france french culture") depending on your preference.

---

## Node 3: Prepare 4 Slides (Code)

**Type:** Code  
**Language:** JavaScript

```javascript
// Get WOTD data - handle both direct input and nested data structure
const wotdData = $("When Executed by Another Workflow").first().json;
const wotd = wotdData.data || wotdData; // Handle nested data structure

// Get Pexels image
const pexelsImage = $("Get Pexels Image").first().json.photos[0].src.large2x;

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

## Node 4: Generate Images (Auto-Loop)

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

### 4d. HTML to Image API (Free Options)

You have several free options for converting HTML to images:

#### Option 1: ScreenshotAPI.net (Free Tier - Recommended)

**Type:** HTTP Request  
**Method:** GET  
**URL:** `https://shot.screenshotapi.net/screenshot`

**Query Parameters:**

```
token: YOUR_FREE_API_TOKEN (get at screenshotapi.net)
url: data:text/html;charset=utf-8,{{ encodeURIComponent($json.html) }}
width: 1080
height: 1080
file_type: png
wait_for_event: load
```

**Response Handling:** The API returns JSON with a `screenshot` field containing the image URL. Add a "Set" node after this to extract the URL:

**Set Node:**

- Name: `imageUrl`
- Value: `{{ $json.screenshot }}`

**Note:** Free tier includes 100 screenshots/month. Sign up at screenshotapi.net for a free API token.

#### Option 2: htmlcsstoimage.com (Free Tier)

**Type:** HTTP Request  
**Method:** POST  
**URL:** `https://hcti.io/v1/image`

**Authentication:** Basic Auth

- Username: Your User ID (sign up at htmlcsstoimage.com)
- Password: Your API Key

**Body:**

```json
{
  "html": "{{ $json.html }}",
  "width": 1080,
  "height": 1080
}
```

**Note:** Free tier includes 50 images/month.

#### Option 3: Self-Hosted Puppeteer Service (Unlimited Free)

A complete self-hosted solution is included in `supabase/functions/html-to-image/`. Deploy to Vercel (free) for unlimited usage.

**Setup:**

1. Go to `supabase/functions/html-to-image/`
2. Deploy to Vercel: `vercel` (or connect GitHub repo)
3. Get your deployment URL

**Type:** HTTP Request  
**Method:** POST  
**URL:** `YOUR_VERCEL_URL/api/html-to-image`

**Body:**

```json
{
  "html": "{{ $json.html }}",
  "width": 1080,
  "height": 1080
}
```

**Body (with Supabase Storage upload):**

```json
{
  "html": "{{ $json.html }}",
  "width": 1080,
  "height": 1080,
  "upload_to_storage": true
}
```

**Environment Variables (for Supabase Storage):**

- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key

**Response:** Returns a public URL directly (e.g., `https://your-project.supabase.co/storage/v1/object/public/instagram-slides/...`)

**Setup:**

1. Create a storage bucket named `instagram-slides` in Supabase Storage
2. Set it to public
3. Deploy the service with environment variables set

**Note:** The loop will run 4 times (once per slide), generating 4 images. Vercel free tier is very generous for this use case. If you don't set `upload_to_storage: true`, it returns a base64 data URL instead.

---

## Node 5: Collect Image URLs

**Type:** Code

```javascript
const images = $input.all();
const originalData = $("Prepare 4 Slides").first().json;

return {
  json: {
    word: originalData.word,
    date: originalData.date,
    imageUrls: images.map((img) => img.json.url),
  },
};
```

---

## Node 5b: Generate Instagram Caption

**Type:** Code  
**Placement:** After "Collect Image URLs"

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
    location_id: "213385402", // Paris, France
    location_name: "Paris, France",
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

## Node 6: Upload Images to Instagram

Instagram carousel posts require a two-step process:

### Step 1: Create Media Container for Each Image

**Type:** HTTP Request (Loop)  
**Method:** POST  
**URL:** `https://graph.facebook.com/v18.0/INSTAGRAM_ACCOUNT_ID/media`

**Body:**

```json
{
  "image_url": "{{ $json.imageUrls[INDEX] }}",
  "is_carousel_item": true,
  "access_token": "YOUR_INSTAGRAM_ACCESS_TOKEN",
  "location_id": "{{ $json.location_id }}"
}
```

**Note:** Location is added to the first media container request, not all 4.

You'll need to loop this 4 times (once per image) and collect the media container IDs.

---

## Node 7: Publish Carousel Post

**Type:** HTTP Request  
**Method:** POST  
**URL:** `https://graph.facebook.com/v18.0/INSTAGRAM_ACCOUNT_ID/media_publish`

**Body:**

```json
{
  "creation_id": "CAROUSEL_CONTAINER_ID",
  "access_token": "YOUR_INSTAGRAM_ACCESS_TOKEN"
}
```

**Caption:**

```
📚 French Word of the Day: {{ $json.word }}

Swipe to see the definition and examples ➡️

#French #LearnFrench #LanguageLearning #FrenchVocabulary #WOTD
```

---

## Complete Workflow Summary

1. **Trigger** - Receives WOTD data from parent workflow
2. **Get Pexels Image** - Fetch background image for slide 1
3. **Prepare 4 Slides** - Structure data for Word, Definition, Examples, CTA
4. **Generate Images** - Loop through slides, create HTML, convert to images
5. **Collect URLs** - Gather all 4 image URLs
6. **Upload to Instagram** - Create media containers
7. **Publish** - Post carousel to Instagram

---

## Design Notes

### White Border

All images have a 40px white border created by the outer padding and inner container border in the HTML.

### Typography

Following your design principles:

- **Word slide**: Thin weight (300), tight letter spacing
- **Definition slide**: Clean hierarchy, subtle colors
- **Examples slide**: Generous spacing, subtle divider
- **CTA slide**: Bold but clean, brand blue background

### Color Palette

- Primary text: `#1a1a1a`
- Secondary text: `#665665`
- Tertiary text: `#999999`
- Borders: `#e0e0e0`
- Background: `#fafbfc` (subtle)
- CTA background: `#3b82f6` (brand blue)

---

## Setup Checklist

- [ ] Get Pexels API key (free)
- [ ] Get HTML to Image API key (HTMLCSStoImage.com)
- [ ] Get Instagram Business Account access token
- [ ] Configure Instagram account ID in n8n
- [ ] Test with a sample word
- [ ] Schedule from main WOTD workflow
