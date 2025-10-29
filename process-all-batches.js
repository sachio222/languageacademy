#!/usr/bin/env node

/**
 * Process All Dictionary Batches
 * Automatically runs all 11 batches through the dictionary generator
 * Follows the Dictionary Generator Guide specifications
 */

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

// All batch files to process
const batches = [
  'batch1-nouns.json',
  'batch2-nouns.json', 
  'batch3-nouns.json',
  'batch4-nouns.json',
  'batch5-nouns.json',
  'batch6-verbs.json',
  'batch7-verbs.json',
  'batch8-verbs.json',
  'batch9-adjectives.json',
  'batch10-adverbs.json',
  'batch11-interjections.json'
];

// Track results
const results = {
  total: batches.length,
  successful: 0,
  failed: 0,
  errors: []
};

/**
 * Process a single batch file
 */
function processBatch(batchFile, index) {
  return new Promise((resolve) => {
    console.log(`\n🔄 Processing Batch ${index + 1}/${batches.length}: ${batchFile}`);
    console.log('=' .repeat(60));
    
    // Check if file exists
    if (!fs.existsSync(batchFile)) {
      const error = `File not found: ${batchFile}`;
      console.log(`❌ ${error}`);
      results.failed++;
      results.errors.push(error);
      resolve();
      return;
    }
    
    // Run the dictionary generator
    const process = spawn('node', ['generate-lesson-words.js', '--file', batchFile], {
      stdio: 'pipe'
    });
    
    let output = '';
    let errorOutput = '';
    
    process.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    process.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });
    
    process.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ Batch ${index + 1} completed successfully`);
        console.log(output);
        results.successful++;
      } else {
        const error = `Batch ${index + 1} failed with exit code ${code}`;
        console.log(`❌ ${error}`);
        console.log('Error output:', errorOutput);
        results.failed++;
        results.errors.push(error);
      }
      resolve();
    });
    
    process.on('error', (err) => {
      const error = `Failed to start process for batch ${index + 1}: ${err.message}`;
      console.log(`❌ ${error}`);
      results.failed++;
      results.errors.push(error);
      resolve();
    });
  });
}

/**
 * Main processing function
 */
async function processAllBatches() {
  console.log('🚀 Starting Dictionary Batch Processing');
  console.log('📚 Processing 11 batches with 190 words total');
  console.log('🎯 Following Dictionary Generator Guide specifications\n');
  
  const startTime = Date.now();
  
  // Process each batch sequentially
  for (let i = 0; i < batches.length; i++) {
    await processBatch(batches[i], i);
    
    // Add a small delay between batches
    if (i < batches.length - 1) {
      console.log('\n⏳ Waiting 2 seconds before next batch...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(1);
  
  // Print final results
  console.log('\n' + '='.repeat(60));
  console.log('📊 FINAL RESULTS');
  console.log('='.repeat(60));
  console.log(`✅ Successful batches: ${results.successful}/${results.total}`);
  console.log(`❌ Failed batches: ${results.failed}/${results.total}`);
  console.log(`⏱️  Total time: ${duration} seconds`);
  
  if (results.errors.length > 0) {
    console.log('\n❌ ERRORS:');
    results.errors.forEach((error, index) => {
      console.log(`  ${index + 1}. ${error}`);
    });
  }
  
  if (results.successful === results.total) {
    console.log('\n🎉 ALL BATCHES PROCESSED SUCCESSFULLY!');
    console.log('📚 190 words have been added to the Cambridge dictionary');
  } else {
    console.log('\n⚠️  Some batches failed. Check errors above.');
  }
  
  console.log('\n💡 Next steps:');
  console.log('  - Check the generated dictionary files in src/data/dictionary/words/cambridge/');
  console.log('  - Run vocabulary validation: npm run vocab:validate');
  console.log('  - Test the dictionary in your application');
}

// Handle script interruption
process.on('SIGINT', () => {
  console.log('\n\n⚠️  Process interrupted by user');
  console.log(`📊 Progress: ${results.successful + results.failed}/${results.total} batches processed`);
  process.exit(1);
});

// Run the processing
processAllBatches().catch((error) => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});
