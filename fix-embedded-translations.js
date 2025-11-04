#!/usr/bin/env node

/**
 * Fix Embedded Translations in Dictionary Examples
 * Parse examples with newlines and separate French text from English translations
 */

import fs from 'fs';
import path from 'path';

const cambridgeDir = './src/data/dictionary/words/cambridge';

function fixEmbeddedTranslations() {
  const files = fs.readdirSync(cambridgeDir).filter(f => f.endsWith('.js') && f !== 'index.js');
  
  let totalFixed = 0;
  const fixedFiles = [];
  
  console.log('🔧 Fixing embedded translations in dictionary examples...\n');
  
  for (const file of files) {
    const filePath = path.join(cambridgeDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let fileFixed = 0;
    
    // Find and fix examples with embedded translations
    content = content.replace(
      /"text":\s*"([^"]*\\n[^"]*)"([^}]*)"trans":\s*""/g,
      (match, textContent, middlePart) => {
        // Parse the embedded content
        const parts = textContent.split('\\n').map(part => part.trim()).filter(part => part.length > 0);
        
        if (parts.length >= 2) {
          // Extract French and English parts
          let frenchPart = parts[0].trim();
          let englishPart = parts[parts.length - 1].trim();
          
          // Clean up common patterns
          frenchPart = frenchPart.replace(/^\s+|\s+$/g, '');
          englishPart = englishPart.replace(/^\s+|\s+$/g, '');
          
          // Remove extra whitespace patterns that appear in scraped data
          englishPart = englishPart.replace(/^\s*\n\s*/, '').replace(/\s*\n\s*$/, '');
          
          totalFixed++;
          fileFixed++;
          
          console.log(`✅ Fixed in ${file}:`);
          console.log(`   French: "${frenchPart}"`);
          console.log(`   English: "${englishPart}"`);
          
          return `"text": "${frenchPart}"${middlePart}"trans": "${englishPart}"`;
        }
        
        return match; // Return unchanged if can't parse
      }
    );
    
    if (fileFixed > 0) {
      // Create backup
      const backupPath = filePath + '.backup';
      fs.writeFileSync(backupPath, fs.readFileSync(filePath, 'utf8'));
      
      // Write fixed content
      fs.writeFileSync(filePath, content);
      
      fixedFiles.push({
        file,
        fixedCount: fileFixed,
        backupPath
      });
      
      console.log(`📁 ${file}: Fixed ${fileFixed} examples (backup: ${path.basename(backupPath)})\n`);
    }
  }
  
  console.log(`\n🎯 SUMMARY:`);
  console.log(`Total examples fixed: ${totalFixed}`);
  console.log(`Files modified: ${fixedFiles.length}`);
  
  if (fixedFiles.length > 0) {
    console.log(`\n📋 Modified files:`);
    fixedFiles.forEach(({file, fixedCount, backupPath}) => {
      console.log(`  ${file}: ${fixedCount} fixes (backup: ${path.basename(backupPath)})`);
    });
    
    console.log(`\n⚠️  Backups created with .backup extension`);
    console.log(`   To restore: mv file.js.backup file.js`);
  }
  
  // Save fix report
  fs.writeFileSync('fix-embedded-translations-report.json', JSON.stringify({
    totalFixed,
    fixedFiles,
    timestamp: new Date().toISOString()
  }, null, 2));
  
  console.log(`\n💾 Fix report saved to fix-embedded-translations-report.json`);
  
  return { totalFixed, fixedFiles };
}

// Run the fix
fixEmbeddedTranslations();
