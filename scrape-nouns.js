import { JSDOM } from "jsdom";
import { nouns } from "./src/data/dictionary/words/nouns.js";
import {
  validateWord,
  transformCambridgeData,
} from "./src/data/dictionary/schemas/word-schema.js";
import fs from "fs";

/**
 * Cambridge Dictionary Scraper for Nouns
 * Scrapes all nouns with proper part of speech matching
 */

// Helper function to wait for a random time between 3-5 seconds
function randomDelay() {
  const delay = Math.random() * 2000 + 3000; // 3000-5000ms
  return new Promise((resolve) => setTimeout(resolve, delay));
}

async function scrapeCambridgeWord(word, expectedPartOfSpeech = null) {
  const url = `https://dictionary.cambridge.org/dictionary/french-english/${word}`;

  try {
    console.log(`\n📖 Scraping: ${word} (${expectedPartOfSpeech})`);
    console.log(`🔗 URL: ${url}`);

    const response = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Check for redirects or cross-references
    const redirectElement = document.querySelector(
      ".see-also, .cross-ref, .see"
    );
    if (redirectElement) {
      const redirectText = redirectElement.textContent.trim();
      console.log(`  - Found redirect/cross-reference: "${redirectText}"`);

      const targetWord = redirectText.match(/see\s+(\w+)/i);
      if (targetWord) {
        console.log(`  - Redirecting to: ${targetWord[1]}`);
        const result = await scrapeCambridgeWord(
          targetWord[1],
          expectedPartOfSpeech
        );

        if (result && result.relationships) {
          result.relationships.push({
            type: "redirect",
            targetWord: targetWord[1],
            note: `Redirects to ${targetWord[1]}`,
            strength: 1.0,
          });
        }

        if (result) {
          result.word = word;
          result.id = `${word}-fr`;
        }

        return result;
      }
    }

    // Check if page has no content
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

        // Check both locations for part of speech: .pos.dpos and .gc.dgc within .gram.dgram
        let foundMatch = false;

        // Check primary POS location (.pos.dpos)
        const posElement = headEntry.querySelector(".pos.dpos");
        if (posElement) {
          const posText = posElement.textContent.trim().toLowerCase();
          console.log(`    Head entry ${i + 1} POS: "${posText}"`);

          // Check for exact match
          if (posText === expectedPartOfSpeech) {
            console.log(`    ✅ Found exact match in POS at index ${i + 1}`);
            foundMatch = true;
          }
          // Check for partial match (e.g., "indefinite article" contains "article")
          else if (posText.includes(expectedPartOfSpeech)) {
            console.log(`    ✅ Found partial match in POS at index ${i + 1}`);
            foundMatch = true;
          }
          // Flexible matching for nouns
          else if (
            expectedPartOfSpeech === "noun" &&
            (posText.includes("noun") ||
              posText.includes("n.") ||
              posText.includes("substantive") ||
              posText.includes("masculine") ||
              posText.includes("feminine"))
          ) {
            console.log(
              `    ✅ Found flexible noun match in POS at index ${i + 1}`
            );
            foundMatch = true;
          }
        }

        // Check grammar section (.gc.dgc within .gram.dgram) - multiple items possible
        if (!foundMatch) {
          const grammarElements = headEntry.querySelectorAll(
            ".gram.dgram .gc.dgc"
          );
          if (grammarElements.length > 0) {
            console.log(
              `    Head entry ${i + 1} Grammar items: ${grammarElements.length}`
            );

            for (let j = 0; j < grammarElements.length; j++) {
              const grammarText = grammarElements[j].textContent
                .trim()
                .toLowerCase();
              console.log(`      Grammar item ${j + 1}: "${grammarText}"`);

              // Check for exact match
              if (grammarText === expectedPartOfSpeech) {
                console.log(
                  `    ✅ Found exact match in grammar at index ${
                    i + 1
                  }, item ${j + 1}`
                );
                foundMatch = true;
                break;
              }
              // Check for partial match
              else if (grammarText.includes(expectedPartOfSpeech)) {
                console.log(
                  `    ✅ Found partial match in grammar at index ${
                    i + 1
                  }, item ${j + 1}`
                );
                foundMatch = true;
                break;
              }
            }
          }
        }

        // If we found a match in either location, use this head entry
        if (foundMatch) {
          targetHeadEntry = headEntry;
          break;
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
        `  - Found ${exampleElements.length} examples in target def-block`
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
              lang: "en", // Target language for the example translation
              text: frenchText,
              trans: englishTranslation,
              source: "cambridge",
            });
          } else {
            // Single line - assume it's French without translation
            wordData.examples.push({
              lang: "en", // Target language for the example (even if no explicit trans)
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

    // Log scraped data for verification
    console.log(`✅ Scraped ${word}:`);
    console.log(`  - Translations: ${wordData.translations.length}`);
    console.log(
      `  - First few translations: ${JSON.stringify(
        wordData.translations.slice(0, 3)
      )}`
    );
    console.log(`  - Examples: ${wordData.examples.length}`);
    console.log(`  - Phonetic: ${wordData.phonetic || "N/A"}`);
    console.log(`  - Part of Speech: ${wordData.partOfSpeech}`);
    console.log(`  - Synonyms: ${wordData.synonyms.length}`);
    console.log(`  - Antonyms: ${wordData.antonyms.length}`);

    // Validate with Zod schema
    const validationResult = validateWord(transformCambridgeData(wordData));

    if (validationResult.success) {
      console.log(`✅ ${word} validation passed!`);
      return validationResult.data;
    } else {
      console.error(`❌ ${word} validation failed:`);
      console.error(`🚨 Errors: ${JSON.stringify(validationResult.errors)}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error scraping ${word}: ${error.message}`);
    return null;
  }
}

async function scrapeAllNouns() {
  console.log(`\n🚀 Starting Cambridge scraping for ${nouns.size} nouns...`);

  const scrapedNouns = new Map();
  const failedNouns = [];

  let count = 0;
  for (const [id, nounData] of nouns) {
    count++;
    console.log(
      `\n📝 Processing ${count}/${nouns.size}: ${nounData.word} (${nounData.partOfSpeech})`
    );

    try {
      const scrapedData = await scrapeCambridgeWord(
        nounData.word,
        nounData.partOfSpeech
      );

      if (scrapedData) {
        scrapedNouns.set(id, scrapedData);
        console.log(`✅ Successfully scraped ${nounData.word}`);
      } else {
        failedNouns.push({
          word: nounData.word,
          reason: "No data returned",
        });
        console.log(`❌ Failed to scrape ${nounData.word} - no data returned`);
      }
    } catch (error) {
      failedNouns.push({
        word: nounData.word,
        reason: error.message,
      });
      console.log(`❌ Failed to scrape ${nounData.word} - ${error.message}`);
    }

    // Wait random 3-5 seconds between requests
    if (count < nouns.size) {
      console.log(`⏳ Waiting before next request...`);
      await randomDelay();
    }
  }

  // Save results
  const outputData = {
    scraped_at: new Date().toISOString(),
    total_nouns: nouns.size,
    successful_scrapes: scrapedNouns.size,
    failed_scrapes: failedNouns.length,
    nouns: Object.fromEntries(scrapedNouns),
    failed_nouns: failedNouns,
  };

  const outputPath = "src/data/dictionary/words/cambridge/nouns.js";
  const outputContent = `/**
 * Cambridge Dictionary Scraped Nouns
 * Generated: ${new Date().toISOString()}
 * Successfully scraped: ${scrapedNouns.size}/${nouns.size}
 */

export const nounsCambridge = new Map([
${Array.from(scrapedNouns.entries())
  .map(([id, data]) => `  ["${id}", ${JSON.stringify(data, null, 4)}]`)
  .join(",\n")}
]);

export const scrapeStats = {
  scraped_at: "${outputData.scraped_at}",
  total_nouns: ${outputData.total_nouns},
  successful_scrapes: ${outputData.successful_scrapes},
  failed_scrapes: ${outputData.failed_scrapes},
  failed_nouns: ${JSON.stringify(outputData.failed_nouns, null, 2)}
};
`;

  fs.writeFileSync(outputPath, outputContent);

  console.log(`\n🎉 Scraping complete!`);
  console.log(`📊 Results:`);
  console.log(`  - Total nouns: ${nouns.size}`);
  console.log(`  - Successfully scraped: ${scrapedNouns.size}`);
  console.log(`  - Failed: ${failedNouns.length}`);
  console.log(`  - Saved to: ${outputPath}`);

  if (failedNouns.length > 0) {
    console.log(`\n❌ Failed nouns:`);
    failedNouns.forEach((failed) => {
      console.log(`  - ${failed.word}: ${failed.reason}`);
    });
  }
}

// Run the scraper
scrapeAllNouns().catch(console.error);
