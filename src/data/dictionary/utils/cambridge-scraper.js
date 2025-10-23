import fetch from "node-fetch";
import { JSDOM } from "jsdom";

/**
 * Cambridge Dictionary Scraper
 * Scrapes French-English translations from Cambridge Dictionary
 * Based on structure analysis of https://dictionary.cambridge.org/dictionary/french-english/
 */

class CambridgeScraper {
  constructor() {
    this.baseUrl = "https://dictionary.cambridge.org/dictionary/french-english";
    this.headers = {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    };
    this.delay = 1000; // 1 second delay between requests
  }

  /**
   * Scrape a single French word from Cambridge Dictionary
   * @param {string} frenchWord - The French word to look up
   * @returns {Object} - Scraped dictionary data
   */
  async scrapeWord(frenchWord) {
    const url = `${this.baseUrl}/${encodeURIComponent(frenchWord)}`;

    console.log(`🔍 Scraping: ${frenchWord}`);
    console.log(`📖 URL: ${url}`);

    try {
      const response = await fetch(url, { headers: this.headers });

      if (!response.ok) {
        if (response.status === 404) {
          console.log(`❌ Word not found: ${frenchWord}`);
          return { word: frenchWord, found: false, error: "Word not found" };
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const html = await response.text();
      const dom = new JSDOM(html);
      const document = dom.window.document;

      // Extract data using the CSS selectors we identified
      const result = this.extractWordData(document, frenchWord);

      console.log(`✅ Successfully scraped: ${frenchWord}`);
      return result;
    } catch (error) {
      console.error(`❌ Error scraping ${frenchWord}:`, error.message);
      return { word: frenchWord, found: false, error: error.message };
    }
  }

  /**
   * Extract word data from the parsed HTML document
   * @param {Document} document - The parsed HTML document
   * @param {string} frenchWord - The original French word
   * @returns {Object} - Extracted word data
   */
  extractWordData(document, frenchWord) {
    const data = {
      word: frenchWord,
      found: true,
      translations: [],
      definitions: [],
      examples: [],
      pronunciations: [],
      partsOfSpeech: [],
      source: "cambridge",
    };

    // Extract English translations (.trans class)
    const translations = document.querySelectorAll(".trans");
    translations.forEach((el) => {
      const text = el.textContent?.trim();
      if (text && text !== frenchWord) {
        data.translations.push(text);
      }
    });

    // Extract French definitions (.def class)
    const definitions = document.querySelectorAll(".def");
    definitions.forEach((el) => {
      const text = el.textContent?.trim();
      if (text) {
        data.definitions.push(text);
      }
    });

    // Extract examples (.examp class)
    const examples = document.querySelectorAll(".examp");
    examples.forEach((el) => {
      const text = el.textContent?.trim();
      if (text) {
        data.examples.push(text);
      }
    });

    // Extract pronunciations (.pron class)
    const pronunciations = document.querySelectorAll(".pron");
    pronunciations.forEach((el) => {
      const text = el.textContent?.trim();
      if (text) {
        data.pronunciations.push(text);
      }
    });

    // Extract parts of speech (.pos class)
    const posElements = document.querySelectorAll(".pos");
    posElements.forEach((el) => {
      const text = el.textContent?.trim();
      if (text) {
        data.partsOfSpeech.push(text);
      }
    });

    // Remove duplicates
    data.translations = [...new Set(data.translations)];
    data.definitions = [...new Set(data.definitions)];
    data.examples = [...new Set(data.examples)];
    data.pronunciations = [...new Set(data.pronunciations)];
    data.partsOfSpeech = [...new Set(data.partsOfSpeech)];

    return data;
  }

  /**
   * Scrape multiple words with delay between requests
   * @param {string[]} words - Array of French words to scrape
   * @returns {Object[]} - Array of scraped word data
   */
  async scrapeWords(words) {
    const results = [];

    console.log(`🚀 Starting to scrape ${words.length} words...`);
    console.log("=".repeat(50));

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      console.log(`\n📝 Word ${i + 1}/${words.length}: ${word}`);

      const result = await this.scrapeWord(word);
      results.push(result);

      // Add delay between requests to be respectful
      if (i < words.length - 1) {
        console.log(`⏳ Waiting ${this.delay}ms before next request...`);
        await new Promise((resolve) => setTimeout(resolve, this.delay));
      }
    }

    return results;
  }

  /**
   * Format scraped data for display
   * @param {Object} data - Scraped word data
   * @returns {string} - Formatted string
   */
  formatWordData(data) {
    if (!data.found) {
      return `❌ ${data.word}: ${data.error}`;
    }

    let output = `\n🇫🇷 ${data.word}\n`;
    output += "=".repeat(30) + "\n";

    if (data.translations.length > 0) {
      output += `🇬🇧 Translations: ${data.translations.join(", ")}\n`;
    }

    if (data.partsOfSpeech.length > 0) {
      output += `📚 Part of speech: ${data.partsOfSpeech.join(", ")}\n`;
    }

    if (data.pronunciations.length > 0) {
      output += `🔊 Pronunciation: ${data.pronunciations.join(", ")}\n`;
    }

    if (data.definitions.length > 0) {
      output += `📝 Definitions:\n`;
      data.definitions.forEach((def, i) => {
        output += `   ${i + 1}. ${def}\n`;
      });
    }

    if (data.examples.length > 0) {
      output += `💬 Examples:\n`;
      data.examples.slice(0, 3).forEach((ex, i) => {
        output += `   ${i + 1}. ${ex}\n`;
      });
    }

    return output;
  }
}

// Test the scraper
async function testScraper() {
  const scraper = new CambridgeScraper();

  // Test words
  const testWords = ["maintenant", "bonjour", "merci", "au revoir", "comment"];

  console.log("🧪 Testing Cambridge Dictionary Scraper");
  console.log("=".repeat(50));

  const results = await scraper.scrapeWords(testWords);

  console.log("\n📊 SCRAPING RESULTS");
  console.log("=".repeat(50));

  results.forEach((result) => {
    console.log(scraper.formatWordData(result));
  });

  // Summary
  const successful = results.filter((r) => r.found).length;
  const failed = results.filter((r) => !r.found).length;

  console.log("\n📈 SUMMARY");
  console.log("-".repeat(20));
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📊 Total: ${results.length}`);

  return results;
}

// Export the scraper
export { CambridgeScraper };

// Export default instance
export default new CambridgeScraper();

// Run the test only if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testScraper().catch(console.error);
}
