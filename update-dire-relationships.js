const fs = require('fs');

function updateDireRelationships() {
  console.log('🔧 Adding all dire conjugations to the main dire entry...\n');

  const filePath = 'src/data/dictionary/words/cambridge/verbs.js';
  let content = fs.readFileSync(filePath, 'utf8');

  // Find the dire entry and replace its relationships array
  const direRelationships = [
    {
      "type": "conjugation_pair",
      "targetId": "dis-fr",
      "targetWord": "dis",
      "note": "present - je/tu"
    },
    {
      "type": "conjugation_pair",
      "targetId": "dit-fr",
      "targetWord": "dit",
      "note": "present - il/elle"
    },
    {
      "type": "conjugation_pair",
      "targetId": "disons-fr",
      "targetWord": "disons",
      "note": "present - nous"
    },
    {
      "type": "conjugation_pair",
      "targetId": "dites-fr",
      "targetWord": "dites",
      "note": "present - vous"
    },
    {
      "type": "conjugation_pair",
      "targetId": "disent-fr",
      "targetWord": "disent",
      "note": "present - ils/elles"
    },
    {
      "type": "conjugation_pair",
      "targetId": "ai dit-fr",
      "targetWord": "ai dit",
      "note": "past - je"
    },
    {
      "type": "conjugation_pair",
      "targetId": "as dit-fr",
      "targetWord": "as dit",
      "note": "past - tu"
    },
    {
      "type": "conjugation_pair",
      "targetId": "a dit-fr",
      "targetWord": "a dit",
      "note": "past - il/elle"
    },
    {
      "type": "conjugation_pair",
      "targetId": "avons dit-fr",
      "targetWord": "avons dit",
      "note": "past - nous"
    },
    {
      "type": "conjugation_pair",
      "targetId": "avez dit-fr",
      "targetWord": "avez dit",
      "note": "past - vous"
    },
    {
      "type": "conjugation_pair",
      "targetId": "ont dit-fr",
      "targetWord": "ont dit",
      "note": "past - ils/elles"
    },
    {
      "type": "conjugation_pair",
      "targetId": "dirai-fr",
      "targetWord": "dirai",
      "note": "future - je"
    },
    {
      "type": "conjugation_pair",
      "targetId": "diras-fr",
      "targetWord": "diras",
      "note": "future - tu"
    },
    {
      "type": "conjugation_pair",
      "targetId": "dira-fr",
      "targetWord": "dira",
      "note": "future - il/elle"
    },
    {
      "type": "conjugation_pair",
      "targetId": "dirons-fr",
      "targetWord": "dirons",
      "note": "future - nous"
    },
    {
      "type": "conjugation_pair",
      "targetId": "direz-fr",
      "targetWord": "direz",
      "note": "future - vous"
    },
    {
      "type": "conjugation_pair",
      "targetId": "diront-fr",
      "targetWord": "diront",
      "note": "future - ils/elles"
    }
  ];

  // Replace the relationships array in the dire entry
  const relationshipsString = JSON.stringify(direRelationships, null, 8);
  
  // Find and replace the relationships array
  const relationshipsRegex = /"relationships":\s*\[[^\]]*\]/s;
  const newRelationships = `"relationships": ${relationshipsString}`;
  
  content = content.replace(relationshipsRegex, newRelationships);
  
  fs.writeFileSync(filePath, content);
  
  console.log('✅ Updated dire relationships');
  console.log(`📊 Added ${direRelationships.length} conjugation relationships to dire`);
}

updateDireRelationships();
