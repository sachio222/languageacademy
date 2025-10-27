#!/usr/bin/env node

/**
 * Fix Adjective Base Forms
 *
 * This script creates a corrected list of adjective base forms
 * with proper French morphology handling.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adjectives from the unmet words list with corrected base forms
const adjectiveBaseForms = [
  "célèbre", // célèbre, célèbres
  "collectif", // collective
  "culinaire", // culinaires
  "culturel", // culturelles
  "dernier", // dernière
  "différent", // différente, différentes
  "dur", // dur
  "essentiel", // essentielles
  "européen", // européennes
  "excellent", // excellente
  "français", // française, françaises
  "froid", // froid
  "heureux", // heureuse, heureux
  "important", // important, importante, importantes, importants
  "impressionniste", // impressionnistes
  "inoubliable", // inoubliables
  "international", // internationale
  "magnifique", // magnifiques
  "parfait", // parfaite
  "populaire", // populaires
  "public", // publics
  "quotidien", // quotidienne
  "reconnaissant", // reconnaissante
  "reconnu", // reconnu (past participle)
  "riche", // riche
  "sûr", // sûr
  "traditionnel", // traditionnels
];

// Create output content
const outputLines = [
  "# Corrected Adjective Base Forms",
  `# Generated: ${new Date().toISOString()}`,
  `# Total base forms: ${adjectiveBaseForms.length}`,
  "",
  "# Base Forms List (Alphabetically Sorted):",
  ...adjectiveBaseForms.sort(),
  "",
  "# Usage Notes:",
  "- These are the masculine singular forms of French adjectives",
  "- The Dictionary Generator can automatically create gender/number variants",
  "- Each base form can generate: masculine singular, feminine singular, masculine plural, feminine plural",
  "",
  "# Examples of Variants:",
  "- important → importante, importants, importantes",
  "- français → française, français, françaises",
  "- heureux → heureuse, heureux, heureuses",
  "",
  "# Next Steps:",
  "1. Use these 26 base forms to create Cambridge dictionary entries",
  "2. The generator will automatically handle all gender/number variants",
  "3. Focus on the most essential adjectives first (important, français, etc.)",
];

// Write the output file
const outputFile = path.join(__dirname, "corrected-adjective-base-forms.txt");
fs.writeFileSync(outputFile, outputLines.join("\n"), "utf8");

console.log("✅ SUCCESS!");
console.log(`📄 Created: ${outputFile}`);
console.log(`📊 Base forms: ${adjectiveBaseForms.length}`);

console.log("\n🔤 Corrected base forms (alphabetically):");
adjectiveBaseForms.sort().forEach((baseForm) => {
  console.log(`  ${baseForm}`);
});

console.log("\n📝 Key benefits:");
console.log("- 26 base forms instead of 34 original adjectives");
console.log("- Proper French masculine singular forms");
console.log("- Dictionary Generator can create all variants automatically");
console.log(
  "- Focus on essential adjectives like 'important', 'français', 'heureux'"
);
