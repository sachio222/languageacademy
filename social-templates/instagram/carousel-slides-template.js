// Instagram Carousel Slides Generator (5 slides, 1080x1080 each)
// For n8n "Create HTML for Current Slide" node
// Mode: Run Once for Each Item
// Updated with 5 engagement slide types: quiz, challenge, opinion, mnemonic, mistake
// Refined design following DESIGN_PRINCIPLES.md - Airbnb-level sophistication

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

let html = "";

if (slide.type === "word") {
  // Slide 1: Word over Pexels background - Elegant, minimal
  const wordStr = getWordString(slide);
  const styles = `body { margin: 0; padding: 0; width: 1080px; height: 1080px; overflow: hidden; font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; } .container { width: 100%; height: 100%; background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${slide.backgroundImage}'); background-size: cover; background-position: center; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; position: relative; } .word { font-size: 140px; font-weight: 200; letter-spacing: -0.05em; margin: 0 0 24px 0; line-height: 1; text-align: center; text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); } .phonetic-container { display: flex; align-items: center; gap: 12px; background: rgba(255, 255, 255, 0.12); backdrop-filter: blur(12px); padding: 16px 32px; border-radius: 50px; border: 1px solid rgba(255, 255, 255, 0.2); } .phonetic { font-size: 36px; font-weight: 400; letter-spacing: 0.02em; opacity: 0.98; }`;
  html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${styles}</style></head><body><div class="container"><div class="word">${wordStr}</div><div class="phonetic-container"><div class="phonetic">/${
    slide.phonetic || ""
  }/</div></div></div></body></html>`;
} else if (slide.type === "definition") {
  // Slide 2: Definition - Clean, elegant typography
  const wordStr = getWordString(slide);
  const styles = `body { margin: 0; padding: 0; width: 1080px; height: 1080px; overflow: hidden; font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; } .container { width: 100%; height: 100%; background: linear-gradient(135deg, #ffffff 0%, #f8faff 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px; box-sizing: border-box; } .word { font-size: 96px; font-weight: 200; letter-spacing: -0.04em; margin: 0 0 60px 0; color: #1a1a1a; line-height: 1; text-align: center; } .translation { font-size: 64px; font-weight: 500; letter-spacing: -0.025em; color: #665665; margin: 0 0 48px 0; text-align: center; line-height: 1.2; } .meta-container { display: flex; align-items: center; gap: 20px; background: #fafbfc; padding: 20px 40px; border-radius: 60px; border: 1px solid #e0e0e0; } .meta { font-size: 28px; font-weight: 500; color: #999999; letter-spacing: -0.01em; } .dot { color: #e0e0e0; font-size: 20px; }`;
  html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${styles}</style></head><body><div class="container"><div class="word">${wordStr}</div><div class="translation">${
    slide.translation || ""
  }</div><div class="meta-container"><div class="meta">${
    slide.pos || ""
  }</div><div class="dot">•</div><div class="meta">${
    slide.level || ""
  }</div></div></div></body></html>`;
} else if (slide.type === "examples") {
  // Slide 3: Examples - Clean, spacious layout with context
  const styles = `body { margin: 0; padding: 0; width: 1080px; height: 1080px; overflow: hidden; font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; } .container { width: 100%; height: 100%; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 100px; box-sizing: border-box; gap: 80px; } .example { text-align: center; max-width: 800px; } .context { font-size: 22px; font-weight: 600; color: #3b82f6; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 32px 0; } .french { font-size: 52px; font-weight: 500; letter-spacing: -0.025em; margin: 0 0 24px 0; color: #1a1a1a; line-height: 1.3; } .english { font-size: 40px; font-weight: 400; color: #665665; line-height: 1.4; margin: 0; } .divider { width: 120px; height: 3px; background: linear-gradient(90deg, transparent, #e0e0e0, transparent); margin: 0 auto; }`;
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
} else if (slide.type === "quiz") {
  // NEW: Slide 4 - QUIZ - Elegant, minimal, sophisticated
  const wordStr = getWordString(slide);
  const q = slide.engagement || {};

  const styles = `body { margin: 0; padding: 0; width: 1080px; height: 1080px; overflow: hidden; font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; } .container { width: 100%; height: 100%; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 100px; box-sizing: border-box; } .title { font-size: 40px; font-weight: 600; color: #1a1a1a; margin-bottom: 64px; letter-spacing: -0.02em; text-align: center; } .question { font-size: 52px; font-weight: 300; color: #1a1a1a; margin-bottom: 72px; text-align: center; line-height: 1.3; letter-spacing: -0.025em; max-width: 800px; } .options { width: 100%; max-width: 700px; margin-bottom: 72px; } .option { font-size: 44px; font-weight: 400; color: #665665; letter-spacing: -0.02em; margin-bottom: 28px; text-align: center; line-height: 1.3; } .cta { font-size: 28px; font-weight: 500; color: #3b82f6; letter-spacing: -0.01em; text-align: center; }`;

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
  // NEW: Slide 4 - CHALLENGE - Elegant, encouraging
  const wordStr = getWordString(slide);
  const c = slide.engagement || {};

  const styles = `body { margin: 0; padding: 0; width: 1080px; height: 1080px; overflow: hidden; font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; } .container { width: 100%; height: 100%; background: linear-gradient(135deg, #fafbfc 0%, #ffffff 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 100px; box-sizing: border-box; } .title { font-size: 40px; font-weight: 600; color: #1a1a1a; margin-bottom: 64px; letter-spacing: -0.02em; text-align: center; } .prompt { font-size: 52px; font-weight: 300; color: #1a1a1a; margin-bottom: 80px; text-align: center; line-height: 1.3; letter-spacing: -0.025em; max-width: 800px; } .example-label { font-size: 18px; font-weight: 600; color: #999999; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 20px; text-align: center; } .example-text { font-size: 32px; font-weight: 400; color: #665665; letter-spacing: -0.015em; text-align: center; font-style: italic; margin-bottom: 80px; } .cta { font-size: 28px; font-weight: 500; color: #3b82f6; letter-spacing: -0.01em; text-align: center; display: flex; align-items: center; justify-content: center; gap: 10px; }`;

  html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${styles}</style></head><body><div class="container"><div class="title">Your turn</div><div class="prompt">${
    c.prompt || `Use "${wordStr}" in a sentence`
  }</div><div class="example-label">Example</div><div class="example-text">${
    c.example || `Je ${wordStr} avec mes amis.`
  }</div><div class="cta">Comment below ${ctaIcon}</div></div></body></html>`;
} else if (slide.type === "opinion") {
  // NEW: Slide 4 - OPINION - Minimal, sophisticated poll
  const wordStr = getWordString(slide);
  const o = slide.engagement || {};

  const styles = `body { margin: 0; padding: 0; width: 1080px; height: 1080px; overflow: hidden; font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; } .container { width: 100%; height: 100%; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 100px; box-sizing: border-box; } .title { font-size: 40px; font-weight: 600; color: #1a1a1a; margin-bottom: 64px; letter-spacing: -0.02em; text-align: center; } .question { font-size: 44px; font-weight: 300; color: #1a1a1a; margin-bottom: 88px; text-align: center; letter-spacing: -0.025em; line-height: 1.3; } .options-container { width: 100%; max-width: 700px; margin-bottom: 80px; } .poll-option { text-align: center; margin-bottom: 40px; } .option-label { font-size: 24px; font-weight: 500; color: #3b82f6; margin-bottom: 12px; letter-spacing: -0.01em; } .option-text { font-size: 40px; font-weight: 400; color: #665665; letter-spacing: -0.02em; line-height: 1.3; } .cta { font-size: 28px; font-weight: 500; color: #3b82f6; letter-spacing: -0.01em; text-align: center; display: flex; align-items: center; justify-content: center; gap: 10px; }`;

  html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${styles}</style></head><body><div class="container"><div class="title">Which is harder?</div><div class="question">${
    o.question || "Tell us your experience"
  }</div><div class="options-container"><div class="poll-option"><div class="option-label">A</div><div class="option-text">${
    o.option_a || "Option A"
  }</div></div><div class="poll-option"><div class="option-label">B</div><div class="option-text">${
    o.option_b || "Option B"
  }</div></div></div><div class="cta">Comment A or B ${ctaIcon}</div></div></body></html>`;
} else if (slide.type === "mnemonic") {
  // NEW: Slide 4 - MNEMONIC - Elegant memory hook
  const wordStr = getWordString(slide);
  const m = slide.engagement || {};

  const styles = `body { margin: 0; padding: 0; width: 1080px; height: 1080px; overflow: hidden; font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; } .container { width: 100%; height: 100%; background: linear-gradient(135deg, #ffffff 0%, #f8faff 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 100px; box-sizing: border-box; } .title { font-size: 40px; font-weight: 600; color: #1a1a1a; margin-bottom: 80px; letter-spacing: -0.02em; text-align: center; } .hook { font-size: 44px; font-weight: 300; color: #1a1a1a; margin-bottom: 48px; text-align: center; letter-spacing: -0.025em; line-height: 1.3; } .connection { font-size: 48px; font-weight: 400; color: #665665; margin-bottom: 64px; text-align: center; letter-spacing: -0.02em; line-height: 1.3; } .reinforcement { font-size: 36px; font-weight: 500; color: #1a1a1a; margin-bottom: 80px; text-align: center; letter-spacing: -0.015em; } .cta { font-size: 28px; font-weight: 500; color: #3b82f6; letter-spacing: -0.01em; text-align: center; }`;

  html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${styles}</style></head><body><div class="container"><div class="title">Remember it</div><div class="hook">${
    m.hook || "Memory hook here"
  }</div><div class="connection">${
    m.connection || "Connection to remember"
  }</div><div class="reinforcement">${
    m.reinforcement || "Word = meaning"
  }</div><div class="cta">${
    m.cta || "Comment your memory trick 💡"
  }</div></div></body></html>`;
} else if (slide.type === "mistake") {
  // NEW: Slide 4 - MISTAKE - Clean error correction
  const wordStr = getWordString(slide);
  const err = slide.engagement || {};

  const styles = `body { margin: 0; padding: 0; width: 1080px; height: 1080px; overflow: hidden; font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; } .container { width: 100%; height: 100%; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 100px; box-sizing: border-box; } .title { font-size: 40px; font-weight: 600; color: #1a1a1a; margin-bottom: 80px; letter-spacing: -0.02em; text-align: center; } .comparison { width: 100%; max-width: 750px; margin-bottom: 72px; } .error-item { text-align: center; margin-bottom: 32px; } .label { font-size: 20px; font-weight: 600; color: #999999; margin-bottom: 16px; letter-spacing: 0.05em; } .wrong { font-size: 40px; font-weight: 400; color: #665665; letter-spacing: -0.02em; line-height: 1.3; opacity: 0.6; text-decoration: line-through; } .correct { font-size: 44px; font-weight: 400; color: #1a1a1a; letter-spacing: -0.02em; line-height: 1.3; } .rule { font-size: 28px; font-weight: 400; color: #665665; margin-bottom: 72px; text-align: center; line-height: 1.4; letter-spacing: -0.01em; font-style: italic; max-width: 700px; } .cta { font-size: 28px; font-weight: 500; color: #3b82f6; letter-spacing: -0.01em; text-align: center; }`;

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
  // Slide 5: CTA - Premium design with logo (moved from slide 4)
  const wordStr = getWordString(slide);
  const styles = `body { margin: 0; padding: 0; width: 1080px; height: 1080px; overflow: hidden; font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; } .container { width: 100%; height: 100%; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px; box-sizing: border-box; color: white; position: relative; } .logo { width: 180px; height: auto; margin-bottom: 60px; } .title { font-size: 56px; font-weight: 600; letter-spacing: -0.025em; margin: 0 0 16px 0; text-align: center; line-height: 1.25; } .subtitle { font-size: 40px; font-weight: 300; letter-spacing: -0.02em; margin: 0 0 64px 0; text-align: center; opacity: 0.95; font-style: italic; } .url-container { background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(12px); padding: 24px 48px; border-radius: 60px; border: 1px solid rgba(255, 255, 255, 0.25); } .url { font-size: 36px; font-weight: 500; letter-spacing: -0.01em; margin: 0; }`;
  html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${styles}</style></head><body><div class="container"><img src="https://languageacademy.io/img/TLA_CoreMark_White_tm_v1.1.1.png" alt="Language Academy" class="logo"><div class="title">Master French</div><div class="subtitle">"${wordStr}" and 1000+ words</div><div class="url-container"><div class="url">languageacademy.io</div></div></div></body></html>`;
} else {
  // Fallback for unknown slide types
  console.warn("Unknown slide type:", slide.type);
  const styles = `body { margin: 0; padding: 0; width: 1080px; height: 1080px; overflow: hidden; font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; } .container { width: 100%; height: 100%; background: #f0f0f0; color: #1a1a1a; display: flex; align-items: center; justify-content: center; } .error { font-size: 48px; font-weight: 600; text-align: center; }`;
  html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${styles}</style></head><body><div class="container"><div class="error">Unknown slide type: ${slide.type}</div></div></body></html>`;
}

// Final validation - ensure we have HTML
if (!html || html.trim() === "") {
  console.error("HTML is empty after processing!");
  const errorStyles = `body { padding: 40px; font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }`;
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
