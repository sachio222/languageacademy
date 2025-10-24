import { DefinitionGenerator } from "./src/data/dictionary/utils/generate-definitions.js";

const generator = new DefinitionGenerator();

console.log("🧹 Cleaning up incomplete examples (empty trans fields)...");

try {
  const targetFile = generator.getTargetFileName("verb");
  const targetPath = `./src/data/dictionary/words/cambridge/${targetFile}`;

  // Parse the file
  const fileData = generator.parseDictionaryFile(targetPath);
  if (!fileData || !fileData.entries) {
    console.log(`❌ Could not parse ${targetFile}`);
    process.exit(1);
  }

  let cleanedCount = 0;
  let totalIncomplete = 0;

  // Process each entry
  for (const [id, entry] of fileData.entries) {
    if (entry.examples && Array.isArray(entry.examples)) {
      const originalLength = entry.examples.length;

      // Filter out examples with empty trans fields
      entry.examples = entry.examples.filter((example) => {
        if (!example.trans || example.trans.trim() === "") {
          totalIncomplete++;
          return false; // Remove this example
        }
        return true; // Keep this example
      });

      const removedCount = originalLength - entry.examples.length;
      if (removedCount > 0) {
        console.log(
          `🧹 ${entry.word}: Removed ${removedCount} incomplete examples`
        );
        cleanedCount++;
      }
    }
  }

  // Write the cleaned data back to file
  const fs = await import("fs");
  const content = `export const verbsCambridge = new Map([\n${fileData.entries
    .map(
      ([id, entry]) =>
        `  [\n    "${id}",\n    ${JSON.stringify(entry, null, 4)}\n  ]`
    )
    .join(",\n")}\n]);`;

  fs.writeFileSync(targetPath, content, "utf8");

  console.log(`\n✅ Cleanup complete!`);
  console.log(
    `📊 Removed ${totalIncomplete} incomplete examples from ${cleanedCount} entries`
  );
} catch (error) {
  console.error(`❌ Error cleaning examples:`, error.message);
}
