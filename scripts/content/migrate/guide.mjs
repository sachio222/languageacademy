// Guides as module files (spec 5.6, 6).
// - The four hand-built guides (Cognates, Liaison, Questions, Verb Patterns) come from prototype L's rewritten
//   content (`GUIDES` in prototypes/l/j-guides.js, frozen in content/fr/legacy/l-sources.json): guideFromL.
//   Liaison also keeps the silent-final-letter and elision sections added to src/components/LiaisonHelp.jsx on this
//   branch, which L's copy predates: liaisonAdditions.
// - The data guide (negation, `guide.sections[]`) becomes parts with `table` and `lines` blocks: guideFromSections.
//   Its three checks are written by hand in the module file; the merge keeps them and hand-fixes.json records them.
// convertGuide merges either with what is written (merge.mjs), so hand edits survive a rerun.
import { markFrench, unmark } from './mark-french.mjs';
import { normText } from './items.mjs';
import { slugify, freeId } from '../item-ids.mjs';
import { createMerger, mergeField, mergeList, mergeDeclared, finishReport, clone, sortKeys } from './merge.mjs';
import { MODULE_SCHEMA, BLOCK_TYPES, hasPositionWord, moduleTexts } from '../schema/module.mjs';

const isStr = (v) => typeof v === 'string' && v.trim() !== '';

// L's partBody draws a part's example blocks in this order (prototypes/l/j-guides.js), so blocks[] keeps it.
const L_BLOCK_ORDER = ['pairs', 'ties', 'cmp', 'build', 'rise', 'flip', 'ways', 'verbs', 'table', 'lines', 'list'];
const L_GUIDE_FIELDS = ['key', 'slug', 'title', 'min', 'line', 'app', 'parts', 'check', 'can', 'unit'];
const L_PART_FIELDS = ['h', 'text', 'note', 'linesH', ...L_BLOCK_ORDER];
const L_CHECK_FIELDS = ['ask', 'say', 'sound', 'show', 'opts', 'why'];

// Today's guide component for each L guide (`app`), and the module key it renders for (LessonView.jsx picks the
// component by these key endings).
export const L_GUIDE_KEYS = {
  'CognatesHelp.jsx': 'cognates-help',
  'LiaisonHelp.jsx': 'liaison-help',
  'QuestionsHelp.jsx': 'questions-help',
  'VerbPatternHelp.jsx': 'verb-pattern-help',
};
export const lGuideFor = (guides, moduleKey) =>
  (guides || []).find((g) => L_GUIDE_KEYS[g.app] && moduleKey.endsWith(L_GUIDE_KEYS[g.app])) ?? null;

function unknown(obj, known, where) {
  const bad = Object.keys(obj || {}).filter((k) => !known.includes(k));
  if (bad.length) throw new Error(`${where}: fields the conversion does not know: ${bad.join(', ')}`);
}

export const partId = (heading, taken) => freeId(`p-${slugify(unmark(heading), { words: 4 }) || 'part'}`, taken);

/** One L part as { heading, text, note?, blocks? } (no id). L's linesH becomes the lines block's heading. */
export function partFromL(p, { isWord = null } = {}) {
  unknown(p, L_PART_FIELDS, `L part "${p.h}"`);
  // L writes French in a heading unmarked ("Est-ce que"); its text, notes and lines mark it already.
  const out = { heading: markFrench(String(p.h).trim(), 'segments', { isWord }), text: [...(p.text || [])] };
  if (isStr(p.note)) out.note = p.note;
  const blocks = [];
  for (const t of L_BLOCK_ORDER) {
    if (p[t] === undefined) continue;
    const b = { [t]: clone(p[t]) };
    if (t === 'lines' && isStr(p.linesH)) b.heading = markFrench(p.linesH.trim(), 'segments', { isWord });
    blocks.push(b);
  }
  if (p.linesH !== undefined && p.lines === undefined) throw new Error(`L part "${p.h}": linesH without lines`);
  if (blocks.length) out.blocks = blocks;
  return out;
}

/** One L check as a guide check (spec 5.6): ask, say?, show?, sound?, options with one right, why. */
export function checkFromL(c, id) {
  unknown(c, L_CHECK_FIELDS, `L check "${c.ask}"`);
  const out = { id, ask: c.ask };
  for (const f of ['say', 'show', 'sound']) if (isStr(c[f])) out[f] = c[f];
  out.options = (c.opts || []).map((o) => {
    unknown(o, ['t', 'fr', 'right'], `L option "${o.t}"`);
    return { text: o.t, ...(o.fr ? { fr: true } : {}), ...(o.right ? { right: true } : {}) };
  });
  out.why = c.why;
  return out;
}

/**
 * An L guide (`GUIDES` entry) as a guide module (spec 5.6): parts with ids from their headings (`p-` + slug), checks
 * `k1`…`k3`, `minutes` from `min`, `can_do` from `can`. `extraParts` { before, after } are parts in the module's shape
 * (no ids) placed around L's. The description is L's line unless `description` is given.
 */
export function guideFromL(g, moduleKey, { extraParts = { before: [], after: [] }, description = null, isWord = null } = {}) {
  unknown(g, L_GUIDE_FIELDS, `L guide ${g.slug}`);
  const taken = new Set();
  const parts = [...(extraParts.before || []), ...g.parts.map((p) => partFromL(p, { isWord })), ...(extraParts.after || [])].map((p) => ({
    id: partId(p.heading, taken),
    ...p,
  }));
  const mod = {
    schema: MODULE_SCHEMA,
    module_key: moduleKey,
    kind: 'guide',
    status: 'written',
    title: g.title,
    description: description ?? g.line,
  };
  if (Array.isArray(g.can) && g.can.length) mod.can_do = [...g.can];
  Object.assign(mod, { minutes: g.min, line: g.line, parts, checks: (g.check || []).map((c, i) => checkFromL(c, `k${i + 1}`)) });
  return mod;
}

// “ne … pas” (GuideScreen's French marking) -> {ne … pas}.
const curlyToSpans = (s) => String(s).replace(/\{/g, '\\{').replace(/“([^”]+)”/g, '{$1}');

/**
 * The negation guide's `guide.sections[]` as parts (spec 6), in L's block shapes: the rule is the text; `rows` a
 * `pairs` block when they are fragments ("je ne suis pas", "ne … plus") and a `lines` block when they are whole
 * sentences; `examples` a `lines` block. A row's note has no cell in L's shapes, so the part's notes join into its
 * `note`. `checks: []`: its three checks are written by hand. Returns { mod, report }.
 */
export function guideFromSections(old, { isWord = null } = {}) {
  const report = [];
  const add = (path, kind, detail) => report.push({ module_key: old.moduleKey, path, kind, detail });
  const taken = new Set();
  const parts = old.guide.sections.map((s, i) => {
    unknown(s, ['heading', 'rule', 'rows', 'examples'], `${old.moduleKey} guide.sections[${i}]`);
    const heading = curlyToSpans(s.heading);
    const p = { id: partId(heading, taken), heading, text: isStr(s.rule) ? [curlyToSpans(s.rule)] : [] };
    const blocks = [];
    const rows = s.rows || [];
    rows.forEach((r, j) => unknown(r, ['french', 'english', 'note'], `${old.moduleKey} guide.sections[${i}].rows[${j}]`));
    if (rows.length) {
      const type = rows.every((r) => /[.!?]\s*$/.test(String(r.french).trim())) ? 'lines' : 'pairs';
      blocks.push({ [type]: rows.map((r) => [r.french, r.english]) });
      const notes = rows.filter((r) => isStr(r.note)).map((r) => curlyToSpans(r.note.trim()));
      if (notes.length) {
        p.note = notes.join(' ');
        add(`guide.sections[${i}].rows`, 'text_changed', `${notes.length} row notes joined into the part's note (L's ${type} have no note cell)`);
      }
    }
    if ((s.examples || []).length)
      blocks.push({
        lines: s.examples.map((e, j) => {
          unknown(e, ['french', 'english'], `${old.moduleKey} guide.sections[${i}].examples[${j}]`);
          return [e.french, e.english];
        }),
      });
    if (blocks.length) p.blocks = blocks;
    return p;
  });
  const mark = (t, mode) => markFrench(String(t).trim(), mode, { isWord });
  const mod = { schema: MODULE_SCHEMA, module_key: old.moduleKey, kind: 'guide', status: 'written', title: mark(old.title, 'segments'), description: mark(old.description, 'quoted') };
  const caps = (old.emailMetadata?.capabilities || []).filter(isStr);
  if (caps.length) mod.can_do = caps.map((c) => mark(c, 'quoted'));
  // L sets 4 to 6 minutes for guides of four to eight parts; three short parts read in about three.
  Object.assign(mod, { minutes: 3, line: mod.description, parts, checks: [] });
  add('minutes', 'estimate', '3 minutes for three parts (L sets Cognates 4, Liaison 4, Questions 5, Verb Patterns 6)');
  add('line', 'text_changed', 'the guide row line is the description (the source has no line)');
  return { mod, report };
}

/* ---------- the sections added to LiaisonHelp.jsx ---------- */

const stripTags = (s) =>
  String(s)
    .replace(/<[^>]+>/g, '')
    .replace(/\{["'`](.*?)["'`]\}/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
const allText = (re, s) => [...s.matchAll(re)].map((m) => stripTags(m[1]));

/**
 * The parts LiaisonHelp.jsx holds and L's Liaison guide lacks: its sections saved under the indexes listed after
 * "Added later" in `liaisonSections` (silent final letters, elision). Each is a part: h2 the heading, the intro the
 * text, each h3 group of phrases a `pairs` block of [French, English, sound] (L dfec513: the respelling is drawn
 * under the French), the insight box the note. The file gives no English, so each phrase takes the course's own gloss
 * for it from `meanings` (lowercased French -> gloss, the words taught before the guide): `les` "the (plural)"; a
 * noun without its article from `un chat` "a cat (male)" -> "cat (male)"; an elided article from `un ami`
 * "a friend (masc)" -> `l'ami` "the friend (masc)". Parts the file renders before its first original section go
 * before L's parts; the others after. Returns { before, after }.
 */
export function liaisonAdditions(jsx, { isWord = null, meanings = new Map() } = {}) {
  const added = /\/\/ Added later[\s\S]*?\n\s*\];/.exec(jsx);
  if (!added) throw new Error('LiaisonHelp.jsx: no "Added later" sections in liaisonSections');
  const indexes = new Set([...added[0].matchAll(/index:\s*(\d+)/g)].map((m) => +m[1]));
  // French quoted in the JSX ("le") is marked as a span, the quotes dropped as L writes them.
  // Headings are read as titles are (segments), text and notes as hints are (quoted).
  // A quoted elided article ("l'") is French too, though too short for the word test.
  const toSpans = (s, mode = 'quoted') =>
    markFrench(s, mode, { isWord })
      .replace(/["“]\{([^}]+)\}["”]/g, '{$1}')
      .replace(/["“]([a-zàâçéèêëîïôûù]{1,5}')["”]/gi, '{$1}');
  const out = { before: [], after: [] };
  let seenOriginal = false;
  for (const m of jsx.matchAll(/<section className="liaison-section">([\s\S]*?)<\/section>/g)) {
    const body = m[1];
    const idx = /toggleUnderstood\((\d+)\)/.exec(body);
    if (!idx || !indexes.has(+idx[1])) {
      seenOriginal = true;
      continue;
    }
    const heading = toSpans(stripTags(/<h2>([\s\S]*?)<\/h2>/.exec(body)[1]), 'segments');
    const text = allText(/<p className="section-intro">([\s\S]*?)<\/p>/g, body).map((t) => toSpans(t));
    const blocks = [];
    const groups = body.split(/<h3>/).slice(1);
    for (const g of groups) {
      const h3 = stripTags(g.slice(0, g.indexOf('</h3>')));
      const fr = allText(/<div className="phrase-french">([\s\S]*?)<\/div>/g, g);
      const sound = allText(/<div className="phrase-pronunciation">([\s\S]*?)<\/div>/g, g);
      if (!fr.length) continue;
      if (fr.length !== sound.length) throw new Error(`LiaisonHelp.jsx "${heading}": a phrase without its pronunciation`);
      blocks.push({ pairs: fr.map((f, i) => [f, meaningOf(f, meanings), sound[i]]), heading: toSpans(h3, 'segments') });
    }
    const note = allText(/<p>([\s\S]*?)<\/p>/g, body.slice(body.indexOf('insight-box'))).map((t) => toSpans(t)).join(' ');
    const part = { heading, text, ...(note ? { note } : {}), ...(blocks.length ? { blocks } : {}) };
    (seenOriginal ? out.after : out.before).push(part);
  }
  if (out.before.length + out.after.length !== indexes.size) throw new Error(`LiaisonHelp.jsx: found ${out.before.length + out.after.length} added sections, expected ${indexes.size}`);
  return out;
}

// The course's English for a phrase taught before the guide (see liaisonAdditions).
const stripArticle = (gloss) => String(gloss).replace(/^(?:a|an)\s+/i, '');
export function meaningOf(fr, meanings) {
  const f = String(fr).trim().toLowerCase().replace(/’/g, "'");
  if (meanings.has(f)) return meanings.get(f);
  const noun = (w) => meanings.get(`un ${w}`) ?? meanings.get(`une ${w}`);
  const elided = /^l'(.+)$/.exec(f);
  if (elided && noun(elided[1])) return `the ${stripArticle(noun(elided[1]))}`;
  if (noun(f)) return stripArticle(noun(f));
  throw new Error(`LiaisonHelp.jsx: no English for "${fr}" among the words taught before the guide`);
}

/* ---------- French in a block ---------- */

/** Every French string an example block shows or speaks, by block type (spec 5.6: every fr cell and say value). */
export function blockFrench(block) {
  const type = BLOCK_TYPES.find((t) => block[t] !== undefined);
  const v = block[type];
  const out = [];
  const push = (...xs) => out.push(...xs.filter(isStr));
  switch (type) {
    case 'pairs':
    case 'lines':
      for (const p of v) push(p[0]);
      break;
    case 'ties':
      for (const t of v) push(t.fr);
      break;
    case 'cmp':
      for (const r of v.rows) for (const c of r) push(c.fr, c.say);
      break;
    case 'build':
    case 'rise':
    case 'flip':
    case 'ways':
      for (const x of v) push(x.fr);
      break;
    case 'verbs':
      for (const x of v) {
        push(x.v);
        for (const f of x.f) push(f[0] + (/'$/.test(f[0]) ? '' : ' ') + f[1]);
      }
      break;
    case 'table':
      // L's verb table: { cols, rows: [[verb, [fr, en], [fr, en], "odd"?]] }.
      for (const r of v.rows) push(r[0], r[1]?.[0], r[2]?.[0]);
      break;
    case 'list':
      for (const t of v) for (const m of String(t).matchAll(/\{([^}]+)\}/g)) push(m[1]);
      break;
    default:
      break;
  }
  return out;
}

/* ---------- conversion with merge ---------- */

const KNOWN = ['moduleKey', 'title', 'description', 'isHelpModule', 'emailMetadata', 'concepts', 'vocabularyReference', 'exercises', 'guide'];

/**
 * One of today's guide modules as a guide file, merged with what is written.
 * @param old   today's module object (isHelpModule)
 * @param opts  { lGuides, liaisonJsx, meanings? (Map of the words taught before), existing?, record?, handFixes?, isWord?, unitIndex? }
 * @returns { mod, report, record, handFixes }
 */
export function convertGuide(old, opts = {}) {
  const key = old.moduleKey;
  unknown(old, KNOWN, key);
  const lines = [];
  const add = (path, kind, detail) => lines.push({ module_key: key, path, kind, detail });
  const isWord = opts.isWord ?? null;
  const mark = (t, mode) => markFrench(String(t).trim(), mode, { isWord });

  let fresh;
  let sourceOf;
  if (old.guide) {
    const r = guideFromSections(old, { isWord });
    lines.push(...r.report);
    fresh = r.mod;
    sourceOf = { title: old.title, description: old.description, can_do: old.emailMetadata?.capabilities ?? null, minutes: null, line: old.description, checks: null };
  } else {
    const g = lGuideFor(opts.lGuides, key);
    if (!g) throw new Error(`${key}: no L guide in content/fr/legacy/l-sources.json; run \`pnpm content:migrate l-sources\``);
    const extraParts = /liaison-help$/.test(key) ? liaisonAdditions(opts.liaisonJsx ?? '', { isWord, meanings: opts.meanings }) : { before: [], after: [] };
    fresh = guideFromL(g, key, { extraParts, description: mark(old.description, 'quoted'), isWord });
    sourceOf = { title: g.title, description: old.description, can_do: g.can, minutes: g.min, line: g.line, checks: g.check };
    if (unmark(fresh.title) !== String(old.title).trim()) add('title', 'text_changed', `"${old.title}" is L's title "${unmark(fresh.title)}"`);
    if ((old.emailMetadata?.capabilities || []).length)
      add('emailMetadata.capabilities', 'dropped_field', `${JSON.stringify(old.emailMetadata.capabilities)} (can_do holds L's "What you can do now" lines)`);
    for (const p of [...extraParts.before, ...extraParts.after]) add(`parts`, 'text_changed', `"${unmark(p.heading)}" from LiaisonHelp.jsx (L's copy predates it)`);
  }
  for (const f of ['realWorldUse', 'milestone', 'nextModuleTeaser', 'isUnitCompletion', 'utilityScore'])
    if (old.emailMetadata?.[f] !== undefined) add(`emailMetadata.${f}`, 'dropped_field', `${JSON.stringify(old.emailMetadata[f])} (no field; the next-module teaser is computed from the outline)`);
  for (const f of ['concepts', 'vocabularyReference', 'exercises'])
    if ((old[f] || []).length) add(f, 'dropped_field', `${old[f].length} entries (a guide has no ${f})`);

  const m = createMerger({ existing: opts.existing, record: opts.record, handFixes: opts.handFixes, add });
  const mod = { schema: MODULE_SCHEMA, module_key: key, kind: 'guide', status: 'written' };
  const fields = {};
  mergeField(m, 'title', fresh.title, sourceOf.title, { mod, outFields: fields });
  // short_title has no source: it is authored in the module file, so the run keeps the file's value (also under
  // --force, which still reads the file as written).
  const shortTitle = (opts.written ?? opts.existing)?.short_title;
  if (shortTitle !== undefined) mod.short_title = shortTitle;
  for (const f of ['description', 'can_do']) mergeField(m, f, fresh[f], sourceOf[f], { mod, outFields: fields });
  mergeDeclared(m, opts.declaration, 'teaches', { mod, outFields: fields, written: opts.written });
  for (const f of ['minutes', 'line']) mergeField(m, f, fresh[f], sourceOf[f], { mod, outFields: fields });
  const sourceParts = old.guide ? old.guide.sections : fresh.parts;
  const parts = mergeList(
    m,
    'parts',
    fresh.parts.map((p, i) => {
      const { id, ...value } = p;
      return { value, src: old.guide ? sourceParts[i] : value };
    }),
    { keyOf: (p) => normText(unmark(p.heading)), makeId: (p, taken) => partId(p.heading, taken), add },
  );
  mod.parts = parts.list;
  mergeField(m, 'checks', fresh.checks, sourceOf.checks, { mod, outFields: fields });
  if (!Array.isArray(mod.checks)) mod.checks = [];
  if (old.guide)
    add('checks', 'guide_checks_by_hand', mod.checks.length === 3 ? 'three checks, written by hand in the module file (kept on rerun)' : `the source has no checks; write three by hand (the file has ${mod.checks.length})`);
  mergeDeclared(m, opts.declaration, 'tests', { mod, outFields: fields, written: opts.written });

  finishReport(m, lines, add, moduleTexts(fresh, { unitIndex: opts.unitIndex ?? null }), hasPositionWord);
  return { mod, report: lines, record: { fields: sortKeys(fields), lists: { parts: parts.record } }, handFixes: sortKeys(m.outFixes) };
}
