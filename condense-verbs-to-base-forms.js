#!/usr/bin/env node

/**
 * Condense Verbs to Base Forms (Infinitives)
 *
 * This script extracts verbs from the unmet words list and condenses
 * them to their base forms (infinitives), removing duplicates and variants.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// All verbs from the unmet words list
const verbs = [
  "achèterais",
  "admirer",
  "adore",
  "adorent",
  "aident",
  "aimait",
  "aimerais",
  "allés",
  "amuse",
  "appelle",
  "arrivé",
  "arrivent",
  "arriver",
  "assis",
  "assise",
  "attendent",
  "attire",
  "change",
  "changements",
  "commence",
  "commencé",
  "communiquent",
  "comprenais",
  "connectent",
  "continue",
  "continué",
  "continues",
  "créé",
  "créent",
  "décidé",
  "découvrir",
  "dépêcher",
  "déplacer",
  "deviennent",
  "donnent",
  "écoute",
  "écoutent",
  "embrassant",
  "encourage",
  "enrichissent",
  "essaies",
  "essayé",
  "essayer",
  "étudie",
  "étudient",
  "exportent",
  "fonctionne",
  "habille",
  "habite",
  "habiter",
  "lave",
  "levais",
  "lève",
  "mangions",
  "marcher",
  "monte",
  "montrent",
  "parlions",
  "participe",
  "pensais",
  "pense",
  "pensé",
  "pensent",
  "perdu",
  "permet",
  "plaît",
  "pose",
  "préfèrent",
  "prépare",
  "préserve",
  "regardais",
  "regardent",
  "regrette",
  "renoncerais",
  "rentrant",
  "rentre",
  "rentré",
  "rentrer",
  "reste",
  "restent",
  "rester",
  "restés",
  "retrouvé",
  "réussi",
  "réussisse",
  "réussissions",
  "réveille",
  "réveillé",
  "rêver",
  "révise",
  "revoir",
  "saches",
  "saura",
  "sauras",
  "savais",
  "savait",
  "soutiennent",
  "souviens",
  "su",
  "travaille",
  "travaillent",
  "trouve",
  "trouver",
  "vécu",
  "visitent",
  "vit",
  "vivent",
  "voyagent",
  "voyagerais",
];

// Function to get base form (infinitive) of verb
function getBaseForm(verb) {
  // Handle special cases and irregular verbs
  const specialCases = {
    // Irregular verbs
    achèterais: "acheter",
    aimait: "aimer",
    aimerais: "aimer",
    allés: "aller",
    arrivé: "arriver",
    arrivent: "arriver",
    assis: "asseoir",
    assise: "asseoir",
    attendent: "attendre",
    attire: "attirer",
    change: "changer",
    changements: "changer",
    commence: "commencer",
    commencé: "commencer",
    communiquent: "communiquer",
    comprenais: "comprendre",
    connectent: "connecter",
    continue: "continuer",
    continué: "continuer",
    continues: "continuer",
    créé: "créer",
    créent: "créer",
    décidé: "décider",
    deviennent: "devenir",
    donnent: "donner",
    écoute: "écouter",
    écoutent: "écouter",
    embrassant: "embrasser",
    encourage: "encourager",
    enrichissent: "enrichir",
    essaies: "essayer",
    essayé: "essayer",
    étudie: "étudier",
    étudient: "étudier",
    exportent: "exporter",
    fonctionne: "fonctionner",
    habille: "habiller",
    habite: "habiter",
    lave: "laver",
    levais: "lever",
    lève: "lever",
    mangions: "manger",
    monte: "monter",
    montrent: "montrer",
    parlions: "parler",
    participe: "participer",
    pensais: "penser",
    pense: "penser",
    pensé: "penser",
    pensent: "penser",
    perdu: "perdre",
    permet: "permettre",
    plaît: "plaire",
    pose: "poser",
    préfèrent: "préférer",
    prépare: "préparer",
    préserve: "préserver",
    regardais: "regarder",
    regardent: "regarder",
    regrette: "regretter",
    renoncerais: "renoncer",
    rentrant: "rentrer",
    rentre: "rentrer",
    rentré: "rentrer",
    reste: "rester",
    restent: "rester",
    restés: "rester",
    retrouvé: "retrouver",
    réussi: "réussir",
    réussisse: "réussir",
    réussissions: "réussir",
    réveille: "réveiller",
    réveillé: "réveiller",
    révise: "réviser",
    saches: "savoir",
    saura: "savoir",
    sauras: "savoir",
    savais: "savoir",
    savait: "savoir",
    soutiennent: "soutenir",
    souviens: "se souvenir",
    su: "savoir",
    travaille: "travailler",
    travaillent: "travailler",
    trouve: "trouver",
    vécu: "vivre",
    visitent: "visiter",
    vit: "vivre",
    vivent: "vivre",
    voyagent: "voyager",
    voyagerais: "voyager",
  };

  return specialCases[verb] || verb;
}

// Process verbs to get base forms
const baseForms = new Set();
const verbMapping = {};

for (const verb of verbs) {
  const baseForm = getBaseForm(verb);
  baseForms.add(baseForm);

  if (!verbMapping[baseForm]) {
    verbMapping[baseForm] = [];
  }
  verbMapping[baseForm].push(verb);
}

// Convert to sorted array
const sortedBaseForms = Array.from(baseForms).sort();

// Create output content
const outputLines = [
  "# Condensed Verbs - Base Forms (Infinitives)",
  `# Generated: ${new Date().toISOString()}`,
  `# Total base forms: ${sortedBaseForms.length}`,
  `# Original verbs: ${verbs.length}`,
  "",
  "# Base Forms List:",
  ...sortedBaseForms,
  "",
  "# Detailed Mapping:",
  "",
];

// Add detailed mapping
for (const baseForm of sortedBaseForms) {
  const variants = verbMapping[baseForm];
  outputLines.push(`## ${baseForm}`);
  outputLines.push(`Variants: ${variants.join(", ")}`);
  outputLines.push(`Count: ${variants.length}`);
  outputLines.push("");
}

// Write the output file
const outputFile = path.join(__dirname, "condensed-verbs-base-forms.txt");
fs.writeFileSync(outputFile, outputLines.join("\n"), "utf8");

console.log("✅ SUCCESS!");
console.log(`📄 Created: ${outputFile}`);
console.log(`📊 Original verbs: ${verbs.length}`);
console.log(`📊 Base forms: ${sortedBaseForms.length}`);
console.log(
  `📊 Reduction: ${(
    ((verbs.length - sortedBaseForms.length) / verbs.length) *
    100
  ).toFixed(1)}%`
);

console.log("\n🔤 Base forms:");
sortedBaseForms.forEach((baseForm) => {
  const variants = verbMapping[baseForm];
  console.log(
    `  ${baseForm} (${variants.length} variants: ${variants.join(", ")})`
  );
});

console.log("\n📝 Next steps:");
console.log("1. Review the condensed list");
console.log("2. Use these base forms to create Cambridge dictionary entries");
console.log("3. The generator can handle conjugations automatically");
