#!/usr/bin/env node

/**
 * Resolve Cross-File Duplicates
 * Removes specific words from designated files based on priority rules
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🔍 Resolving cross-file duplicates...");

// Cross-file duplicate resolution rules
const resolutionRules = [
  {
    word: "bah",
    keepIn: ["interjections"],
    removeFrom: ["adverbs"],
    reason: "interjections (primary); remove from adverbs",
  },
  {
    word: "europe",
    keepIn: ["proper-nouns"],
    removeFrom: ["nouns"],
    reason: "proper-nouns (keep there; remove from nouns)",
  },
  {
    word: "france",
    keepIn: ["proper-nouns"],
    removeFrom: ["nouns"],
    reason: "proper-nouns (keep there; remove from nouns)",
  },
  {
    word: "leur",
    keepIn: ["pronouns", "nouns"],
    removeFrom: [],
    reason:
      "keep in both pronouns and nouns (it's a pronoun and can be a possessive noun)",
  },
  {
    word: "louvre",
    keepIn: ["proper-nouns"],
    removeFrom: ["nouns"],
    reason: "proper-nouns (keep there; remove from nouns)",
  },
  {
    word: "meilleur",
    keepIn: ["adjectives", "nouns"],
    removeFrom: [],
    reason: "keep in both adjectives and nouns (valid as both)",
  },
  {
    word: "même",
    keepIn: ["adjectives", "nouns"],
    removeFrom: [],
    reason: "keep in both adjectives and nouns (valid as both)",
  },
  {
    word: "merci",
    keepIn: ["interjections"],
    removeFrom: ["adverbs"],
    reason: "interjections (keep there; remove from adverbs)",
  },
  {
    word: "non",
    keepIn: ["interjections"],
    removeFrom: ["adverbs"],
    reason: "interjections (keep there; remove from adverbs)",
  },
  {
    word: "orange",
    keepIn: ["adjectives", "nouns"],
    removeFrom: [],
    reason: "keep in both adjectives and nouns (color and fruit)",
  },
  {
    word: "oui",
    keepIn: ["interjections"],
    removeFrom: ["adverbs"],
    reason: "interjections (keep there; remove from adverbs)",
  },
  {
    word: "savoir",
    keepIn: ["nouns", "verbs"],
    removeFrom: [],
    reason: "keep in both nouns and verbs (it's both)",
  },
  {
    word: "voici",
    keepIn: ["adverbs"],
    removeFrom: ["interjections"],
    reason: "adverbs (keep there; remove from interjections)",
  },
  {
    word: "voilà",
    keepIn: ["adverbs"],
    removeFrom: ["interjections"],
    reason: "adverbs (keep there; remove from interjections)",
  },
];

// Path to dictionary words directory
const wordsDir = path.join(__dirname, "src/data/dictionary/words");

console.log(
  `📁 Processing ${resolutionRules.length} cross-file duplicate rules...`
);

let totalRemoved = 0;
const resolutionResults = [];

// Process each resolution rule
for (const rule of resolutionRules) {
  console.log(`\n🔧 Processing "${rule.word}" - ${rule.reason}`);

  const ruleResults = {
    word: rule.word,
    reason: rule.reason,
    keepIn: rule.keepIn,
    removeFrom: rule.removeFrom,
    filesProcessed: [],
    totalRemoved: 0,
  };

  // Process files to remove from
  for (const fileName of rule.removeFrom) {
    const filePath = path.join(wordsDir, `${fileName}.js`);

    if (!fs.existsSync(filePath)) {
      console.log(`  ⚠️  File ${fileName}.js not found, skipping`);
      continue;
    }

    console.log(`  📖 Processing ${fileName}.js...`);

    try {
      // Read the file content
      const content = fs.readFileSync(filePath, "utf8");

      // Extract the Map content using regex
      const mapMatch = content.match(
        /export const \w+ = new Map\(\[([\s\S]*?)\]\);/m
      );

      if (!mapMatch) {
        console.log(`    ⚠️  No Map found in ${fileName}.js`);
        continue;
      }

      // Parse the Map content safely
      const mapContent = `[${mapMatch[1]}]`;
      const entries = eval(mapContent);

      console.log(`    📊 Found ${entries.length} original entries`);

      // Filter out entries with the target word (case-insensitive)
      const filteredEntries = entries.filter(([id, entry]) => {
        if (entry && entry.word) {
          return entry.word.toLowerCase() !== rule.word.toLowerCase();
        }
        return true; // Keep entries without words
      });

      const removedCount = entries.length - filteredEntries.length;
      console.log(`    ✅ Removed ${removedCount} instances of "${rule.word}"`);

      if (removedCount > 0) {
        // Rebuild the file content
        const varName = fileName;
        const header = `/**
 * ${varName.charAt(0).toUpperCase() + varName.slice(1)} Dictionary
 * Auto-generated from vocabulary extraction
 * Total entries: ${filteredEntries.length}
 */`;

        const entriesString = filteredEntries
          .map((entry) => {
            const [id, data] = entry;
            return `  [\n    "${id}",\n    ${JSON.stringify(
              data,
              null,
              4
            ).replace(/^/gm, "    ")}\n  ]`;
          })
          .join(",\n");

        const footer = `\n\nexport const ${varName} = new Map([\n${entriesString}\n]);`;

        const newContent = `${header}${footer}`;

        // Write the updated file
        fs.writeFileSync(filePath, newContent);
        console.log(`    💾 Updated ${fileName}.js`);
      } else {
        console.log(
          `    ✅ No instances of "${rule.word}" found in ${fileName}.js`
        );
      }

      ruleResults.filesProcessed.push({
        file: fileName,
        originalCount: entries.length,
        finalCount: filteredEntries.length,
        removedCount: removedCount,
      });

      ruleResults.totalRemoved += removedCount;
      totalRemoved += removedCount;
    } catch (error) {
      console.log(`    ❌ Error processing ${fileName}.js: ${error.message}`);
      ruleResults.filesProcessed.push({
        file: fileName,
        error: error.message,
      });
    }
  }

  resolutionResults.push(ruleResults);
}

console.log("\n📊 CROSS-FILE DUPLICATE RESOLUTION SUMMARY");
console.log("=".repeat(70));

// Display results for each rule
resolutionResults.forEach((result, index) => {
  console.log(`\n${index + 1}. "${result.word}" - ${result.reason}`);
  console.log(`   Keep in: ${result.keepIn.join(", ")}`);
  console.log(`   Remove from: ${result.removeFrom.join(", ")}`);
  console.log(`   Total removed: ${result.totalRemoved} instances`);

  result.filesProcessed.forEach((fileResult) => {
    if (fileResult.error) {
      console.log(`   ❌ ${fileResult.file}: Error - ${fileResult.error}`);
    } else {
      console.log(
        `   ✅ ${fileResult.file}: ${fileResult.removedCount} removed (${fileResult.originalCount} → ${fileResult.finalCount})`
      );
    }
  });
});

console.log("\n📈 TOTALS");
console.log(`🗑️  Total instances removed: ${totalRemoved}`);
console.log(`📊 Rules processed: ${resolutionRules.length}`);

// Create resolution report
const resolutionReport = {
  metadata: {
    processed_at: new Date().toISOString(),
    total_rules: resolutionRules.length,
    total_instances_removed: totalRemoved,
  },
  resolution_results: resolutionResults,
};

const reportPath = path.join(__dirname, "cross-file-resolution-report.json");
fs.writeFileSync(reportPath, JSON.stringify(resolutionReport, null, 2));

console.log(`\n💾 Resolution report: ${reportPath}`);
console.log(`\n🎉 CROSS-FILE DUPLICATE RESOLUTION COMPLETE!`);
console.log(`🗑️  Removed ${totalRemoved} duplicate instances`);
console.log(`📊 Processed ${resolutionRules.length} resolution rules`);
