# Module Key Assignments - Permanent Identifiers

This document defines the permanent moduleKey for each module. These keys never change regardless of lesson ID reorganization.

Format: `YYYY-MM-DD-descriptive-name`

## Unit 1: Essential Grammar

- famousWords: `2024-01-01-famous-words`
- module1: `2024-01-01-pronouns`
- module3_etre: `2024-01-02-etre`
- module4_avoir: `2024-01-03-avoir`
- articles: `2024-01-04-articles`
- basicNouns: `2024-01-05-basic-nouns`
- plurals: `2024-01-06-plurals`
- connectors: `2024-01-07-connectors`
- reading1: `2024-01-08-reading1`
- unit1Practice: `2024-01-09-unit1-practice`
- unit1Exam: `2024-01-10-unit1-exam`

## Unit 2: Asking & Describing

- module2_demonstratives: `2024-01-11-demonstratives`
- caSurvival: `2024-01-12-ca-survival`
- determinersWithNouns: `2024-01-13-determiners-nouns`
- vouloirModule: `2024-01-14-vouloir`
- pouvoirModule: `2024-01-15-pouvoir`
- voirModule: `2024-01-16-voir`
- module6_questions: `2024-01-17-questions`
- stressedPronouns: `2024-01-18-stressed-pronouns`
- prepositions: `2024-01-19-prepositions`
- adjectives: `2024-01-20-adjectives`
- reading2: `2024-01-21-reading2`
- unit2Practice: `2024-01-22-unit2-practice`
- unit2Exam: `2024-01-23-unit2-exam`

## Unit 3: Movement & Possession

- contractions: `2024-01-24-contractions`
- venirModule: `2024-01-25-venir`
- allerModule: `2024-01-26-aller`
- verbPatternHelp: `2024-01-27-verb-pattern-help`
- partirModule: `2024-01-28-partir`
- module7_object_pronouns: `2024-01-29-object-pronouns`
- module8_possessive_adjectives: `2024-01-30-possessive-adjectives`
- module9_possessive_pronouns: `2024-01-31-possessive-pronouns`
- module10_combining: `2024-02-01-combining`
- reading3: `2024-02-02-reading3`
- unit3Practice: `2024-02-03-unit3-practice`
- unit3Exam: `2024-02-04-unit3-exam`

## Unit 12: Curiosity & Questions

- questceQuiQueModule: `2024-03-15-questce-qui-que`
- quiestQuiQueModule: `2024-03-16-quiest-qui-que`
- pourquoiComplexModule: `2024-03-17-pourquoi-complex`
- commentComplexModule: `2024-03-18-comment-complex`
- inversionQuestionsModule: `2024-03-19-inversion-questions`
- embeddedQuestionsModule: `2024-03-20-embedded-questions`
- rhetoricalNegativeModule: `2024-03-21-rhetorical-negative`
- multiClauseQuestionsModule: `2024-03-22-multi-clause-questions`

## Reference Modules

- alphabetModule: `2024-04-01-alphabet`
- numbersModule: `2024-04-02-numbers`
- daysMonthsModule: `2024-04-03-days-months`
- holidaysModule: `2024-04-04-holidays`
- colorsModule: `2024-04-05-colors`
- frenchCountriesModule: `2024-04-06-french-countries`
- languageStatsModule: `2024-04-07-language-stats`
- frenchSpellingPatternsModule: `2024-04-08-spelling-patterns`

## Usage Examples

### In Module Cross-References:

```javascript
import { getModuleRef } from "../../moduleIdResolver.js";

// Instead of: "You learned this in Module 154"
// Use: `You learned this in ${getModuleRef('2024-03-15-questce-qui-que')}`
```

### In Module Headers:

```javascript
import { getModuleId } from "../../moduleIdResolver.js";

// Dynamic header comment:
// `Module ${getModuleId('2024-03-15-questce-qui-que')}: qu'est-ce qui vs qu'est-ce que`
```

This system ensures module references are always accurate regardless of reorganization!
