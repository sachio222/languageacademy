/**
 * Vocabulary Usage Examples
 * Demonstrates how to use the generated unit vocabulary files
 */

import { unit1Vocabulary } from "./unit1/unit1_vocabulary.js";
import { unit2Vocabulary } from "./unit2/unit2_vocabulary.js";
import { allUnitsVocabulary } from "../../vocabulary/all_units_vocabulary.js";
import { logger } from "../../utils/logger";

logger.log("🎯 Vocabulary Usage Examples\n");

// Example 1: Get all vocabulary from Unit 1
logger.log("📚 Unit 1 - All Vocabulary:");
logger.log(`Total words: ${unit1Vocabulary.metadata.totalVocabulary}`);
logger.log(`Modules: ${Object.keys(unit1Vocabulary.moduleVocabulary).length}`);

// Example 2: Get vocabulary by module
logger.log("\n🔍 Unit 1 - Vocabulary by Module:");
const famousWordsVocab = unit1Vocabulary.getVocabularyByModule(
  "2024-01-01-famous-words"
);
logger.log(`Famous Words module: ${famousWordsVocab.length} words`);
famousWordsVocab.slice(0, 3).forEach((vocab) => {
  logger.log(`  - ${vocab.french}: ${vocab.english}`);
});

// Example 3: Search vocabulary
logger.log('\n🔍 Search for "hello" across Unit 1:');
const helloResults = unit1Vocabulary.searchVocabulary("hello");
helloResults.forEach((result) => {
  logger.log(
    `  - ${result.french}: ${result.english} (${result.moduleTitle})`
  );
});

// Example 4: Get vocabulary in order
logger.log("\n📋 Unit 1 - First 5 words in order:");
const orderedVocab = unit1Vocabulary.getVocabularyInOrder();
orderedVocab.slice(0, 5).forEach((vocab) => {
  logger.log(
    `  ${vocab.vocabularyOrder}. ${vocab.french}: ${vocab.english} (${vocab.moduleTitle})`
  );
});

// Example 5: Get module vocabulary counts
logger.log("\n📊 Unit 1 - Module Vocabulary Counts:");
const moduleCounts = unit1Vocabulary.getModuleVocabularyCounts();
moduleCounts.forEach((module) => {
  logger.log(
    `  ${module.moduleOrder}. ${module.moduleTitle}: ${module.vocabularyCount} words`
  );
});

// Example 6: Search across all units
logger.log('\n🌍 Search "merci" across all units:');
const merciResults = allUnitsVocabulary.searchAllVocabulary("merci");
merciResults.forEach((result) => {
  logger.log(`  - ${result.french}: ${result.english} (${result.unitTitle})`);
});

// Example 7: Get total vocabulary count
logger.log("\n📈 Overall Statistics:");
logger.log(
  `Total vocabulary across all units: ${allUnitsVocabulary.getTotalVocabularyCount()}`
);
logger.log(`Total units: ${allUnitsVocabulary.summary.totalUnits}`);

// Example 8: Get specific unit vocabulary
logger.log("\n📚 Unit 2 Vocabulary:");
const unit2 = allUnitsVocabulary.getUnitVocabulary(2);
logger.log(`Unit 2 has ${unit2.metadata.totalVocabulary} words`);

// Example 9: Find a specific French word across all units
logger.log('\n🔍 Find "bonjour" across all units:');
const bonjourResults = allUnitsVocabulary.getVocabularyByFrench("bonjour");
bonjourResults.forEach((result) => {
  logger.log(`  - Found in ${result.unitTitle}: ${result.english}`);
});

logger.log("\n✅ Examples complete!");
