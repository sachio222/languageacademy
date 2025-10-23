#!/usr/bin/env node

import { CambridgeScraper } from "./src/data/dictionary/utils/cambridge-scraper.js";

async function testEstScraper() {
  const scraper = new CambridgeScraper();

  console.log("🧪 Testing Cambridge scraper on 'est' with verb targeting...\n");

  // Test scraping "est" as a verb
  const verbResult = await scraper.scrapeWordWithPartOfSpeech("est", "verb");

  console.log("\n📊 VERB RESULT:");
  console.log("Found:", verbResult.found);
  if (verbResult.found) {
    console.log("Translations:", verbResult.translations?.length || 0);
    console.log("Examples:", verbResult.examples?.length || 0);
    console.log(
      "First few translations:",
      verbResult.translations?.slice(0, 3)
    );
    console.log("First few examples:", verbResult.examples?.slice(0, 2));
  } else {
    console.log("Error:", verbResult.error);
  }

  console.log("\n" + "=".repeat(50));

  // Test scraping "est" as a noun for comparison
  const nounResult = await scraper.scrapeWordWithPartOfSpeech("est", "noun");

  console.log("\n📊 NOUN RESULT:");
  console.log("Found:", nounResult.found);
  if (nounResult.found) {
    console.log("Translations:", nounResult.translations?.length || 0);
    console.log("Examples:", nounResult.examples?.length || 0);
    console.log(
      "First few translations:",
      nounResult.translations?.slice(0, 3)
    );
    console.log("First few examples:", nounResult.examples?.slice(0, 2));
  } else {
    console.log("Error:", nounResult.error);
  }
}

testEstScraper().catch(console.error);
