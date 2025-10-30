#!/usr/bin/env node

/**
 * Enhance existing cognate entries with Cambridge data and unit/module info
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DefinitionGenerator } from "./src/data/dictionary/utils/generate-definitions.js";
import { CambridgeScraper } from "./src/data/dictionary/utils/cambridge-scraper.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load cognates
const cognatesPath = path.join(__dirname, "cognates-dictionary-entries.json");
const cognates = JSON.parse(fs.readFileSync(cognatesPath, "utf8"));

const generator = new DefinitionGenerator();
const scraper = new CambridgeScraper();

const nounsFile = path.join(__dirname, "src/data/dictionary/words/cambridge/nouns.js");
const fileContent = fs.readFileSync(nounsFile, "utf8");

// Extract Map entries
const mapMatch = fileContent.match(/export const \w+ = new Map\(\[([\s\S]*?)\]\);/) || 
                 fileContent.match(/export const nouns = new Map\(\[([\s\S]*?)\]\);/) ||
                 fileContent.match(/new Map\(\[([\s\S]*?)\]\)/);

if (!mapMatch) {
  console.error("❌ Could not parse nouns.js file");
  process.exit(1);
}

console.log(`🚀 Enhancing ${cognates.length} existing cognate entries...\n`);

let updated = 0;
let scraped = 0;
let errors = 0;

for (const cognate of cognates) {
  try {
    const wordId = `${cognate.word}-fr`;
    
    // Parse the file to find the entry
    const entries = eval(`[${mapMatch[1]}]`);
    const existingEntry = entries.find(([id]) => id === wordId);
    
    if (!existingEntry) {
      console.log(`⚠️  ${cognate.word} not found in dictionary, skipping`);
      continue;
    }
    
    const [, entry] = existingEntry;
    
    // Add unit/module info
    entry.unit = "unit1";
    entry.module = "7";
    
    // Update definition
    if (entry.definition) {
      if (!entry.definition.includes("Unit 1, Module 7")) {
        entry.definition = `${entry.definition} (Unit 1, Module 7)`;
      }
    } else {
      entry.definition = "Unit 1, Module 7";
    }
    
    // Scrape Cambridge data if not already present
    if (!entry.cambridge_data || !entry.cambridge_data.url) {
      console.log(`🔍 Scraping Cambridge data for: ${cognate.word}...`);
      const cambridgeData = await scraper.scrapeWord(cognate.word);
      
      if (cambridgeData.found) {
        const enhancedEntry = generator.mergeCambridgeData(entry, cambridgeData);
        Object.assign(entry, enhancedEntry);
        scraped++;
        console.log(`  ✅ Scraped Cambridge data for: ${cognate.word}`);
      } else {
        console.log(`  ⚠️  No Cambridge data found for: ${cognate.word}`);
      }
      
      // Small delay to be respectful
      await new Promise(resolve => setTimeout(resolve, 1000));
    } else {
      console.log(`  ℹ️  ${cognate.word} already has Cambridge data`);
    }
    
    // Update the entry in the file
    await generator.updateEntryInFile(entry);
    updated++;
    
    console.log(`✅ Updated: ${cognate.word}`);
    
  } catch (error) {
    console.error(`❌ Error processing ${cognate.word}:`, error.message);
    errors++;
  }
}

console.log(`\n📊 SUMMARY`);
console.log("=".repeat(30));
console.log(`✅ Updated: ${updated}`);
console.log(`🔍 Newly scraped: ${scraped}`);
console.log(`❌ Errors: ${errors}`);
console.log(`\n🎉 Enhancement complete!`);

