#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const nounsPath = path.join(projectRoot, "src", "data", "dictionary", "words", "nouns.js");
const nounsContent = fs.readFileSync(nounsPath, "utf8");

// Extract all word entries with their translations
const entryPattern = /word:\s*"([^"]+)"[\s\S]*?text:\s*"([^"]+)"[\s\S]*?definition:\s*"([^"]*)"/g;
const entries = [...nounsContent.matchAll(entryPattern)];

console.log(`🔍 Analyzing ${entries.length} entries for misclassifications...\n`);

// Classification categories
const nonNouns = {
  articles: [],
  pronouns: [],
  verbs: [],
  adjectives: [],
  adverbs: [],
  prepositions: [],
  conjunctions: [],
  commands: [],
  expressions: [],
  phrases: []
};

// Classification function
const classifyWord = (word, english, definition) => {
  const w = word.toLowerCase();
  const eng = english.toLowerCase();
  const def = definition.toLowerCase();
  
  // Articles
  if (['le', 'la', 'les', 'un', 'une', 'des', "l'", 'l', 'au', 'aux', 'du'].includes(w)) {
    return 'articles';
  }
  
  // Pronouns
  if (['je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles', 'on', 'me', 'te', 'se', 'leur', 'lui', 'y', 'en', 'moi', 'toi', 'soi', 'ce', 'ceci', 'cela', 'ça', 'ces', 'cet', 'cette'].includes(w)) {
    return 'pronouns';
  }
  
  // Conjunctions
  if (['et', 'mais', 'ou', 'donc', 'car', 'ni', 'or', 'comme', 'quand', 'que', 'qui', 'où', 'comment', 'pourquoi', 'combien'].includes(w)) {
    return 'conjunctions';
  }
  
  // Prepositions
  if (['à', 'de', 'dans', 'sur', 'avec', 'pour', 'par', 'sans', 'sous', 'vers', 'chez', 'entre', 'contre', 'depuis', 'pendant', 'avant', 'après', 'devant', 'derrière', 'parmi', 'au', 'aux', 'du'].includes(w)) {
    return 'prepositions';
  }
  
  // Adverbs
  if (['très', 'aussi', 'bien', 'mal', 'plus', 'moins', 'beaucoup', 'peu', 'trop', 'assez', 'toujours', 'jamais', 'souvent', 'parfois', 'ici', 'là', 'maintenant', 'aujourd', 'hier', 'demain', 'alors', 'ainsi', 'encore', 'déjà', 'vraiment', 'seulement', 'peut-être', 'surtout', 'ensuite', 'enfin', 'finalement', 'probablement', 'soudain', 'lentement', 'rapidement', 'facilement', 'complètement', 'simplement', 'activement', 'sérieusement', 'régulièrement', 'internationalement', 'là-bas', 'partout', 'dehors', 'hyper', 'vachement', 'super', 'top', 'bah'].includes(w)) {
    return 'adverbs';
  }
  
  // Commands (imperative verbs ending with !)
  if (word.endsWith('!')) {
    return 'commands';
  }
  
  // Verbs (check English translations and French patterns)
  if (eng.includes(' am') || eng.includes(' are') || eng.includes(' is') || 
      eng.includes(' have') || eng.includes(' has') || eng.includes(' go') ||
      eng.includes(' can') || eng.includes(' want') || eng.includes(' come') ||
      eng.includes(' see') || eng.includes(' do') || eng.includes(' make') ||
      eng.includes(' take') || eng.includes(' give') || eng.includes(' put') ||
      eng.includes(' say') || eng.includes(' tell') || eng.includes(' know') ||
      eng.includes(' think') || eng.includes(' believe') || eng.includes(' understand') ||
      eng.includes(' learn') || eng.includes(' study') || eng.includes(' work') ||
      eng.includes(' play') || eng.includes(' eat') || eng.includes(' drink') ||
      eng.includes(' sleep') || eng.includes(' walk') || eng.includes(' run') ||
      eng.includes(' swim') || eng.includes(' fly') || eng.includes(' jump') ||
      eng.includes(' look') || eng.includes(' listen') || eng.includes(' speak') ||
      eng.includes(' read') || eng.includes(' write') || eng.includes(' buy') ||
      eng.includes(' sell') || eng.includes(' help') || eng.includes(' wait') ||
      eng.includes(' find') || eng.includes(' lose') || eng.includes(' win') ||
      eng.includes(' try') || eng.includes(' start') || eng.includes(' stop') ||
      eng.includes(' continue') || eng.includes(' finish') || eng.includes(' change') ||
      eng.includes(' move') || eng.includes(' stay') || eng.includes(' leave') ||
      eng.includes(' arrive') || eng.includes(' return') || eng.includes(' travel') ||
      eng.includes(' visit') || eng.includes(' meet') || eng.includes(' call') ||
      eng.includes(' ask') || eng.includes(' answer') || eng.includes(' explain') ||
      eng.includes(' show') || eng.includes(' teach') || eng.includes(' remember') ||
      eng.includes(' forget') || eng.includes(' choose') || eng.includes(' decide') ||
      eng.includes(' hope') || eng.includes(' dream') || eng.includes(' feel') ||
      eng.includes(' love') || eng.includes(' like') || eng.includes(' hate') ||
      eng.includes(' prefer') || eng.includes(' need') || eng.includes(' must') ||
      eng.includes(' should') || eng.includes(' could') || eng.includes(' would') ||
      def.includes('conjugat') || def.includes('infinitive') ||
      eng.startsWith('to ') ||
      // French verb patterns
      ['allez', 'va', 'viens', 'venez', 'sois', 'soyez', 'ait', 'soient', 'soit', 'soyons',
       'fais', 'fait', 'faites', 'j', 'apprend', 'apprendre', 'appeler', 'arriver',
       'attendre', 'boire', 'cherche', 'chercher', 'comprend', 'comprendre', 'comprends',
       'comprenez', 'connais', 'connaître', 'continue', 'continuer', 'continuez',
       'croire', 'croit', 'demande', 'demander', 'devenir', 'deviennent', 'dire',
       'discutent', 'dois', 'donner', 'dormir', 'découvrir', 'dépend', 'essaie',
       'essaies', 'essayer', 'essayé', 'existe', 'exportent', 'finir', 'fonctionne',
       'garde', 'grimper', 'inspirent', 'jouer', 'manger', 'marcher', 'mettre',
       'montrent', 'nager', 'participe', 'partir', 'payer', 'permet', 'peuvent',
       'pleuvoir', 'pousser', 'prendre', 'profiter', 'protéger', 'préfèrent',
       'puisse', 'puissions', 'regarder', 'rencontre', 'rencontrer', 'renoncerais',
       'rester', 'retrouvé', 'réussi', 'réussisse', 'réussissions', 'révise',
       'réviser', 'rêver', 'sache', 'saches', 'sais', 'sait', 'sauter', 'savoir',
       'serais', 'souffler', 'tourne', 'tournez', 'trouve', 'trouver', 'utiliser',
       'vienne', 'viens', 'vivre', 'voient', 'voler', 'voyagerais', 'était',
       'écouter', 'économiser', 'étudie', 'étudier', 'évoluer', 'achèterais',
       'admirer', 'adorent', 'aider', 'aies', 'brillaient', 'briller', 'change',
       'combine', 'communiquent', 'connectent', 'créent', 'devoirs'].includes(w)) {
    return 'verbs';
  }
  
  // Adjectives (check English translations)
  if (eng.includes('good') || eng.includes('bad') || eng.includes('big') || eng.includes('small') ||
      eng.includes('new') || eng.includes('old') || eng.includes('young') || eng.includes('beautiful') ||
      eng.includes('ugly') || eng.includes('happy') || eng.includes('sad') || eng.includes('hot') ||
      eng.includes('cold') || eng.includes('fast') || eng.includes('slow') || eng.includes('easy') ||
      eng.includes('difficult') || eng.includes('important') || eng.includes('interesting') ||
      eng.includes('different') || eng.includes('same') || eng.includes('other') ||
      eng.includes('first') || eng.includes('last') || eng.includes('next') ||
      eng.includes('perfect') || eng.includes('excellent') || eng.includes('great') ||
      eng.includes('wonderful') || eng.includes('terrible') || eng.includes('amazing') ||
      eng.includes('tired') || eng.includes('hungry') || eng.includes('thirsty') ||
      eng.includes('sick') || eng.includes('healthy') || eng.includes('strong') ||
      eng.includes('weak') || eng.includes('rich') || eng.includes('poor') ||
      eng.includes('free') || eng.includes('busy') || eng.includes('ready') ||
      eng.includes('sure') || eng.includes('possible') || eng.includes('impossible') ||
      // French adjective patterns
      ['bon', 'excellent', 'excellente', 'parfait', 'magnifique', 'génial', 'délicieux',
       'difficile', 'facile', 'rapide', 'rapides', 'moderne', 'historique', 'historiques',
       'populaire', 'public', 'primaire', 'international', 'internationales', 'européennes',
       'française', 'français', 'culturelles', 'mondiales', 'politiques', 'économiques',
       'différente', 'meilleur', 'meilleure', 'meilleures', 'pire', 'proche', 'lointain(e)',
       'heureux', 'contente', 'contents', 'fatigué', 'reconnaissante', 'reconnu',
       'typique', 'significatif', 'éducatif'].includes(w)) {
    return 'adjectives';
  }
  
  // Multi-word expressions/phrases
  if (word.includes(' ') && !word.match(/^(un|une|le|la|les|l')\s/)) {
    return 'phrases';
  }
  
  // Expressions (interjections, etc.)
  if (['oui', 'non', 'merci', 'pardon', 'salut', 'excusez-moi'].includes(w)) {
    return 'expressions';
  }
  
  return null; // Correctly classified as noun
};

// Analyze each entry
let correctNouns = 0;

entries.forEach(match => {
  const word = match[1];
  const english = match[2];
  const definition = match[3];
  
  const correctCategory = classifyWord(word, english, definition);
  
  if (correctCategory) {
    nonNouns[correctCategory].push({
      word,
      english,
      definition
    });
  } else {
    correctNouns++;
  }
});

// Report results
console.log('📊 MISCLASSIFICATION ANALYSIS\n');

let totalMisclassified = 0;
Object.entries(nonNouns).forEach(([category, words]) => {
  if (words.length > 0) {
    console.log(`🔄 ${category.toUpperCase()} (${words.length} entries):`);
    words.forEach(({ word, english }) => {
      console.log(`   "${word}" → "${english}"`);
    });
    console.log();
    totalMisclassified += words.length;
  }
});

console.log(`✅ Correctly classified nouns: ${correctNouns}`);
console.log(`❌ Misclassified entries: ${totalMisclassified}`);
console.log(`📊 Total analyzed: ${entries.length}\n`);

// Save results
const resultsPath = path.join(projectRoot, 'misclassified-nouns.json');
fs.writeFileSync(resultsPath, JSON.stringify({
  summary: {
    correctNouns,
    totalMisclassified,
    totalAnalyzed: entries.length
  },
  nonNouns
}, null, 2));

console.log(`📁 Results saved to: ${resultsPath}`);
