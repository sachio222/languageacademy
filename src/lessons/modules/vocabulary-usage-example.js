/**
 * Vocabulary Usage Examples
 * Demonstrates how to use the generated unit vocabulary files
 */

import { unit1Vocabulary } from "./unit1/unit1_vocabulary.js";
import { unit2Vocabulary } from "./unit2/unit2_vocabulary.js";
import { allUnitsVocabulary } from "../../vocabulary/all_units_vocabulary.js";

console.log("🎯 Vocabulary Usage Examples\n");

// Example 1: Get all vocabulary from Unit 1
console.log("📚 Unit 1 - All Vocabulary:");
console.log(`Total words: ${unit1Vocabulary.metadata.totalVocabulary}`);
console.log(`Modules: ${Object.keys(unit1Vocabulary.moduleVocabulary).length}`);

// Example 2: Get vocabulary by module
console.log("\n🔍 Unit 1 - Vocabulary by Module:");
const famousWordsVocab = unit1Vocabulary.getVocabularyByModule(
  "2024-01-01-famous-words"
);
console.log(`Famous Words module: ${famousWordsVocab.length} words`);
famousWordsVocab.slice(0, 3).forEach((vocab) => {
  console.log(`  - ${vocab.french}: ${vocab.english}`);
});

// Example 3: Search vocabulary
console.log('\n🔍 Search for "hello" across Unit 1:');
const helloResults = unit1Vocabulary.searchVocabulary("hello");
helloResults.forEach((result) => {
  console.log(
    `  - ${result.french}: ${result.english} (${result.moduleTitle})`
  );
});

// Example 4: Get vocabulary in order
console.log("\n📋 Unit 1 - First 5 words in order:");
const orderedVocab = unit1Vocabulary.getVocabularyInOrder();
orderedVocab.slice(0, 5).forEach((vocab) => {
  console.log(
    `  ${vocab.vocabularyOrder}. ${vocab.french}: ${vocab.english} (${vocab.moduleTitle})`
  );
});

// Example 5: Get module vocabulary counts
console.log("\n📊 Unit 1 - Module Vocabulary Counts:");
const moduleCounts = unit1Vocabulary.getModuleVocabularyCounts();
moduleCounts.forEach((module) => {
  console.log(
    `  ${module.moduleOrder}. ${module.moduleTitle}: ${module.vocabularyCount} words`
  );
});

// Example 6: Search across all units
console.log('\n🌍 Search "merci" across all units:');
const merciResults = allUnitsVocabulary.searchAllVocabulary("merci");
merciResults.forEach((result) => {
  console.log(`  - ${result.french}: ${result.english} (${result.unitTitle})`);
});

// Example 7: Get total vocabulary count
console.log("\n📈 Overall Statistics:");
console.log(
  `Total vocabulary across all units: ${allUnitsVocabulary.getTotalVocabularyCount()}`
);
console.log(`Total units: ${allUnitsVocabulary.summary.totalUnits}`);

// Example 8: Get specific unit vocabulary
console.log("\n📚 Unit 2 Vocabulary:");
const unit2 = allUnitsVocabulary.getUnitVocabulary(2);
console.log(`Unit 2 has ${unit2.metadata.totalVocabulary} words`);

// Example 9: Find a specific French word across all units
console.log('\n🔍 Find "bonjour" across all units:');
const bonjourResults = allUnitsVocabulary.getVocabularyByFrench("bonjour");
bonjourResults.forEach((result) => {
  console.log(`  - Found in ${result.unitTitle}: ${result.english}`);
});

console.log("\n✅ Examples complete!");
