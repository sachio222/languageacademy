import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { runCheck } from './check.mjs';
import { renderFixList, summarize, checkSummaryLines } from './report.mjs';
import { dueFor } from './rules/reuse.mjs';
import { loadCourse } from '../content/load.mjs';
import { ContentError, countByCode, plural, problemLine } from '../content/problems.mjs';
import { writeSortedJson } from './write-json.mjs';
import { writeReportData } from './report-data.mjs';
import { readBudget, writeBudget, checkBudgetParts, loweredParts, BUDGET_PARTS } from './budget.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

const USAGE = 'usage: cli.mjs <check|due|report> <lang> [module_key] [--module <key>] [--native <code>] [--content <dir>] [--budget] [--lower-budget]';

// A planned stub standing in for a module file that does not load: its key from the file name, its kind and title
// from the file when they can be read; null when even its kind cannot be read.
function stubFor(root, file) {
  const name = file.split('/').pop();
  const key = name.replace(/\.json$/, '');
  let json = null;
  try { json = JSON.parse(readFileSync(join(root, 'modules', name), 'utf8')); } catch { return null; }
  if (typeof json?.kind !== 'string') return null;
  return JSON.stringify({
    schema: 'la-module@1', module_key: key, kind: json.kind, status: 'planned', title: typeof json.title === 'string' ? json.title : key,
    plan: { words: [], constructions: [], source: 'course-plan.json' },
  });
}
const BUDGET_FILE = join(repoRoot, 'curriculum-graph/reports/issue-budget.json');

async function main() {
  const args = process.argv.slice(2);
  // --native <code>: the learner's native language (settings.defaultNative when left out)
  let native;
  const flag = args.indexOf('--native');
  if (flag >= 0) {
    native = args[flag + 1];
    if (!native || native.startsWith('--')) { console.error(USAGE); process.exit(2); }
    args.splice(flag, 2);
  }
  // --content <dir>: the content folder to check (default content/<lang>), for check and due. The budget file stays
  // the committed one, so --lower-budget and report take no --content.
  let contentDir = null;
  const cflag = args.indexOf('--content');
  if (cflag >= 0) {
    contentDir = args[cflag + 1];
    if (!contentDir || contentDir.startsWith('--')) { console.error(USAGE); process.exit(2); }
    contentDir = resolve(contentDir);
    args.splice(cflag, 2);
  }
  // --budget: exit 1 only when a rule's count rises above curriculum-graph/reports/issue-budget.json (budget.mjs), in
  // either part: legacy (Units 1 to 12, the shelf) or new (Unit 13 onward, every rule at zero).
  // --lower-budget: the same, then write every count that fell into the budget.
  const takeFlag = (name) => {
    const at = args.indexOf(name);
    if (at < 0) return false;
    args.splice(at, 1);
    return true;
  };
  const lower = takeFlag('--lower-budget');
  const budget = takeFlag('--budget') || lower;
  const [cmd, lang = 'fr', arg] = args;
  if (!['check', 'due', 'report'].includes(cmd) || (contentDir && (lower || cmd === 'report'))) {
    console.error(USAGE);
    process.exit(2);
  }
  // --module <key> (or the key as the third argument): check prints that module's findings in full.
  let only = null;
  const mflag = args.indexOf('--module');
  if (mflag >= 0) {
    only = args[mflag + 1];
    if (!only || only.startsWith('--')) { console.error(USAGE); process.exit(2); }
    args.splice(mflag, 2);
  }
  // Content that does not load is listed as content:validate lists it: each problem, then a count by code. A module
  // file that does not load is read as a planned stub, so one module mid-edit never stops the check of the rest; the
  // run still fails. A problem in course.json stops it.
  const root = contentDir ?? join(repoRoot, 'content', lang);
  const graphDir = join(repoRoot, 'curriculum-graph', 'languages', lang);
  let content;
  let loadFailed = false;
  const replace = new Map();
  for (let attempt = 0; ; attempt++) {
    try {
      content = loadCourse({ root, graphDir, replace });
      break;
    } catch (e) {
      if (!(e instanceof ContentError)) throw e;
      for (const p of e.problems) console.error(problemLine(p));
      console.error(`${plural(e.problems.length, 'problem')}: ${countByCode(e.problems)}`);
      const bad = [...new Set(e.problems.map((p) => p.file))];
      const fixable = attempt < 3 && bad.every((f) => /(^|\/)modules\/[^/]+\.json$/.test(f) && !replace.has(f));
      const stubs = fixable ? bad.map((f) => [f, stubFor(root, f)]) : null;
      if (!stubs || stubs.some(([, t]) => t === null)) {
        console.error('the checker reads only content that loads: fix these first (pnpm content:validate lists them with its warnings)');
        process.exit(1);
      }
      for (const [f, t] of stubs) {
        replace.set(f, t);
        console.error(`skipped ${f.split('/').pop().replace(/\.json$/, '')}: it does not load, so it is read as a planned stub (pnpm content:validate lists why)`);
      }
      loadFailed = true;
    }
  }
  const { ctx, issues, stats } = await runCheck({ repoRoot, lang, native, content });
  const summary = summarize(issues, stats);

  if (cmd === 'check' && (only || arg)) {
    const key = only || arg;
    if (!ctx.course.some((m) => m.moduleKey === key) && !content.units?.some((u) => u.modules.some((m) => m.module_key === key))) {
      console.error(`no module matches "${key}"`);
      process.exit(2);
    }
    const mine = issues.filter((i) => i.moduleKey === key || i.budgetModuleKey === key);
    console.log(`${key}: ${plural(mine.length, 'finding')}`);
    for (const i of mine) {
      const what = i.nodeId ?? i.surface ?? '';
      const where = i.itemRef ? ` [${i.itemRef}]` : '';
      console.log(`${i.severity} ${i.rule}${what ? ' ' + what : ''}${where}: ${i.message ?? ''}`);
    }
    process.exit(loadFailed || mine.some((i) => i.severity === 'error') ? 1 : 0);
  }

  if (cmd === 'check') {
    for (const line of checkSummaryLines(summary)) console.log(line);
    if (!budget) process.exit(loadFailed || summary.errors > 0 ? 1 : 0);
    if (loadFailed) { console.log('budget: not checked, a module did not load'); process.exit(1); }
    const limits = readBudget(BUDGET_FILE);
    const unitOf = (key) => ctx.content?.modules?.get(key)?.unit_key ?? null;
    const parts = checkBudgetParts(issues, unitOf, limits);
    const label = { legacy: 'Units 1 to 12 and the shelf', new: 'Unit 13 onward' };
    const over = BUDGET_PARTS.flatMap((p) => parts[p].over.map((o) => ({ ...o, part: p })));
    const under = BUDGET_PARTS.flatMap((p) => parts[p].under.map((u) => ({ ...u, part: p })));
    for (const o of over) console.log(`over budget (${label[o.part]}): ${o.rule}: ${o.count} (budget ${o.budget})`);
    for (const u of under) console.log(`under budget (${label[u.part]}): ${u.rule}: ${u.count} (budget ${u.budget})`);
    if (lower && !over.length && under.length) {
      writeBudget(BUDGET_FILE, loweredParts(parts.counts, limits));
      console.log(`lowered the budget for ${under.length} rule${under.length === 1 ? '' : 's'}`);
    } else if (under.length && !over.length) console.log('run graph:check --lower-budget to keep these gains');
    console.log(over.length ? `budget: ${over.length} rule${over.length === 1 ? '' : 's'} over` : 'budget: ok');
    process.exit(over.length ? 1 : 0);
  }

  if (cmd === 'due') {
    if (!arg) { console.error('due needs a moduleKey or a position number'); process.exit(2); }
    // A course plan stub too: what it should reuse before it is written.
    const found = dueFor(ctx, arg);
    if (!found) { console.error(`no module matches "${arg}"`); process.exit(2); }
    for (const d of found.due) {
      console.log(`${d.nodeId}\ttaught at ${d.taughtAt}\tlast use ${d.lastUse ?? 'none'}\twindow end ${d.windowEnd}`);
    }
    if (found.ended) console.log(`${found.ended} more closed before position ${found.position}, so no use here meets them (graph:check lists them as reuse-missed)`);
    return;
  }

  const dir = join(repoRoot, 'curriculum-graph/reports');
  mkdirSync(dir, { recursive: true });
  const { levels, functions } = writeReportData(dir, lang, ctx);
  writeFileSync(join(dir, `${lang}-fix-list.md`), renderFixList(issues, ctx.course, ctx.graph.courseMap, {
    pair: ctx.graph.pair, cognatesAllowIn: ctx.graph.settings?.cognates?.allowIn, levels, functions, graph: ctx.graph, referenceOpenFrom: ctx.timeline.openFrom, referenceOpenTitles: ctx.referenceOpenTitles,
  }));
  writeSortedJson(join(dir, `${lang}-summary.json`), summary);
  console.log(`wrote ${lang}-fix-list.md, ${lang}-summary.json, ${lang}-levels.json and ${lang}-functions.json: `
    + `${summary.errors} errors, ${summary.warnings} warnings`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) await main();
