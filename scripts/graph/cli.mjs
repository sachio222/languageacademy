import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync, writeFileSync } from 'node:fs';
import { runCheck } from './check.mjs';
import { renderFixList, summarize, checkSummaryLines } from './report.mjs';
import { dueAt } from './rules/reuse.mjs';
import { writeSortedJson } from './write-json.mjs';
import { writeReportData } from './report-data.mjs';
import { readBudget, writeBudget, checkBudgetParts, loweredParts, BUDGET_PARTS } from './budget.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

const USAGE = 'usage: cli.mjs <check|due|report> <lang> [arg] [--native <code>] [--budget] [--lower-budget]';
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
  if (!['check', 'due', 'report'].includes(cmd)) {
    console.error(USAGE);
    process.exit(2);
  }
  const { ctx, issues, stats } = await runCheck({ repoRoot, lang, native });
  const summary = summarize(issues, stats);

  if (cmd === 'check') {
    for (const line of checkSummaryLines(summary)) console.log(line);
    if (!budget) process.exit(summary.errors > 0 ? 1 : 0);
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
    const m = /^\d+$/.test(arg)
      ? ctx.course.find((x) => x.position === Number(arg))
      : ctx.course.find((x) => x.moduleKey === arg);
    if (!m) { console.error(`no module matches "${arg}"`); process.exit(2); }
    for (const d of dueAt(ctx, m.position)) {
      console.log(`${d.nodeId}\ttaught at ${d.taughtAt}\tlast use ${d.lastUse ?? 'none'}\twindow end ${d.windowEnd}`);
    }
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
