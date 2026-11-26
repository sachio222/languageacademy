// `content:glosses [--root <content dir>] [--check]`: fills each lesson's and reading's `glosses` (Jake, 2026-11-25;
// L c3da2c0 BundleContent.glosses). A word new to the learner is taught as a card where it is first used; a form of a
// word already taught gets a gloss instead. The step adds a gloss for every form the checker would report in the French
// L glosses (a lesson's prompts, shown French, concept cards, tables and vocabulary examples; a reading's passage)
// whose word is taught at or before the module (scripts/graph/rules/taught-before.mjs glossCandidates).
//
//   en    the English of the reading's own glossary row for the form, else the dictionary's English for the form (an
//         entry of that spelling linked to the word, its first sense), else the English of the card that taught the
//         word, else the dictionary's English for the word; a verb's "to know" becomes "know", "would know"
//         (conditional) or "will know" (future)
//   note  names the form: "conditional of {voler}", "plural of {bon}"
//
// Rows already in a module are kept as written, whether this step or a writer wrote them; rows the step finds come
// first, in order of first use, then the module's other rows. A row that spells one of the module's word cards is
// dropped (gloss_is_card). So a rerun changes nothing. `pnpm content:glosses` then runs `content:migrate`, which
// records each module converted from the live app's edit in legacy/hand-fixes.json. --check writes nothing and exits 1
// when a module would change; `content:migrate --check` runs it too.
import './vite-shim.mjs';
import { readFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { loadCourse, CONTENT_ROOT, REPO_ROOT, GRAPH_LANG_DIR } from './load.mjs';
import { sameForm } from './schema/module.mjs';
import { writeFileAtomic } from './atomic-write.mjs';

const DICTIONARY_INDEX = 'src/data/dictionary/words/cambridge/index.js';
const MIGRATE = fileURLToPath(new URL('./migrate/run.mjs', import.meta.url));
const json = (v) => JSON.stringify(v, null, 2) + '\n';

// How a note names a form, by its cell in the graph (curriculum-graph/languages/fr/forms.json, paradigms.json). The
// course's own terms: imparfait, passé composé.
const CELL_NAMES = [
  [/^prs\./, 'present of'],
  [/^impf\./, 'imparfait of'],
  [/^fut\./, 'future of'],
  [/^cond\./, 'conditional of'],
  [/^sbjv\./, 'subjunctive of'],
  [/^ptcp/, 'past participle of'],
  [/^prsptcp$/, 'present participle of'],
  [/^fpl$/, 'feminine plural of'],
  [/^f$/, 'feminine of'],
  [/^pl$/, 'plural of'],
  [/^mv$/, 'form before a vowel of'],
];
export function formNote(cell, lemma) {
  const name = CELL_NAMES.find(([re]) => re.test(cell ?? ''))?.[1];
  return name && lemma ? `${name} {${lemma}}` : null;
}

// "to know (people/places)" -> "know (people/places)", "would know ...", "will know ..." for a verb form; other words
// keep their English.
export function formEnglish(gloss, cell) {
  if (!/^to /.test(gloss) || !cell || !/^(prs|impf|fut|cond|sbjv|ptcp)/.test(cell)) return gloss;
  const base = gloss.replace(/^to /, '').replace(/; to /g, '; ');
  if (/^cond\./.test(cell)) return `would ${base}`;
  if (/^fut\./.test(cell)) return `will ${base}`;
  return base;
}

let dictionaryCache = null;
/** Map<spelling (lower case), Array<{ id, en, targets: Set<word> }>> of the live dictionary's French entries. */
async function dictionaryBySpelling() {
  if (dictionaryCache) return dictionaryCache;
  const d = await import(pathToFileURL(join(REPO_ROOT, DICTIONARY_INDEX)).href);
  const map = new Map();
  for (const words of Object.values(d))
    for (const [id, w] of words) {
      if (w?.lang !== 'fr' || typeof w.word !== 'string') continue;
      const en = (w.translations ?? []).find((t) => t?.lang === 'en' && typeof t.text === 'string' && t.text.trim())?.text.trim() ?? null;
      const targets = new Set((w.relationships ?? []).map((r) => r?.targetWord).filter((x) => typeof x === 'string'));
      const key = w.word.trim().toLowerCase();
      if (!map.has(key)) map.set(key, []);
      map.get(key).push({ id, en, targets });
    }
  dictionaryCache = map;
  return map;
}

const ARTICLE = /^(?:le|la|les|un|une|des|se)\s+|^(?:l|s)['’]\s*/i;
const bare = (fr) => String(fr).trim().replace(ARTICLE, '').trim().toLowerCase();

/** Map<lemma (lower case), English> from the first card in course order whose French is the word itself. */
function cardEnglish(course) {
  const out = new Map();
  for (const unit of course.units)
    for (const mod of unit.modules)
      for (const w of mod.vocabulary ?? [])
        if (w.review !== true && typeof w.fr === 'string' && typeof w.gloss === 'string' && !out.has(bare(w.fr))) out.set(bare(w.fr), w.gloss.trim());
  return out;
}

// A meaning's first sense, without a closing aside that names the form, which the note names: "understood / was
// understanding" -> "understood", "rains (subjunctive of pleuvoir)" -> "rains", "sitting (feminine)" -> "sitting".
const FORM_ASIDE = /\s*\([^)]*\b(?:of|subjunctive|imparfait|imperfect|conditional|future|participle|feminine|masculine|plural|was|were)\b[^)]*\)\s*$/i;
const firstSense = (en) => (en ? en.split(' / ')[0].replace(FORM_ASIDE, '').trim() || null : null);

/** A gloss row for one candidate form (glossCandidates); `glossary` is the module's own glossary rows. */
function glossRow(c, { dictionary, cards, glossary }) {
  const lemma = c.lemma;
  const fromGlossary = firstSense(glossary.find((g) => sameForm(g.fr) === sameForm(c.key))?.en ?? null);
  const fromForm = fromGlossary ?? firstSense((dictionary.get(c.key) ?? []).find((e) => e.en && lemma && e.targets.has(lemma))?.en ?? null);
  const fromLemma = cards.get(String(lemma).toLowerCase()) ?? (dictionary.get(String(lemma).toLowerCase()) ?? []).find((e) => e.en)?.en ?? null;
  const en = fromForm ?? (fromLemma ? formEnglish(fromLemma, c.reading.cell) : null);
  if (!en) return null;
  const note = formNote(c.reading.cell, lemma);
  return { fr: c.key, en: en.slice(0, 200), ...(note ? { note } : {}) };
}

/**
 * The glosses each lesson and reading should hold: [{ key, file, before, after }] for every module whose glosses would
 * change (before/after: its glosses list, or undefined for none).
 */
export async function planGlosses({ root = CONTENT_ROOT, graphDir = GRAPH_LANG_DIR } = {}) {
  const { runCheck } = await import('../graph/check.mjs');
  const { glossCandidates } = await import('../graph/rules/taught-before.mjs');
  const course = loadCourse({ root, graphDir });
  const { ctx } = await runCheck({ repoRoot: REPO_ROOT, lang: 'fr', content: course });
  const candidates = glossCandidates(ctx);
  const dictionary = await dictionaryBySpelling();
  const cards = cardEnglish(course);
  const changes = [];
  for (const unit of course.units)
    for (const mod of unit.modules) {
      if (!['lesson', 'reading'].includes(mod.kind) || mod.status !== 'written') continue;
      const before = mod.glosses;
      const own = (before ?? []).filter(Boolean);
      const cardForms = new Set((mod.vocabulary ?? []).map((w) => sameForm(w.fr ?? '')));
      const used = new Set();
      const after = [];
      for (const c of candidates.get(mod.module_key) ?? []) {
        const k = sameForm(c.key);
        if (used.has(k) || cardForms.has(k)) continue;
        const kept = own.find((g) => sameForm(g.fr) === k);
        const row = kept ?? glossRow(c, { dictionary, cards, glossary: mod.glossary ?? [] });
        if (!row) continue;
        used.add(k);
        after.push(row);
      }
      for (const g of own) {
        const k = sameForm(g.fr);
        if (used.has(k) || cardForms.has(k)) continue;
        used.add(k);
        after.push(g);
      }
      const next = after.length ? after : undefined;
      if (JSON.stringify(next) !== JSON.stringify(before)) changes.push({ key: mod.module_key, file: join(root, 'modules', `${mod.module_key}.json`), before, after: next });
    }
  return changes;
}

/** Writes each change into its module file, keeping the file's other fields and their order. */
export function applyGlosses(changes) {
  for (const c of changes) {
    const mod = JSON.parse(readFileSync(c.file, 'utf8'));
    if (c.after) mod.glosses = c.after;
    else delete mod.glosses;
    writeFileAtomic(c.file, json(mod));
  }
}

const describe = (c) => {
  const n = (l) => (l ?? []).length;
  const added = (c.after ?? []).filter((g) => !(c.before ?? []).some((b) => sameForm(b.fr) === sameForm(g.fr))).map((g) => g.fr);
  return `${n(c.before)} -> ${n(c.after)} glosses${added.length ? ` (adds ${added.join(', ')})` : ''}`;
};

export async function glossesCommand(args) {
  const check = args.includes('--check');
  const rootAt = args.indexOf('--root');
  const unknown = args.filter((a, i) => a !== '--check' && a !== '--root' && i !== rootAt + 1);
  if (unknown.length || (rootAt !== -1 && !args[rootAt + 1])) {
    console.error('usage: node scripts/content/glosses.mjs [--root <content dir>] [--check]');
    return 2;
  }
  const root = rootAt === -1 ? CONTENT_ROOT : resolve(args[rootAt + 1]);
  const changes = await planGlosses({ root });
  for (const c of changes) console.log(`${check ? 'would change' : 'wrote'} ${relative(REPO_ROOT, c.file)}: ${describe(c)}`);
  if (check) {
    if (changes.length) console.error(`${changes.length} module${changes.length === 1 ? '' : 's'} would change; run pnpm content:glosses`);
    else console.log('glosses: every lesson and reading holds its glosses');
    return changes.length ? 1 : 0;
  }
  applyGlosses(changes);
  console.log(`glosses: ${changes.length} module${changes.length === 1 ? '' : 's'} changed`);
  if (!changes.length) return 0;
  // Record the edits of modules converted from the live app (legacy/hand-fixes.json, migration-report.md).
  console.log('recording the edits: content:migrate');
  const r = spawnSync(process.execPath, ['--disable-warning=MODULE_TYPELESS_PACKAGE_JSON', MIGRATE, '--root', root], { cwd: REPO_ROOT, stdio: 'inherit' });
  return r.status ?? 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) process.exitCode = await glossesCommand(process.argv.slice(2));
