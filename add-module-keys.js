/**
 * Script to add moduleKeys to all modules systematically
 * Uses incremental dates to ensure no duplicates
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Complete module list in pedagogical order with incremental dates
const moduleKeyAssignments = [
  // Unit 1 (2024-01-01 to 2024-01-11)
  {
    file: "unit1/famous-words.js",
    export: "famousWords",
    key: "2024-01-01-famous-words",
  },
  { file: "unit1/pronouns.js", export: "module1", key: "2024-01-02-pronouns" },
  { file: "unit1/etre.js", export: "module3_etre", key: "2024-01-03-etre" },
  { file: "unit1/avoir.js", export: "module4_avoir", key: "2024-01-04-avoir" },
  { file: "unit1/articles.js", export: "articles", key: "2024-01-05-articles" },
  {
    file: "unit1/basic-nouns.js",
    export: "basicNouns",
    key: "2024-01-06-basic-nouns",
  },
  { file: "unit1/plurals.js", export: "plurals", key: "2024-01-07-plurals" },
  {
    file: "unit1/connectors.js",
    export: "connectors",
    key: "2024-01-08-connectors",
  },
  {
    file: "unit1/reading-1.js",
    export: "reading1",
    key: "2024-01-09-reading1",
  },
  {
    file: "unit1/unit-1-practice.js",
    export: "unit1Practice",
    key: "2024-01-10-unit1-practice",
  },
  {
    file: "unit1/unit-1-exam.js",
    export: "unit1Exam",
    key: "2024-01-11-unit1-exam",
  },

  // Unit 2 (2024-01-12 to 2024-01-24)
  {
    file: "unit2/demonstratives.js",
    export: "module2_demonstratives",
    key: "2024-01-12-demonstratives",
  },
  {
    file: "unit2/ca-survival.js",
    export: "caSurvival",
    key: "2024-01-13-ca-survival",
  },
  {
    file: "unit2/determiners-with-nouns.js",
    export: "determinersWithNouns",
    key: "2024-01-14-determiners-nouns",
  },
  {
    file: "unit2/vouloir.js",
    export: "vouloirModule",
    key: "2024-01-15-vouloir",
  },
  {
    file: "unit2/pouvoir.js",
    export: "pouvoirModule",
    key: "2024-01-16-pouvoir",
  },
  { file: "unit2/voir.js", export: "voirModule", key: "2024-01-17-voir" },
  {
    file: "unit2/questions.js",
    export: "module6_questions",
    key: "2024-01-18-questions",
  },
  {
    file: "unit2/stressed-pronouns.js",
    export: "stressedPronouns",
    key: "2024-01-19-stressed-pronouns",
  },
  {
    file: "unit2/prepositions.js",
    export: "prepositions",
    key: "2024-01-20-prepositions",
  },
  {
    file: "unit2/adjectives.js",
    export: "adjectives",
    key: "2024-01-21-adjectives",
  },
  {
    file: "unit2/reading-2.js",
    export: "reading2",
    key: "2024-01-22-reading2",
  },
  {
    file: "unit2/unit-2-practice.js",
    export: "unit2Practice",
    key: "2024-01-23-unit2-practice",
  },
  {
    file: "unit2/unit-2-exam.js",
    export: "unit2Exam",
    key: "2024-01-24-unit2-exam",
  },

  // Unit 3 (2024-01-25 to 2024-02-05)
  {
    file: "unit3/contractions.js",
    export: "contractions",
    key: "2024-01-25-contractions",
  },
  { file: "unit2/venir.js", export: "venirModule", key: "2024-01-26-venir" },
  { file: "unit2/aller.js", export: "allerModule", key: "2024-01-27-aller" },
  {
    file: "unit2/verb-pattern-help.js",
    export: "verbPatternHelp",
    key: "2024-01-28-verb-pattern-help",
  },
  { file: "unit3/partir.js", export: "partirModule", key: "2024-01-29-partir" },
  {
    file: "unit3/object-pronouns.js",
    export: "module7_object_pronouns",
    key: "2024-01-30-object-pronouns",
  },
  {
    file: "unit3/possessive-adjectives.js",
    export: "module8_possessive_adjectives",
    key: "2024-01-31-possessive-adjectives",
  },
  {
    file: "unit3/possessive-pronouns.js",
    export: "module9_possessive_pronouns",
    key: "2024-02-01-possessive-pronouns",
  },
  {
    file: "unit3/combining.js",
    export: "module10_combining",
    key: "2024-02-02-combining",
  },
  {
    file: "unit3/reading-3.js",
    export: "reading3",
    key: "2024-02-03-reading3",
  },
  {
    file: "unit3/unit-3-practice.js",
    export: "unit3Practice",
    key: "2024-02-04-unit3-practice",
  },
  {
    file: "unit3/unit-3-exam.js",
    export: "unit3Exam",
    key: "2024-02-05-unit3-exam",
  },

  // Unit 12 (2024-03-15 to 2024-03-25)
  {
    file: "unit12/nature-animals.js",
    export: "natureAnimalsModule",
    key: "2024-03-15-nature-animals",
  },
  {
    file: "unit12/movement-verbs.js",
    export: "movementVerbsModule",
    key: "2024-03-16-movement-verbs",
  },
  {
    file: "unit12/natural-phenomena-verbs.js",
    export: "naturalPhenomenaModule",
    key: "2024-03-17-natural-phenomena",
  },
  {
    file: "unit12/questce-qui-que.js",
    export: "questceQuiQueModule",
    key: "2024-03-18-questce-qui-que",
  },
  {
    file: "unit12/pourquoi-complex.js",
    export: "pourquoiComplexModule",
    key: "2024-03-19-pourquoi-complex",
  },
  {
    file: "unit12/comment-complex.js",
    export: "commentComplexModule",
    key: "2024-03-20-comment-complex",
  },
  {
    file: "unit12/quiest-qui-que.js",
    export: "quiestQuiQueModule",
    key: "2024-03-21-quiest-qui-que",
  },
  {
    file: "unit12/inversion-questions.js",
    export: "inversionQuestionsModule",
    key: "2024-03-22-inversion-questions",
  },
  {
    file: "unit12/embedded-questions.js",
    export: "embeddedQuestionsModule",
    key: "2024-03-23-embedded-questions",
  },
  {
    file: "unit12/rhetorical-negative-questions.js",
    export: "rhetoricalNegativeModule",
    key: "2024-03-24-rhetorical-negative",
  },
  {
    file: "unit12/multi-clause-questions.js",
    export: "multiClauseQuestionsModule",
    key: "2024-03-25-multi-clause-questions",
  },

  // Reference (2024-04-01 to 2024-04-08)
  {
    file: "reference/alphabet.js",
    export: "alphabetModule",
    key: "2024-04-01-alphabet",
  },
  {
    file: "reference/numbers.js",
    export: "numbersModule",
    key: "2024-04-02-numbers",
  },
  {
    file: "reference/days-months.js",
    export: "daysMonthsModule",
    key: "2024-04-03-days-months",
  },
  {
    file: "reference/holidays.js",
    export: "holidaysModule",
    key: "2024-04-04-holidays",
  },
  {
    file: "reference/colors.js",
    export: "colorsModule",
    key: "2024-04-05-colors",
  },
  {
    file: "reference/french-countries.js",
    export: "frenchCountriesModule",
    key: "2024-04-06-french-countries",
  },
  {
    file: "reference/language-stats.js",
    export: "languageStatsModule",
    key: "2024-04-07-language-stats",
  },
  {
    file: "reference/french-spelling-patterns.js",
    export: "frenchSpellingPatternsModule",
    key: "2024-04-08-spelling-patterns",
  },
];

// Function to add moduleKey to a file
function addModuleKeyToFile(filePath, exportName, moduleKey) {
  try {
    const fullPath = path.join(__dirname, "src/lessons/modules", filePath);

    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  File not found: ${filePath}`);
      return false;
    }

    let content = fs.readFileSync(fullPath, "utf8");

    // Check if moduleKey already exists
    if (content.includes("moduleKey:")) {
      console.log(`✅ ${filePath} - moduleKey already exists`);
      return true;
    }

    // Find the export and add moduleKey as the first property
    const exportPattern = new RegExp(`export const ${exportName} = {`, "g");

    if (!exportPattern.test(content)) {
      console.log(`❌ Export ${exportName} not found in ${filePath}`);
      return false;
    }

    // Reset regex
    exportPattern.lastIndex = 0;

    // Add moduleKey as first property after opening brace
    content = content.replace(
      exportPattern,
      `export const ${exportName} = {
  moduleKey: "${moduleKey}", // Permanent identifier - never changes`
    );

    fs.writeFileSync(fullPath, content);
    console.log(`✅ ${filePath} - Added moduleKey: ${moduleKey}`);
    return true;
  } catch (error) {
    console.log(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Process all modules
console.log("🚀 Adding moduleKeys to all modules...");
console.log("=".repeat(50));

let processed = 0;
let successful = 0;

for (const assignment of moduleKeyAssignments) {
  processed++;
  if (addModuleKeyToFile(assignment.file, assignment.export, assignment.key)) {
    successful++;
  }
}

console.log("");
console.log("=".repeat(50));
console.log(
  `📊 RESULTS: ${successful}/${processed} modules processed successfully`
);

if (successful === processed) {
  console.log("🎉 All modules now have permanent moduleKeys!");
  console.log("✅ No more hardcoded module numbers needed!");
} else {
  console.log("⚠️  Some modules need manual attention");
}
