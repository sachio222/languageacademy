// Adds words to a language's word list: reads curriculum-graph/languages/<lang>/word-list.json and writes the
// headwords and the irregular forms it gives into headwords.json and forms.json. One builder serves every language;
// what differs between languages (which paradigms a word takes, which spellings its paradigms do not build) is in
// scripts/graph/<lang>/inflect.mjs.
//
// A word-list entry:
//   lemma, pos, level, gloss   required; level is A1 to C2
//   gender                     nouns only: m, f or m/f (one form for both)
//   register                   spoken (said, seldom written) or slang; left out for neutral words
//   use                        recognize: the learner reads and hears the word but is never asked to produce it
//   class                      an inflection class the language's rules know (French: ir, re, double)
//   like                       a verb already in the list that this one is conjugated like (défaire like faire); the
//                              lemma must end with it, and every cell is copied with the start added
//   paradigms                  the paradigm IDs, when the language's rules would pick the wrong ones
//   forms                      { cell: spelling } for forms no paradigm builds (pl: beaux-pères)
//   id                         the ID, when the plain one belongs to another word (tache, a stain, beside tâche)
//   source                     where the level comes from; "agent: judgment" when left out
//
// A word already in headwords.json (same lemma and part of speech) is skipped, so running the builder again changes
// nothing. headwords.json and forms.json stay the source of truth: change a word that is already there by editing them
// and its line in the list together. The test add-words.test.mjs rebuilds every listed word from the list alone and
// compares the result with the two files, byte for byte.
// Usage: node scripts/graph/add-words.mjs <lang>
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { fold } from './fold.mjs';
import { LEVELS } from './levels-data.mjs';
import { writeSortedJson } from './write-json.mjs';

export const REGISTERS = ['spoken', 'slang'];
export const USES = ['recognize'];
const GENDERS = ['m', 'f', 'm/f'];
const FIELDS = new Set(['lemma', 'pos', 'level', 'gloss', 'gender', 'register', 'use', 'class', 'like', 'paradigms', 'forms', 'id', 'source']);
const DEFAULT_SOURCE = 'agent: judgment';

export const keyOf = (lemma) => fold(lemma).replace(/[\s']+/g, '-');
export const idOf = (lang, entry) => entry.id ?? `${lang}:lex:${keyOf(entry.lemma)}`;
const byId = (a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);

// Problems in the list itself, as lines of text; an empty list means it can be built.
export function listProblems(list, lang) {
  const out = [];
  const seen = new Set();
  const ids = new Set();
  for (const [i, e] of list.entries()) {
    const at = `word-list.json[${i}] ${e?.lemma ?? ''}`.trim();
    for (const f of ['lemma', 'pos', 'level', 'gloss']) if (typeof e?.[f] !== 'string' || !e[f]) out.push(`${at}: ${f} is missing`);
    for (const f of Object.keys(e ?? {})) if (!FIELDS.has(f)) out.push(`${at}: ${f} is not a field of a word-list entry`);
    if (e.level && !LEVELS.includes(e.level)) out.push(`${at}: level ${e.level} is not one of ${LEVELS.join(', ')}`);
    if ((e.pos === 'noun') !== (e.gender !== undefined)) out.push(`${at}: a noun, and only a noun, takes a gender`);
    if (e.gender !== undefined && !GENDERS.includes(e.gender)) out.push(`${at}: gender ${e.gender} is not one of ${GENDERS.join(', ')}`);
    if (e.register !== undefined && !REGISTERS.includes(e.register)) out.push(`${at}: register ${e.register} is not one of ${REGISTERS.join(', ')}`);
    if (e.use !== undefined && !USES.includes(e.use)) out.push(`${at}: use ${e.use} is not one of ${USES.join(', ')}; leave it out for a word the learner produces`);
    if (e.like !== undefined && !(typeof e.lemma === 'string' && e.lemma.endsWith(e.like) && e.lemma !== e.like)) out.push(`${at}: like ${e.like} must be the end of the lemma`);
    if (e.id !== undefined && !String(e.id).startsWith(`${lang}:lex:`)) out.push(`${at}: id must start with ${lang}:lex:`);
    const key = `${e.lemma}|${e.pos}`;
    if (seen.has(key)) out.push(`${at}: listed twice as ${e.pos}`);
    seen.add(key);
    const id = idOf(lang, e);
    if (ids.has(id)) out.push(`${at}: ${id} is the ID of another entry of the list; give one of them its own id`);
    ids.add(id);
  }
  return out;
}

/**
 * The word list added to the data. data: { headwords, forms, paradigms } as read from the language folder (not
 * changed); rules: the language's inflect.mjs; dictionaryIds: a Set of app dictionary keys, for dictionaryId.
 * Returns { headwords, forms, added: { headwords, forms } }, both lists sorted by ID.
 */
export function addWords({ lang, list, data, rules, dictionaryIds = new Set() }) {
  const problems = listProblems(list, lang);
  if (problems.length) throw new Error(`add-words: ${problems.join('\n')}`);
  const headwords = [...data.headwords];
  const forms = [...data.forms];
  const rulesOf = new Map(data.paradigms.map((p) => [p.id, p.rules ?? []]));
  const have = new Set(headwords.map((h) => `${h.lemma}|${h.pos}`));
  const byHeadId = new Map(headwords.map((h) => [h.id, h]));
  const formIds = new Set(forms.map((f) => f.id));
  // The spelling a word's paradigms build for a cell, or null.
  const regular = (lemma, pids, cell) => {
    for (const pid of pids) {
      for (const rule of rulesOf.get(pid) ?? []) {
        if (rule.cell === cell && lemma.endsWith(rule.strip)) return lemma.slice(0, lemma.length - rule.strip.length) + rule.add;
      }
    }
    return null;
  };
  // A verb conjugated like one already in the list: its paradigms, and every one of its forms with the start added.
  const copied = (e) => {
    const model = headwords.find((h) => h.lemma === e.like && h.pos === e.pos);
    if (!model) throw new Error(`add-words: ${e.lemma} is like ${e.like}, which is not in the word list as ${e.pos}`);
    const start = e.lemma.slice(0, e.lemma.length - e.like.length);
    return { paradigms: [...model.paradigms], cells: forms.filter((f) => f.of === model.id).map((f) => [f.cell, start + f.surface]) };
  };
  const added = { headwords: 0, forms: 0 };
  for (const e of list) {
    if (have.has(`${e.lemma}|${e.pos}`)) continue; // already in the word list
    const id = idOf(lang, e);
    if (byHeadId.has(id)) throw new Error(`add-words: ${e.lemma} needs its own id: ${id} is ${byHeadId.get(id).lemma}`);
    const shape = e.like ? copied(e) : rules.inflect(e, rulesOf);
    const paradigms = e.paradigms ?? shape.paradigms;
    for (const pid of paradigms) if (!rulesOf.has(pid)) throw new Error(`add-words: ${e.lemma} names the paradigm ${pid}, which paradigms.json lacks`);
    const cells = new Map([...shape.cells, ...Object.entries(e.forms ?? {})]);
    const h = {
      cefr: e.level,
      cefrSource: e.source ?? DEFAULT_SOURCE,
      dictionaryId: dictionaryIds.has(`${e.lemma}-${lang}`) ? `${e.lemma}-${lang}` : null,
      ...(e.gender ? { gender: e.gender } : {}),
      id,
      lemma: e.lemma,
      paradigms,
      pos: e.pos,
      ...(e.register ? { register: e.register } : {}),
      senses: [{ gloss: e.gloss }],
      ...(e.use ? { use: e.use } : {}),
    };
    headwords.push(h);
    have.add(`${e.lemma}|${e.pos}`);
    byHeadId.set(id, h);
    added.headwords += 1;
    const key = id.slice(`${lang}:lex:`.length);
    for (const [cell, surface] of cells) {
      const fid = `${lang}:form:${key}.${cell}`;
      if (formIds.has(fid) || regular(e.lemma, paradigms, cell) === surface) continue; // there already, or the paradigm builds it
      forms.push({ cell, id: fid, of: id, surface });
      formIds.add(fid);
      added.forms += 1;
    }
  }
  return { headwords: headwords.sort(byId), forms: forms.sort(byId), added };
}

export const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const langDir = (lang, repo = REPO) => join(repo, 'curriculum-graph/languages', lang);

// Keys of the app dictionary (live files only, not backups): src/data/dictionary/words/<source>/*.js, each `id: "..."`.
export function readDictionaryIds(repo = REPO) {
  const out = new Set();
  const root = join(repo, 'src/data/dictionary/words');
  if (!existsSync(root)) return out;
  for (const source of readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory())) {
    for (const f of readdirSync(join(root, source.name)).filter((n) => n.endsWith('.js'))) {
      for (const m of readFileSync(join(root, source.name, f), 'utf8').matchAll(/id: "([^"]+)"/g)) out.add(m[1]);
    }
  }
  return out;
}

export function readLanguage(lang, repo = REPO) {
  const dir = langDir(lang, repo);
  const read = (name) => JSON.parse(readFileSync(join(dir, name), 'utf8'));
  return { list: read('word-list.json'), data: { headwords: read('headwords.json'), forms: read('forms.json'), paradigms: read('paradigms.json') } };
}

export const loadRules = async (lang) => import(pathToFileURL(join(dirname(fileURLToPath(import.meta.url)), lang, 'inflect.mjs')).href);

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const lang = process.argv[2];
  if (!lang) {
    console.error('Usage: node scripts/graph/add-words.mjs <lang>');
    process.exit(2);
  }
  const { list, data } = readLanguage(lang);
  const out = addWords({ lang, list, data, rules: await loadRules(lang), dictionaryIds: readDictionaryIds() });
  writeSortedJson(join(langDir(lang), 'headwords.json'), out.headwords);
  writeSortedJson(join(langDir(lang), 'forms.json'), out.forms);
  console.log(`add-words ${lang}: ${out.added.headwords} headwords and ${out.added.forms} irregular forms added`);
}
