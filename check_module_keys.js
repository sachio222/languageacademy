/**
 * Simple script to check what module keys are actually defined
 * We'll manually check the module files to see the real keys
 */

import fs from 'fs';
import path from 'path';

// Database module_keys (from your query result)
const databaseKeys = [
  "2024-01-01-famous-words",
  "2024-01-01-pronouns", 
  "2024-01-02-etre",
  "2024-01-04-avoir",
  "2024-01-05-articles",
  "2024-01-06-basic-nouns",
  "2024-01-06-cognates-help",
  "2024-01-07-liaison-help",
  "2024-01-07-plurals",
  "2024-01-08-connectors",
  "2024-01-09-reading1",
  "2024-01-10-unit1-practice",
  "2024-01-11-unit1-exam",
  "2024-01-12-demonstratives",
  "2024-01-13-ca-survival",
  "2024-01-14-determiners-nouns",
  "2024-01-14-vouloir",
  "2024-01-16-voir",
  "2024-01-17-questions",
  "2024-01-18-questions-help",
  "2024-01-18-stressed-pronouns",
  "2024-01-19-prepositions",
  "2024-01-20-adjectives",
  "2024-01-21-reading2",
  "2024-01-22-unit2-practice",
  "2024-01-23-unit2-exam",
  "2024-01-24-contractions",
  "2024-01-25-venir",
  "2024-01-26-aller",
  "2024-01-27-verb-pattern-help",
  "2024-01-28-partir",
  "2024-01-31-combining",
  "2024-02-01-reading3",
  "2024-02-02-unit3-practice",
  "2024-02-03-unit3-exam",
  "2024-02-04-survival-phrases"
];

// Function to extract moduleKey from a file
function extractModuleKey(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/moduleKey:\s*["']([^"']+)["']/);
    return match ? match[1] : null;
  } catch (error) {
    return null;
  }
}

// Function to scan a directory for module files
function scanDirectory(dirPath) {
  const moduleKeys = [];
  
  if (!fs.existsSync(dirPath)) {
    return moduleKeys;
  }
  
  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Recursively scan subdirectories
      moduleKeys.push(...scanDirectory(fullPath));
    } else if (file.endsWith('.js') && !file.includes('config') && !file.includes('vocabulary')) {
      const moduleKey = extractModuleKey(fullPath);
      if (moduleKey) {
        moduleKeys.push({ file: fullPath, moduleKey });
      }
    }
  }
  
  return moduleKeys;
}

console.log('🔍 SCANNING MODULE FILES...\n');

// Scan the modules directory
const modulesDir = './src/lessons/modules';
const foundModules = scanDirectory(modulesDir);

console.log('📁 FOUND MODULE KEYS IN FILES:');
foundModules.forEach(({ file, moduleKey }) => {
  const relativePath = file.replace('./src/lessons/modules/', '');
  console.log(`  ${moduleKey} → ${relativePath}`);
});

console.log('\n=== COMPARISON ===');

// Check which database keys don't match any file
const actualKeys = foundModules.map(m => m.moduleKey);
const missingInFiles = databaseKeys.filter(dbKey => !actualKeys.includes(dbKey));

console.log('\n🔴 DATABASE KEYS NOT FOUND IN MODULE FILES:');
missingInFiles.forEach(key => {
  console.log(`  ❌ ${key}`);
});

// Check which file keys don't match database
const missingInDatabase = actualKeys.filter(actualKey => !databaseKeys.includes(actualKey));
console.log('\n🔴 MODULE FILE KEYS NOT FOUND IN DATABASE:');
missingInDatabase.forEach(key => {
  const module = foundModules.find(m => m.moduleKey === key);
  console.log(`  ❌ ${key} → ${module.file.replace('./src/lessons/modules/', '')}`);
});

// Perfect matches
const matches = databaseKeys.filter(dbKey => actualKeys.includes(dbKey));
console.log('\n🟢 PERFECT MATCHES:');
matches.forEach(key => {
  console.log(`  ✅ ${key}`);
});

console.log('\n=== SUMMARY ===');
console.log(`Database keys: ${databaseKeys.length}`);
console.log(`Module file keys: ${actualKeys.length}`);
console.log(`Perfect matches: ${matches.length}`);
console.log(`Database keys missing from files: ${missingInFiles.length}`);
console.log(`File keys missing from database: ${missingInDatabase.length}`);
