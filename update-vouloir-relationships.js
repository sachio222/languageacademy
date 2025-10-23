#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const verbsFilePath = './src/data/dictionary/words/cambridge/verbs.js';

// All vouloir conjugations
const vouloirConjugations = [
  'veux', 'veut', 'voulons', 'voulez', 'veulent',
  'voulais', 'voulait', 'voulions', 'vouliez', 'voulaient',
  'voudrai', 'voudras', 'voudra', 'voudrons', 'voudrez', 'voudront',
  'voudrais', 'voudrait', 'voudrions', 'voudriez', 'voudraient',
  'veuille', 'veuillent', 'voulu'
];

console.log('📝 Updating vouloir relationships...');

try {
  // Read the verbs file
  const fileContent = fs.readFileSync(verbsFilePath, 'utf8');
  
  // Find the vouloir entry
  const vouloirStartPattern = /"vouloir-fr",\s*\{/;
  const vouloirMatch = fileContent.match(vouloirStartPattern);
  
  if (!vouloirMatch) {
    console.error('❌ Could not find vouloir entry');
    process.exit(1);
  }
  
  console.log('✅ Found vouloir entry');
  
  // Create relationships array for all conjugations
  const relationships = vouloirConjugations.map(conjugation => ({
    type: "conjugation_pair",
    targetId: `${conjugation}-fr`,
    targetWord: conjugation,
    note: "conjugated form"
  }));
  
  // Format the relationships as a string
  const relationshipsString = JSON.stringify(relationships, null, 12)
    .replace(/^/gm, '        ') // Indent to match file structure
    .replace(/^\s{8}/, ''); // Remove first line indentation
  
  // Replace the empty relationships array
  const updatedContent = fileContent.replace(
    /"relationships": \[\]/,
    `"relationships": ${relationshipsString}`
  );
  
  // Write back to file
  fs.writeFileSync(verbsFilePath, updatedContent, 'utf8');
  
  console.log(`✅ Updated vouloir with ${relationships.length} conjugation relationships`);
  console.log('🎉 Done!');
  
} catch (error) {
  console.error('❌ Error updating vouloir relationships:', error.message);
  process.exit(1);
}
