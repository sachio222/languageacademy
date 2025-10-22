/**
 * Core logic for moving misplaced verbs
 * Step-by-step approach for one verb at a time
 */

// 1. Get first verb from target list
const firstVerb = "avoir"; // This would come from target-list.js

// 2. Check if it exists in nouns.js
function checkNounsFile(targetWord) {
  const nounsPath = "src/data/dictionary/words/nouns.js";
  const content = fs.readFileSync(nounsPath, "utf8");

  // Look for the word in the file
  const wordRegex = new RegExp(`"word":\\s*"${targetWord}"`, "g");
  const found = content.match(wordRegex);

  if (found) {
    console.log(`✓ Found "${targetWord}" in nouns.js`);
    return { found: true, file: nounsPath, content };
  } else {
    console.log(`✗ "${targetWord}" not in nouns.js`);
    return { found: false };
  }
}

// 3. If found, extract the full entry
function extractEntry(content, targetWord) {
  // Find the complete entry for this word
  const entryRegex = new RegExp(
    `\\[\\s*"([^"]*${targetWord}[^"]*)"\\s*,\\s*\\{[\\s\\S]*?\\}\\s*\\]`,
    "g"
  );

  const match = content.match(entryRegex);
  if (match) {
    return match[0]; // The full entry
  }
  return null;
}

// 4. Update partOfSpeech to "verb"
function updateToVerb(entry) {
  return entry.replace(/"partOfSpeech":\s*"[^"]*"/, '"partOfSpeech": "verb"');
}

// 5. Add to verbs.js
function addToVerbs(updatedEntry) {
  const verbsPath = "src/data/dictionary/words/verbs.js";
  let content = fs.readFileSync(verbsPath, "utf8");

  // Find the end of the Map and insert before closing bracket
  const newContent = content.replace(
    /(\s*\]\s*\)\s*;)/,
    `,\n  ${updatedEntry}\n$1`
  );

  // Update entry count
  const updatedCount = newContent.replace(
    /Total entries: \d+/,
    `Total entries: ${getCurrentCount() + 1}`
  );

  fs.writeFileSync(verbsPath, updatedCount);
  console.log("✓ Added to verbs.js");
}

// 6. Remove from source file
function removeFromSource(filePath, targetWord) {
  let content = fs.readFileSync(filePath, "utf8");

  // Remove the entire entry
  const entryRegex = new RegExp(
    `\\[\\s*"([^"]*${targetWord}[^"]*)"\\s*,\\s*\\{[\\s\\S]*?\\}\\s*\\],?\\s*`,
    "g"
  );

  const newContent = content.replace(entryRegex, "");

  // Update entry count
  const updatedCount = newContent.replace(
    /Total entries: \d+/,
    `Total entries: ${getCurrentCount() - 1}`
  );

  fs.writeFileSync(filePath, updatedCount);
  console.log("✓ Removed from source file");
}

// 7. Remove from target list
function removeFromTargetList(targetWord) {
  // This would update target-list.js to remove the word from verbs array
  console.log("✓ Should remove from target list");
}

// Main execution flow
function processFirstVerb() {
  console.log(`Processing: "${firstVerb}"`);

  // Step 1: Check if exists in nouns.js
  const result = checkNounsFile(firstVerb);

  if (result.found) {
    // Step 2: Extract entry
    const entry = extractEntry(result.content, firstVerb);

    if (entry) {
      // Step 3: Update to verb
      const updatedEntry = updateToVerb(entry);

      // Step 4: Add to verbs.js
      addToVerbs(updatedEntry);

      // Step 5: Remove from source
      removeFromSource(result.file, firstVerb);

      // Step 6: Remove from target list
      removeFromTargetList(firstVerb);

      console.log("✓ Complete!");
    }
  } else {
    console.log("✗ Not found, check next file or next verb");
  }
}

// This is the core logic - process one verb at a time
processFirstVerb();
