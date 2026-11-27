// The plan tools, one command each, the same for every language:
//
//   node scripts/plan/cli.mjs check <lang> [--against <git ref>]   the whole-course check of the plan (check.mjs)
//   node scripts/plan/cli.mjs md    <lang> [--out <file>]          the plan as a readable document (md.mjs)
//   node scripts/plan/cli.mjs page  <lang> [--out <file>]          the course page: every unit, lesson and word (page.mjs)
//   node scripts/plan/cli.mjs stubs <lang> [--write | --check]     planned module files and the outline, from the plan (stubs.mjs)
//   node scripts/plan/cli.mjs brief <lang> <unit_key | module_key> [--out <dir>]   writer briefs, one file per module (brief.mjs)
//   node scripts/plan/cli.mjs method <lang> [--out <dir>]          the course scored against the teaching method (method-score.mjs)
//
// Each reads only content/<lang>/ and curriculum-graph/ for that language. md, page and brief write under
// .plan-out/<lang>/ unless --out says where; that folder is not committed.
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ContentError, countByCode, plural, problemLine } from '../content/problems.mjs';
import { checkPlan } from './check.mjs';
import { levelsReached, planContext } from './context.mjs';
import { frequencyDir, frequencyTrend, readRanks } from './frequency.mjs';
import { readLimits } from './limits.mjs';
import { PLAN_FILE, PlanError, REPO_ROOT, planModules, readMethod, readPlan, readReadingTypes } from './plan.mjs';

const USAGE = [
  'usage: node scripts/plan/cli.mjs check <lang> [--against <git ref>]',
  '       node scripts/plan/cli.mjs md <lang> [--out <file>]',
  '       node scripts/plan/cli.mjs page <lang> [--out <file>]',
  '       node scripts/plan/cli.mjs stubs <lang> [--write | --check]',
  '       node scripts/plan/cli.mjs brief <lang> <unit_key | module_key> [--out <dir>]',
  '       node scripts/plan/cli.mjs method <lang> [--out <dir>]',
].join('\n');

export const outDir = (repoRoot, lang) => join(repoRoot, '.plan-out', lang);
const n = (x) => x.toLocaleString('en-US');

function takeOption(args, name) {
  const i = args.indexOf(name);
  if (i < 0) return null;
  const value = args[i + 1];
  if (value === undefined || value.startsWith('--')) throw new PlanError(`${name} needs a value`);
  args.splice(i, 2);
  return value;
}
const takeFlag = (args, name) => {
  const i = args.indexOf(name);
  if (i < 0) return false;
  args.splice(i, 1);
  return true;
};

/** The plan as it was at a git ref, or null when that ref has no plan. */
function planAt(repoRoot, lang, ref) {
  try {
    return JSON.parse(execFileSync('git', ['-C', repoRoot, 'show', `${ref}:content/${lang}/${PLAN_FILE}`], { encoding: 'utf8', maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'ignore'] }));
  } catch {
    throw new PlanError(`${ref}: no content/${lang}/${PLAN_FILE} at that commit`);
  }
}

/** Everything the commands share: the plan, what it is checked against, and the check's result. */
export async function loadChecked({ repoRoot = REPO_ROOT, lang, previous = null }) {
  const plan = readPlan(repoRoot, lang);
  const method = readMethod();
  const readingTypes = readReadingTypes();
  const limits = readLimits(repoRoot, lang);
  const context = await planContext({ repoRoot, lang, plan });
  const { base, projected, position, written, lookups } = context;
  const result = checkPlan({
    plan, readingTypes: readingTypes.byId, limits, lookups, written, position, previous,
    taughtAt: base.timeline.taughtAt,
    isAvailable: (id, at) => projected.timeline.isAvailable(id, at),
    reached: levelsReached(projected),
  });
  return { plan, method, readingTypes, limits, context, ...result };
}

/** The frequency trend by unit, as bands, or null when this machine has no frequency file for the language. */
export function trendOf({ plan, method, context, lang }) {
  const ranks = readRanks(lang);
  if (!ranks) return null;
  const lemmaOf = (id) => context.lookups.headwords.get(id)?.lemma ?? (plan.words_to_add ?? []).find((w) => w.id === id)?.lemma;
  const units = [];
  // The written course, by unit, then the plan's units.
  const byUnit = new Map();
  for (const [id, at] of context.base.timeline.taughtAt) {
    const m = context.base.course.find((c) => c.position === at);
    if (!m || !context.lookups.headwords.has(id)) continue;
    if (!byUnit.has(m.unitKey)) byUnit.set(m.unitKey, []);
    byUnit.get(m.unitKey).push(lemmaOf(id));
  }
  for (const [unit_key, lemmas] of byUnit) units.push({ unit_key, lemmas });
  for (const u of plan.units) units.push({ unit_key: u.unit_key, lemmas: u.modules.flatMap((m) => m.teaches.words).map(lemmaOf).filter(Boolean) });
  return frequencyTrend(units, ranks, method.frequency.bands);
}

async function check(lang, args) {
  const against = takeOption(args, '--against');
  if (args.length) throw new PlanError(`${args[0]}: not an option here\n${USAGE}`);
  const previous = against ? planAt(REPO_ROOT, lang, against) : null;
  const checked = await loadChecked({ lang, previous });
  const { problems, report } = checked;
  if (report) {
    const k = report.by_kind;
    console.log(`plan ${lang}: ${report.units} units, ${n(report.modules)} modules (${k.lesson} lessons, ${k.guide} guides, ${k.reading} readings, ${k.practice} practice sets, ${k.unit_exam} unit exams), ${n(report.words)} words, ${report.words_to_add} to add to the graph`);
    console.log(`positions ${report.first_position} to ${report.last_position}`);
    for (const [level, l] of Object.entries(report.levels)) {
      if (!l.reached) console.log(`${level}: not reached`);
      else if (l.in_written_course) console.log(`${level}: reached at position ${l.position}, in the written course`);
      else console.log(`${level}: reached at position ${l.position}, ${l.unit_key}, ${l.module_key}${l.teaching_module ? ` (teaching module ${l.teaching_module} of ${l.of})` : ''}`);
    }
    const trend = trendOf({ ...checked, lang });
    if (!trend) console.log(`frequency: no local file for ${lang} (${join(frequencyDir(), `${lang}.tsv`)}); the trend is skipped`);
    else {
      console.log('frequency, the band of each unit\'s middle new word:');
      for (const t of trend) console.log(`  ${t.unit_key}: ${t.band ?? 'no ranked word'}${t.steps_back ? '  (more common than the unit before)' : ''}`);
    }
    const types = Object.entries(report.reading_types);
    console.log(`reading types: ${types.length} of ${checked.readingTypes.types.length} used (${types.map(([t, u]) => `${t} ${u.length}`).join(', ')})`);
    if (previous) console.log(`against ${against}: ${problems.filter((p) => p.code === 'word_dropped').length} words dropped`);
  }
  if (!problems.length) {
    console.log('ok');
    return 0;
  }
  for (const p of problems) console.error(`${p.where}: ${p.code} ${p.message}`);
  const counts = new Map();
  for (const p of problems) counts.set(p.code, (counts.get(p.code) ?? 0) + 1);
  console.error(`${plural(problems.length, 'problem')}: ${[...counts].map(([c, x]) => `${c} ${x}`).join(', ')}`);
  return 1;
}

function writeOut(file, text) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, text);
  console.log(`wrote ${file}`);
}

async function main(argv) {
  const args = [...argv];
  const [cmd, lang] = args.splice(0, 2);
  if (!['check', 'md', 'page', 'stubs', 'brief', 'method'].includes(cmd) || !/^[a-z]{2,3}$/.test(lang ?? '')) {
    console.error(USAGE);
    return 2;
  }
  try {
    if (cmd === 'check') return await check(lang, args);
    if (cmd === 'stubs') {
      const { stubsCommand } = await import('./stubs.mjs');
      return await stubsCommand({ repoRoot: REPO_ROOT, lang, write: takeFlag(args, '--write'), check: takeFlag(args, '--check') });
    }
    const out = takeOption(args, '--out');
    if (cmd === 'method') {
      const { methodCommand } = await import('./method-report.mjs');
      const { text, data } = await methodCommand({ repoRoot: REPO_ROOT, lang });
      const dir = resolve(out ?? join(outDir(REPO_ROOT, lang), 'method'));
      writeOut(join(dir, 'method-score.json'), `${JSON.stringify(data, null, 1)}\n`);
      writeOut(join(dir, 'method-score.txt'), text);
      console.log(text.split('\n## ')[0]);
      return 0;
    }
    const checked = await loadChecked({ lang });
    if (checked.problems.some((p) => p.code === 'schema')) {
      for (const p of checked.problems) console.error(`${p.where}: ${p.code} ${p.message}`);
      return 1;
    }
    if (cmd === 'md') {
      const { renderMd } = await import('./md.mjs');
      writeOut(resolve(out ?? join(outDir(REPO_ROOT, lang), 'course-plan.md')), renderMd({ ...checked, lang }));
      return 0;
    }
    if (cmd === 'page') {
      const { renderPage } = await import('./page.mjs');
      writeOut(resolve(out ?? join(outDir(REPO_ROOT, lang), 'course.html')), renderPage({ ...checked, lang, repoRoot: REPO_ROOT, trend: trendOf({ ...checked, lang }) }));
      return 0;
    }
    const target = args.shift();
    if (!target || args.length) throw new PlanError(USAGE);
    const { briefsFor } = await import('./brief.mjs');
    const briefs = briefsFor({ ...checked, lang, repoRoot: REPO_ROOT, target });
    const dir = resolve(out ?? join(outDir(REPO_ROOT, lang), 'briefs'));
    for (const b of briefs) writeOut(join(dir, b.file), b.text);
    return 0;
  } catch (e) {
    if (e instanceof PlanError) {
      console.error(e.message);
      return 1;
    }
    if (e instanceof ContentError) {
      for (const p of e.problems) console.error(problemLine(p));
      console.error(`${plural(e.problems.length, 'problem')}: ${countByCode(e.problems)}`);
      return 1;
    }
    throw e;
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  process.exitCode = await main(process.argv.slice(2));
}
export { planModules };
