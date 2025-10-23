import fetch from "node-fetch";
import { JSDOM } from "jsdom";

/**
 * Analyze Cambridge Dictionary page structure
 * This script examines the HTML structure of a Cambridge Dictionary page
 * to understand how to extract French-English translation data
 */

const CAMBRIDGE_URL =
  "https://dictionary.cambridge.org/dictionary/french-english/maintenant";

console.log("🔍 Analyzing Cambridge Dictionary page structure...");
console.log(`📖 URL: ${CAMBRIDGE_URL}`);

try {
  // Fetch the page
  console.log("📡 Fetching page...");
  const response = await fetch(CAMBRIDGE_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const html = await response.text();
  console.log(`✅ Page fetched successfully (${html.length} characters)`);

  // Parse HTML
  const dom = new JSDOM(html);
  const document = dom.window.document;

  console.log("\n📊 PAGE STRUCTURE ANALYSIS");
  console.log("=".repeat(50));

  // Find the main content area
  const mainContent =
    document.querySelector(".dictionary") ||
    document.querySelector(".entry") ||
    document.querySelector("main");
  if (mainContent) {
    console.log("✅ Found main content area");
  } else {
    console.log("⚠️  No main content area found");
  }

  // Look for word definitions
  const definitions = document.querySelectorAll(".def");
  console.log(`📝 Found ${definitions.length} definition elements`);

  // Look for translations
  const translations = document.querySelectorAll(".trans");
  console.log(`🔄 Found ${translations.length} translation elements`);

  // Look for examples
  const examples = document.querySelectorAll(".examp");
  console.log(`💬 Found ${examples.length} example elements`);

  // Look for pronunciation
  const pronunciations = document.querySelectorAll(".pron");
  console.log(`🔊 Found ${pronunciations.length} pronunciation elements`);

  // Look for part of speech
  const posElements = document.querySelectorAll(".pos");
  console.log(`📚 Found ${posElements.length} part of speech elements`);

  // Analyze specific classes
  console.log("\n🎯 DETAILED CLASS ANALYSIS");
  console.log("-".repeat(30));

  const allElements = document.querySelectorAll("*");
  const classCounts = {};

  allElements.forEach((el) => {
    if (el.className && typeof el.className === "string") {
      const classes = el.className.split(" ");
      classes.forEach((cls) => {
        if (cls.trim()) {
          classCounts[cls] = (classCounts[cls] || 0) + 1;
        }
      });
    }
  });

  // Sort by frequency and show top classes
  const sortedClasses = Object.entries(classCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20);

  console.log("Top CSS classes found:");
  sortedClasses.forEach(([className, count]) => {
    console.log(`  .${className}: ${count} occurrences`);
  });

  // Look for specific dictionary-related classes
  const dictionaryClasses = [
    "def",
    "trans",
    "examp",
    "pron",
    "pos",
    "headword",
    "entry",
    "dictionary",
    "meaning",
    "translation",
    "example",
    "pronunciation",
  ];

  console.log("\n🔍 DICTIONARY-SPECIFIC CLASSES");
  console.log("-".repeat(35));

  dictionaryClasses.forEach((className) => {
    const elements = document.querySelectorAll(`.${className}`);
    if (elements.length > 0) {
      console.log(`✅ .${className}: ${elements.length} elements`);

      // Show first few examples
      Array.from(elements)
        .slice(0, 3)
        .forEach((el, i) => {
          const text = el.textContent?.trim().substring(0, 100);
          if (text) {
            console.log(
              `   ${i + 1}. "${text}${text.length >= 100 ? "..." : ""}"`
            );
          }
        });
    } else {
      console.log(`❌ .${className}: not found`);
    }
  });

  // Look for the actual word and translation
  console.log("\n📖 CONTENT EXTRACTION TEST");
  console.log("-".repeat(30));

  // Try to find the French word
  const frenchWord =
    document.querySelector(".headword") ||
    document.querySelector("h1") ||
    document.querySelector(".hw");
  if (frenchWord) {
    console.log(`🇫🇷 French word: "${frenchWord.textContent?.trim()}"`);
  }

  // Try to find English translation
  const englishTranslation =
    document.querySelector(".trans") ||
    document.querySelector(".def") ||
    document.querySelector(".meaning");
  if (englishTranslation) {
    console.log(
      `🇬🇧 English translation: "${englishTranslation.textContent?.trim()}"`
    );
  }

  // Look for part of speech
  const partOfSpeech = document.querySelector(".pos");
  if (partOfSpeech) {
    console.log(`📚 Part of speech: "${partOfSpeech.textContent?.trim()}"`);
  }

  console.log("\n✅ Analysis complete!");
} catch (error) {
  console.error("❌ Error analyzing page:", error.message);
  console.log("\n💡 This might be due to:");
  console.log("   - Network connectivity issues");
  console.log("   - Cambridge blocking automated requests");
  console.log("   - Missing dependencies (node-fetch, jsdom)");
  console.log("\n🔧 To install dependencies:");
  console.log("   npm install node-fetch jsdom");
}
