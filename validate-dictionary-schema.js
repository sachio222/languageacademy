#!/usr/bin/env node

/**
 * Validate Dictionary Schema Compliance
 * Check all Cambridge dictionary entries against Zod schema
 */

import fs from 'fs';
import path from 'path';

// Import the Zod schema
import { validateWord } from './src/data/dictionary/schemas/word-schema.js';

// Import all Cambridge dictionaries
import { nounsCambridge } from './src/data/dictionary/words/cambridge/nouns.js';
import { verbsCambridge } from './src/data/dictionary/words/cambridge/verbs.js';
import { adjectivesCambridge } from './src/data/dictionary/words/cambridge/adjectives.js';
import { adverbsCambridge } from './src/data/dictionary/words/cambridge/adverbs.js';
import { pronounsCambridge } from './src/data/dictionary/words/cambridge/pronouns.js';
import { articlesCambridge } from './src/data/dictionary/words/cambridge/articles.js';
import { prepositionsCambridge } from './src/data/dictionary/words/cambridge/prepositions.js';
import { conjunctionsCambridge } from './src/data/dictionary/words/cambridge/conjunctions.js';
import { interjectionsCambridge } from './src/data/dictionary/words/cambridge/interjections.js';
import { interrogativesCambridge } from './src/data/dictionary/words/cambridge/interrogatives.js';
import { alphabetCambridge } from './src/data/dictionary/words/cambridge/alphabet.js';
import { expressionsCambridge } from './src/data/dictionary/words/cambridge/expressions.js';

async function validateDictionarySchema() {
  console.log('🔍 Validating Cambridge Dictionary Schema Compliance...\n');

  // Combine all dictionaries
  const allDictionaries = [
    { name: 'nouns', map: nounsCambridge },
    { name: 'verbs', map: verbsCambridge },
    { name: 'adjectives', map: adjectivesCambridge },
    { name: 'adverbs', map: adverbsCambridge },
    { name: 'pronouns', map: pronounsCambridge },
    { name: 'articles', map: articlesCambridge },
    { name: 'prepositions', map: prepositionsCambridge },
    { name: 'conjunctions', map: conjunctionsCambridge },
    { name: 'interjections', map: interjectionsCambridge },
    { name: 'interrogatives', map: interrogativesCambridge },
    { name: 'alphabet', map: alphabetCambridge },
    { name: 'expressions', map: expressionsCambridge }
  ];

  let totalEntries = 0;
  let validEntries = 0;
  let invalidEntries = 0;
  const validationErrors = [];
  const errorSummary = {};

  console.log('📊 Processing dictionaries:\n');

  for (const { name, map } of allDictionaries) {
    console.log(`📁 ${name}.js`);
    
    let categoryValid = 0;
    let categoryInvalid = 0;
    const categoryErrors = [];

    for (const [id, entry] of map) {
      totalEntries++;
      
      // Validate against schema
      const validation = validateWord(entry);
      
      if (validation.success) {
        validEntries++;
        categoryValid++;
      } else {
        invalidEntries++;
        categoryInvalid++;
        
        // Categorize errors
        validation.errors.forEach(error => {
          const errorType = error.path ? error.path.join('.') : 'root';
          const errorKey = `${errorType}: ${error.message}`;
          
          errorSummary[errorKey] = (errorSummary[errorKey] || 0) + 1;
          
          categoryErrors.push({
            id,
            word: entry.word,
            errorPath: error.path,
            errorMessage: error.message,
            errorCode: error.code
          });
        });

        validationErrors.push({
          dictionary: name,
          id,
          word: entry.word,
          errors: validation.errors
        });
      }
    }

    console.log(`  ✅ Valid: ${categoryValid}`);
    console.log(`  ❌ Invalid: ${categoryInvalid}`);
    
    if (categoryErrors.length > 0) {
      console.log(`  🔍 Sample errors:`);
      categoryErrors.slice(0, 3).forEach(error => {
        console.log(`    ${error.id}: ${error.errorMessage}`);
      });
    }
    console.log('');
  }

  console.log('🎯 VALIDATION SUMMARY:');
  console.log(`Total entries: ${totalEntries}`);
  console.log(`Valid entries: ${validEntries} (${((validEntries/totalEntries)*100).toFixed(1)}%)`);
  console.log(`Invalid entries: ${invalidEntries} (${((invalidEntries/totalEntries)*100).toFixed(1)}%)`);

  if (invalidEntries > 0) {
    console.log('\n🔴 COMMON VALIDATION ERRORS:');
    
    // Sort errors by frequency
    const sortedErrors = Object.entries(errorSummary)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);

    sortedErrors.forEach(([error, count]) => {
      console.log(`  ${count}x: ${error}`);
    });

    console.log('\n📋 DETAILED ERROR BREAKDOWN:');
    
    // Group by error type
    const errorsByType = {};
    validationErrors.forEach(({ dictionary, id, word, errors }) => {
      errors.forEach(error => {
        const type = error.path ? error.path[0] : 'root';
        if (!errorsByType[type]) errorsByType[type] = [];
        errorsByType[type].push({ dictionary, id, word, error });
      });
    });

    Object.entries(errorsByType).forEach(([type, errors]) => {
      console.log(`\n  🔸 ${type.toUpperCase()} (${errors.length} errors):`);
      errors.slice(0, 5).forEach(({ dictionary, id, word, error }) => {
        console.log(`    ${dictionary}/${id} (${word}): ${error.message}`);
      });
      if (errors.length > 5) {
        console.log(`    ... and ${errors.length - 5} more`);
      }
    });
  }

  // Save detailed validation report
  const report = {
    summary: {
      totalEntries,
      validEntries,
      invalidEntries,
      validationRate: ((validEntries/totalEntries)*100).toFixed(1) + '%'
    },
    errorSummary,
    detailedErrors: validationErrors,
    timestamp: new Date().toISOString()
  };

  fs.writeFileSync('dictionary-schema-validation-report.json', JSON.stringify(report, null, 2));
  console.log('\n💾 Detailed validation report saved to dictionary-schema-validation-report.json');

  // Recommendations
  console.log('\n💡 RECOMMENDATIONS:');
  
  if (invalidEntries === 0) {
    console.log('  ✅ All entries are schema-compliant! Ready for database migration.');
  } else {
    console.log(`  🔧 Fix ${invalidEntries} validation errors before migration`);
    console.log('  📝 Most common issues should be addressed first');
    console.log('  🎯 Focus on required field violations and enum mismatches');
  }

  return {
    totalEntries,
    validEntries,
    invalidEntries,
    validationErrors,
    errorSummary
  };
}

// Run validation
validateDictionarySchema().catch(console.error);
