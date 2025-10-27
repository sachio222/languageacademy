#!/usr/bin/env node

/**
 * Condense Adjectives to Base Forms
 *
 * This script extracts adjectives from the unmet words list and condenses
 * them to their base forms, removing duplicates and variants.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adjectives from the unmet words list
const adjectives = [
  "célèbre",
  "célèbres",
  "collective",
  "culinaires",
  "culturelles",
  "dernière",
  "différente",
  "différentes",
  "dur",
  "essentielles",
  "européennes",
  "excellente",
  "française",
  "françaises",
  "froid",
  "heureuse",
  "heureux",
  "important",
  "importante",
  "importantes",
  "importants",
  "impressionnistes",
  "inoubliables",
  "internationale",
  "magnifiques",
  "parfaite",
  "populaires",
  "publics",
  "quotidienne",
  "reconnaissante",
  "reconnu",
  "riche",
  "sûr",
  "traditionnels",
];

// Function to get base form of adjective
function getBaseForm(adjective) {
  // Remove common endings to get base form
  let base = adjective;

  // Remove plural endings
  if (base.endsWith("s") && base.length > 3) {
    base = base.slice(0, -1);
  }

  // Remove feminine endings
  if (base.endsWith("e") && base.length > 3) {
    base = base.slice(0, -1);
  }

  // Handle special cases
  const specialCases = {
    célèbres: "célèbre",
    différentes: "différent",
    essentielles: "essentiel",
    européennes: "européen",
    françaises: "français",
    importantes: "important",
    importants: "important",
    impressionnistes: "impressionniste",
    inoubliables: "inoubliable",
    magnifiques: "magnifique",
    populaires: "populaire",
    publics: "public",
    traditionnels: "traditionnel",
    reconnaissante: "reconnaissant",
    reconnu: "reconnu", // past participle, keep as is
    dernière: "dernier",
    différente: "différent",
    excellente: "excellent",
    française: "français",
    heureuse: "heureux",
    importante: "important",
    internationale: "international",
    parfaite: "parfait",
    quotidienne: "quotidien",
  };

  return specialCases[adjective] || base;
}

// Process adjectives to get base forms
const baseForms = new Set();
const adjectiveMapping = {};

for (const adjective of adjectives) {
  const baseForm = getBaseForm(adjective);
  baseForms.add(baseForm);

  if (!adjectiveMapping[baseForm]) {
    adjectiveMapping[baseForm] = [];
  }
  adjectiveMapping[baseForm].push(adjective);
}

// Convert to sorted array
const sortedBaseForms = Array.from(baseForms).sort();

// Create output content
const outputLines = [
  "# Condensed Adjectives - Base Forms",
  `# Generated: ${new Date().toISOString()}`,
  `# Total base forms: ${sortedBaseForms.length}`,
  `# Original adjectives: ${adjectives.length}`,
  "",
  "# Base Forms List:",
  ...sortedBaseForms,
  "",
  "# Detailed Mapping:",
  "",
];

// Add detailed mapping
for (const baseForm of sortedBaseForms) {
  const variants = adjectiveMapping[baseForm];
  outputLines.push(`## ${baseForm}`);
  outputLines.push(`Variants: ${variants.join(", ")}`);
  outputLines.push(`Count: ${variants.length}`);
  outputLines.push("");
}

// Write the output file
const outputFile = path.join(__dirname, "condensed-adjectives-base-forms.txt");
fs.writeFileSync(outputFile, outputLines.join("\n"), "utf8");

console.log("✅ SUCCESS!");
console.log(`📄 Created: ${outputFile}`);
console.log(`📊 Original adjectives: ${adjectives.length}`);
console.log(`📊 Base forms: ${sortedBaseForms.length}`);
console.log(
  `📊 Reduction: ${(
    ((adjectives.length - sortedBaseForms.length) / adjectives.length) *
    100
  ).toFixed(1)}%`
);

console.log("\n🔤 Base forms:");
sortedBaseForms.forEach((baseForm) => {
  const variants = adjectiveMapping[baseForm];
  console.log(
    `  ${baseForm} (${variants.length} variants: ${variants.join(", ")})`
  );
});

console.log("\n📝 Next steps:");
console.log("1. Review the condensed list");
console.log("2. Use these base forms to create Cambridge dictionary entries");
console.log("3. The generator can handle gender/number variants automatically");
