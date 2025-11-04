#!/usr/bin/env node

/**
 * Analyze Dictionary Examples
 * Find and fix examples with missing or empty trans fields
 */

import fs from 'fs';
import path from 'path';

const cambridgeDir = './src/data/dictionary/words/cambridge';

async function analyzeExamples() {
  const files = fs.readdirSync(cambridgeDir).filter(f => f.endsWith('.js') && f !== 'index.js');
  
  let totalExamples = 0;
  let emptyTransExamples = 0;
  let missingTransExamples = 0;
  let fixableExamples = 0;
  
  const issues = [];
  
  console.log('🔍 Analyzing dictionary examples...\n');
  
  for (const file of files) {
    const filePath = path.join(cambridgeDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    console.log(`📁 ${file}`);
    
    // Extract all examples from the file
    const exampleMatches = content.matchAll(/"examples":\s*\[([\s\S]*?)\]/g);
    
    let fileEmptyTrans = 0;
    let fileMissingTrans = 0;
    let fileFixable = 0;
    
    for (const match of exampleMatches) {
      const examplesBlock = match[1];
      
      // Find individual example objects
      const exampleObjects = examplesBlock.matchAll(/\{[\s\S]*?\}/g);
      
      for (const exampleMatch of exampleObjects) {
        const exampleStr = exampleMatch[0];
        totalExamples++;
        
        try {
          // Clean up the example string for parsing
          const cleanExample = exampleStr
            .replace(/\n\s+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
          
          const example = JSON.parse(cleanExample);
          
          if (example.text) {
            if (!example.hasOwnProperty('trans')) {
              missingTransExamples++;
              fileMissingTrans++;
              
              issues.push({
                file,
                type: 'missing_trans',
                text: example.text.substring(0, 100) + '...',
                example: cleanExample
              });
            } else if (example.trans === '') {
              emptyTransExamples++;
              fileEmptyTrans++;
              
              // Check if translation is embedded in text
              const textContent = example.text;
              const hasEmbeddedTranslation = textContent.includes('\n') && 
                                          textContent.split('\n').length > 1;
              
              if (hasEmbeddedTranslation) {
                fixableExamples++;
                fileFixable++;
                
                issues.push({
                  file,
                  type: 'fixable_empty_trans',
                  text: textContent.substring(0, 100) + '...',
                  example: cleanExample
                });
              } else {
                issues.push({
                  file,
                  type: 'empty_trans',
                  text: textContent.substring(0, 100) + '...',
                  example: cleanExample
                });
              }
            }
          }
        } catch (e) {
          // Skip malformed JSON
        }
      }
    }
    
    console.log(`  📊 Empty trans: ${fileEmptyTrans}, Missing trans: ${fileMissingTrans}, Fixable: ${fileFixable}`);
  }
  
  console.log('\n📈 SUMMARY:');
  console.log(`Total examples analyzed: ${totalExamples}`);
  console.log(`Examples with empty trans: ${emptyTransExamples}`);
  console.log(`Examples missing trans field: ${missingTransExamples}`);
  console.log(`Fixable examples (embedded translation): ${fixableExamples}`);
  
  console.log('\n🔧 SAMPLE ISSUES:');
  
  // Show sample of each issue type
  const sampleFixable = issues.filter(i => i.type === 'fixable_empty_trans').slice(0, 3);
  const sampleEmpty = issues.filter(i => i.type === 'empty_trans').slice(0, 3);
  const sampleMissing = issues.filter(i => i.type === 'missing_trans').slice(0, 3);
  
  if (sampleFixable.length > 0) {
    console.log('\n🟡 Fixable (embedded translation):');
    sampleFixable.forEach(issue => {
      console.log(`  ${issue.file}: ${issue.text}`);
    });
  }
  
  if (sampleEmpty.length > 0) {
    console.log('\n🔴 Empty trans field:');
    sampleEmpty.forEach(issue => {
      console.log(`  ${issue.file}: ${issue.text}`);
    });
  }
  
  if (sampleMissing.length > 0) {
    console.log('\n🟠 Missing trans field:');
    sampleMissing.forEach(issue => {
      console.log(`  ${issue.file}: ${issue.text}`);
    });
  }
  
  // Save detailed report
  fs.writeFileSync('dictionary-examples-analysis.json', JSON.stringify({
    summary: {
      totalExamples,
      emptyTransExamples,
      missingTransExamples,
      fixableExamples
    },
    issues
  }, null, 2));
  
  console.log('\n💾 Detailed report saved to dictionary-examples-analysis.json');
  
  return {
    totalExamples,
    emptyTransExamples,
    missingTransExamples,
    fixableExamples,
    issues
  };
}

// Run analysis
analyzeExamples().catch(console.error);
