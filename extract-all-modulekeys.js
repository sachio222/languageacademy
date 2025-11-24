import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read unit configs in order
const unitConfigs = [
  'src/lessons/modules/unit1/unit-config.js',
  'src/lessons/modules/unit2/unit-config.js',
  'src/lessons/modules/unit3/unit-config.js',
  'src/lessons/modules/unit4/unit-config.js',
  'src/lessons/modules/unit5/unit-config.js',
  'src/lessons/modules/unit6/unit-config.js',
  'src/lessons/modules/unit7/unit-config.js',
  'src/lessons/modules/unit8/unit-config.js',
  'src/lessons/modules/unit9/unit-config.js',
  'src/lessons/modules/unit10/unit-config.js',
  'src/lessons/modules/unit11/unit-config.js',
  'src/lessons/modules/unit12/unit-config.js',
  'src/lessons/modules/reference/unit-config.js',
];

const mappings = [];
let currentId = 1;

for (const configPath of unitConfigs) {
  const fullPath = join(__dirname, configPath);
  const unitDir = dirname(fullPath);
  
  try {
    const configContent = readFileSync(fullPath, 'utf-8');
    
    // Extract imports
    const imports = new Map();
    const importRegex = /import\s+\{([^}]+)\}\s+from\s+["']\.\/([^"']+)["']/g;
    let match;
    while ((match = importRegex.exec(configContent)) !== null) {
      const varName = match[1].trim();
      const fileName = match[2].replace(/\.js$/, ''); // Remove .js if present
      imports.set(varName, fileName);
    }
    
    // Extract modules array order
    const modulesMatch = configContent.match(/modules:\s*\[([\s\S]*?)\]/);
    if (modulesMatch) {
      const modulesList = modulesMatch[1];
      // Extract variable names from the array (handles comments)
      const moduleVars = modulesList
        .split(',')
        .map(line => {
          const varMatch = line.match(/\b(\w+)\b/);
          return varMatch ? varMatch[1] : null;
        })
        .filter(Boolean);
      
      // Get moduleKey for each module
      for (const varName of moduleVars) {
        const fileName = imports.get(varName);
        if (fileName) {
          try {
            const modulePath = join(unitDir, fileName + '.js');
            const moduleContent = readFileSync(modulePath, 'utf-8');
            const moduleKeyMatch = moduleContent.match(/moduleKey:\s*["']([^"']+)["']/);
            
            if (moduleKeyMatch) {
              const moduleKey = moduleKeyMatch[1];
              mappings.push({ id: currentId++, moduleKey, varName, fileName });
            }
          } catch (err) {
            console.error(`Error reading ${varName} (${fileName}): ${err.message}`);
          }
        }
      }
    }
  } catch (err) {
    console.error(`Error reading ${configPath}: ${err.message}`);
  }
}

// Output SQL VALUES
console.log('VALUES');
mappings.forEach((m, i) => {
  const comma = i < mappings.length - 1 ? ',' : '';
  console.log(`  (${m.id}, '${m.moduleKey}')${comma}`);
});

console.log(`\n-- Total: ${mappings.length} modules mapped`);




