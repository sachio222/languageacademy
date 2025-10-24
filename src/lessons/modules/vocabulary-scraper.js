/**
 * Unit Vocabulary Scraper
 * Scrapes vocabulary from all units and modules, organizing by unit and module
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import all unit configs
import { unit1Config } from "./unit1/unit-config.js";
import { unit2Config } from "./unit2/unit-config.js";
import { unit3Config } from "./unit3/unit-config.js";
import { unit4Config } from "./unit4/unit-config.js";
import { unit5Config } from "./unit5/unit-config.js";
import { unit6Config } from "./unit6/unit-config.js";
import { unit7Config } from "./unit7/unit-config.js";
import { unit8Config } from "./unit8/unit-config.js";
import { unit9Config } from "./unit9/unit-config.js";
import { unit10Config } from "./unit10/unit-config.js";
import { unit11Config } from "./unit11/unit-config.js";
import { unit12Config } from "./unit12/unit-config.js";
import { referenceConfig } from "./reference/unit-config.js";

const unitConfigs = [
  unit1Config,
  unit2Config,
  unit3Config,
  unit4Config,
  unit5Config,
  unit6Config,
  unit7Config,
  unit8Config,
  unit9Config,
  unit10Config,
  unit11Config,
  unit12Config,
  referenceConfig,
];

/**
 * Extract vocabulary from a module
 */
function extractVocabularyFromModule(module, moduleIndex) {
  if (
    !module.vocabularyReference ||
    !Array.isArray(module.vocabularyReference)
  ) {
    return [];
  }

  return module.vocabularyReference.map((vocab, vocabIndex) => ({
    french: vocab.french,
    english: vocab.english,
    note: vocab.note || "",
    moduleKey: module.moduleKey,
    moduleTitle: module.title,
    moduleOrder: moduleIndex + 1,
    vocabularyOrder: vocabIndex + 1,
  }));
}

/**
 * Process a single unit
 */
function processUnit(unitConfig, unitIndex) {
  const unitNumber = unitIndex + 1;
  const unitTitle = unitConfig.metadata.title;
  const unitDescription = unitConfig.metadata.description;
  const unitIcon = unitConfig.metadata.icon;
  const unitColor = unitConfig.metadata.color;

  console.log(`\n📚 Processing ${unitTitle}...`);

  const allVocabulary = [];
  const moduleVocabulary = {};

  unitConfig.modules.forEach((module, moduleIndex) => {
    const moduleVocab = extractVocabularyFromModule(module, moduleIndex);

    if (moduleVocab.length > 0) {
      allVocabulary.push(...moduleVocab);
      moduleVocabulary[module.moduleKey] = {
        moduleTitle: module.title,
        moduleOrder: moduleIndex + 1,
        vocabulary: moduleVocab,
      };
      console.log(`  ✅ ${module.title}: ${moduleVocab.length} words`);
    } else {
      console.log(`  ⚠️  ${module.title}: No vocabulary found`);
    }
  });

  return {
    unitNumber,
    unitTitle,
    unitDescription,
    unitIcon,
    unitColor,
    totalVocabulary: allVocabulary.length,
    allVocabulary,
    moduleVocabulary,
  };
}

/**
 * Generate unit vocabulary file
 */
function generateUnitVocabularyFile(unitData) {
  const {
    unitNumber,
    unitTitle,
    unitDescription,
    unitIcon,
    unitColor,
    totalVocabulary,
    allVocabulary,
    moduleVocabulary,
  } = unitData;

  let content = `/**
 * Unit ${unitNumber} Vocabulary
 * ${unitTitle}
 * 
 * Total vocabulary: ${totalVocabulary} words
 * Generated: ${new Date().toISOString()}
 */

export const unit${unitNumber}Vocabulary = {
  metadata: {
    unitNumber: ${unitNumber},
    title: "${unitTitle}",
    description: "${unitDescription}",
    icon: "${unitIcon}",
    color: "${unitColor}",
    totalVocabulary: ${totalVocabulary},
  },

  // All vocabulary from this unit (ordered by module, then by appearance)
  allVocabulary: ${JSON.stringify(allVocabulary, null, 2)},

  // Vocabulary organized by module
  moduleVocabulary: ${JSON.stringify(moduleVocabulary, null, 2)},

  // Helper functions for filtering and searching
  getVocabularyByModule: function(moduleKey) {
    return this.moduleVocabulary[moduleKey]?.vocabulary || [];
  },

  getVocabularyByModuleOrder: function(moduleOrder) {
    const module = Object.values(this.moduleVocabulary).find(m => m.moduleOrder === moduleOrder);
    return module?.vocabulary || [];
  },

  searchVocabulary: function(searchTerm) {
    const term = searchTerm.toLowerCase();
    return this.allVocabulary.filter(vocab => 
      vocab.french.toLowerCase().includes(term) ||
      vocab.english.toLowerCase().includes(term) ||
      vocab.note.toLowerCase().includes(term)
    );
  },

  getVocabularyByFrench: function(french) {
    return this.allVocabulary.find(vocab => vocab.french === french);
  },

  getVocabularyByEnglish: function(english) {
    return this.allVocabulary.filter(vocab => vocab.english === english);
  },

  // Get vocabulary in order of appearance within the unit
  getVocabularyInOrder: function() {
    return this.allVocabulary.sort((a, b) => {
      if (a.moduleOrder !== b.moduleOrder) {
        return a.moduleOrder - b.moduleOrder;
      }
      return a.vocabularyOrder - b.vocabularyOrder;
    });
  },

  // Get unique French words (in case of duplicates)
  getUniqueFrenchWords: function() {
    const seen = new Set();
    return this.allVocabulary.filter(vocab => {
      if (seen.has(vocab.french)) {
        return false;
      }
      seen.add(vocab.french);
      return true;
    });
  },

  // Get vocabulary count by module
  getModuleVocabularyCounts: function() {
    return Object.entries(this.moduleVocabulary).map(([moduleKey, data]) => ({
      moduleKey,
      moduleTitle: data.moduleTitle,
      moduleOrder: data.moduleOrder,
      vocabularyCount: data.vocabulary.length,
    }));
  },
};

// Export individual module vocabularies for easier access
${Object.entries(moduleVocabulary)
  .map(([moduleKey, data], index) => {
    const moduleName = `module${index + 1}Vocabulary`;
    return `export const ${moduleName} = ${JSON.stringify(
      data.vocabulary,
      null,
      2
    )};`;
  })
  .join("\n")}
`;

  return content;
}

/**
 * Generate summary file with all units
 */
function generateSummaryFile(allUnitData) {
  const summary = {
    totalUnits: allUnitData.length,
    totalVocabulary: allUnitData.reduce(
      (sum, unit) => sum + unit.totalVocabulary,
      0
    ),
    units: allUnitData.map((unit) => ({
      unitNumber: unit.unitNumber,
      title: unit.unitTitle,
      description: unit.unitDescription,
      icon: unit.unitIcon,
      color: unit.unitColor,
      totalVocabulary: unit.totalVocabulary,
      moduleCount: Object.keys(unit.moduleVocabulary).length,
    })),
  };

  let content = `/**
 * All Units Vocabulary Summary
 * Complete overview of vocabulary across all units
 * 
 * Generated: ${new Date().toISOString()}
 */

export const vocabularySummary = ${JSON.stringify(summary, null, 2)};

// Import all unit vocabularies
${allUnitData
  .map((unit) => {
    if (unit.unitNumber === 13) {
      return `import { unit${unit.unitNumber}Vocabulary } from '../lessons/modules/reference/unit${unit.unitNumber}_vocabulary.js';`;
    } else {
      return `import { unit${unit.unitNumber}Vocabulary } from '../lessons/modules/unit${unit.unitNumber}/unit${unit.unitNumber}_vocabulary.js';`;
    }
  })
  .join("\n")}

export const allUnitsVocabulary = {
  summary: vocabularySummary,
  units: {
${allUnitData
  .map(
    (unit) => `    unit${unit.unitNumber}: unit${unit.unitNumber}Vocabulary,`
  )
  .join("\n")}
  },

  // Helper functions
  getTotalVocabularyCount: function() {
    return this.summary.totalVocabulary;
  },

  getUnitVocabulary: function(unitNumber) {
    return this.units[\`unit\${unitNumber}\`];
  },

  searchAllVocabulary: function(searchTerm) {
    const results = [];
    Object.values(this.units).forEach(unit => {
      const matches = unit.searchVocabulary(searchTerm);
      results.push(...matches.map(match => ({
        ...match,
        unitNumber: unit.metadata.unitNumber,
        unitTitle: unit.metadata.title,
      })));
    });
    return results;
  },

  getVocabularyByFrench: function(french) {
    const results = [];
    Object.values(this.units).forEach(unit => {
      const match = unit.getVocabularyByFrench(french);
      if (match) {
        results.push({
          ...match,
          unitNumber: unit.metadata.unitNumber,
          unitTitle: unit.metadata.title,
        });
      }
    });
    return results;
  },
};
`;

  return content;
}

/**
 * Main execution
 */
async function main() {
  console.log("🚀 Starting vocabulary scraping...\n");

  const allUnitData = [];
  const masterOutputDir = path.join(__dirname, "..", "..", "vocabulary");

  // Create master output directory if it doesn't exist
  if (!fs.existsSync(masterOutputDir)) {
    fs.mkdirSync(masterOutputDir, { recursive: true });
  }

  // Process each unit
  for (let i = 0; i < unitConfigs.length; i++) {
    const unitData = processUnit(unitConfigs[i], i);
    allUnitData.push(unitData);

    // Generate unit vocabulary file
    const unitContent = generateUnitVocabularyFile(unitData);
    const unitFileName = `unit${unitData.unitNumber}_vocabulary.js`;

    // Place unit files in their respective unit folders
    let unitFolder;
    if (unitData.unitNumber === 13) {
      // Reference unit
      unitFolder = path.join(__dirname, "reference");
    } else {
      // Regular units
      unitFolder = path.join(__dirname, `unit${unitData.unitNumber}`);
    }

    const unitFilePath = path.join(unitFolder, unitFileName);
    fs.writeFileSync(unitFilePath, unitContent);
    console.log(
      `  📝 Generated: ${unitFileName} in ${unitFolder
        .split("/")
        .slice(-2)
        .join("/")}`
    );
  }

  // Generate summary file in master vocabulary directory
  const summaryContent = generateSummaryFile(allUnitData);
  const summaryFilePath = path.join(masterOutputDir, "all_units_vocabulary.js");
  fs.writeFileSync(summaryFilePath, summaryContent);
  console.log(`\n📝 Generated: all_units_vocabulary.js in src/vocabulary/`);

  // Print final summary
  console.log("\n🎉 Vocabulary scraping complete!");
  console.log(`\n📊 Summary:`);
  console.log(`   Total units: ${allUnitData.length}`);
  console.log(
    `   Total vocabulary: ${allUnitData.reduce(
      (sum, unit) => sum + unit.totalVocabulary,
      0
    )} words`
  );

  allUnitData.forEach((unit) => {
    console.log(
      `   Unit ${unit.unitNumber}: ${unit.totalVocabulary} words (${
        Object.keys(unit.moduleVocabulary).length
      } modules)`
    );
  });

  console.log(`\n📁 Files generated:`);
  console.log(
    `   - Unit vocabulary files: in respective unit folders (modules/unit#/)`
  );
  console.log(
    `   - Master summary file: src/vocabulary/all_units_vocabulary.js`
  );
}

// Run the script
main().catch(console.error);
