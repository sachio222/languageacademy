import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync, writeFileSync } from 'node:fs';
import { runCheck } from './check.mjs';
import { renderFixList, summarize, checkSummaryLines } from './report.mjs';
import { dueAt } from './rules/reuse.mjs';
import { writeSortedJson } from './write-json.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

const USAGE = 'usage: cli.mjs <check|due|report> <lang> [arg] [--native <code>]';

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
  const [cmd, lang = 'fr', arg] = args;
  if (!['check', 'due', 'report'].includes(cmd)) {
    console.error(USAGE);
    process.exit(2);
  }
  const { ctx, issues, stats } = await runCheck({ repoRoot, lang, native });
  const summary = summarize(issues, stats);

  if (cmd === 'check') {
    for (const line of checkSummaryLines(summary)) console.log(line);
    process.exit(summary.errors > 0 ? 1 : 0);
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
  writeFileSync(join(dir, `${lang}-fix-list.md`), renderFixList(issues, ctx.course, ctx.graph.courseMap, { pair: ctx.graph.pair }));
  writeSortedJson(join(dir, `${lang}-summary.json`), summary);
  console.log(`wrote ${lang}-fix-list.md and ${lang}-summary.json: ${summary.errors} errors, ${summary.warnings} warnings`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) await main();
