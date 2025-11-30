# n8n: Generate YouTube Shorts for WOTD

## YouTube Shorts Carousel Slides Generator (5 slides, 1080x1920 each)

### For n8n "Create HTML for Current Slide" node

**Mode:** Run Once for Each Item

**Updated with 5 engagement slide types:** quiz, challenge, opinion, mnemonic, mistake

**Refined design following DESIGN_PRINCIPLES.md - Airbnb-level sophistication**

**Format:** Portrait (1080x1920) optimized for YouTube Shorts

---

## Code: Create HTML for Current Slide

```javascript
// YouTube Shorts Slides Generator (5 slides, 1080x1920 each)

// For n8n "Create HTML for Current Slide" node
// Mode: Run Once for Each Item
// Updated with 5 engagement slide types: quiz, challenge, opinion, mnemonic, mistake
// Refined design following DESIGN_PRINCIPLES.md - Airbnb-level sophistication
// Format: Portrait (1080x1920) optimized for YouTube Shorts

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

// Reusable CTA icon (Option 7: Circle with arrow)
const ctaIcon = `<svg width="37" height="37" viewBox="0 0 24 24" fill="none" stroke="#665665" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v8m0 0l-3-3m3 3l3-3"/></svg>`;

// @font-face declarations to map CSS font-weight to correct SF Pro Display font files
// This ensures Puppeteer uses the correct font weight instead of synthesizing weights
// Using local() with PostScript names for reliable font loading in Chromium/Puppeteer
// font-synthesis: none on body prevents Chromium from synthesizing intermediate weights
const fontFaces = `@font-face { font-family: 'SF Pro Display'; font-style: normal; font-weight: 200; font-display: block; src: local('SFProDisplay-Ultralight'), local('SF Pro Display Ultralight'), url('file:///usr/share/fonts/truetype/sf-pro/SF-Pro-Display-Ultralight.otf') format('opentype'); } @font-face { font-family: 'SF Pro Display'; font-style: normal; font-weight: 300; font-display: block; src: local('SFProDisplay-Light'), local('SF Pro Display Light'), url('file:///usr/share/fonts/truetype/sf-pro/SF-Pro-Display-Light.otf') format('opentype'); } @font-face { font-family: 'SF Pro Display'; font-style: normal; font-weight: 400; font-display: block; src: local('SFProDisplay-Regular'), local('SF Pro Display Regular'), url('file:///usr/share/fonts/truetype/sf-pro/SF-Pro-Display-Regular.otf') format('opentype'); } @font-face { font-family: 'SF Pro Display'; font-style: normal; font-weight: 500; font-display: block; src: local('SFProDisplay-Medium'), local('SF Pro Display Medium'), url('file:///usr/share/fonts/truetype/sf-pro/SF-Pro-Display-Medium.otf') format('opentype'); } @font-face { font-family: 'SF Pro Display'; font-style: normal; font-weight: 600; font-display: block; src: local('SFProDisplay-Semibold'), local('SF Pro Display Semibold'), url('file:///usr/share/fonts/truetype/sf-pro/SF-Pro-Display-Semibold.otf') format('opentype'); }`;

let html = "";

if (slide.type === "word") {
  // Slide 1: Word over Pexels background - Elegant, minimal (Portrait optimized)
  const wordStr = getWordString(slide);
  const styles = `${fontFaces} body { margin: 0; padding: 0; width: 1080px; height: 1920px; overflow: hidden; font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-synthesis: none; } .container { width: 100%; height: 100%; background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${slide.backgroundImage}'); background-size: cover; background-position: center; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; position: relative; } .word { font-size: 180px; font-weight: 200; letter-spacing: -0.05em; margin: 0 0 40px 0; line-height: 1; text-align: center; text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); } .phonetic-container { display: flex; align-items: center; gap: 16px; background: rgba(255, 255, 255, 0.12); backdrop-filter: blur(12px); padding: 20px 48px; border-radius: 50px; border: 1px solid rgba(255, 255, 255, 0.2); } .phonetic { font-size: 48px; font-weight: 400; letter-spacing: 0.02em; opacity: 0.98; }`;

  html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${styles}</style></head><body><div class="container"><div class="word">${wordStr}</div><div class="phonetic-container"><div class="phonetic">/${
    slide.phonetic || ""
  }/</div></div></div></body></html>`;
} else if (slide.type === "definition") {
  // Slide 2: Definition - Clean, elegant typography (Portrait optimized)
  const wordStr = getWordString(slide);
  const styles = `${fontFaces} body { margin: 0; padding: 0; width: 1080px; height: 1920px; overflow: hidden; font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-synthesis: none; } .container { width: 100%; height: 100%; background: linear-gradient(135deg, #ffffff 0%, #f8faff 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 120px 80px; box-sizing: border-box; } .word { font-size: 140px; font-weight: 200; letter-spacing: -0.04em; margin: 0 0 80px 0; color: #1a1a1a; line-height: 1; text-align: center; } .translation { font-size: 88px; font-weight: 500; letter-spacing: -0.025em; color: #665665; margin: 0 0 64px 0; text-align: center; line-height: 1.2; } .meta-container { display: flex; align-items: center; gap: 24px; background: #fafbfc; padding: 24px 56px; border-radius: 60px; border: 1px solid #e0e0e0; } .meta { font-size: 36px; font-weight: 500; color: #999999; letter-spacing: -0.01em; } .dot { color: #e0e0e0; font-size: 24px; }`;

  html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${styles}</style></head><body><div class="container"><div class="word">${wordStr}</div><div class="translation">${
    slide.translation || ""
  }</div><div class="meta-container"><div class="meta">${
    slide.pos || ""
  }</div><div class="dot">•</div><div class="meta">${
    slide.level || ""
  }</div></div></div></body></html>`;
} else if (slide.type === "examples") {
  // Slide 3: Examples - Clean, spacious layout with context (Portrait optimized)
  // Note: French text uses font-weight: 500 (Medium) - preload Medium font to ensure it renders correctly
  const styles = `${fontFaces} body { margin: 0; padding: 0; width: 1080px; height: 1920px; overflow: hidden; font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-synthesis: none; } .container { width: 100%; height: 100%; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 140px 100px; box-sizing: border-box; gap: 100px; } .example { text-align: center; max-width: 900px; } .context { font-size: 28px; font-weight: 600; color: #3b82f6; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 40px 0; } .french { font-size: 68px; font-weight: 500; letter-spacing: -0.025em; margin: 0 0 32px 0; color: #1a1a1a; line-height: 1.3; } .english { font-size: 52px; font-weight: 400; color: #665665; line-height: 1.4; margin: 0; } .divider { width: 160px; height: 4px; background: linear-gradient(90deg, transparent, #e0e0e0, transparent); margin: 0 auto; }`;

  html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><link rel="preload" href="file:///usr/share/fonts/truetype/sf-pro/SF-Pro-Display-Medium.otf" as="font" type="font/otf" crossorigin><style>${styles}</style></head><body><div class="container"><div class="example"><div class="context">${
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
} else if (slide.type === "quiz") {
  // NEW: Slide 4 - QUIZ - Elegant, minimal, sophisticated (Portrait optimized)
  const wordStr = getWordString(slide);
  const q = slide.engagement || {};
  const styles = `${fontFaces} body { margin: 0; padding: 0; width: 1080px; height: 1920px; overflow: hidden; font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-synthesis: none; } .container { width: 100%; height: 100%; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 140px 100px; box-sizing: border-box; } .title { font-size: 52px; font-weight: 600; color: #1a1a1a; margin-bottom: 80px; letter-spacing: -0.02em; text-align: center; } .question { font-size: 68px; font-weight: 300; color: #1a1a1a; margin-bottom: 96px; text-align: center; line-height: 1.3; letter-spacing: -0.025em; max-width: 900px; } .options { width: 100%; max-width: 850px; margin-bottom: 96px; } .option { font-size: 56px; font-weight: 400; color: #665665; letter-spacing: -0.02em; margin-bottom: 36px; text-align: center; line-height: 1.3; } .cta { font-size: 36px; font-weight: 500; color: #3b82f6; letter-spacing: -0.01em; text-align: center; }`;

  const optionsHtml =
    q.options
      ?.map(
        (opt, i) =>
          `<div class="option">${String.fromCharCode(65 + i)}) ${opt}</div>`
      )
      .join("") || "";

  html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${styles}</style></head><body><div class="container"><div class="title">Test yourself</div><div class="question">${
    q.question || "Quiz question here"
  }</div><div class="options">${optionsHtml}</div><div class="cta">Comment your answer below</div></div></body></html>`;
} else if (slide.type === "challenge") {
  // NEW: Slide 4 - CHALLENGE - Elegant, encouraging (Portrait optimized)
  const wordStr = getWordString(slide);
  const c = slide.engagement || {};
  const styles = `${fontFaces} body { margin: 0; padding: 0; width: 1080px; height: 1920px; overflow: hidden; font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-synthesis: none; } .container { width: 100%; height: 100%; background: linear-gradient(135deg, #fafbfc 0%, #ffffff 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 140px 100px; box-sizing: border-box; } .title { font-size: 52px; font-weight: 600; color: #1a1a1a; margin-bottom: 80px; letter-spacing: -0.02em; text-align: center; } .prompt { font-size: 68px; font-weight: 300; color: #1a1a1a; margin-bottom: 100px; text-align: center; line-height: 1.3; letter-spacing: -0.025em; max-width: 900px; } .example-label { font-size: 24px; font-weight: 600; color: #999999; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 24px; text-align: center; } .example-text { font-size: 42px; font-weight: 400; color: #665665; letter-spacing: -0.015em; text-align: center; font-style: italic; margin-bottom: 100px; } .cta { font-size: 36px; font-weight: 500; color: #3b82f6; letter-spacing: -0.01em; text-align: center; display: flex; align-items: center; justify-content: center; gap: 12px; }`;

  html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${styles}</style></head><body><div class="container"><div class="title">Your turn</div><div class="prompt">${
    c.prompt || `Use "${wordStr}" in a sentence`
  }</div><div class="example-label">Example</div><div class="example-text">${
    c.example || `Je ${wordStr} avec mes amis.`
  }</div><div class="cta">Comment below ${ctaIcon}</div></div></body></html>`;
} else if (slide.type === "opinion") {
  // NEW: Slide 4 - OPINION - Minimal, sophisticated poll (Portrait optimized)
  const wordStr = getWordString(slide);
  const o = slide.engagement || {};
  const styles = `${fontFaces} body { margin: 0; padding: 0; width: 1080px; height: 1920px; overflow: hidden; font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-synthesis: none; } .container { width: 100%; height: 100%; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 140px 100px; box-sizing: border-box; } .title { font-size: 52px; font-weight: 600; color: #1a1a1a; margin-bottom: 80px; letter-spacing: -0.02em; text-align: center; } .question { font-size: 56px; font-weight: 300; color: #1a1a1a; margin-bottom: 112px; text-align: center; letter-spacing: -0.025em; line-height: 1.3; } .options-container { width: 100%; max-width: 850px; margin-bottom: 100px; } .poll-option { text-align: center; margin-bottom: 52px; } .option-label { font-size: 32px; font-weight: 500; color: #3b82f6; margin-bottom: 16px; letter-spacing: -0.01em; } .option-text { font-size: 52px; font-weight: 400; color: #665665; letter-spacing: -0.02em; line-height: 1.3; } .cta { font-size: 36px; font-weight: 500; color: #3b82f6; letter-spacing: -0.01em; text-align: center; display: flex; align-items: center; justify-content: center; gap: 12px; }`;

  html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${styles}</style></head><body><div class="container"><div class="title">Which is harder?</div><div class="question">${
    o.question || "Tell us your experience"
  }</div><div class="options-container"><div class="poll-option"><div class="option-label">A</div><div class="option-text">${
    o.option_a || "Option A"
  }</div></div><div class="poll-option"><div class="option-label">B</div><div class="option-text">${
    o.option_b || "Option B"
  }</div></div></div><div class="cta">Comment A or B ${ctaIcon}</div></div></body></html>`;
} else if (slide.type === "mnemonic") {
  // NEW: Slide 4 - MNEMONIC - Elegant memory hook (Portrait optimized)
  const wordStr = getWordString(slide);
  const m = slide.engagement || {};
  const styles = `${fontFaces} body { margin: 0; padding: 0; width: 1080px; height: 1920px; overflow: hidden; font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-synthesis: none; } .container { width: 100%; height: 100%; background: linear-gradient(135deg, #ffffff 0%, #f8faff 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 140px 100px; box-sizing: border-box; } .title { font-size: 52px; font-weight: 600; color: #1a1a1a; margin-bottom: 100px; letter-spacing: -0.02em; text-align: center; } .hook { font-size: 56px; font-weight: 300; color: #1a1a1a; margin-bottom: 64px; text-align: center; letter-spacing: -0.025em; line-height: 1.3; } .connection { font-size: 64px; font-weight: 400; color: #665665; margin-bottom: 80px; text-align: center; letter-spacing: -0.02em; line-height: 1.3; } .reinforcement { font-size: 48px; font-weight: 500; color: #1a1a1a; margin-bottom: 100px; text-align: center; letter-spacing: -0.015em; } .cta { font-size: 36px; font-weight: 500; color: #3b82f6; letter-spacing: -0.01em; text-align: center; }`;

  html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${styles}</style></head><body><div class="container"><div class="title">Remember it</div><div class="hook">${
    m.hook || "Memory hook here"
  }</div><div class="connection">${
    m.connection || "Connection to remember"
  }</div><div class="reinforcement">${
    m.reinforcement || "Word = meaning"
  }</div><div class="cta">${
    m.cta || "Comment your memory trick!"
  }</div></div></body></html>`;
} else if (slide.type === "mistake") {
  // NEW: Slide 4 - MISTAKE - Clean error correction (Portrait optimized)
  const wordStr = getWordString(slide);
  const err = slide.engagement || {};
  const styles = `${fontFaces} body { margin: 0; padding: 0; width: 1080px; height: 1920px; overflow: hidden; font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-synthesis: none; } .container { width: 100%; height: 100%; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 140px 100px; box-sizing: border-box; } .title { font-size: 52px; font-weight: 600; color: #1a1a1a; margin-bottom: 100px; letter-spacing: -0.02em; text-align: center; } .comparison { width: 100%; max-width: 900px; margin-bottom: 96px; } .error-item { text-align: center; margin-bottom: 40px; } .label { font-size: 26px; font-weight: 600; color: #999999; margin-bottom: 20px; letter-spacing: 0.05em; } .wrong { font-size: 52px; font-weight: 400; color: #665665; letter-spacing: -0.02em; line-height: 1.3; opacity: 0.6; text-decoration: line-through; } .correct { font-size: 56px; font-weight: 400; color: #1a1a1a; letter-spacing: -0.02em; line-height: 1.3; } .rule { font-size: 36px; font-weight: 400; color: #665665; margin-bottom: 96px; text-align: center; line-height: 1.4; letter-spacing: -0.01em; font-style: italic; max-width: 850px; } .cta { font-size: 36px; font-weight: 500; color: #3b82f6; letter-spacing: -0.01em; text-align: center; }`;

  html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${styles}</style></head><body><div class="container"><div class="title">Don't say this</div><div class="comparison"><div class="error-item"><div class="label">WRONG</div><div class="wrong">${
    err.wrong || "Incorrect usage"
  }</div></div><div class="error-item"><div class="label">CORRECT</div><div class="correct">${
    err.correct || "Correct usage"
  }</div></div></div><div class="rule">${
    err.rule || "Grammar rule here"
  }</div><div class="cta">${
    err.cta || "Have you made this mistake? 😅"
  }</div></div></body></html>`;
} else if (slide.type === "cta") {
  // Slide 5: CTA - Premium design with logo (Portrait optimized)
  const wordStr = getWordString(slide);
  const styles = `${fontFaces} body { margin: 0; padding: 0; width: 1080px; height: 1920px; overflow: hidden; font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-synthesis: none; } .container { width: 100%; height: 100%; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 120px 80px; box-sizing: border-box; color: white; position: relative; } .logo { width: 240px; height: auto; margin-bottom: 80px; } .title { font-size: 72px; font-weight: 600; letter-spacing: -0.025em; margin: 0 0 24px 0; text-align: center; line-height: 1.25; } .subtitle { font-size: 52px; font-weight: 300; letter-spacing: -0.02em; margin: 0 0 80px 0; text-align: center; opacity: 0.95; font-style: italic; } .url-container { background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(12px); padding: 32px 64px; border-radius: 60px; border: 1px solid rgba(255, 255, 255, 0.25); } .url { font-size: 48px; font-weight: 500; letter-spacing: -0.01em; margin: 0; }`;

  html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${styles}</style></head><body><div class="container"><img src="https://languageacademy.io/img/TLA_CoreMark_White_tm_v1.1.1.png" alt="Language Academy" class="logo"><div class="title">Master French</div><div class="subtitle">"${wordStr}" and 1000+ words</div><div class="url-container"><div class="url">languageacademy.io</div></div></div></body></html>`;
} else {
  // Fallback for unknown slide types
  console.warn("Unknown slide type:", slide.type);
  const styles = `${fontFaces} body { margin: 0; padding: 0; width: 1080px; height: 1920px; overflow: hidden; font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-synthesis: none; } .container { width: 100%; height: 100%; background: #f0f0f0; color: #1a1a1a; display: flex; align-items: center; justify-content: center; } .error { font-size: 64px; font-weight: 600; text-align: center; }`;

  html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${styles}</style></head><body><div class="container"><div class="error">Unknown slide type: ${slide.type}</div></div></body></html>`;
}

// Final validation - ensure we have HTML
if (!html || html.trim() === "") {
  console.error("HTML is empty after processing!");
  const errorStyles = `${fontFaces} body { padding: 40px; font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-synthesis: none; }`;
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

---

## Key Differences from Instagram Version

### Dimensions

- **Instagram:** 1080x1080 (square)
- **YouTube Shorts:** 1080x1920 (portrait, 9:16 aspect ratio)

### Typography Scaling

All font sizes have been increased proportionally to take advantage of the taller format:

- **Word slide:** 140px → 180px
- **Definition:** 96px → 140px (word), 64px → 88px (translation)
- **Examples:** 52px → 68px (French), 40px → 52px (English)
- **Engagement slides:** Proportionally scaled up (40-52px → 52-68px)
- **CTA:** 56px → 72px (title), 40px → 52px (subtitle)

### Spacing Adjustments

- Increased vertical padding (80px → 120-140px)
- Larger gaps between elements (60px → 80-100px)
- More breathing room for text elements

### Layout Optimizations

- Content centered vertically with more space
- Text elements have larger max-widths (800px → 900px)
- Logo size increased (180px → 240px)
- Better use of vertical space for readability

---

## Usage in n8n

1. **Node Type:** Code (JavaScript)
2. **Mode:** Run Once for Each Item
3. **Input:** Array of slide objects from previous node
4. **Output:** HTML string for each slide

### Expected Input Structure

```json
{
  "type": "word",
  "word": "bonjour",
  "phonetic": "bɔ̃.ʒuʁ",
  "backgroundImage": "https://..."
}
```

### Output Structure

```json
{
  "json": {
    "html": "<!DOCTYPE html>..."
  }
}
```

---

## Next Steps

After generating HTML for each slide:

1. Convert HTML to image (1080x1920) using HTML to Image node
2. Combine slides into video or upload individually
3. Post to YouTube Shorts via YouTube API

---

## Notes

- All slides maintain the same elegant, minimal design philosophy
- Portrait format allows for larger, more readable text
- Engagement slides (quiz, challenge, opinion, mnemonic, mistake) are optimized for mobile viewing
- CTA slide maintains premium branding with larger logo and text

---

## Node: Prepare Video Creation Inputs

### For n8n "Prepare Video Inputs" Code node

**Mode:** Run Once

**Placement:** After "Convert HTML to Image" node (collects all slide images)

**Purpose:** Prepares inputs for video creation script - collects slide image paths and slide content JSON

```javascript
// Collect all slide images from the HTML-to-image conversion
// Slides are already in order: slide-1, slide-2, slide-3, slide-4, slide-5
const slideImages = $input.all();

// Sort by slide number extracted from filename (slide-1, slide-2, etc.)
const sortedSlides = slideImages.sort((a, b) => {
  const numA = parseInt(a.json.fileName?.match(/slide-(\d+)/)?.[1] || "0");
  const numB = parseInt(b.json.fileName?.match(/slide-(\d+)/)?.[1] || "0");
  return numA - numB;
});

// Get original slide data from "Prepare 5 Slides" node
// This node returns an array of slides, each with json property containing slide data
const prepareSlidesNode = $("Prepare 5 Slides");
const allPreparedSlides = prepareSlidesNode.all();

// Extract the actual slide objects (remove json wrapper)
// These contain all the TTS text fields needed by the video script
const slideObjects = allPreparedSlides.map((item) => item.json);

// Sort slides by type order to ensure correct sequence: word, definition, examples, engagement, cta
const slideTypeOrder = [
  "word",
  "definition",
  "examples",
  "quiz",
  "challenge",
  "opinion",
  "mnemonic",
  "mistake",
  "cta",
];
const sortedSlideObjects = slideObjects.sort((a, b) => {
  const indexA =
    slideTypeOrder.indexOf(a.type) !== -1
      ? slideTypeOrder.indexOf(a.type)
      : 999;
  const indexB =
    slideTypeOrder.indexOf(b.type) !== -1
      ? slideTypeOrder.indexOf(b.type)
      : 999;
  return indexA - indexB;
});

// Convert Docker paths to Mac paths
// Docker: /shared/images/... → Mac: /Users/jupiter/dev/woodshed/images/...
const convertToMacPath = (dockerPath) => {
  if (!dockerPath) return null;
  return dockerPath.replace(
    /^\/shared\/images/,
    "/Users/jupiter/dev/woodshed/images"
  );
};

// Get slide paths in order (already sorted by slide number)
const slide1 = convertToMacPath(sortedSlides[0]?.json?.filePath);
const slide2 = convertToMacPath(sortedSlides[1]?.json?.filePath);
const slide3 = convertToMacPath(sortedSlides[2]?.json?.filePath);
const slide4 = convertToMacPath(sortedSlides[3]?.json?.filePath);
const slide5 = convertToMacPath(sortedSlides[4]?.json?.filePath);

// Get slide content JSON - this contains all TTS text fields needed by the script
// The script expects: definition.translation, examples[].english/french, engagement.hook/connection/reinforcement
const slideContentJson = JSON.stringify(sortedSlideObjects);

// Extract date and word from slide content JSON (contains original word with accents)
const slideData = sortedSlideObjects[0] || {};
const date =
  slideData._metadata?.date ||
  sortedSlides[0]?.json?.date ||
  new Date().toISOString().split("T")[0];
const word = slideData.word || slideData._metadata?.word || "unknown";

// Validate all required paths exist
if (!slide1 || !slide2 || !slide3 || !slide4 || !slide5) {
  console.error("Missing slide images:", {
    slide1: !!slide1,
    slide2: !!slide2,
    slide3: !!slide3,
    slide4: !!slide4,
    slide5: !!slide5,
    totalSlides: sortedSlides.length,
  });
  throw new Error(
    `Missing required slide images for video creation. Found ${sortedSlides.length} slides, need 5.`
  );
}

return {
  json: {
    date: date,
    word: word,
    slide1_path: slide1,
    slide2_path: slide2,
    slide3_path: slide3,
    slide4_path: slide4,
    slide5_path: slide5,
    slide_content_json: slideContentJson,
  },
};
```

---

## Node: Build Video Command

### For n8n "Build Command" Code node

**Mode:** Run Once

**Placement:** After "Prepare Video Inputs"

**Purpose:** Builds the SSH command with properly escaped JSON and environment variables

```javascript
const data = $input.first().json;

// Escape single quotes in JSON by replacing ' with '\'' (end quote, escaped quote, start quote)
// This allows us to wrap the JSON in single quotes safely
const escapedJson = data.slide_content_json.replace(/'/g, "'\\''");

// Build command parts
// Use double quotes for simple arguments (date, word, paths)
// Use single quotes for JSON (contains double quotes and & characters)
const commandParts = [
  "./create_multi_slide_video_hume.sh",
  `"${data.date}"`,
  `"${data.word}"`,
  `"${data.slide1_path}"`,
  `"${data.slide2_path}"`,
  `"${data.slide3_path}"`,
  `"${data.slide4_path}"`,
  `"${data.slide5_path}"`,
  `'${escapedJson}'`, // Single quotes protect JSON from shell interpretation
  "--music",
  "camillesaentsaens-aquarium.mp3",
];

const fullCommand = commandParts.join(" ");

// Build SSH command with HUME_API_KEY passed directly
// SSH from Docker to Mac doesn't inherit .env files, so we pass the key explicitly
// No quotes needed on env vars since they contain no spaces or special characters
let sshCommand = `cd /Users/jupiter/dev/woodshed/tts/piper && HUME_API_KEY=Vh8TQkLAmEdffJpHvbYK62qaSG2qoDwl3lZv4z5XSELRjGAL HUME_FRENCH_VOICE_ID=9e1f9e4f-691a-4bb0-b87c-e306a4c838ef HUME_ENGLISH_VOICE_ID=c7aa10be-57c1-4647-9306-7ac48dde3536 ${fullCommand}`;

// Escape ALL double quotes in the entire command string
// The Execute Command node wraps the command in double quotes, so all inner double quotes must be escaped
// This escapes: quotes around arguments ("2025-11-29"), but NOT the JSON which is in single quotes
// Single quotes inside JSON are already escaped as '\''
sshCommand = sshCommand.replace(/"/g, '\\"');

return {
  json: {
    ...data,
    command: sshCommand,
  },
};
```

---

## Node: Create YouTube Shorts Video with Music

### For n8n "Execute Command" node

**Type:** Execute Command  
**Placement:** After "Build Video Command"  
**Command:** SSH to host Mac and run video creation script

**Command:**

```bash
ssh jupiter@host.docker.internal "{{ $json.command }}"
```

**Important:** The command MUST be wrapped in double quotes so SSH executes `cd ... && ...` as a single command. All double quotes inside the command string are already escaped (`\"`), so the shell will parse it correctly.

**Alternative: Direct Command (sources .env file)**

If you prefer to skip the Code node and use a direct command:

```bash
ssh jupiter@host.docker.internal "cd /Users/jupiter/dev/woodshed/tts/piper && HUME_API_KEY=\"Vh8TQkLAmEdffJpHvbYK62qaSG2qoDwl3lZv4z5XSELRjGAL\" HUME_FRENCH_VOICE_ID=\"9e1f9e4f-691a-4bb0-b87c-e306a4c838ef\" HUME_ENGLISH_VOICE_ID=\"c7aa10be-57c1-4647-9306-7ac48dde3536\" ./create_multi_slide_video_hume.sh \"{{ $json.date }}\" \"{{ $json.word }}\" \"{{ $json.slide1_path }}\" \"{{ $json.slide2_path }}\" \"{{ $json.slide3_path }}\" \"{{ $json.slide4_path }}\" \"{{ $json.slide5_path }}\" '{{ $json.slide_content_json }}' --music camillesaentsaens-aquarium.mp3"
```

**Without Music (Optional):**

If you want to create videos without music, remove the `--music` parameter:

```bash
ssh jupiter@host.docker.internal "cd /Users/jupiter/dev/woodshed/tts/piper && HUME_API_KEY=\"Vh8TQkLAmEdffJpHvbYK62qaSG2qoDwl3lZv4z5XSELRjGAL\" HUME_FRENCH_VOICE_ID=\"9e1f9e4f-691a-4bb0-b87c-e306a4c838ef\" HUME_ENGLISH_VOICE_ID=\"c7aa10be-57c1-4647-9306-7ac48dde3536\" ./create_multi_slide_video_hume.sh \"{{ $json.date }}\" \"{{ $json.word }}\" \"{{ $json.slide1_path }}\" \"{{ $json.slide2_path }}\" \"{{ $json.slide3_path }}\" \"{{ $json.slide4_path }}\" \"{{ $json.slide5_path }}\" '{{ $json.slide_content_json }}'"
```

**Output:**

The script outputs two file paths (if music is used):

1. Video with music: `${DATE}-${WORD_SLUG}-complete-hume-with-music.mp4`
2. Original video: `${DATE}-${WORD_SLUG}-complete-hume.mp4`

If no music, outputs single path:

- Video: `${DATE}-${WORD_SLUG}-complete-hume.mp4`

**Note:**

- The script receives `HUME_API_KEY` and voice IDs as environment variables in the SSH command
- Filenames use slugged word (filesystem-safe), e.g., "résolution" → "resolution"
- Videos are saved in: `/Users/jupiter/dev/woodshed/images/languageacademy/socials/${DATE}-${WORD_SLUG}/video/`
- Video dimensions are auto-detected from slide images (portrait format for YouTube Shorts)

---

## Complete Workflow Order

1. **Prepare 5 Slides** - Creates slide data structure
2. **Create HTML for Current Slide** (Loop) - Generates HTML for each slide
3. **Convert HTML to Image** (Loop) - Converts HTML to 1080x1920 images
4. **Prepare Video Inputs** - Collects slide paths and prepares JSON
5. **Build Video Command** (Optional) - Builds SSH command with escaped JSON
6. **Create YouTube Shorts Video** - Executes video creation script with music
7. **Upload to YouTube** (Future) - Upload the generated video

**Note:** Step 5 is optional if you use the direct command approach in the Execute Command node.

---

## Music File Location

The script expects the music file at:

- `/Users/jupiter/dev/woodshed/tts/piper/camillesaentsaens-aquarium.mp3`

To use a different music file, update the `--music` parameter in the Execute Command node.

---

## Code: Preview All Slides

### For n8n "Preview Slides" node

**Mode:** Run Once

**Purpose:** Creates an HTML preview page showing all generated slides in portrait format

```javascript
// Collect all slides from the loop
const allSlides = $input.all();

const originalData = $("Prepare 5 Slides").first().json;

// Create preview HTML with all slides - build without newlines to avoid \n in JSON
const styles = `* { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #1a1a1a; padding: 40px 20px; min-height: 100vh; } .header { text-align: center; color: white; margin-bottom: 40px; } .header h1 { font-size: 32px; margin-bottom: 10px; } .header p { color: #999; font-size: 16px; } .slides-container { display: flex; flex-direction: column; gap: 40px; align-items: center; max-width: 1200px; margin: 0 auto; padding: 20px; } .slide-wrapper { background: #f8f9fa; border-radius: 16px; padding: 24px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); transition: transform 0.2s, box-shadow 0.2s; width: 100%; max-width: 1080px; } .slide-wrapper:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18); } .slide-label { text-align: center; color: #3b82f6; font-size: 16px; margin-bottom: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; } .slide-preview { width: 100%; max-width: 1080px; height: 1920px; border: 2px solid #ddd; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15); background: white; margin: 0 auto; position: relative; } .slide-preview iframe { width: 100%; height: 100%; border: none; display: block; } .slide-info { text-align: center; margin-top: 16px; color: #666; font-size: 14px; font-weight: 500; } .instructions { text-align: center; color: #666; margin-top: 40px; padding: 20px; background: #2a2a2a; border-radius: 8px; max-width: 800px; margin-left: auto; margin-right: auto; } .instructions h2 { color: white; margin-bottom: 10px; } .instructions code { background: #1a1a1a; padding: 2px 6px; border-radius: 3px; font-family: 'Monaco', 'Courier New', monospace; }`;

// Map slide types for labels
const getSlideTypeLabel = (slide, index) => {
  const slideType = slide?.type || slide?.json?.type;
  const typeLabels = {
    word: "Word Slide",
    definition: "Definition",
    examples: "Examples",
    quiz: "Quiz",
    challenge: "Challenge",
    opinion: "Opinion Poll",
    mnemonic: "Mnemonic",
    mistake: "Common Mistake",
    cta: "Call to Action",
  };
  return typeLabels[slideType] || `Slide ${index + 1}`;
};

const slidesHtml = allSlides
  .map((item, index) => {
    const slideType = getSlideTypeLabel(item, index);
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

const previewHTML = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>YouTube Shorts Slides Preview - ${originalData.word}</title><style>${styles}</style></head><body><div class="header"><h1>YouTube Shorts Slides Preview</h1><p>Word: <strong>${originalData.word}</strong> | Date: ${originalData.date}</p></div><div class="slides-container">${slidesHtml}</div><div class="instructions"><h2>How to Use This Preview</h2><p>This preview shows all ${allSlides.length} slides at full size (1080x1920px portrait format). Each slide is rendered in an iframe.</p><p><strong>To view full size:</strong> Right-click on any slide → "Inspect" → Copy the iframe src → Paste in a new browser tab</p><p><strong>To save this preview:</strong> Copy the HTML from the n8n output and save as <code>preview.html</code></p><p><strong>Format:</strong> Portrait (1080x1920) optimized for YouTube Shorts</p></div></body></html>`;

return {
  json: {
    preview_html: previewHTML,
    slide_count: allSlides.length,
    word: originalData.word,
    date: originalData.date,
    // Also include individual slides for reference
    slides: allSlides.map((item, index) => ({
      slide_number: index + 1,
      slide_type: item?.json?.type || item?.type || "unknown",
      html: item.json.html,
    })),
  },
};
```

### Key Changes from Instagram Preview

1. **Slide Dimensions:** Changed from `height: 1080px` to `height: 1920px` (portrait format)
2. **Title:** Updated from "Instagram Slides Preview" to "YouTube Shorts Slides Preview"
3. **Slide Type Labels:** Enhanced to handle all 5 engagement slide types (quiz, challenge, opinion, mnemonic, mistake)
4. **Instructions:** Updated to reference 1080x1920px dimensions and YouTube Shorts format
5. **Slide Type Detection:** Improved logic to extract slide type from nested JSON structures

### Usage in n8n

1. **Node Type:** Code (JavaScript)
2. **Mode:** Run Once
3. **Input:** All items from the "Create HTML for Current Slide" loop
4. **Output:** Complete HTML preview page with all slides

### Output Structure

```json
{
  "json": {
    "preview_html": "<!DOCTYPE html>...",
    "slide_count": 5,
    "word": "bonjour",
    "date": "2024-01-15",
    "slides": [
      {
        "slide_number": 1,
        "slide_type": "word",
        "html": "<!DOCTYPE html>..."
      },
      ...
    ]
  }
}
```
