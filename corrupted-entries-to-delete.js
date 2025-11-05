#!/usr/bin/env node

/**
 * Corrupted Entries to Delete
 * List of 71 corrupted entries with validation before deletion
 */

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

// Complete list of 71 corrupted entries to delete
export const corruptedEntriesToDelete = [
  // nouns.js (44 entries)
  'f-vrier-fr', 'ao-t-fr', 'd-cembre-fr', 'p-ques-fr', 'no-l-fr', 'halloween-fr', 'f-minin-fr', 'z-ro-fr', 'paris-fr', 'bordeaux-fr',
  'r-ve-fr', 'cath-drale-fr', 'march--fr', 'r-alit--fr', 'soir-e-fr', 'syst-me-fr', 'mati-res-fr', 'litt-rature-fr', 'plan-te-fr', '-conomie-fr',
  'm-tro-fr', 'r-gion-fr', 'beaut--fr', 'g-n-ration-fr', 'd-chets-fr', '-nergie-fr', 'si-cle-fr', 'r-le-fr', 'sc-ne-fr', 'm-diterran-e-fr',
  '-tait-fr', 'pens-es-fr', 'r-vision-fr', 'r-ponses-fr', 'id-e-fr', 'm-thode-fr', 'journ-e-fr', 'pierre-fr', 'marie-fr', 'caf--fr',
  'pens-e-fr', 'r-ponse-fr', '-t--fr', 'universit--fr',
  
  // verbs.js (10 entries)
  'conna-tre-fr', '-tudier-fr', 'r-viser-fr', '-voluer-fr', 'd-pend-fr', '-conomiser-fr', 'pars--fr', 'va--fr', 'faites--fr', 'prot-ger-fr',
  
  // adjectives.js (10 entries)
  '-ducatif-fr', 'fonc--fr', 'p-le-fr', 'dor--fr', 'argent--fr', 'm-me-fr', 'g-nial-fr', 'fran-ais-fr', 'd-licieux-fr', 'fatigu--fr',
  
  // adverbs.js (3 entries)
  's-rieusement-fr', 'compl-tement-fr', 'r-guli-rement-fr',
  
  // pronouns.js (1 entry)
  '-a-fr',
  
  // prepositions.js (2 entries)
  'derri-re-fr', 'apr-s-fr',
  
  // interrogatives.js (1 entry)
  'o--fr'
];

// File mapping for deletion
export const fileMapping = {
  'nouns.js': ['f-vrier-fr', 'ao-t-fr', 'd-cembre-fr', 'p-ques-fr', 'no-l-fr', 'halloween-fr', 'f-minin-fr', 'z-ro-fr', 'paris-fr', 'bordeaux-fr', 'r-ve-fr', 'cath-drale-fr', 'march--fr', 'r-alit--fr', 'soir-e-fr', 'syst-me-fr', 'mati-res-fr', 'litt-rature-fr', 'plan-te-fr', '-conomie-fr', 'm-tro-fr', 'r-gion-fr', 'beaut--fr', 'g-n-ration-fr', 'd-chets-fr', '-nergie-fr', 'si-cle-fr', 'r-le-fr', 'sc-ne-fr', 'm-diterran-e-fr', '-tait-fr', 'pens-es-fr', 'r-vision-fr', 'r-ponses-fr', 'id-e-fr', 'm-thode-fr', 'journ-e-fr', 'pierre-fr', 'marie-fr', 'caf--fr', 'pens-e-fr', 'r-ponse-fr', '-t--fr', 'universit--fr'],
  'verbs.js': ['conna-tre-fr', '-tudier-fr', 'r-viser-fr', '-voluer-fr', 'd-pend-fr', '-conomiser-fr', 'pars--fr', 'va--fr', 'faites--fr', 'prot-ger-fr'],
  'adjectives.js': ['-ducatif-fr', 'fonc--fr', 'p-le-fr', 'dor--fr', 'argent--fr', 'm-me-fr', 'g-nial-fr', 'fran-ais-fr', 'd-licieux-fr', 'fatigu--fr'],
  'adverbs.js': ['s-rieusement-fr', 'compl-tement-fr', 'r-guli-rement-fr'],
  'pronouns.js': ['-a-fr'],
  'prepositions.js': ['derri-re-fr', 'apr-s-fr'],
  'interrogatives.js': ['o--fr']
};

/**
 * Validate before deletion - ensure proper duplicate exists
 */
export function validateBeforeDeletion() {
  const allCambridge = new Map([
    ...nounsCambridge, ...verbsCambridge, ...adjectivesCambridge, ...adverbsCambridge,
    ...pronounsCambridge, ...articlesCambridge, ...prepositionsCambridge, ...conjunctionsCambridge,
    ...interjectionsCambridge, ...interrogativesCambridge, ...alphabetCambridge, ...expressionsCambridge,
  ]);

  const validationResults = [];

  console.log('🔍 VALIDATION BEFORE DELETION:\n');

  corruptedEntriesToDelete.forEach(corruptedId => {
    const corruptedEntry = allCambridge.get(corruptedId);
    if (!corruptedEntry) {
      validationResults.push({ corruptedId, status: 'NOT_FOUND', safe: false });
      return;
    }

    const word = corruptedEntry.word;
    const correctId = word.toLowerCase() + '-fr';
    
    // Special cases for proper nouns
    const properCorrectId = word + '-fr';
    
    const hasCorrectLower = allCambridge.has(correctId);
    const hasCorrectProper = allCambridge.has(properCorrectId);
    const hasCorrect = hasCorrectLower || hasCorrectProper;
    
    const actualCorrectId = hasCorrectLower ? correctId : properCorrectId;

    if (hasCorrect) {
      validationResults.push({ 
        corruptedId, 
        correctId: actualCorrectId, 
        word, 
        status: 'HAS_DUPLICATE', 
        safe: true 
      });
      console.log(`✅ SAFE TO DELETE: ${corruptedId} → ${actualCorrectId} ("${word}")`);
    } else {
      validationResults.push({ 
        corruptedId, 
        word, 
        status: 'NO_DUPLICATE', 
        safe: false 
      });
      console.log(`❌ DO NOT DELETE: ${corruptedId} ("${word}") - NO DUPLICATE FOUND`);
    }
  });

  const safeToDelete = validationResults.filter(r => r.safe);
  const notSafeToDelete = validationResults.filter(r => !r.safe);

  console.log(`\n📊 VALIDATION SUMMARY:`);
  console.log(`Safe to delete: ${safeToDelete.length}/71`);
  console.log(`NOT safe to delete: ${notSafeToDelete.length}/71`);

  if (notSafeToDelete.length > 0) {
    console.log(`\n⚠️  DO NOT DELETE THESE (no duplicates found):`);
    notSafeToDelete.forEach(r => {
      console.log(`  ${r.corruptedId} ("${r.word}")`);
    });
  }

  return validationResults;
}

// Run validation if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  validateBeforeDeletion();
}
