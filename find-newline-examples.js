#!/usr/bin/env node

/**
 * Find Examples with Embedded Translations
 * Look for examples where text contains newlines (embedded translations)
 */

import fs from 'fs';
import path from 'path';

const cambridgeDir = './src/data/dictionary/words/cambridge';

function findNewlineExamples() {
  const files = fs.readdirSync(cambridgeDir).filter(f => f.endsWith('.js') && f !== 'index.js');
  
  let totalFound = 0;
  const results = [];
  
  console.log('🔍 Finding examples with embedded translations (newlines)...\n');
  
  for (const file of files) {
    const filePath = path.join(cambridgeDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    let fileCount = 0;
    
    // Find examples with newlines in text field
    const newlineMatches = content.matchAll(/"text":\s*"([^"]*\\n[^"]*)"[^}]*"trans":\s*""/g);
    
    for (const match of newlineMatches) {
      const textContent = match[1];
      totalFound++;
      fileCount++;
      
      // Parse the embedded content
      const parts = textContent.split('\\n').map(part => part.trim()).filter(part => part.length > 0);
      
      if (parts.length >= 2) {
        const frenchPart = parts[0].trim();
        const englishPart = parts[parts.length - 1].trim();
        
        results.push({
          file,
          originalText: textContent,
          frenchPart,
          englishPart,
          fullMatch: match[0]
        });
        
        if (results.length <= 10) { // Show first 10 examples
          console.log(`📁 ${file}:`);
          console.log(`  French: "${frenchPart}"`);
          console.log(`  English: "${englishPart}"`);
          console.log(`  Original: "${textContent.substring(0, 100)}..."`);
          console.log('');
        }
      }
    }
    
    if (fileCount > 0) {
      console.log(`📊 ${file}: ${fileCount} examples with embedded translations`);
    }
  }
  
  console.log(`\n🎯 TOTAL FOUND: ${totalFound} examples with embedded translations`);
  
  // Show patterns
  console.log('\n📋 COMMON PATTERNS:');
  const patterns = {};
  results.slice(0, 20).forEach(result => {
    const pattern = result.originalText.replace(/[^\\n\s]+/g, 'X').replace(/\s+/g, ' ');
    patterns[pattern] = (patterns[pattern] || 0) + 1;
  });
  
  Object.entries(patterns).forEach(([pattern, count]) => {
    console.log(`  ${count}x: ${pattern}`);
  });
  
  // Save results for processing
  fs.writeFileSync('newline-examples-found.json', JSON.stringify({
    totalFound,
    examples: results
  }, null, 2));
  
  console.log('\n💾 Results saved to newline-examples-found.json');
  
  return results;
}

// Run the search
findNewlineExamples();
