#!/usr/bin/env node

/**
 * Validates vocabulary is alphabetized and has no duplicates
 * Usage: node scripts/validate-vocabulary.js
 * Returns exit code 1 if validation fails (for CI/git hooks)
 */

const fs = require("fs");
const path = require("path");

const VOCAB_FILE = path.join(
  __dirname,
  "../src/components/readingVocabulary.js"
);

console.log("🔍 Validating vocabulary...\n");

// Read and parse the vocabulary
const content = fs.readFileSync(VOCAB_FILE, "utf8");
const tempFile = path.join(__dirname, "../src/components/.temp-vocab.js");
fs.writeFileSync(tempFile, content.replace("export const", "module.exports."));

delete require.cache[tempFile];
const { readingVocabulary } = require(tempFile);
fs.unlinkSync(tempFile);

const entries = Object.entries(readingVocabulary);
let hasErrors = false;

console.log(`📊 Total entries: ${entries.length}`);

// Check 1: No duplicates (shouldn't be possible in an object, but check)
const keys = entries.map(([k]) => k);
const uniqueKeys = new Set(keys);
if (keys.length !== uniqueKeys.size) {
  console.error("❌ FAIL: Duplicate keys found!");
  hasErrors = true;
} else {
  console.log("✅ No duplicates");
}

// Check 2: Alphabetical order
const outOfOrder = [];
for (let i = 1; i < entries.length; i++) {
  const prev = entries[i - 1][0];
  const curr = entries[i][0];

  if (curr.localeCompare(prev, "fr", { sensitivity: "base" }) < 0) {
    outOfOrder.push({
      index: i,
      expected: prev,
      actual: curr,
      line: i + 9, // Accounting for header lines
    });
  }
}

if (outOfOrder.length > 0) {
  console.error(
    `❌ FAIL: ${outOfOrder.length} entries out of alphabetical order:\n`
  );
  outOfOrder.slice(0, 5).forEach(({ line, expected, actual }) => {
    console.error(
      `   Line ${line}: '${actual}' should come before '${expected}'`
    );
  });
  if (outOfOrder.length > 5) {
    console.error(`   ... and ${outOfOrder.length - 5} more`);
  }
  console.error("\n💡 Fix with: npm run vocab:sort\n");
  hasErrors = true;
} else {
  console.log("✅ Alphabetically sorted");
}

// Check 3: No empty translations
const emptyTranslations = entries.filter(([k, v]) => !v || v.trim() === "");
if (emptyTranslations.length > 0) {
  console.error(
    `❌ FAIL: ${emptyTranslations.length} entries with empty translations:`
  );
  emptyTranslations.slice(0, 5).forEach(([k]) => {
    console.error(`   '${k}': (empty)`);
  });
  hasErrors = true;
} else {
  console.log("✅ No empty translations");
}

// Check 4: Basic format validation
const invalidFormat = [];
entries.forEach(([key, value], index) => {
  // Check for common issues
  if (key.includes("  ")) {
    invalidFormat.push({ key, issue: "double spaces in key", line: index + 9 });
  }
  if (value.includes("  ")) {
    invalidFormat.push({
      key,
      issue: "double spaces in translation",
      line: index + 9,
    });
  }
});

if (invalidFormat.length > 0) {
  console.warn(`⚠️  WARNING: ${invalidFormat.length} potential format issues:`);
  invalidFormat.slice(0, 5).forEach(({ key, issue, line }) => {
    console.warn(`   Line ${line}: '${key}' - ${issue}`);
  });
} else {
  console.log("✅ Format looks good");
}

// Summary
console.log("\n" + "=".repeat(50));
if (hasErrors) {
  console.error("❌ VALIDATION FAILED");
  process.exit(1);
} else {
  console.log("✅ VALIDATION PASSED");
  console.log(`\n📚 Vocabulary contains ${entries.length} verified entries`);
  process.exit(0);
}
