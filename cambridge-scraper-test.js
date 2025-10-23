import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import {
  validateWord,
  transformCambridgeData,
} from "./src/data/dictionary/schemas/word-schema.js";

/**
 * Cambridge Dictionary Scraper - Test Version
 * Scrapes French-English entries and converts to enhanced schema
 */

console.log("🔍 Cambridge Dictionary Scraper Test");
console.log("=".repeat(50));

// Test words to scrape
const testWords = [
  { word: "chien", type: "noun" },
  { word: "salut", type: "interjection" },
];

async function scrapeCambridgeWord(word, expectedPartOfSpeech = null) {
  const url = `https://dictionary.cambridge.org/dictionary/french-english/${word}`;

  try {
    console.log(`\n📖 Scraping: ${word}`);
    console.log(`🔗 URL: ${url}`);

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Check for redirects or cross-references (like "belle" -> "beau")
    const redirectElement = document.querySelector(
      ".see-also, .cross-ref, .see"
    );
    if (redirectElement) {
      const redirectText = redirectElement.textContent.trim();
      console.log(`  - Found redirect/cross-reference: "${redirectText}"`);

      // Extract the target word from the redirect
      const targetWord = redirectText.match(/see\s+(\w+)/i);
      if (targetWord) {
        console.log(`  - Redirecting to: ${targetWord[1]}`);

        // Recursively scrape the target word
        const result = await scrapeCambridgeWord(targetWord[1]);

        // Add relationship for redirect to the result
        if (result && result.relationships) {
          result.relationships.push({
            type: "redirect",
            targetWord: targetWord[1],
            note: `Redirects to ${targetWord[1]}`,
            strength: 1.0,
          });
        }

        // Update the word to be the original word (belle) not the target (beau)
        if (result) {
          result.word = word;
          result.id = `${word}-fr`;
        }

        return result;
      }
    }

    // Check if page has no content (404 or redirect)
    const noContent = document.querySelector(
      ".no-results, .error-404, .not-found"
    );
    if (noContent) {
      console.log(`  - No content found for ${word}`);
      return null;
    }

    // Extract basic word info
    const wordData = {
      word: word,
      lang: "fr",
      id: `${word}-fr`,
      partOfSpeech: "unknown",
      translations: [],
      examples: [],
      phonetic: null,
      etymology: null,
      register: [],
      usage_notes: null,
      synonyms: [],
      antonyms: [],
      relationships: [],
    };

    // Look for the specific Cambridge structure: dpos-h di-head normal-entry
    const headEntries = document.querySelectorAll(
      ".dpos-h.di-head.normal-entry"
    );
    console.log(
      `  - Found ${headEntries.length} head entries with dpos-h di-head normal-entry`
    );

    let targetHeadEntry = null;
    if (expectedPartOfSpeech) {
      console.log(
        `  - Looking for head entry with part of speech: ${expectedPartOfSpeech}`
      );

      for (let i = 0; i < headEntries.length; i++) {
        const headEntry = headEntries[i];

        // Look for the part of speech within this specific structure
        const posElement = headEntry.querySelector(".pos.dpos");
        if (posElement) {
          const posText = posElement.textContent.trim().toLowerCase();
          console.log(`    Head entry ${i + 1}: "${posText}"`);

          if (posText === expectedPartOfSpeech) {
            console.log(`    ✅ Found matching head entry at index ${i + 1}`);
            targetHeadEntry = headEntry;
            break;
          }
        } else {
          console.log(`    Head entry ${i + 1}: No POS element found`);
        }
      }

      if (!targetHeadEntry) {
        console.log(`  - ❌ No matching part of speech found, failing scrape`);
        return null;
      }
    } else {
      targetHeadEntry = headEntries[0];
    }

    // Find the corresponding definition block for the target head entry
    let targetDefBlock = null;
    if (targetHeadEntry) {
      // Look for the associated definition block - try multiple selectors
      let defBlock = targetHeadEntry.querySelector(
        ".di-body.normal-entry-body"
      );

      if (!defBlock) {
        // Try finding it in the next sibling or parent container
        defBlock =
          targetHeadEntry.nextElementSibling?.querySelector(".di-body");
      }

      if (!defBlock) {
        // Try finding it in the parent container
        defBlock = targetHeadEntry.parentElement?.querySelector(".di-body");
      }

      if (defBlock) {
        targetDefBlock = defBlock;
        console.log(`  - Found associated definition block`);
      } else {
        console.log(`  - ❌ No definition block found for head entry`);
        return null;
      }
    }

    if (targetDefBlock) {
      // Get the French definition (the word before the translation)
      const definitionElement = targetDefBlock.querySelector(".def-body .def");
      if (definitionElement) {
        const definitionText = definitionElement.textContent.trim();
        if (definitionText && definitionText.length > 0) {
          console.log(`  - Found French definition: "${definitionText}"`);
          wordData.definition = definitionText;
        }
      }

      // Get the main translation (first .trans in the def-block)
      const mainTranslation = targetDefBlock.querySelector(".trans");
      if (mainTranslation) {
        const text = mainTranslation.textContent.trim();
        if (text && text.length > 0) {
          console.log(`  - Found main translation: "${text}"`);
          wordData.translations.push(text);
        }
      }
    }

    // Extract examples from the target def-block
    if (targetDefBlock) {
      const exampleElements = targetDefBlock.querySelectorAll(".examp");
      console.log(
        `  - Found ${exampleElements.length} examples in first def-block`
      );

      exampleElements.forEach((el) => {
        const fullText = el.textContent.trim();
        if (fullText && fullText.length > 5) {
          // Parse the example to extract French text and English translation
          const lines = fullText
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line.length > 0);

          if (lines.length >= 2) {
            // First line is usually French, second line is English translation
            const frenchText = lines[0];
            const englishTranslation = lines[1];

            wordData.examples.push({
              lang: "en",
              text: frenchText,
              trans: englishTranslation,
              source: "cambridge",
            });
          } else {
            // Single line - assume it's French without translation
            wordData.examples.push({
              lang: "en",
              text: fullText,
              source: "cambridge",
            });
          }
        }
      });
    }

    // Extract phonetic pronunciation - try multiple selectors
    const phoneticSelectors = [
      ".pron .ipa",
      ".ipa",
      ".pron",
      ".pronunciation .ipa",
      ".phonetic",
    ];

    for (const selector of phoneticSelectors) {
      const phoneticElement = document.querySelector(selector);
      if (phoneticElement) {
        const phoneticText = phoneticElement.textContent.trim();
        if (phoneticText && phoneticText.length > 0) {
          console.log(`  - Found phonetic: "${phoneticText}"`);
          wordData.phonetic = phoneticText;
          break;
        }
      }
    }

    // Use the part of speech from the target head entry we found
    if (targetHeadEntry) {
      const posElement = targetHeadEntry.querySelector(".pos.dpos");
      if (posElement) {
        const pos = posElement.textContent.trim().toLowerCase();
        console.log(`  - Using POS from target head entry: "${pos}"`);
        wordData.partOfSpeech = pos;
      } else {
        console.log(`  - No POS element found in target head entry`);
        wordData.partOfSpeech = expectedPartOfSpeech || "unknown";
      }
    } else {
      console.log(`  - No target head entry, using fallback`);
      wordData.partOfSpeech = expectedPartOfSpeech || "unknown";
    }

    // Extract etymology if available
    const etymologyElement = document.querySelector(".etymology");
    if (etymologyElement) {
      wordData.etymology = etymologyElement.textContent.trim();
    } else {
      wordData.etymology = ""; // Provide empty string instead of null
    }

    // Extract usage notes
    const usageElement = document.querySelector(".usage-note");
    if (usageElement) {
      wordData.usage_notes = usageElement.textContent.trim();
    } else {
      wordData.usage_notes = ""; // Provide empty string instead of null
    }

    // Extract synonyms
    const synonymElements = document.querySelectorAll(".synonyms .syn");
    synonymElements.forEach((el) => {
      const text = el.textContent.trim();
      if (text) {
        wordData.synonyms.push(text);
      }
    });

    // Extract antonyms
    const antonymElements = document.querySelectorAll(".antonyms .ant");
    antonymElements.forEach((el) => {
      const text = el.textContent.trim();
      if (text) {
        wordData.antonyms.push(text);
      }
    });

    console.log(`✅ Scraped ${word}:`);
    console.log(`  - Translations: ${wordData.translations.length}`);
    if (wordData.translations.length > 0) {
      console.log(
        `  - First few translations:`,
        wordData.translations.slice(0, 3)
      );
    }
    console.log(`  - Examples: ${wordData.examples.length}`);
    console.log(`  - Phonetic: ${wordData.phonetic || "none"}`);
    console.log(`  - Part of Speech: ${wordData.partOfSpeech}`);
    console.log(`  - Synonyms: ${wordData.synonyms.length}`);
    console.log(`  - Antonyms: ${wordData.antonyms.length}`);

    return wordData;
  } catch (error) {
    console.error(`❌ Error scraping ${word}:`, error.message);
    return null;
  }
}

async function testScraping() {
  console.log(`\n🚀 Testing Cambridge scraper on ${testWords.length} words...`);

  for (const { word, type } of testWords) {
    const scrapedData = await scrapeCambridgeWord(word, type);

    if (scrapedData) {
      // Transform to enhanced schema format
      const transformedData = transformCambridgeData(scrapedData);

      // Add basic required fields
      const enhancedWord = {
        id: `${word}-fr`,
        language: "fr",
        word: word,
        partOfSpeech: scrapedData.partOfSpeech,
        ...transformedData,
        // Add curriculum tracking
        unit: "test",
        module: "scraped",
        lesson: "cambridge-test",
        sources: ["cambridge"],
        verified: false,
      };

      // Validate with schema
      const validation = validateWord(enhancedWord);

      if (validation.success) {
        console.log(`\n✅ ${word} validation passed!`);
        console.log(
          `📊 Enhanced data:`,
          JSON.stringify(validation.data, null, 2)
        );
      } else {
        console.log(`\n❌ ${word} validation failed:`);
        console.log(`🚨 Errors:`, validation.errors);
      }
    }

    // Wait between requests to be respectful
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log("\n🎉 Cambridge scraping test complete!");
}

// Run the test
testScraping().catch(console.error);
