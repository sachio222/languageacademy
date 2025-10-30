#!/usr/bin/env node

/**
 * Fix broken examples in nouns.js that have empty trans fields
 * Parses examples that have French and English mixed in the text field
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nounsFile = path.join(__dirname, "src/data/dictionary/words/cambridge/nouns.js");
const fileContent = fs.readFileSync(nounsFile, "utf8");

// Extract Map entries
const mapMatch = fileContent.match(/export const \w+ = new Map\(\[([\s\S]*?)\]\);/) || 
                 fileContent.match(/export const nouns = new Map\(\[([\s\S]*?)\]\);/) ||
                 fileContent.match(/new Map\(\[([\s\S]*?)\]\)/);

if (!mapMatch) {
  console.error("❌ Could not parse nouns.js file");
  process.exit(1);
}

// Parse entries
const entries = eval(`[${mapMatch[1]}]`);
let fixedCount = 0;
let removedCount = 0;

console.log(`🔍 Scanning ${entries.length} entries for broken examples...\n`);

// Fix broken examples
for (const [id, entry] of entries) {
  if (!entry.examples || !Array.isArray(entry.examples)) continue;
  
  let hasChanges = false;
  const fixedExamples = [];
  
  for (const example of entry.examples) {
    // Skip examples that already have valid trans
    if (example.trans && example.trans.trim()) {
      fixedExamples.push(example);
      continue;
    }
    
    // Try to parse examples with empty trans
    if (example.text && !example.trans) {
      const fullText = example.text;
      const lines = fullText
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
      
      if (lines.length >= 2) {
        // Parse: first line is French, rest is English
        const frenchText = lines[0];
        const englishTranslation = lines.slice(1).join(" ").trim();
        
        if (frenchText && englishTranslation) {
          fixedExamples.push({
            ...example,
            lang: "fr",
            text: frenchText,
            trans: englishTranslation,
          });
          hasChanges = true;
          fixedCount++;
          continue;
        }
      }
      
      // If we can't parse it, skip this example (remove it)
      removedCount++;
      hasChanges = true;
    } else {
      // Already has trans or is properly formatted
      fixedExamples.push(example);
    }
  }
  
  if (hasChanges) {
    entry.examples = fixedExamples;
  }
}

if (fixedCount === 0 && removedCount === 0) {
  console.log("✅ No broken examples found!");
  process.exit(0);
}

console.log(`📊 Fixed ${fixedCount} examples`);
console.log(`🗑️  Removed ${removedCount} examples without translations\n`);

// Rebuild the file
const varMatch = fileContent.match(/export const (\w+) =/);
const varName = varMatch ? varMatch[1] : "nouns";

const entriesString = entries
  .map(([id, data]) => {
    return `  [\n    "${id}",\n    ${JSON.stringify(data, null, 4).replace(/^/gm, "    ")}\n  ]`;
  })
  .join(",\n");

// Reconstruct file
const headerMatch = fileContent.match(/^([\s\S]*?)export const \w+ = new Map\(/);
const header = headerMatch ? headerMatch[1] : `/**
 * Nouns Dictionary
 * Auto-generated
 */

`;

const footerMatch = fileContent.match(/export const \w+ = new Map\(\[[\s\S]*?\]\);\s*([\s\S]*)$/);
const footer = footerMatch ? footerMatch[1] : "\n";

const newContent = `${header}export const ${varName} = new Map([\n${entriesString}\n]);${footer}`;

// Write back
fs.writeFileSync(nounsFile, newContent, "utf8");

console.log(`✅ Fixed nouns.js file`);
console.log(`📝 Total entries: ${entries.length}`);
console.log(`✅ Examples fixed: ${fixedCount}`);
console.log(`🗑️  Examples removed: ${removedCount}`);

