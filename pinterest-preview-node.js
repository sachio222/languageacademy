// Pinterest Pin Preview Node
// For n8n - Creates a preview HTML page to view the 1000x1500 pin
// Place this AFTER "Generate Pinterest Pin HTML" node

// Get the generated Pinterest pin HTML
const pinData = $input.first().json;
const htmlContent = pinData.html || "";
const word = pinData.word || "preview";
const date = pinData.date || new Date().toISOString().split("T")[0];

// Create data URL for iframe
const dataUrl =
  "data:text/html;charset=utf-8," + encodeURIComponent(htmlContent);

// Preview page styles - Pinterest styling scaled proportionally for 1000x1500 (4x scale)
const styles = `* { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #efefef; padding: 40px 20px; min-height: 100vh; } .header { text-align: center; color: #111; margin-bottom: 40px; } .header h1 { font-size: 28px; margin-bottom: 8px; font-weight: 600; } .header p { color: #767676; font-size: 14px; } .header .badge { display: inline-block; background: #111; color: white; padding: 4px 12px; border-radius: 16px; font-size: 12px; font-weight: 600; margin-left: 8px; } .pin-container { display: flex; flex-direction: column; align-items: center; max-width: 1200px; margin: 0 auto; } .pin-preview { width: 1000px; height: 1500px; overflow: visible; background: transparent; margin: 0 auto; border-radius: 64px; transition: all 0.15s ease; cursor: zoom-in; } .pin-preview:hover { box-shadow: 0 8px 60px rgba(0, 0, 0, 0.12); } .pin-preview iframe { width: 100%; height: 100%; border: none; display: block; border-radius: 64px; overflow: hidden; } .pin-info { text-align: center; margin-top: 16px; color: #767676; font-size: 13px; font-weight: 500; } .pin-dimensions { display: inline-block; background: #111; color: white; padding: 6px 12px; border-radius: 12px; font-family: 'SF Mono', 'Monaco', monospace; font-size: 11px; margin-top: 8px; } .instructions { text-align: center; color: #767676; margin-top: 40px; padding: 20px; background: white; border-radius: 16px; max-width: 800px; margin-left: auto; margin-right: auto; box-shadow: 0 1px 12px rgba(0, 0, 0, 0.08); } .instructions h2 { color: #111; margin-bottom: 12px; font-size: 20px; font-weight: 600; } .instructions p { margin-bottom: 8px; line-height: 1.5; font-size: 14px; } .instructions code { background: #efefef; padding: 2px 6px; border-radius: 4px; font-family: 'SF Mono', 'Monaco', monospace; color: #e60023; font-size: 13px; } .instructions strong { color: #111; font-weight: 600; }`;

// Build preview HTML - clean, no frame
const previewHTML = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Pinterest Pin Preview - ${word}</title><style>${styles}</style></head><body><div class="header"><h1>📌 Pinterest Pin Preview</h1><p>Word: <strong>${word}</strong> | Date: ${date}<span class="badge">1000x1500</span></p></div><div class="pin-container"><div class="pin-preview"><iframe src="${dataUrl}"></iframe></div><div class="pin-info">Tall Pin Format<div class="pin-dimensions">1000px × 1500px</div></div></div><div class="instructions"><h2>How to Use This Preview</h2><p>This preview shows your Pinterest pin exactly as it will appear on Pinterest (1000x1500px).</p><p><strong>To view full size:</strong> Right-click on the pin → "Inspect" → Copy the iframe src → Paste in a new browser tab</p><p><strong>To save this preview:</strong> Copy the HTML from the n8n output and save as <code>preview-${word}-${date}.html</code></p></div></body></html>`;

console.log("✅ Pinterest pin preview HTML generated");
console.log("📏 Pin dimensions: 1000x1500px");
console.log("📝 Word:", word);
console.log("📊 Preview HTML length:", previewHTML.length, "characters");

return {
  json: {
    preview_html: previewHTML,
    word: word,
    date: date,
    pin_dimensions: "1000x1500",
    original_html: htmlContent,
    html_length: htmlContent.length,
  },
};
