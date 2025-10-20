/**
 * Generate complete module ID to moduleKey mapping
 * This will create the full mapping for all existing modules
 */

import { lessons } from './src/lessons/lessonData.js';

console.log('🔍 Generating complete module ID to moduleKey mapping...\n');

const completeMapping = {};

lessons.forEach((lesson, index) => {
  const moduleId = index + 1;
  const moduleKey = lesson.moduleKey;
  
  if (moduleKey) {
    completeMapping[moduleId] = moduleKey;
    console.log(`${moduleId}: "${moduleKey}",`);
  } else {
    console.warn(`⚠️  Module ${moduleId} has no moduleKey: ${lesson.title}`);
  }
});

console.log('\n📋 Complete mapping generated!');
console.log(`Total modules: ${Object.keys(completeMapping).length}`);

// Write to file for easy copying
import fs from 'fs';

const mappingCode = `export const completeModuleIdToKeyMapping = {
${Object.entries(completeMapping).map(([id, key]) => `  ${id}: "${key}"`).join(',\n')}
};`;

fs.writeFileSync('complete-mapping.js', mappingCode);
console.log('\n✅ Complete mapping saved to complete-mapping.js');
