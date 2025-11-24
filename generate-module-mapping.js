/**
 * Generate Module ID to ModuleKey Mapping
 * 
 * This script generates the complete mapping of numeric IDs to moduleKeys
 * for use in the SQL migration script.
 * 
 * Usage: node generate-module-mapping.js
 * 
 * Output: SQL VALUES clause with all mappings
 */

// Since we can't easily import the modules due to dependencies,
// we'll read the files directly and extract moduleKeys

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read unit configs to get module order
const unitConfigsPath = join(__dirname, 'src/lessons/modules');

// Simple approach: read unit config files and extract moduleKeys
const units = [
  'unit1', 'unit2', 'unit3', 'unit4', 'unit5', 'unit6', 
  'unit7', 'unit8', 'unit9', 'unit10', 'unit11', 'unit12', 'reference'
];

const mappings = [];
let currentId = 1;

for (const unit of units) {
  try {
    const configPath = join(unitConfigsPath, unit, 'unit-config.js');
    const configContent = readFileSync(configPath, 'utf-8');
    
    // Extract module imports and find their moduleKeys
    // This is a simple regex approach - may need refinement
    const moduleImports = configContent.match(/import\s+\{([^}]+)\}\s+from\s+["']\.\/([^"']+)["']/g) || [];
    
    for (const importLine of moduleImports) {
      const match = importLine.match(/import\s+\{([^}]+)\}\s+from\s+["']\.\/([^"']+)["']/);
      if (match) {
        const moduleName = match[1].trim();
        const fileName = match[2];
        
        // Read the module file to get moduleKey
        try {
          const modulePath = join(unitConfigsPath, unit, fileName + '.js');
          const moduleContent = readFileSync(modulePath, 'utf-8');
          const moduleKeyMatch = moduleContent.match(/moduleKey:\s*["']([^"']+)["']/);
          
          if (moduleKeyMatch) {
            const moduleKey = moduleKeyMatch[1];
            mappings.push({ id: currentId, moduleKey, unit, fileName });
            currentId++;
          }
        } catch (err) {
          // Skip if file doesn't exist or can't be read
          console.warn(`Could not read module file: ${unit}/${fileName}.js`);
        }
      }
    }
  } catch (err) {
    console.warn(`Could not read unit config: ${unit}/unit-config.js`);
  }
}

// Generate SQL VALUES clause
console.log('-- Generated module ID to moduleKey mapping\n');
console.log('-- Copy this into the module_id_mapping CTE in migrate-module-ids-to-modulekeys.sql\n');
console.log('VALUES');

mappings.forEach((m, index) => {
  const comma = index < mappings.length - 1 ? ',' : '';
  console.log(`  (${m.id}, '${m.moduleKey}')${comma}  -- ${m.unit}/${m.fileName}`);
});

console.log(`\n-- Total: ${mappings.length} modules mapped`);




