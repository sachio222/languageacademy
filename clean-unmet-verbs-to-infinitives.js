#!/usr/bin/env node

/**
 * Clean Unmet Verbs to True Infinitives
 *
 * This script takes the truly unmet verbs and properly converts them
 * to their infinitive forms, removing conjugated forms.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the comparison results to get truly unmet verbs
const comparisonFile = path.join(__dirname, "verb-comparison-results.txt");
const comparisonContent = fs.readFileSync(comparisonFile, "utf8");

// Extract truly unmet verbs from the file
const lines = comparisonContent.split("\n");
const trulyUnmet = [];
let inUnmetSection = false;

for (const line of lines) {
  if (line.startsWith("## Truly Unmet Verbs:")) {
    inUnmetSection = true;
    continue;
  }
  if (
    inUnmetSection &&
    line.trim() &&
    !line.startsWith("#") &&
    !line.startsWith("-")
  ) {
    if (line.startsWith("❌ ")) {
      trulyUnmet.push(line.replace("❌ ", "").trim());
    } else if (line.trim() && !line.startsWith("##")) {
      trulyUnmet.push(line.trim());
    }
  }
  if (line.startsWith("## Summary:")) {
    break;
  }
}

console.log(`📊 Found ${trulyUnmet.length} truly unmet verbs`);

// Function to convert to proper infinitive
function getInfinitive(verb) {
  // Handle special cases and irregular verbs
  const specialCases = {
    // Conjugated forms that need to be converted to infinitives
    adore: "adorer",
    adorent: "adorer",
    aident: "aider",
    amuse: "amuser",
    appelle: "appeler",
    arrivent: "arriver",
    attendent: "attendre",
    attire: "attirer",
    change: "changer",
    commence: "commencer",
    communiquent: "communiquer",
    connectent: "connecter",
    créent: "créer",
    décident: "décider",
    découvrent: "découvrir",
    déplacent: "déplacer",
    dépêchent: "dépêcher",
    embrassent: "embrasser",
    encouragent: "encourager",
    enrichissent: "enrichir",
    essaient: "essayer",
    exportent: "exporter",
    fonctionnent: "fonctionner",
    habillent: "habiller",
    habitent: "habiter",
    lavent: "laver",
    lèvent: "lever",
    marchent: "marcher",
    montent: "monter",
    montrent: "montrer",
    participent: "participer",
    perdent: "perdre",
    permettent: "permettre",
    plaisent: "plaire",
    posent: "poser",
    préfèrent: "préférer",
    préparent: "préparer",
    préservent: "préserver",
    regardent: "regarder",
    regrettent: "regretter",
    renoncent: "renoncer",
    rentrent: "rentrer",
    restent: "rester",
    retrouvent: "retrouver",
    revoient: "revoir",
    réussissent: "réussir",
    réveillent: "réveiller",
    rêvent: "rêver",
    souviens: "se souvenir",
    soutiennent: "soutenir",
    trouvent: "trouver",
    visitent: "visiter",
    vivent: "vivre",
    voyagent: "voyager",
    écoutent: "écouter",
  };

  return specialCases[verb] || verb;
}

// Process verbs to get proper infinitives
const infinitives = new Set();
const verbMapping = {};

for (const verb of trulyUnmet) {
  const infinitive = getInfinitive(verb);
  infinitives.add(infinitive);

  if (!verbMapping[infinitive]) {
    verbMapping[infinitive] = [];
  }
  verbMapping[infinitive].push(verb);
}

// Convert to sorted array
const sortedInfinitives = Array.from(infinitives).sort();

// Create output content
const outputLines = [
  "# Cleaned Unmet Verbs - True Infinitives",
  `# Generated: ${new Date().toISOString()}`,
  `# Total infinitives: ${sortedInfinitives.length}`,
  `# Original unmet verbs: ${trulyUnmet.length}`,
  "",
  "# True Infinitives List:",
  ...sortedInfinitives,
  "",
  "# Detailed Mapping:",
  "",
];

// Add detailed mapping
for (const infinitive of sortedInfinitives) {
  const variants = verbMapping[infinitive];
  outputLines.push(`## ${infinitive}`);
  outputLines.push(`Original forms: ${variants.join(", ")}`);
  outputLines.push(`Count: ${variants.length}`);
  outputLines.push("");
}

// Write the output file
const outputFile = path.join(__dirname, "cleaned-unmet-verbs-infinitives.txt");
fs.writeFileSync(outputFile, outputLines.join("\n"), "utf8");

console.log("✅ SUCCESS!");
console.log(`📄 Created: ${outputFile}`);
console.log(`📊 Original unmet verbs: ${trulyUnmet.length}`);
console.log(`📊 True infinitives: ${sortedInfinitives.length}`);
console.log(
  `📊 Reduction: ${(
    ((trulyUnmet.length - sortedInfinitives.length) / trulyUnmet.length) *
    100
  ).toFixed(1)}%`
);

console.log("\n🔤 True infinitives:");
sortedInfinitives.forEach((infinitive) => {
  const variants = verbMapping[infinitive];
  console.log(`  ${infinitive} (from: ${variants.join(", ")})`);
});

console.log("\n📝 Next steps:");
console.log("1. Review the cleaned infinitive list");
console.log(
  "2. Use these true infinitives to create Cambridge dictionary entries"
);
console.log("3. The generator can handle conjugations automatically");
