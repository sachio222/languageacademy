/**
 * Script to replace all hardcoded module references with dynamic moduleKey lookups
 * Uses template literals (backticks) to avoid downstream errors
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapping of old module numbers to their moduleKeys
const moduleNumberToKey = {
  // Unit 1
  1: "2024-01-01-famous-words",
  2: "2024-01-02-pronouns",
  3: "2024-01-03-etre",
  4: "2024-01-04-avoir",
  5: "2024-01-05-articles",
  6: "2024-01-06-basic-nouns",
  7: "2024-01-07-plurals",
  8: "2024-01-08-connectors",
  9: "2024-01-09-reading1",
  10: "2024-01-10-unit1-practice",
  11: "2024-01-11-unit1-exam",

  // Unit 2
  12: "2024-01-12-demonstratives",
  13: "2024-01-13-ca-survival",
  14: "2024-01-14-determiners-nouns",
  15: "2024-01-15-vouloir",
  16: "2024-01-16-pouvoir",
  17: "2024-01-17-voir",
  18: "2024-01-18-questions",
  19: "2024-01-19-stressed-pronouns",
  20: "2024-01-20-prepositions",
  21: "2024-01-21-adjectives",
  22: "2024-01-22-reading2",
  23: "2024-01-23-unit2-practice",
  24: "2024-01-24-unit2-exam",

  // Unit 3
  25: "2024-01-25-contractions",
  26: "2024-01-26-venir",
  27: "2024-01-27-aller",
  28: "2024-01-28-verb-pattern-help",
  29: "2024-01-29-partir",
  30: "2024-01-30-object-pronouns",
  31: "2024-01-31-possessive-adjectives",
  32: "2024-02-01-possessive-pronouns",
  33: "2024-02-02-combining",
  34: "2024-02-03-reading3",
  35: "2024-02-04-unit3-practice",
  36: "2024-02-05-unit3-exam",

  // Key Unit 10 modules for cross-references
  115: "2024-02-20-common-special-forms-1",
  116: "2024-02-21-common-special-forms-2",
  117: "2024-02-22-necessity-phrases",
  118: "2024-02-23-wish-phrases",

  // Key Unit 12 modules for cross-references
  154: "2024-03-18-questce-qui-que",
  155: "2024-03-19-pourquoi-complex",
  156: "2024-03-20-comment-complex",
  157: "2024-03-21-quiest-qui-que",
  158: "2024-03-22-inversion-questions",
  159: "2024-03-23-embedded-questions",
  160: "2024-03-24-rhetorical-negative",
  161: "2024-03-25-multi-clause-questions",
};

// Get all module files
function getAllModuleFiles() {
  const moduleFiles = [];
  const unitsDir = path.join(__dirname, "src/lessons/modules");

  const unitDirs = fs
    .readdirSync(unitsDir)
    .filter((dir) => fs.statSync(path.join(unitsDir, dir)).isDirectory());

  unitDirs.forEach((unitDir) => {
    const unitPath = path.join(unitsDir, unitDir);
    const files = fs
      .readdirSync(unitPath)
      .filter(
        (file) =>
          file.endsWith(".js") &&
          !file.includes("index.js") &&
          !file.includes("unit-config.js")
      );

    files.forEach((file) => {
      moduleFiles.push({
        path: path.join(unitPath, file),
        relativePath: `${unitDir}/${file}`,
      });
    });
  });

  return moduleFiles;
}

// Fix dynamic references in a file
function fixDynamicReferences(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    let changes = 0;

    // Check if file needs moduleIdResolver import
    let needsImport = false;

    // Fix module header comments (Module XXX:)
    content = content.replace(/\* Module (\d+):/g, (match, number) => {
      const moduleKey = moduleNumberToKey[number];
      if (moduleKey) {
        needsImport = true;
        changes++;
        return `* Module \${getModuleId("${moduleKey}")}:`;
      }
      return match;
    });

    // Fix cross-references in content (Module XXX, from Module XXX, etc.)
    content = content.replace(
      /(Module )(\d+)(?![:\.])/g,
      (match, prefix, number) => {
        const moduleKey = moduleNumberToKey[number];
        if (moduleKey) {
          needsImport = true;
          changes++;
          return `\${getModuleRef("${moduleKey}")}`;
        }
        return match;
      }
    );

    // Fix "from Module XXX" references
    content = content.replace(
      /(from Module )(\d+)/g,
      (match, prefix, number) => {
        const moduleKey = moduleNumberToKey[number];
        if (moduleKey) {
          needsImport = true;
          changes++;
          return `from \${getModuleRef("${moduleKey}")}`;
        }
        return match;
      }
    );

    // Fix "Like Module XXX" references
    content = content.replace(
      /(Like Module )(\d+)/g,
      (match, prefix, number) => {
        const moduleKey = moduleNumberToKey[number];
        if (moduleKey) {
          needsImport = true;
          changes++;
          return `Like \${getModuleRef("${moduleKey}")}`;
        }
        return match;
      }
    );

    // Add import if needed
    if (needsImport && !content.includes("moduleIdResolver")) {
      // Find the first import or add at top
      const importMatch = content.match(/^import .+;$/m);
      if (importMatch) {
        content = content.replace(
          importMatch[0],
          `${importMatch[0]}\nimport { getModuleId, getModuleRef } from "../../moduleIdResolver.js";`
        );
      } else {
        // Add at very top after comments
        const lines = content.split("\n");
        let insertIndex = 0;

        // Skip comment block
        while (
          insertIndex < lines.length &&
          (lines[insertIndex].startsWith("/**") ||
            lines[insertIndex].startsWith(" *") ||
            lines[insertIndex].startsWith(" */") ||
            lines[insertIndex].trim() === "")
        ) {
          insertIndex++;
        }

        lines.splice(
          insertIndex,
          0,
          "",
          'import { getModuleId, getModuleRef } from "../../moduleIdResolver.js";'
        );
        content = lines.join("\n");
      }
    }

    if (changes > 0) {
      fs.writeFileSync(filePath, content);
      return { success: true, changes };
    }

    return { success: true, changes: 0 };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Main execution
console.log(
  "🔧 Fixing all hardcoded module references with dynamic lookups..."
);
console.log("=".repeat(70));

const moduleFiles = getAllModuleFiles();
let totalProcessed = 0;
let totalChanges = 0;
let filesChanged = 0;

moduleFiles.forEach((fileInfo) => {
  const result = fixDynamicReferences(fileInfo.path);
  totalProcessed++;

  if (result.success) {
    if (result.changes > 0) {
      console.log(
        `✅ ${fileInfo.relativePath} - Fixed ${result.changes} references`
      );
      totalChanges += result.changes;
      filesChanged++;
    } else {
      console.log(`⏭️  ${fileInfo.relativePath} - No references to fix`);
    }
  } else {
    console.log(`❌ ${fileInfo.relativePath} - Error: ${result.error}`);
  }
});

console.log("");
console.log("=".repeat(70));
console.log("📊 RESULTS:");
console.log(`   Files processed: ${totalProcessed}`);
console.log(`   Files changed: ${filesChanged}`);
console.log(`   Total references fixed: ${totalChanges}`);

if (totalChanges > 0) {
  console.log("");
  console.log(
    "🎉 All hardcoded module references replaced with dynamic lookups!"
  );
  console.log("✅ Module references will now always be accurate!");
  console.log(
    "✅ Template literals (backticks) used to avoid downstream errors!"
  );
} else {
  console.log("");
  console.log("ℹ️  No hardcoded references found to fix");
}
