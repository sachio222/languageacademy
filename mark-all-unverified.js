import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wordsDir = path.join(__dirname, "src/data/dictionary/words");
const reportPath = path.join(__dirname, "mark-unverified-report.json");

console.log("🔍 Marking all dictionary entries as unverified...");

const fileStats = [];
let totalEntriesProcessed = 0;
let totalEntriesUpdated = 0;

const files = fs
  .readdirSync(wordsDir)
  .filter((file) => file.endsWith(".js"))
  .sort();

console.log(`📁 Processing ${files.length} dictionary files...`);

for (const file of files) {
  const filePath = path.join(wordsDir, file);
  const fileName = path.basename(file, ".js");

  console.log(`\n📖 Processing ${file}...`);

  try {
    const content = fs.readFileSync(filePath, "utf8");
    const mapMatch = content.match(
      /export const (\w+) = new Map\(\[([\s\S]*?)\]\);/m
    );

    if (!mapMatch) {
      console.log(`  ⚠️  No Map found in ${file}`);
      fileStats.push({
        file: file,
        entriesProcessed: 0,
        entriesUpdated: 0,
        status: "no-map",
      });
      continue;
    }

    const varName = mapMatch[1];
    const mapContent = `[${mapMatch[2]}]`;
    const originalEntries = eval(mapContent);

    console.log(`  📊 Found ${originalEntries.length} entries`);

    const updatedEntries = originalEntries.map(([id, entry]) => {
      const updatedEntry = {
        ...entry,
        verified: false,
      };
      return [id, updatedEntry];
    });

    const entriesUpdated = originalEntries.filter(
      ([id, entry]) => entry.verified !== false
    ).length;

    totalEntriesProcessed += originalEntries.length;
    totalEntriesUpdated += entriesUpdated;

    console.log(`  ✅ Updated ${entriesUpdated} entries to verified: false`);
    console.log(`  📊 Total entries: ${originalEntries.length}`);

    // Reconstruct the file content
    const headerMatch = content.match(/^(\/\*\*[\s\S]*?\*\/)\s*export const/);
    const header = headerMatch
      ? headerMatch[1]
      : `/**\n * ${
          varName.charAt(0).toUpperCase() + varName.slice(1)
        } Dictionary\n */`;
    const footerMatch = content.match(/(\n\/\/ Frequency array[\s\S]*)$/);
    const footer = footerMatch ? footerMatch[1] : "";

    const entriesString = updatedEntries
      .map((entry) => {
        const [id, data] = entry;
        return `  [\n    "${id}",\n    ${JSON.stringify(data, null, 4).replace(
          /^/gm,
          "    "
        )}\n  ]`;
      })
      .join(",\n");

    const newContent = `${header}\n\nexport const ${varName} = new Map([\n${entriesString}\n]);\n${footer}`;

    fs.writeFileSync(filePath, newContent);
    console.log(`  💾 Updated ${file} with verified: false`);

    fileStats.push({
      file: file,
      entriesProcessed: originalEntries.length,
      entriesUpdated: entriesUpdated,
      status: "success",
    });
  } catch (error) {
    console.error(`  ❌ Error processing ${file}: ${error.message}`);
    fileStats.push({
      file: file,
      entriesProcessed: 0,
      entriesUpdated: 0,
      status: "error",
      error: error.message,
    });
  }
}

console.log("\n📊 MARK UNVERIFIED SUMMARY");
console.log("=".repeat(60));

fileStats.forEach((stat) => {
  const status =
    stat.status === "success" ? "✅" : stat.status === "error" ? "❌" : "⚠️";
  console.log(
    `${status} ${stat.file}: ${stat.entriesUpdated} entries updated (${stat.entriesProcessed} total)`
  );
  if (stat.error) {
    console.log(`    Error: ${stat.error}`);
  }
});

console.log("\n📈 TOTALS");
console.log(
  `✅ Successfully processed: ${
    fileStats.filter((s) => s.status === "success").length
  } files`
);
console.log(
  `❌ Failed files: ${
    fileStats.filter((s) => s.status === "error").length
  } files`
);
console.log(`📚 Total entries processed: ${totalEntriesProcessed}`);
console.log(`🔄 Total entries updated: ${totalEntriesUpdated}`);

const summaryReport = {
  summary: {
    total_files_processed: files.length,
    successful_files: fileStats.filter((s) => s.status === "success").length,
    failed_files: fileStats.filter((s) => s.status === "error").length,
    total_entries_processed: totalEntriesProcessed,
    total_entries_updated: totalEntriesUpdated,
  },
  file_details: fileStats,
};

fs.writeFileSync(reportPath, JSON.stringify(summaryReport, null, 2));
console.log(`\n💾 Summary report: ${reportPath}`);

console.log("\n🎉 MARK UNVERIFIED COMPLETE!");
console.log(`🔄 Updated ${totalEntriesUpdated} entries to verified: false`);
console.log(`📊 Processed ${totalEntriesProcessed} total entries`);
