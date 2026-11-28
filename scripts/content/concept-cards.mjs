// `content:cards [--apply <unit_key,...>] [--report <file>] [--lang <code>]`: moves concept cards (and Reference
// sections) from the old one-string example to the examples list (plan 2026-11-27-concept-cards-structured).
//
// Every card in the course is read with readExampleString (concept-examples.mjs) and sorted:
//   converted       every piece read as an example with its meaning, as person forms that pair up (layout forms), or
//                   as a run of short English items with no French marks (layout plain)
//   needs_meaning   French pieces with no English, not person forms: a writer adds each meaning
//   unconvertible   prose, a label, a formula (+, ->, =) or a piece it cannot read: a writer rewrites the examples
//   done            already holds examples
// It also flags a term or definition that runs three or more French items together (concept_inline_list), and a
// definition longer than two sentences, both for a writer.
//
// With no flag it changes nothing and prints the counts. --report writes the full report as Markdown. --apply writes
// the converted cards of the named units back to their module files, in place of their example strings; every other
// card is left for the writers. Generic: what is French comes from the course language's pack (language.mjs persons).
// After --apply on a module converted from the live app, run pnpm content:migrate to record the edit.
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { contentRoot } from './load.mjs';
import { language, defaultLanguage } from '../graph/language.mjs';
import { readExampleString, inlineListRuns } from './concept-examples.mjs';
import { writeFileAtomic } from './atomic-write.mjs';

const FIELDS = [['concepts', ['term', 'definition']], ['sections', ['heading', 'text']]];

// Sentences in a definition: cut at . ! ? followed by a space and a capital, outside French spans.
function sentenceCount(text) {
  const plain = String(text ?? '').replace(/\{[^{}]*\}/g, 'x').trim();
  if (!plain) return 0;
  return plain.split(/(?<=[.!?])\s+(?=[A-Z0-9'"‘“(])/).filter((s) => s.trim()).length;
}

/**
 * One row per card or section: { unit, module_key, field, index, id, status, reason?, examples?, layout?,
 * definitionList, longDefinition, card }. units: [{ unit_key, modules: [module json] }].
 */
export function surveyCards(units, persons, lang = null) {
  const out = [];
  for (const u of units) {
    for (const mod of u.modules) {
      for (const [field, texts] of FIELDS) {
        (Array.isArray(mod[field]) ? mod[field] : []).forEach((card, index) => {
          if (!card || typeof card !== 'object') return;
          if (field === 'sections' && card.example === undefined && card.examples === undefined) return;
          const row = { unit: u.unit_key, module_key: mod.module_key, field, index, id: card.id, card };
          row.definitionList = texts.some((t) => inlineListRuns(card[t] ?? '').length > 0);
          row.longDefinition = sentenceCount(card[texts[1]]) > 2;
          if (card.examples !== undefined) Object.assign(row, { status: 'done' });
          else Object.assign(row, readExampleString(card.example, persons, lang));
          out.push(row);
        });
      }
    }
  }
  return out;
}

// A card with its example string replaced by the list it reads as, fields in order: id, term, definition, layout,
// examples, then anything else the card holds.
function converted(card, row) {
  const out = {};
  for (const [k, v] of Object.entries(card)) {
    if (k === 'example') {
      if (row.layout) out.layout = row.layout;
      out.examples = row.examples.map((x) => ({ ...x }));
    } else out[k] = v;
  }
  return out;
}

/** Module json (changed copies) by module_key, for every module of the given units with a converted card. */
export function applyCards(units, survey, unitKeys) {
  const want = new Set(unitKeys);
  const byModule = new Map();
  for (const row of survey) if (row.status === 'converted' && want.has(row.unit)) byModule.set(row.module_key, true);
  const out = new Map();
  for (const u of units) {
    if (!want.has(u.unit_key)) continue;
    for (const mod of u.modules) {
      if (!byModule.has(mod.module_key)) continue;
      const copy = structuredClone(mod);
      for (const row of survey) {
        if (row.module_key !== mod.module_key || row.status !== 'converted') continue;
        copy[row.field][row.index] = converted(copy[row.field][row.index], row);
      }
      out.set(mod.module_key, copy);
    }
  }
  return out;
}

const STATUSES = ['converted', 'needs_meaning', 'unconvertible', 'done'];
function countRow(label, rows) {
  const n = (s) => rows.filter((r) => r.status === s).length;
  return `| ${label} | ${rows.length} | ${STATUSES.map(n).join(' | ')} | ${rows.filter((r) => r.definitionList).length} | ${rows.filter((r) => r.status === 'converted' && r.layout === 'plain').length} |`;
}

/** The report as Markdown: counts for all units, per unit, then every card that needs a writer. */
export function reportMarkdown(survey, { applied = [] } = {}) {
  const unitKeys = [...new Set(survey.map((r) => r.unit))];
  const lines = [
    '# Concept card migration report',
    '',
    'Each concept card (and Reference section) with the old one-string example, read for the examples list. Converted: every piece read as an example with its meaning, or as person forms that pair up. Needs meaning: French with no English. Could not convert: prose, a label, a formula or a piece the reader cannot split. Definitions to rewrite: a term or definition that runs three or more French items together. Plain lists: a run of short English items with no French marks, which becomes a plain card (one line each, no sound).',
    '',
    applied.length ? `Applied to: ${applied.join(', ')}.` : 'Applied to: none (report only).',
    '',
    '| Units | Cards | Converted | Needs meaning | Could not convert | Already a list | Definitions to rewrite | Of the converted, plain lists |',
    '|---|---|---|---|---|---|---|---|',
    countRow('All units', survey),
  ];
  if (applied.length) lines.push(countRow(applied.join(', '), survey.filter((r) => applied.includes(r.unit))));
  for (const u of unitKeys) lines.push(countRow(u, survey.filter((r) => r.unit === u)));
  lines.push('', '## Cards for a writer', '', '| Unit | Module | Card | Status | Why | Definition |', '|---|---|---|---|---|---|');
  for (const r of survey) {
    const why = r.status === 'unconvertible' ? r.reason : r.status === 'needs_meaning' ? 'French with no English' : r.dropped ? `plain list; remark left out (${r.dropped})` : '';
    const def = [r.definitionList && 'runs a list together', r.longDefinition && 'more than two sentences'].filter(Boolean).join('; ');
    if (r.status === 'converted' && !def && !r.dropped) continue;
    if (r.status === 'done' && !def) continue;
    const ex = String(r.card.example ?? '').replace(/\|/g, '\\|');
    lines.push(`| ${r.unit} | ${r.module_key} | ${r.id} | ${r.status.replace('_', ' ')} | ${why}${ex ? `: ${ex}` : ''} | ${def} |`);
  }
  return lines.join('\n') + '\n';
}

/* ---------- command line ---------- */

function readUnits(root) {
  const outline = JSON.parse(readFileSync(join(root, 'course.json'), 'utf8'));
  const read = (key) => JSON.parse(readFileSync(join(root, 'modules', `${key}.json`), 'utf8'));
  const units = outline.units.map((u) => ({ unit_key: u.unit_key, modules: u.entries.map(read) }));
  const pages = Array.isArray(outline.shelf) ? outline.shelf : outline.shelf?.pages ?? [];
  const shelf = pages.map((s) => (typeof s === 'string' ? s : s.module_key)).filter(Boolean);
  if (shelf.length) units.push({ unit_key: 'shelf', modules: shelf.map(read) });
  return { outline, units };
}

export function main(argv = process.argv.slice(2)) {
  const opt = (name) => {
    const i = argv.indexOf(name);
    return i === -1 ? undefined : argv[i + 1];
  };
  const code = opt('--lang') ?? defaultLanguage();
  const root = contentRoot(code);
  const { units } = readUnits(root);
  const persons = language(code).persons ?? [];
  const survey = surveyCards(units, persons, language(code));
  const applied = opt('--apply') ? opt('--apply').split(',').map((s) => s.trim()).filter(Boolean) : [];
  const known = new Set(units.map((u) => u.unit_key));
  const unknown = applied.filter((u) => !known.has(u));
  if (unknown.length) {
    console.error(`no such unit: ${unknown.join(', ')}`);
    return 2;
  }
  if (applied.length) {
    for (const [key, mod] of applyCards(units, survey, applied)) writeFileAtomic(join(root, 'modules', `${key}.json`), JSON.stringify(mod, null, 2) + '\n');
  }
  const md = reportMarkdown(survey, { applied });
  if (opt('--report')) writeFileAtomic(resolve(opt('--report')), md);
  const all = md.split('\n');
  const start = all.findIndex((l) => l.startsWith('| Units'));
  const end = all.indexOf('', start);
  console.log(all.slice(start, end).filter((l) => !l.startsWith('|---')).join('\n'));
  return 0;
}

if (import.meta.url === `file://${process.argv[1]}`) process.exitCode = main();
