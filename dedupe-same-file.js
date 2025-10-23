#!/usr/bin/env node

/**
 * Deduplicate Same-File Duplicates
 * Removes multiple instances of the same word within the same dictionary file
 * Keeps the first occurrence and removes subsequent duplicates
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🔍 Deduplicating same-file duplicates...");

// Path to dictionary words directory
const wordsDir = path.join(__dirname, "src/data/dictionary/words");

// Get all .js files in the words directory
const files = fs
  .readdirSync(wordsDir)
  .filter((file) => file.endsWith(".js"))
  .sort();

console.log(`📁 Processing ${files.length} dictionary files...`);

let totalDeduplicated = 0;
const fileResults = [];

// Process each file
for (const file of files) {
  const filePath = path.join(wordsDir, file);
  const fileName = path.basename(file, ".js");

  console.log(`\n📖 Processing ${file}...`);

  try {
    // Read the file content
    const content = fs.readFileSync(filePath, "utf8");

    // Extract the Map content using regex
    const mapMatch = content.match(
      /export const \w+ = new Map\(\[([\s\S]*?)\]\);/m
    );

    if (!mapMatch) {
      console.log(`  ⚠️  No Map found in ${file}`);
      fileResults.push({
        file: file,
        originalCount: 0,
        deduplicatedCount: 0,
        duplicatesRemoved: 0,
        status: "no-map",
      });
      continue;
    }

    // Parse the Map content safely
    const mapContent = `[${mapMatch[1]}]`;
    const entries = eval(mapContent);

    console.log(`  📊 Found ${entries.length} original entries`);

    // Track seen words (case-insensitive)
    const seenWords = new Set();
    const deduplicatedEntries = [];
    const duplicatesRemoved = [];

    entries.forEach(([id, entry]) => {
      if (entry && entry.word) {
        const wordKey = entry.word.toLowerCase();

        if (seenWords.has(wordKey)) {
          // This is a duplicate - mark for removal
          duplicatesRemoved.push({
            id: id,
            word: entry.word,
            translation: entry.translations?.[0]?.text || "no translation",
            partOfSpeech: entry.partOfSpeech || "unknown",
          });
        } else {
          // First occurrence - keep it
          seenWords.add(wordKey);
          deduplicatedEntries.push([id, entry]);
        }
      } else {
        // Keep entries without words (shouldn't happen but just in case)
        deduplicatedEntries.push([id, entry]);
      }
    });

    const duplicatesCount = duplicatesRemoved.length;
    const finalCount = deduplicatedEntries.length;

    console.log(`  ✅ Removed ${duplicatesCount} duplicates`);
    console.log(`  📊 Final count: ${finalCount} entries`);

    if (duplicatesCount > 0) {
      // Show which duplicates were removed
      console.log(`  🗑️  Removed duplicates:`);
      duplicatesRemoved.forEach((dup, index) => {
        console.log(
          `     ${index + 1}. "${dup.word}" - "${dup.translation}" (${
            dup.partOfSpeech
          })`
        );
      });

      // Rebuild the file content
      const varName = fileName;
      const header = `/**
 * ${varName.charAt(0).toUpperCase() + varName.slice(1)} Dictionary
 * Auto-generated from vocabulary extraction
 * Total entries: ${finalCount}
 */`;

      const entriesString = deduplicatedEntries
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

      // Write the deduplicated file
      fs.writeFileSync(filePath, newContent);
      console.log(`  💾 Updated ${file} with deduplicated content`);
    } else {
      console.log(`  ✅ No duplicates found in ${file}`);
    }

    fileResults.push({
      file: file,
      originalCount: entries.length,
      deduplicatedCount: finalCount,
      duplicatesRemoved: duplicatesCount,
      status: "success",
    });

    totalDeduplicated += duplicatesCount;
  } catch (error) {
    console.log(`  ❌ Error processing ${file}: ${error.message}`);
    fileResults.push({
      file: file,
      originalCount: 0,
      deduplicatedCount: 0,
      duplicatesRemoved: 0,
      status: "error",
      error: error.message,
    });
  }
}

console.log("\n📊 DEDUPLICATION SUMMARY");
console.log("=".repeat(60));

// Display file statistics
fileResults.forEach((result) => {
  const status =
    result.status === "success"
      ? "✅"
      : result.status === "error"
      ? "❌"
      : "⚠️";
  console.log(
    `${status} ${result.file}: ${result.duplicatesRemoved} duplicates removed (${result.originalCount} → ${result.deduplicatedCount})`
  );
  if (result.error) {
    console.log(`    Error: ${result.error}`);
  }
});

// Calculate totals
const successfulFiles = fileResults.filter(
  (r) => r.status === "success"
).length;
const errorFiles = fileResults.filter((r) => r.status === "error").length;
const totalOriginal = fileResults.reduce((sum, r) => sum + r.originalCount, 0);
const totalFinal = fileResults.reduce((sum, r) => sum + r.deduplicatedCount, 0);

console.log("\n📈 TOTALS");
console.log(`✅ Successfully processed: ${successfulFiles} files`);
console.log(`❌ Failed files: ${errorFiles} files`);
console.log(`📚 Original total entries: ${totalOriginal}`);
console.log(`📚 Final total entries: ${totalFinal}`);
console.log(`🗑️  Total duplicates removed: ${totalDeduplicated}`);

// Create summary report
const summaryReport = {
  metadata: {
    processed_at: new Date().toISOString(),
    total_files: files.length,
    successful_files: successfulFiles,
    failed_files: errorFiles,
    total_original_entries: totalOriginal,
    total_final_entries: totalFinal,
    total_duplicates_removed: totalDeduplicated,
  },
  file_results: fileResults,
};

const reportPath = path.join(__dirname, "same-file-deduplication-report.json");
fs.writeFileSync(reportPath, JSON.stringify(summaryReport, null, 2));

console.log(`\n💾 Summary report: ${reportPath}`);
console.log(`\n🎉 SAME-FILE DEDUPLICATION COMPLETE!`);
console.log(`🗑️  Removed ${totalDeduplicated} duplicate entries`);
console.log(`📊 Reduced from ${totalOriginal} to ${totalFinal} entries`);
