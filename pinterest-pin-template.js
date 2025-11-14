// Pinterest Pin HTML Generator (1000x1500)
// For n8n "Generate Pinterest Pin HTML" node

// Get WOTD data - handle both direct input and nested data structure
const wotdData = $("When Executed by Another Workflow").first().json;
const wotd = wotdData.data || wotdData;

// Get Pexels image from Filter node
const pexelsImageData = $("Filter out used images").first().json;
const pexelsImage = pexelsImageData.image_url;

// Extract data
const word = wotd.word;
const phonetic = wotd.phonetic || "";
const translation = wotd.translation || "";
const pos = wotd.part_of_speech || "";
const level = wotd.difficulty_level || "";
const examples = wotd.examples || [];

// Get first 2 examples
const example1 = examples[0] || { french: "", english: "", context: "" };
const example2 = examples[1] || { french: "", english: "", context: "" };

// Build styles - all in one line, EVEN THIRDS (500px each section)
const styles = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Poppins:wght@300;400;500;600&family=Satisfy&display=swap'); * { margin: 0; padding: 0; box-sizing: border-box; } body { width: 1000px; height: 1500px; overflow: hidden; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif; background: #ffffff; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; } .container { width: 100%; height: 100%; display: flex; flex-direction: column; } .hero { width: 100%; height: 500px; background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url('${pexelsImage}'); background-size: cover; background-position: center; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; position: relative; padding: 3rem 2.5rem; } .word-main { font-family: 'Playfair Display', serif; font-size: 6rem; font-weight: 600; letter-spacing: -0.03em; margin-bottom: 1.25rem; text-align: center; text-shadow: 0 4px 24px rgba(0, 0, 0, 0.5); line-height: 1; } .phonetic { font-family: 'Satisfy', cursive; font-size: 2.5rem; font-weight: 400; opacity: 0.98; letter-spacing: 0.02em; text-shadow: 0 2px 16px rgba(0, 0, 0, 0.4); margin-bottom: 1.5rem; } .hero-translation { font-family: 'Playfair Display', serif; font-size: 2.75rem; font-weight: 500; color: white; margin-bottom: 1.25rem; letter-spacing: -0.025em; line-height: 1.2; text-align: center; text-shadow: 0 3px 18px rgba(0, 0, 0, 0.5); } .hero-meta-row { display: flex; align-items: center; justify-content: center; gap: 0.875rem; } .hero-meta-badge { background: rgba(255, 255, 255, 0.95); color: #665665; padding: 0.875rem 2rem; border-radius: 2rem; font-size: 1.5rem; font-weight: 600; letter-spacing: -0.01em; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); } .hero-level-badge { background: #3b82f6; color: white; } .examples-section { background: #ffffff; padding: 3rem 3rem; height: 500px; display: flex; flex-direction: column; justify-content: center; } .example { margin-bottom: 2rem; padding: 2rem 2.25rem; background: #fafbfc; border-radius: 1rem; border-left: 5px solid #3b82f6; } .example:last-child { margin-bottom: 0; } .context-label { font-size: 1.25rem; font-weight: 600; color: #3b82f6; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 1rem; } .french { font-family: 'Poppins', sans-serif; font-size: 2.25rem; font-weight: 500; color: #1a1a1a; margin-bottom: 0.75rem; line-height: 1.4; letter-spacing: -0.015em; } .english { font-size: 1.875rem; font-weight: 400; color: #665665; line-height: 1.5; font-style: italic; letter-spacing: -0.01em; } .cta-section { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 3rem 3rem; min-height: 500px; text-align: center; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; } .logo { width: 8rem; height: auto; margin-bottom: 1.5rem; filter: brightness(0) invert(1); } .cta-title { font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 600; margin-bottom: 0.75rem; letter-spacing: -0.025em; line-height: 1.2; } .cta-subtitle { font-size: 1.625rem; font-weight: 400; opacity: 0.95; margin-bottom: 1.75rem; font-style: italic; letter-spacing: -0.01em; } .url-box { background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); padding: 1.125rem 2.5rem; border-radius: 2.5rem; border: 2px solid rgba(255, 255, 255, 0.25); display: inline-block; } .url { font-size: 1.625rem; font-weight: 500; letter-spacing: -0.01em; }`;

// Build HTML - same method as Instagram (3 sections, blue extends to bottom)
const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${styles}</style></head><body><div class="container"><div class="hero"><div class="word-main">${word}</div><div class="phonetic">/${phonetic}/</div><div class="hero-translation">${translation}</div><div class="hero-meta-row"><div class="hero-meta-badge">${pos}</div><div class="hero-meta-badge hero-level-badge">${level}</div></div></div><div class="examples-section"><div class="example"><div class="context-label">${
  example1.context || "Example 1"
}</div><div class="french">${example1.french}</div><div class="english">${
  example1.english
}</div></div><div class="example"><div class="context-label">${
  example2.context || "Example 2"
}</div><div class="french">${example2.french}</div><div class="english">${
  example2.english
}</div></div></div><div class="cta-section"><img src="https://languageacademy.io/img/TLA_CoreMark_White_tm_v1.1.1.png" alt="Language Academy" class="logo"><div class="cta-title">Master French</div><div class="cta-subtitle">"${word}" + 1000 more words</div><div class="url-box"><div class="url">languageacademy.io</div></div></div></div></body></html>`;

// Debug logging
console.log("✅ Pinterest pin HTML generated");
console.log("📏 Dimensions: 1000x1500px");
console.log("📝 Word:", word);
console.log("📊 HTML length:", html.length, "characters");

return {
  json: {
    html: html,
    word: word,
    date: wotd.date || new Date().toISOString().split("T")[0],
    // Keep WOTD data for next nodes
    _wotd: wotd,
    _pexelsImage: pexelsImage,
  },
};
