/**
 * Extract Remaining Verb Phrases
 * Find all phrases starting with subject pronouns (je, tu, il, elle, nous, vous, ils, elles, on)
 * that are still in phrases.js and add them to phrases-target-list.js for review
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to phrases.js
const phrasesPath = path.join(__dirname, "src/data/dictionary/phrases.js");

console.log("🔍 Extracting remaining verb phrases (subject pronoun + verb)...");

try {
  // Read the phrases file
  const content = fs.readFileSync(phrasesPath, "utf8");

  // Extract the Map content using regex
  const mapMatch = content.match(
    /export const phrases = new Map\(\[([\s\S]*?)\]\);/m
  );

  if (!mapMatch) {
    console.log("❌ Could not find phrases Map in file");
    process.exit(1);
  }

  // Parse the Map content
  const mapContent = `[${mapMatch[1]}]`;
  const entries = eval(mapContent);

  console.log(`📊 Found ${entries.length} total phrases in original file`);

  // Filter phrases that start with subject pronouns
  const verbPhrases = entries.filter(([id, entry]) => {
    const word = entry.word;

    // Check if it starts with subject pronouns
    const startsWithSubjectPronoun =
      word.startsWith("je ") ||
      word.startsWith("j'") ||
      word.startsWith("tu ") ||
      word.startsWith("il ") ||
      word.startsWith("elle ") ||
      word.startsWith("nous ") ||
      word.startsWith("vous ") ||
      word.startsWith("ils ") ||
      word.startsWith("elles ") ||
      word.startsWith("on ") ||
      word.startsWith("il/elle ") ||
      word.startsWith("ils/elles ");

    return startsWithSubjectPronoun;
  });

  console.log(
    `📊 Found ${verbPhrases.length} remaining verb phrases with subject pronouns`
  );

  // Extract word information
  const phrasesList = verbPhrases.map(([id, entry]) => ({
    id: entry.id,
    word: entry.word,
    translation: entry.translations[0]?.text || "No translation",
    definition: entry.translations[0]?.definition || "",
    partOfSpeech: entry.partOfSpeech,
    gender: entry.gender,
    cefr_level: entry.cefr_level,
    difficulty: entry.difficulty,
    source: entry.source,
    tags: entry.tags || [],
  }));

  // Sort by word for easier review
  phrasesList.sort((a, b) => a.word.localeCompare(b.word));

  // Categorize by pronoun type
  const jePhrases = phrasesList.filter(
    (phrase) => phrase.word.startsWith("je ") || phrase.word.startsWith("j'")
  );

  const tuPhrases = phrasesList.filter((phrase) =>
    phrase.word.startsWith("tu ")
  );

  const ilEllePhrases = phrasesList.filter(
    (phrase) => phrase.word.startsWith("il ") || phrase.word.startsWith("elle ")
  );

  const ilsEllesPhrases = phrasesList.filter(
    (phrase) =>
      phrase.word.startsWith("ils ") || phrase.word.startsWith("elles ")
  );

  const nousPhrases = phrasesList.filter((phrase) =>
    phrase.word.startsWith("nous ")
  );

  const vousPhrases = phrasesList.filter((phrase) =>
    phrase.word.startsWith("vous ")
  );

  const onPhrases = phrasesList.filter((phrase) =>
    phrase.word.startsWith("on ")
  );

  const ilElleCombinedPhrases = phrasesList.filter((phrase) =>
    phrase.word.startsWith("il/elle ")
  );

  const ilsEllesCombinedPhrases = phrasesList.filter((phrase) =>
    phrase.word.startsWith("ils/elles ")
  );

  // Create target list content
  const targetListContent = `/**
 * Phrases Target List
 * Manual classification of phrases for proper categorization
 * UPDATED: Remaining verb phrases (subject pronoun + verb) extracted for review
 */

// JE PHRASES - Phrases starting with "je " or "j'"
const jePhrases = [
${jePhrases
  .map(
    (phrase) =>
      `  "${phrase.word}", // ${phrase.translation} (${phrase.partOfSpeech})`
  )
  .join("\n")}
];

// TU PHRASES - Phrases starting with "tu "
const tuPhrases = [
${tuPhrases
  .map(
    (phrase) =>
      `  "${phrase.word}", // ${phrase.translation} (${phrase.partOfSpeech})`
  )
  .join("\n")}
];

// IL/ELLE PHRASES - Phrases starting with "il " or "elle "
const ilEllePhrases = [
${ilEllePhrases
  .map(
    (phrase) =>
      `  "${phrase.word}", // ${phrase.translation} (${phrase.partOfSpeech})`
  )
  .join("\n")}
];

// ILS/ELLES PHRASES - Phrases starting with "ils " or "elles "
const ilsEllesPhrases = [
${ilsEllesPhrases
  .map(
    (phrase) =>
      `  "${phrase.word}", // ${phrase.translation} (${phrase.partOfSpeech})`
  )
  .join("\n")}
];

// NOUS PHRASES - Phrases starting with "nous "
const nousPhrases = [
${nousPhrases
  .map(
    (phrase) =>
      `  "${phrase.word}", // ${phrase.translation} (${phrase.partOfSpeech})`
  )
  .join("\n")}
];

// VOUS PHRASES - Phrases starting with "vous "
const vousPhrases = [
${vousPhrases
  .map(
    (phrase) =>
      `  "${phrase.word}", // ${phrase.translation} (${phrase.partOfSpeech})`
  )
  .join("\n")}
];

// ON PHRASES - Phrases starting with "on "
const onPhrases = [
${onPhrases
  .map(
    (phrase) =>
      `  "${phrase.word}", // ${phrase.translation} (${phrase.partOfSpeech})`
  )
  .join("\n")}
];

// IL/ELLE COMBINED PHRASES - Phrases starting with "il/elle "
const ilElleCombinedPhrases = [
${ilElleCombinedPhrases
  .map(
    (phrase) =>
      `  "${phrase.word}", // ${phrase.translation} (${phrase.partOfSpeech})`
  )
  .join("\n")}
];

// ILS/ELLES COMBINED PHRASES - Phrases starting with "ils/elles "
const ilsEllesCombinedPhrases = [
${ilsEllesCombinedPhrases
  .map(
    (phrase) =>
      `  "${phrase.word}", // ${phrase.translation} (${phrase.partOfSpeech})`
  )
  .join("\n")}
];

// MASCULINE NOUNS - Phrases starting with "le " or "un " (capitalized)
const masculineNouns = [
  // All migrated - array cleared
];

// FEMININE NOUNS - Phrases starting with "la " or "une " (capitalized)
const feminineNouns = [
  // All migrated - array cleared
];

// PLURAL NOUNS - Phrases starting with "les " (capitalized)
const pluralNouns = [
  // All migrated - array cleared
];

// CONTRACTED NOUNS - Phrases starting with "l'" (capitalized, need manual gender determination)
const contractedNouns = [
  // All migrated - array cleared
];

// QUESTIONS - Question phrases and interrogative expressions
const questions = [
  // All migrated - array cleared
];

// EXPRESSIONS - Common French expressions and idiomatic phrases
const expressions = [
  // All migrated - array cleared
];

// GREETINGS - Greetings, farewells, and social interactions
const greetings = [
  // All migrated - array cleared
];

// PREPOSITIONAL PHRASES - Phrases starting with prepositions
const prepositionalPhrases = [
  // All migrated - array cleared
];

// VERB PHRASES - Verb conjugations and verb combinations
const verbPhrases = [
  // All migrated - array cleared
];

// ADJECTIVE PHRASES - Adjective combinations and comparative forms
const adjectivePhrases = [
  // All migrated - array cleared
];

// ARTICLE PHRASES - Article combinations
const articlePhrases = [
  // All migrated - array cleared
];

// PRONOUN PHRASES - Pronoun combinations (these are actually verb phrases)
const pronounPhrases = [
  // These are actually verb phrases with pronouns, not separate pronoun phrases
];

// TIME EXPRESSIONS - Time-related phrases
const timeExpressions = [
  // All migrated - array cleared
];

// LOCATION PHRASES - Location and place-related phrases
const locationPhrases = [
  // All migrated - array cleared
];

// PROPER NOUNS - Proper nouns and names
const properNouns = [
  // All migrated - array cleared
];

// CONJUNCTION PHRASES - Conjunction combinations
const conjunctionPhrases = [
  // All migrated - array cleared
];

// Export the arrays
export {
  jePhrases,
  tuPhrases,
  ilEllePhrases,
  ilsEllesPhrases,
  nousPhrases,
  vousPhrases,
  onPhrases,
  ilElleCombinedPhrases,
  ilsEllesCombinedPhrases,
  masculineNouns,
  feminineNouns,
  pluralNouns,
  contractedNouns,
  questions,
  expressions,
  greetings,
  prepositionalPhrases,
  verbPhrases,
  adjectivePhrases,
  articlePhrases,
  pronounPhrases,
  timeExpressions,
  locationPhrases,
  properNouns,
  conjunctionPhrases,
};

// Summary statistics
export const summary = {
  totalPhrases: ${
    phrasesList.length
  }, // Remaining verb phrases (subject pronoun + verb) extracted for review
  breakdown: {
    jePhrases: jePhrases.length,
    tuPhrases: tuPhrases.length,
    ilEllePhrases: ilEllePhrases.length,
    ilsEllesPhrases: ilsEllesPhrases.length,
    nousPhrases: nousPhrases.length,
    vousPhrases: vousPhrases.length,
    onPhrases: onPhrases.length,
    ilElleCombinedPhrases: ilElleCombinedPhrases.length,
    ilsEllesCombinedPhrases: ilsEllesCombinedPhrases.length,
    masculineNouns: masculineNouns.length,
    feminineNouns: feminineNouns.length,
    pluralNouns: pluralNouns.length,
    contractedNouns: contractedNouns.length,
    questions: questions.length,
    expressions: expressions.length,
    greetings: greetings.length,
    prepositionalPhrases: prepositionalPhrases.length,
    verbPhrases: verbPhrases.length,
    adjectivePhrases: adjectivePhrases.length,
    articlePhrases: articlePhrases.length,
    pronounPhrases: pronounPhrases.length,
    timeExpressions: timeExpressions.length,
    locationPhrases: locationPhrases.length,
    properNouns: properNouns.length,
    conjunctionPhrases: conjunctionPhrases.length,
  },
  status: "Remaining verb phrases (subject pronoun + verb) extracted for manual review and classification",
};
`;

  // Write the updated target list
  fs.writeFileSync("phrases-target-list.js", targetListContent);

  console.log("✅ Updated phrases-target-list.js with remaining verb phrases");
  console.log(`📊 Total remaining verb phrases: ${phrasesList.length}`);
  console.log(`📁 Output file: phrases-target-list.js`);

  // Show some statistics
  console.log("\n📈 REMAINING VERB PHRASES BREAKDOWN:");
  console.log(`  Je (I): ${jePhrases.length}`);
  console.log(`  Tu (You): ${tuPhrases.length}`);
  console.log(`  Il/Elle (He/She): ${ilEllePhrases.length}`);
  console.log(`  Ils/Elles (They): ${ilsEllesPhrases.length}`);
  console.log(`  Nous (We): ${nousPhrases.length}`);
  console.log(`  Vous (You): ${vousPhrases.length}`);
  console.log(`  On (We/One): ${onPhrases.length}`);
  console.log(`  Il/Elle Combined: ${ilElleCombinedPhrases.length}`);
  console.log(`  Ils/Elles Combined: ${ilsEllesCombinedPhrases.length}`);

  // Show some examples from each category
  console.log("\n🔍 SAMPLE JE PHRASES:");
  jePhrases.slice(0, 5).forEach((phrase, index) => {
    console.log(
      `  ${index + 1}. "${phrase.word}" - "${phrase.translation}" (${
        phrase.partOfSpeech
      })`
    );
  });
  if (jePhrases.length > 5) {
    console.log(`  ... and ${jePhrases.length - 5} more`);
  }

  console.log("\n🔍 SAMPLE TU PHRASES:");
  tuPhrases.slice(0, 5).forEach((phrase, index) => {
    console.log(
      `  ${index + 1}. "${phrase.word}" - "${phrase.translation}" (${
        phrase.partOfSpeech
      })`
    );
  });
  if (tuPhrases.length > 5) {
    console.log(`  ... and ${tuPhrases.length - 5} more`);
  }

  console.log("\n🔍 SAMPLE IL/ELLE PHRASES:");
  ilEllePhrases.slice(0, 5).forEach((phrase, index) => {
    console.log(
      `  ${index + 1}. "${phrase.word}" - "${phrase.translation}" (${
        phrase.partOfSpeech
      })`
    );
  });
  if (ilEllePhrases.length > 5) {
    console.log(`  ... and ${ilEllePhrases.length - 5} more`);
  }

  console.log("\n🔍 SAMPLE NOUS PHRASES:");
  nousPhrases.slice(0, 5).forEach((phrase, index) => {
    console.log(
      `  ${index + 1}. "${phrase.word}" - "${phrase.translation}" (${
        phrase.partOfSpeech
      })`
    );
  });
  if (nousPhrases.length > 5) {
    console.log(`  ... and ${nousPhrases.length - 5} more`);
  }

  console.log("\n🔍 SAMPLE VOUS PHRASES:");
  vousPhrases.slice(0, 5).forEach((phrase, index) => {
    console.log(
      `  ${index + 1}. "${phrase.word}" - "${phrase.translation}" (${
        phrase.partOfSpeech
      })`
    );
  });
  if (vousPhrases.length > 5) {
    console.log(`  ... and ${vousPhrases.length - 5} more`);
  }
} catch (error) {
  console.error("❌ Error extracting remaining verb phrases:", error.message);
  process.exit(1);
}
