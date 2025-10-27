#!/usr/bin/env node

/**
 * Add Parts of Speech to Unmet Words List
 *
 * This script reads the unmet words list and adds part of speech
 * annotations based on manual analysis.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Part of speech mappings based on manual analysis
const posMappings = {
  // NOUNS - Proper & Common
  abord: "noun",
  arc: "noun",
  artistes: "noun",
  champs: "noun",
  château: "noun",
  citoyens: "noun",
  coq: "noun",
  compte: "noun",
  comte: "noun",
  contributions: "noun",
  dame: "noun",
  destinations: "noun",
  diplomates: "noun",
  directions: "noun",
  efforts: "noun",
  end: "noun",
  expériences: "noun",
  face: "noun",
  films: "noun",
  habitude: "noun",
  idées: "noun",
  influence: "noun",
  informations: "noun",
  jardin: "noun",
  journées: "noun",
  langues: "noun",
  leçons: "noun",
  lieues: "noun",
  lieux: "noun",
  ligne: "noun",
  lumières: "noun",
  mémoire: "noun",
  millions: "noun",
  minutes: "noun",
  mois: "noun",
  monuments: "noun",
  musique: "noun",
  musée: "noun",
  organisations: "noun",
  paix: "noun",
  peintres: "noun",
  peintures: "noun",
  phrases: "noun",
  produits: "noun",
  quartiers: "noun",
  questions: "noun",
  relations: "noun",
  rêves: "noun",
  secteurs: "noun",
  sens: "noun",
  suite: "noun",
  surprise: "noun",
  tables: "noun",
  tour: "noun",
  touristes: "noun",
  transports: "noun",
  valeurs: "noun",
  vies: "noun",
  villes: "noun",
  visiteurs: "noun",
  voyageurs: "noun",
  vue: "noun",
  week: "noun",
  école: "noun",
  écoles: "noun",
  époque: "noun",
  études: "noun",
  étudiants: "noun",
  éditeurs: "noun",
  étrangers: "noun",
  étrangères: "noun",

  // VERBS - Various tenses and forms
  achèterais: "verb",
  admirer: "verb",
  adore: "verb",
  adorent: "verb",
  aident: "verb",
  aimait: "verb",
  aimerais: "verb",
  allés: "verb",
  amuse: "verb",
  appelle: "verb",
  arrivent: "verb",
  arriver: "verb",
  arrivé: "verb",
  assis: "verb",
  assise: "verb",
  attendent: "verb",
  attire: "verb",
  change: "verb",
  changements: "verb",
  commence: "verb",
  commencé: "verb",
  communiquent: "verb",
  comprenais: "verb",
  connectent: "verb",
  continue: "verb",
  continues: "verb",
  continué: "verb",
  contribuent: "verb",
  créent: "verb",
  créé: "verb",
  deviennent: "verb",
  donnent: "verb",
  décidé: "verb",
  découvrir: "verb",
  déplacer: "verb",
  dépêcher: "verb",
  embrassant: "verb",
  encourage: "verb",
  enrichissent: "verb",
  essaies: "verb",
  essayer: "verb",
  essayé: "verb",
  exportent: "verb",
  fonctionne: "verb",
  habille: "verb",
  habite: "verb",
  habiter: "verb",
  lave: "verb",
  levais: "verb",
  lève: "verb",
  mangions: "verb",
  marcher: "verb",
  monte: "verb",
  montrent: "verb",
  parlions: "verb",
  participe: "verb",
  pensais: "verb",
  pense: "verb",
  pensent: "verb",
  pensé: "verb",
  perdu: "verb",
  permet: "verb",
  plaît: "verb",
  pose: "verb",
  préfèrent: "verb",
  prépare: "verb",
  préserve: "verb",
  regardais: "verb",
  regardent: "verb",
  regrette: "verb",
  renoncerais: "verb",
  rentrant: "verb",
  rentre: "verb",
  rentrer: "verb",
  rentré: "verb",
  reste: "verb",
  restent: "verb",
  rester: "verb",
  restés: "verb",
  retrouvé: "verb",
  revoir: "verb",
  réussi: "verb",
  réussisse: "verb",
  réussissions: "verb",
  réveille: "verb",
  réveillé: "verb",
  révise: "verb",
  rêver: "verb",
  saches: "verb",
  saura: "verb",
  sauras: "verb",
  savais: "verb",
  savait: "verb",
  soutiennent: "verb",
  souviens: "verb",
  su: "verb",
  travaille: "verb",
  travaillent: "verb",
  trouve: "verb",
  trouver: "verb",
  visitent: "verb",
  vit: "verb",
  vivent: "verb",
  voyagent: "verb",
  voyagerais: "verb",
  vécu: "verb",
  vus: "verb",
  écoute: "verb",
  écoutent: "verb",
  étudie: "verb",
  étudient: "verb",

  // ADJECTIVES
  bas: "adjective",
  collective: "adjective",
  culinaires: "adjective",
  culturelles: "adjective",
  célèbre: "adjective",
  célèbres: "adjective",
  dernière: "adjective",
  différemment: "adjective",
  différente: "adjective",
  différentes: "adjective",
  dur: "adjective",
  essentielles: "adjective",
  européennes: "adjective",
  excellente: "adjective",
  française: "adjective",
  françaises: "adjective",
  froid: "adjective",
  généralement: "adjective",
  heureuse: "adjective",
  heureux: "adjective",
  important: "adjective",
  importante: "adjective",
  importantes: "adjective",
  importants: "adjective",
  impressionnistes: "adjective",
  inoubliables: "adjective",
  internationale: "adjective",
  internationalement: "adjective",
  magnifiques: "adjective",
  parfaite: "adjective",
  populaires: "adjective",
  publics: "adjective",
  quotidienne: "adjective",
  reconnaissante: "adjective",
  reconnu: "adjective",
  riche: "adjective",
  sûr: "adjective",
  traditionnels: "adjective",

  // ADVERBS
  activement: "adverb",
  autour: "adverb",
  différemment: "adverb",
  généralement: "adverb",
  internationalement: "adverb",
  loin: "adverb",
  peu: "adverb",
  près: "adverb",
  seulement: "adverb",
  souvent: "adverb",
  tard: "adverb",
  tôt: "adverb",
  également: "adverb",

  // PREPOSITIONS
  autour: "preposition",
  bas: "preposition",
  delà: "preposition",
  grâce: "preposition",
  loin: "preposition",
  près: "preposition",
  via: "preposition",

  // CONJUNCTIONS
  end: "conjunction",
  oh: "conjunction",
  parce: "conjunction",
  qu: "conjunction",
  si: "conjunction",

  // INTERJECTIONS
  excusez: "interjection",
  oh: "interjection",

  // PRONOUNS
  qu: "pronoun",
  rien: "pronoun",

  // PROPER NOUNS (treated as nouns but with special marking)
  amélie: "proper_noun",
  auguste: "proper_noun",
  bayeux: "proper_noun",
  caen: "proper_noun",
  cannes: "proper_noun",
  claude: "proper_noun",
  cristo: "proper_noun",
  eiffel: "proper_noun",
  flore: "proper_noun",
  france: "proper_noun",
  germain: "proper_noun",
  gogh: "proper_noun",
  honfleur: "proper_noun",
  jules: "proper_noun",
  louvre: "proper_noun",
  luxembourg: "proper_noun",
  lyon: "proper_noun",
  marseille: "proper_noun",
  michel: "proper_noun",
  midi: "proper_noun",
  monet: "proper_noun",
  mont: "proper_noun",
  montmartre: "proper_noun",
  moulin: "proper_noun",
  nice: "proper_noun",
  normandie: "proper_noun",
  odéon: "proper_noun",
  paul: "proper_noun",
  procope: "proper_noun",
  renoir: "proper_noun",
  rouen: "proper_noun",
  saint: "proper_noun",
  socrate: "proper_noun",
  sophie: "proper_noun",
  sorbonne: "proper_noun",
  thomas: "proper_noun",
  triomphe: "proper_noun",
  van: "proper_noun",
  verne: "proper_noun",
  versailles: "proper_noun",
  vincent: "proper_noun",
  élysées: "proper_noun",
};

// Read the unmet words file
const unmetWordsFile = path.join(__dirname, "all-reading-words-unmet.txt");
const content = fs.readFileSync(unmetWordsFile, "utf8");

// Split into lines and process
const lines = content.split("\n");
const outputLines = [];

for (const line of lines) {
  if (line.startsWith("#") || line.trim() === "") {
    // Keep header lines and empty lines as-is
    outputLines.push(line);
  } else {
    // Add part of speech to word lines
    const word = line.trim();
    const pos = posMappings[word] || "unknown";
    outputLines.push(`${word} (${pos})`);
  }
}

// Write the updated file
const outputFile = path.join(__dirname, "all-reading-words-unmet-with-pos.txt");
fs.writeFileSync(outputFile, outputLines.join("\n"), "utf8");

console.log("✅ SUCCESS!");
console.log(`📄 Updated file: ${outputFile}`);
console.log(`📊 Words processed: ${Object.keys(posMappings).length}`);

// Show statistics
const posCounts = {};
for (const [word, pos] of Object.entries(posMappings)) {
  posCounts[pos] = (posCounts[pos] || 0) + 1;
}

console.log("\n📊 Part of Speech Distribution:");
for (const [pos, count] of Object.entries(posCounts)) {
  console.log(`  ${pos}: ${count} words`);
}
