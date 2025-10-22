#!/usr/bin/env node

/**
 * Extract all words from nouns.js and analyze for misclassifications
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the nouns file
const nounsPath = path.join(__dirname, "src/data/dictionary/words/nouns.js");
const content = fs.readFileSync(nounsPath, "utf8");

// Extract all words using regex - handle both quoted and unquoted formats
const wordMatches = content.match(/(?:word:\s*"([^"]+)"|"word":\s*"([^"]+)")/g);
const words = wordMatches
  ? wordMatches
      .map((match) => {
        // Try both patterns
        const quotedMatch = match.match(/word:\s*"([^"]+)"/);
        const jsonMatch = match.match(/"word":\s*"([^"]+)"/);
        return quotedMatch ? quotedMatch[1] : jsonMatch ? jsonMatch[1] : null;
      })
      .filter(Boolean)
  : [];

console.log(`Found ${words.length} words in nouns.js`);
console.log("\nAll words:");
words.forEach((word, index) => {
  console.log(`${index + 1}. ${word}`);
});

// Common non-noun words to check for
const commonNonNouns = {
  // Adverbs
  adverbs: [
    "très",
    "beaucoup",
    "peu",
    "assez",
    "bien",
    "mal",
    "vite",
    "souvent",
    "maintenant",
    "hier",
    "aujourd'hui",
    "demain",
    "déjà",
    "encore",
    "bientôt",
    "tard",
    "tôt",
    "aussi",
    "vraiment",
    "sérieusement",
    "complètement",
    "partiellement",
    "totalement",
    "absolument",
    "relativement",
    "exactement",
    "presque",
    "environ",
    "maintenant",
    "hier",
    "aujourd'hui",
    "demain",
    "avant",
    "après",
    "pendant",
    "depuis",
    "jusqu'à",
    "vers",
  ],

  // Conjunctions
  conjunctions: [
    "et",
    "ou",
    "mais",
    "donc",
    "car",
    "ni",
    "or",
    "si",
    "quand",
    "où",
    "comment",
    "pourquoi",
    "combien",
    "qui",
    "que",
    "dont",
    "lequel",
    "laquelle",
    "lesquels",
    "lesquelles",
  ],

  // Prepositions
  prepositions: [
    "dans",
    "sur",
    "sous",
    "avec",
    "sans",
    "pour",
    "par",
    "de",
    "du",
    "des",
    "à",
    "au",
    "aux",
    "en",
    "chez",
    "entre",
    "pendant",
    "depuis",
    "vers",
    "jusqu'à",
    "avant",
    "après",
    "pendant",
    "durant",
    "devant",
    "derrière",
    "à côté",
    "loin",
    "près",
    "autour",
    "parmi",
    "selon",
    "malgré",
    "sauf",
    "excepté",
  ],

  // Pronouns
  pronouns: [
    "je",
    "tu",
    "il",
    "elle",
    "nous",
    "vous",
    "ils",
    "elles",
    "me",
    "te",
    "se",
    "nous",
    "vous",
    "se",
    "moi",
    "toi",
    "lui",
    "elle",
    "nous",
    "vous",
    "eux",
    "elles",
    "mon",
    "ma",
    "mes",
    "ton",
    "ta",
    "tes",
    "son",
    "sa",
    "ses",
    "notre",
    "nos",
    "votre",
    "vos",
    "leur",
    "leurs",
    "ce",
    "cette",
    "ces",
    "cet",
    "un",
    "une",
    "le",
    "la",
    "les",
    "des",
    "du",
    "de",
    "d'",
  ],

  // Verbs (common ones)
  verbs: [
    "manger",
    "boire",
    "dormir",
    "travailler",
    "étudier",
    "apprendre",
    "enseigner",
    "écouter",
    "regarder",
    "lire",
    "écrire",
    "parler",
    "chanter",
    "danser",
    "jouer",
    "nager",
    "courir",
    "marcher",
    "conduire",
    "voler",
    "acheter",
    "vendre",
    "payer",
    "coûter",
    "gagner",
    "perdre",
    "trouver",
    "chercher",
    "donner",
    "prendre",
    "mettre",
    "porter",
    "ouvrir",
    "fermer",
    "commencer",
    "finir",
    "continuer",
    "arrêter",
  ],

  // Adjectives
  adjectives: [
    "grand",
    "grande",
    "petit",
    "petite",
    "beau",
    "belle",
    "joli",
    "jolie",
    "vieux",
    "vieille",
    "jeune",
    "nouveau",
    "nouvelle",
    "bon",
    "bonne",
    "mauvais",
    "mauvaise",
    "facile",
    "difficile",
    "intéressant",
    "ennuyeux",
    "heureux",
    "triste",
    "content",
    "fâché",
    "riche",
    "pauvre",
    "cher",
    "rapide",
    "lent",
    "fort",
    "faible",
    "chaud",
    "froid",
    "doux",
    "amer",
    "sucré",
    "salé",
    "épicé",
  ],

  // Interjections/Expressions
  interjections: [
    "merci",
    "voilà",
    "voici",
    "tiens",
    "ah",
    "oh",
    "eh",
    "hein",
    "n'est-ce pas",
    "d'accord",
    "bien sûr",
    "peut-être",
    "sûrement",
    "certainement",
    "probablement",
    "évidemment",
    "naturellement",
    "malheureusement",
    "heureusement",
  ],
};

// Check for misclassified words
console.log("\n=== CHECKING FOR MISCLASSIFIED WORDS ===\n");

const misclassified = {
  adverbs: [],
  conjunctions: [],
  prepositions: [],
  pronouns: [],
  verbs: [],
  adjectives: [],
  interjections: [],
};

// Check each word against our lists
words.forEach((word) => {
  Object.keys(commonNonNouns).forEach((category) => {
    if (commonNonNouns[category].includes(word)) {
      misclassified[category].push(word);
    }
  });
});

// Report findings
Object.keys(misclassified).forEach((category) => {
  if (misclassified[category].length > 0) {
    console.log(
      `${category.toUpperCase()} (${misclassified[category].length} found):`
    );
    misclassified[category].forEach((word) => console.log(`  - ${word}`));
    console.log("");
  }
});

// Summary
const totalMisclassified = Object.values(misclassified).reduce(
  (sum, arr) => sum + arr.length,
  0
);
console.log(`\n=== SUMMARY ===`);
console.log(`Total words in nouns.js: ${words.length}`);
console.log(`Total potentially misclassified: ${totalMisclassified}`);
console.log(
  `Percentage misclassified: ${(
    (totalMisclassified / words.length) *
    100
  ).toFixed(1)}%`
);

// Save the word list to a file for easy review
const outputPath = path.join(__dirname, "nouns-words-list.txt");
fs.writeFileSync(outputPath, words.join("\n"));
console.log(`\nWord list saved to: ${outputPath}`);

// Create misclassified words list
const misclassifiedWords = [];
Object.keys(misclassified).forEach((category) => {
  misclassified[category].forEach((word) => {
    misclassifiedWords.push(`${word} (${category})`);
  });
});

// Save misclassified words to a separate file
const misclassifiedPath = path.join(__dirname, "nouns-misclassified-words.txt");
fs.writeFileSync(misclassifiedPath, misclassifiedWords.join("\n"));
console.log(`Misclassified words saved to: ${misclassifiedPath}`);
console.log(`\nMisclassified words (${misclassifiedWords.length}):`);
misclassifiedWords.forEach((word) => console.log(`  - ${word}`));
