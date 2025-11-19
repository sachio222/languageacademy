import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function findUnitConfigs(dir, fileList = []) {
  const files = readdirSync(dir);
  files.forEach(file => {
    const filePath = join(dir, file);
    if (statSync(filePath).isDirectory()) {
      findUnitConfigs(filePath, fileList);
    } else if (file === 'unit-config.js') {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const modulesDir = join(__dirname, 'src/lessons/modules');
const unitConfigs = findUnitConfigs(modulesDir).sort();

const mappings = [];
let currentId = 1;

// Read each unit config and extract modules
for (const configPath of unitConfigs.sort()) {
  const fullPath = configPath; // Already absolute path from findUnitConfigs
  const unitDir = dirname(fullPath);
  const configContent = readFileSync(fullPath, 'utf-8');
  
  // Extract module imports
  const importRegex = /import\s+\{([^}]+)\}\s+from\s+["']\.\/([^"']+)["']/g;
  const imports = [];
  let match;
  while ((match = importRegex.exec(configContent)) !== null) {
    imports.push({
      varName: match[1].trim(),
      fileName: match[2]
    });
  }
  
  // Extract modules array to get order
  const modulesMatch = configContent.match(/modules:\s*\[([\s\S]*?)\]/);
  if (modulesMatch) {
    const modulesList = modulesMatch[1];
    const moduleVars = modulesList.match(/\b\w+\b/g) || [];
    
    // Read each module file to get moduleKey
    for (const varName of moduleVars) {
      const importInfo = imports.find(imp => imp.varName === varName);
      if (importInfo) {
        try {
          const modulePath = join(unitDir, importInfo.fileName + '.js');
          const moduleContent = readFileSync(modulePath, 'utf-8');
          const moduleKeyMatch = moduleContent.match(/moduleKey:\s*["']([^"']+)["']/);
          
          if (moduleKeyMatch) {
            const moduleKey = moduleKeyMatch[1];
            const titleMatch = moduleContent.match(/title:\s*["']([^"']+)["']/);
            const title = titleMatch ? titleMatch[1] : 'Unknown';
            
            mappings.push({
              id: currentId++,
              moduleKey,
              title,
              unit: dirname(configPath),
              file: importInfo.fileName
            });
          }
        } catch (err) {
          console.warn(`Could not read ${varName} from ${importInfo.fileName}: ${err.message}`);
        }
      }
    }
  }
}

// Generate SQL VALUES clause
console.log('-- Complete Module ID to ModuleKey Mapping');
console.log('-- Generated automatically from codebase\n');
console.log('VALUES');

mappings.forEach((m, index) => {
  const comma = index < mappings.length - 1 ? ',' : '';
  const comment = `-- ${m.id}: ${m.title}`;
  console.log(`  (${m.id}, '${m.moduleKey}')${comma.padEnd(20)} ${comment}`);
});

console.log(`\n-- Total: ${mappings.length} modules`);
console.log(`-- Copy the VALUES section above into migrate-module-ids-to-modulekeys.sql`);

