#!/usr/bin/env node

/**
 * Compare Condensed Verbs with Cambridge Dictionary
 *
 * This script compares our condensed verb list with the existing
 * Cambridge verbs dictionary to identify which verbs are already defined.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { verbsCambridge } from "./src/data/dictionary/words/cambridge/verbs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read our condensed verb list
const condensedFile = path.join(__dirname, "condensed-verbs-base-forms.txt");
const condensedContent = fs.readFileSync(condensedFile, "utf8");

// Extract base forms from the file
const lines = condensedContent.split("\n");
const baseForms = [];
let inBaseFormsSection = false;

for (const line of lines) {
  if (line.startsWith("# Base Forms List:")) {
    inBaseFormsSection = true;
    continue;
  }
  if (inBaseFormsSection && line.trim() && !line.startsWith("#")) {
    baseForms.push(line.trim());
  }
  if (line.startsWith("# Detailed Mapping:")) {
    break;
  }
}

console.log(`📊 Found ${baseForms.length} base forms in condensed list`);

// Get all verbs from Cambridge dictionary
const cambridgeVerbs = new Set();
for (const [id, entry] of verbsCambridge) {
  if (entry.word) {
    cambridgeVerbs.add(entry.word.toLowerCase());
  }
}

console.log(`📊 Found ${cambridgeVerbs.size} verbs in Cambridge dictionary`);

// Compare the lists
const alreadyDefined = [];
const trulyUnmet = [];

for (const baseForm of baseForms) {
  if (cambridgeVerbs.has(baseForm.toLowerCase())) {
    alreadyDefined.push(baseForm);
  } else {
    trulyUnmet.push(baseForm);
  }
}

// Create output content
const outputLines = [
  "# Verb Comparison Results",
  `# Generated: ${new Date().toISOString()}`,
  `# Total base forms: ${baseForms.length}`,
  `# Already defined in Cambridge: ${alreadyDefined.length}`,
  `# Truly unmet: ${trulyUnmet.length}`,
  "",
  "## Already Defined in Cambridge Dictionary:",
  ...alreadyDefined.sort(),
  "",
  "## Truly Unmet Verbs:",
  ...trulyUnmet.sort(),
  "",
  "## Summary:",
  `- Already defined: ${alreadyDefined.length} (${(
    (alreadyDefined.length / baseForms.length) *
    100
  ).toFixed(1)}%)`,
  `- Truly unmet: ${trulyUnmet.length} (${(
    (trulyUnmet.length / baseForms.length) *
    100
  ).toFixed(1)}%)`,
  "",
  "## Next Steps:",
  "1. Focus on the truly unmet verbs for dictionary generation",
  "2. The already defined verbs can be skipped",
  "3. Use the truly unmet list to create Cambridge dictionary entries",
];

// Write the output file
const outputFile = path.join(__dirname, "verb-comparison-results.txt");
fs.writeFileSync(outputFile, outputLines.join("\n"), "utf8");

console.log("✅ SUCCESS!");
console.log(`📄 Created: ${outputFile}`);
console.log(
  `📊 Already defined: ${alreadyDefined.length} (${(
    (alreadyDefined.length / baseForms.length) *
    100
  ).toFixed(1)}%)`
);
console.log(
  `📊 Truly unmet: ${trulyUnmet.length} (${(
    (trulyUnmet.length / baseForms.length) *
    100
  ).toFixed(1)}%)`
);

console.log("\n🔤 Already defined verbs:");
alreadyDefined.sort().forEach((verb) => {
  console.log(`  ✅ ${verb}`);
});

console.log("\n🔤 Truly unmet verbs:");
trulyUnmet.sort().forEach((verb) => {
  console.log(`  ❌ ${verb}`);
});

console.log("\n📝 Next steps:");
console.log("1. Review the comparison results");
console.log("2. Focus on the truly unmet verbs for dictionary generation");
console.log("3. Skip the already defined verbs to avoid duplicates");
