#!/usr/bin/env node

/**
 * Reading Words Unmet - Categorized Arrays
 * Contains 190 words from reading passages that lack Cambridge dictionary definitions
 * Organized by parts of speech for dictionary generation
 */

// NOUNS (98 words)
const nouns = [
  "abord", "arc", "artistes", "changements", 
  "château", "citoyens", "coq", "crédit", "dame", "destinations", 
  "diplomates", "directions", "efforts", "entreprises", "entrée", 
  "expériences", "face", "films", "flore", 
  "habitants", "habitude", "homologues", "idées", 
  "influence", "informations", "jardin", "journées", "langues", "leçons", 
  "lieues", "lieux", "ligne", "lumières", 
  "mers", "midi", "millions", "minutes", "mois", 
"mont", "monuments", "moulin", "musique", "musée", 
  "mémoire", "nice", "organisations", "paix", 
  "peintres", "peintures", "peur", "phrases", "produits", 
  "quartiers", "questions", "relations",  "saint", 
  "samedis", "sandwichs", "secteurs", "seine", "sens", 
  "suite", "surprise", "tables", "tour", "touristes", "transports", "triomphe", 
  "téléphones", "universités", "uvres", "valeurs", "van", "venue", "verne", 
  "vies", "villes", "visiteurs", "voyageurs", "vue", "week", 
  "école", "écoles", "éditeurs", "époque", "étrangers", "étrangères", 
  "études", "étudiants", "aujourd", "compte", "comte"
];

// VERBS (66 words)
const verbs = [
  "achèterais", "aimait", "aimerais", "allés", "assis", "assise", "attendent", 
  "brillaient", "combine", "commandé", "comprenais", "connais", "continue", 
  "continues", "continué", "contributions", "deviennent", "discutent", "donnent", 
  "embrassant", "essaies", "faut", "lève", "mangions", "pensais", "pense", 
  "pensent", "pensé", "permet", "renoncerais", "rentrant", "restés", "réussisse", 
  "révise", "saches", "saura", "sauras", "savais", "savait", "souviens", "su", 
  "travaille", "travaillent", "vus", "écoute", "écoutent", "étudie", "étudient", 
  "voyagerais", "parlions", "croit"
];

// ADJECTIVES (10 words)
const adjectives = [
  "collective", "culturelles", "dernière", "européennes", "essentielles", 
  "heureuse", "plusieurs", "primaire", "quotidienne", "unième"
];

// ADVERBS (3 words)
const adverbs = [
  "abord", "hui", "plusieurs"
];

// PROPER NOUNS/NAMES (8 words)
const properNouns = [
];

// INTERJECTIONS (1 word)
const interjections = [
  "oh"
];

// Export all arrays
export {
  nouns,
  verbs,
  adjectives,
  adverbs,
  properNouns,
  interjections
};

// Create batches of 20 words for dictionary generation
function createBatches(words, partOfSpeech, batchSize = 20) {
  const batches = [];
  for (let i = 0; i < words.length; i += batchSize) {
    const batch = words.slice(i, i + batchSize);
    const batchNumber = Math.floor(i / batchSize) + 1;
    batches.push({
      batchNumber,
      partOfSpeech,
      words: batch,
      count: batch.length
    });
  }
  return batches;
}

// Generate all batches
const nounBatches = createBatches(nouns, "noun");
const verbBatches = createBatches(verbs, "verb");
const adjectiveBatches = createBatches(adjectives, "adjective");
const adverbBatches = createBatches(adverbs, "adverb");
const properNounBatches = createBatches(properNouns, "proper_noun");
const interjectionBatches = createBatches(interjections, "interjection");

// Combine all batches
const allBatches = [
  ...nounBatches,
  ...verbBatches,
  ...adjectiveBatches,
  ...adverbBatches,
  ...properNounBatches,
  ...interjectionBatches
];

// Export batches
export { allBatches, nounBatches, verbBatches, adjectiveBatches, adverbBatches, properNounBatches, interjectionBatches };

// Summary statistics
console.log("📊 Reading Words Unmet - Categorized Arrays");
console.log(`  Nouns: ${nouns.length} (${nounBatches.length} batches)`);
console.log(`  Verbs: ${verbs.length} (${verbBatches.length} batches)`);
console.log(`  Adjectives: ${adjectives.length} (${adjectiveBatches.length} batches)`);
console.log(`  Adverbs: ${adverbs.length} (${adverbBatches.length} batches)`);
console.log(`  Proper Nouns: ${properNouns.length} (${properNounBatches.length} batches)`);
console.log(`  Interjections: ${interjections.length} (${interjectionBatches.length} batches)`);
console.log(`  Total: ${nouns.length + verbs.length + adjectives.length + adverbs.length + properNouns.length + interjections.length}`);
console.log(`  Total Batches: ${allBatches.length}`);

// Display batch details
console.log("\n📦 BATCH DETAILS:");
allBatches.forEach((batch, index) => {
  console.log(`  Batch ${index + 1}: ${batch.partOfSpeech} (${batch.count} words)`);
  console.log(`    Words: ${batch.words.slice(0, 5).join(", ")}${batch.words.length > 5 ? "..." : ""}`);
});
