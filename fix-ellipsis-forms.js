const fs = require('fs');
const path = require('path');

// Files to check for ellipsis forms
const filesToCheck = [
  'src/data/dictionary/words/cambridge/verbs.js',
  'src/data/dictionary/words/cambridge/adverbs.js'
];

function fixEllipsisForms() {
  console.log('🔧 Converting ellipsis forms to regular spaces...\n');

  filesToCheck.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      console.log(`📝 Processing ${filePath}...`);
      
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      // Convert "ne...word...pas" to "ne word pas"
      content = content.replace(/ne\.\.\.([^\.]+)\.\.\.pas/g, 'ne $1 pas');
      
      // Count changes
      const changes = (originalContent.match(/ne\.\.\./g) || []).length;
      
      if (changes > 0) {
        fs.writeFileSync(filePath, content);
        console.log(`  ✅ Fixed ${changes} ellipsis forms`);
      } else {
        console.log(`  ℹ️  No ellipsis forms found`);
      }
    } else {
      console.log(`  ⚠️  File not found: ${filePath}`);
    }
  });

  console.log('\n✅ Ellipsis form conversion complete!');
}

fixEllipsisForms();
