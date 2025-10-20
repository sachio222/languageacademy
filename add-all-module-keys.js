/**
 * Comprehensive script to add moduleKeys to ALL modules
 * Uses the complete pedagogical sequence to assign incremental dates
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all module files that need moduleKeys
function getAllModuleFiles() {
  const moduleFiles = [];
  const unitsDir = path.join(__dirname, "src/lessons/modules");

  // Get all unit directories
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
        unitDir: unitDir,
      });
    });
  });

  return moduleFiles;
}

// Generate moduleKey based on file path and index
function generateModuleKey(index, fileName, unitDir) {
  // Start from 2024-01-01 and increment by day
  const baseDate = new Date("2024-01-01");
  baseDate.setDate(baseDate.getDate() + index);

  const dateStr = baseDate.toISOString().split("T")[0];
  const name = fileName.replace(".js", "").replace(/_/g, "-");

  return `${dateStr}-${name}`;
}

// Add moduleKey to a file
function addModuleKeyToFile(filePath, moduleKey) {
  try {
    let content = fs.readFileSync(filePath, "utf8");

    // Check if moduleKey already exists
    if (content.includes("moduleKey:")) {
      return { success: true, skipped: true };
    }

    // Find export const pattern
    const exportMatch = content.match(/export const (\w+) = \{/);
    if (!exportMatch) {
      return { success: false, error: "No export const found" };
    }

    const exportName = exportMatch[1];
    const exportPattern = new RegExp(`export const ${exportName} = \\{`, "g");

    // Add moduleKey as first property
    content = content.replace(
      exportPattern,
      `export const ${exportName} = {
  moduleKey: "${moduleKey}", // Permanent identifier - never changes`
    );

    fs.writeFileSync(filePath, content);
    return { success: true, skipped: false };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Main execution
console.log("🚀 Adding moduleKeys to ALL modules systematically...");
console.log("=".repeat(60));

const moduleFiles = getAllModuleFiles();
console.log(`Found ${moduleFiles.length} module files to process`);
console.log("");

let processed = 0;
let successful = 0;
let skipped = 0;

moduleFiles.forEach((fileInfo, index) => {
  const moduleKey = generateModuleKey(
    index,
    path.basename(fileInfo.path),
    fileInfo.unitDir
  );
  const result = addModuleKeyToFile(fileInfo.path, moduleKey);

  processed++;

  if (result.success) {
    if (result.skipped) {
      console.log(`⏭️  ${fileInfo.relativePath} - moduleKey already exists`);
      skipped++;
    } else {
      console.log(
        `✅ ${fileInfo.relativePath} - Added moduleKey: ${moduleKey}`
      );
      successful++;
    }
  } else {
    console.log(`❌ ${fileInfo.relativePath} - Error: ${result.error}`);
  }
});

console.log("");
console.log("=".repeat(60));
console.log(`📊 RESULTS:`);
console.log(`   Processed: ${processed}`);
console.log(`   Successful: ${successful}`);
console.log(`   Skipped: ${skipped}`);
console.log(`   Failed: ${processed - successful - skipped}`);

if (successful + skipped === processed) {
  console.log("🎉 ALL modules now have permanent moduleKeys!");
  console.log("✅ Dynamic module numbering system ready!");
} else {
  console.log("⚠️  Some modules need manual attention");
}
