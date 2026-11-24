// Adds the standard French words the course used that were missing from the graph (the unknown-word list of
// the first full check), as headwords and irregular forms. Entries already present are skipped, so running it
// again changes nothing.
// Source of truth: headwords.json and forms.json. This script records how these words were added and why
// some forms are left out; add new words by editing the JSON files.
// Usage: node scripts/graph/fr/build/add-words.mjs
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { writeSortedJson } from '../../write-json.mjs';
import { FR_DIR as DIR } from './lib.mjs';

const P = ['1sg', '2sg', '3sg', '1pl', '2pl', '3pl'];
const ER = ['fr:cx:verb.er.present', 'fr:cx:ptcp.er', 'fr:cx:verb.er.impf', 'fr:cx:verb.future',
  'fr:cx:verb.conditional', 'fr:cx:verb.er.subjunctive', 'fr:cx:prsptcp.er'];
const PL = ['fr:cx:noun.plural'];

// [key, lemma, pos, paradigms]
const WORDS = [
  // nouns
  ...['magasin', 'sport', 'sac', 'chemise', 'chaussure', 'steak', 'dessert', 'sommeil', 'espace', 'examen', 'lendemain',
    'retard', 'match', 'anniversaire', 'sofa', 'parking', 'secret', 'lampe', 'chambre', 'route', 'fontaine', 'couloir',
    'garçon', 'appartement', 'foot', 'chaise', 'aile', 'contribution', 'terrasse'].map((w) => [w, w, 'noun', PL]),
  ['verite', 'vérité', 'noun', PL], ['riviere', 'rivière', 'noun', PL], ['piece', 'pièce', 'noun', PL],
  ['television', 'télévision', 'noun', PL], ['numero', 'numéro', 'noun', PL],
  ['lit', 'lit', 'noun', PL], // le lit (bed); lit is also lire, il lit
  ['anglais', 'anglais', 'noun', []], // l'anglais (the language); plural is the same
  // adjectives
  ['cher', 'cher', 'adjective', ['fr:cx:adj.er']],
  ['utile', 'utile', 'adjective', ['fr:cx:adj.e']],
  ['classique', 'classique', 'adjective', ['fr:cx:adj.e']],
  ['mauvais', 'mauvais', 'adjective', ['fr:cx:adj.s']],
  ['pret', 'prêt', 'adjective', ['fr:cx:adj.regular']],
  ['interessant', 'intéressant', 'adjective', ['fr:cx:adj.regular']],
  // adverb, preposition
  ['tranquillement', 'tranquillement', 'adverb', []],
  ['jusque', 'jusque', 'preposition', []],
  // regular -er verbs
  ...['annuler', 'gagner', 'rater', 'cuisiner', 'cacher', 'expliquer', 'discuter', 'combiner'].map((w) => [w, w, 'verb', ER]),
  // irregular verbs: the future and conditional follow the infinitive; every other cell is listed below
  ['lire', 'lire', 'verb', ['fr:cx:verb.future', 'fr:cx:verb.conditional']],
  ['sourire', 'sourire', 'verb', ['fr:cx:verb.future', 'fr:cx:verb.conditional']],
  ['ouvrir', 'ouvrir', 'verb', ['fr:cx:verb.future', 'fr:cx:verb.conditional']],
  ['suivre', 'suivre', 'verb', ['fr:cx:verb.future', 'fr:cx:verb.conditional']],
  // regular -re verb (like attendre); found once the gap-fill reader stopped gluing answers to their neighbours
  ['entendre', 'entendre', 'verb', ['fr:cx:verb.re.present', 'fr:cx:ptcp.re', 'fr:cx:verb.re.impf', 'fr:cx:verb.future',
    'fr:cx:verb.conditional', 'fr:cx:verb.re.subjunctive', 'fr:cx:prsptcp.re']],
];

const persons = (tense, list) => list.split(' ').map((s, i) => [`${tense}.${P[i]}`, s]);
const impf = (stem) => persons('impf', ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'].map((e) => stem + e).join(' '));
const IRREGULAR = {
  lire: [
    ...persons('prs', 'lis lis lit lisons lisez lisent'), ...impf('lis'),
    ...persons('sbjv', 'lise lises lise lisions lisiez lisent'),
    ['ptcp', 'lu'], ['ptcp.f', 'lue'], ['ptcp.pl', 'lus'], ['ptcp.fpl', 'lues'], ['prsptcp', 'lisant'],
  ],
  sourire: [
    ...persons('prs', 'souris souris sourit sourions souriez sourient'), ...impf('souri'),
    ...persons('sbjv', 'sourie souries sourie souriions souriiez sourient'),
    ['ptcp', 'souri'], ['prsptcp', 'souriant'],
  ],
  ouvrir: [
    ...persons('prs', 'ouvre ouvres ouvre ouvrons ouvrez ouvrent'), ...impf('ouvr'),
    ...persons('sbjv', 'ouvre ouvres ouvre ouvrions ouvriez ouvrent'),
    ['ptcp', 'ouvert'], ['ptcp.f', 'ouverte'], ['ptcp.pl', 'ouverts'], ['ptcp.fpl', 'ouvertes'], ['prsptcp', 'ouvrant'],
  ],
  // je suis and tu suis are left out: the surface is read as être, and listing it would credit suivre in every
  // vocabulary table that has "je suis"
  suivre: [
    ...persons('prs', 'suis suis suit suivons suivez suivent').slice(2), ...impf('suiv'),
    ...persons('sbjv', 'suive suives suive suivions suiviez suivent'),
    ['ptcp', 'suivi'], ['ptcp.f', 'suivie'], ['ptcp.pl', 'suivis'], ['ptcp.fpl', 'suivies'], ['prsptcp', 'suivant'],
  ],
  jusque: [['elided', "jusqu'"]],
};

const headwords = JSON.parse(readFileSync(join(DIR, 'headwords.json'), 'utf8'));
const forms = JSON.parse(readFileSync(join(DIR, 'forms.json'), 'utf8'));
const hwIds = new Set(headwords.map((h) => h.id));
const formIds = new Set(forms.map((f) => f.id));
let addedH = 0;
let addedF = 0;
for (const [key, lemma, pos, paradigms] of WORDS) {
  const id = `fr:lex:${key}`;
  if (hwIds.has(id)) continue;
  if (headwords.some((h) => h.lemma === lemma && h.pos === pos)) throw new Error(`${lemma} (${pos}) exists under another id`);
  headwords.push({ cefr: null, cefrSource: null, dictionaryId: `${lemma}-fr`, id, lemma, paradigms, pos, senses: [] });
  hwIds.add(id);
  addedH++;
}
for (const [key, cells] of Object.entries(IRREGULAR)) {
  for (const [cell, surface] of cells) {
    const id = `fr:form:${key}.${cell}`;
    if (formIds.has(id)) continue;
    forms.push({ cell, id, of: `fr:lex:${key}`, surface });
    formIds.add(id);
    addedF++;
  }
}
const byId = (a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
const sorted = (list) => list.every((x, i) => i === 0 || byId(list[i - 1], x) <= 0);
const wasSortedH = sorted(headwords.slice(0, headwords.length - addedH));
const wasSortedF = sorted(forms.slice(0, forms.length - addedF));
writeSortedJson(join(DIR, 'headwords.json'), wasSortedH ? headwords.sort(byId) : headwords);
writeSortedJson(join(DIR, 'forms.json'), wasSortedF ? forms.sort(byId) : forms);
console.log(`add-words: ${addedH} headwords, ${addedF} forms added (sorted: ${wasSortedH}, ${wasSortedF})`);
