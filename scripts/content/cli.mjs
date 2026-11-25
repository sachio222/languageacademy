// Content CLI.
// `validate [--root <dir>]` prints `ok <n> modules`, or every problem as `file:path code message` and a count by code,
// and exits 1. Warnings (translate outside Unit 1) never fail a run: a warnings section lists each one as
// `warning <problem>` and a count by code, before the closing line.
// `bundle [--root <dir>] [--out <file>] [--units unit1,...] [--previous <file>] [--check]` builds the la-bundle@1
// release bundle (bundle.mjs) and prints its hash, byte size and counts; see bundleCommand.
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadCourse, CONTENT_ROOT } from './load.mjs';
import { ContentError } from './problems.mjs';

const countByCode = (ps) => {
  const byCode = new Map();
  for (const p of ps) byCode.set(p.code, (byCode.get(p.code) || 0) + 1);
  return [...byCode].sort(([a], [b]) => a.localeCompare(b)).map(([c, n]) => `${c} ${n}`).join(', ');
};
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
const line = (p) => `${p.file}:${p.path} ${p.code} ${p.message}`;
function printWarnings(warnings) {
  if (!warnings?.length) return;
  console.log('warnings:');
  for (const p of warnings) console.log(`warning ${line(p)}`);
  console.log(`${plural(warnings.length, 'warning')}: ${countByCode(warnings)}`);
}

const USAGE = [
  'usage: node scripts/content/cli.mjs validate [--root <content dir>]',
  '       node scripts/content/cli.mjs bundle [--root <content dir>] [--out <file>] [--units <unit_key,...>] [--previous <bundle.json>] [--check]',
].join('\n');

function validate(args) {
  for (let j = 0; j < args.length; j++) {
    if (args[j] === '--root') j++;
    else {
      console.error(`${args[j]}: not an option here\n${USAGE}`);
      return 2;
    }
  }
  const i = args.indexOf('--root');
  let root = CONTENT_ROOT;
  if (i !== -1) {
    const value = args[i + 1];
    if (value === undefined || value.startsWith('--')) {
      console.error('--root needs a content folder');
      return 2;
    }
    root = resolve(value);
    if (!existsSync(root)) {
      console.error(`${value}: no such content folder`);
      return 1;
    }
  }
  try {
    const course = loadCourse({ root });
    printWarnings(course.warnings);
    console.log(`ok ${course.modules.size} modules`);
    return 0;
  } catch (e) {
    if (!(e instanceof ContentError)) throw e;
    printWarnings(e.warnings);
    for (const p of e.problems) console.error(line(p));
    console.error(`${plural(e.problems.length, 'problem')}: ${countByCode(e.problems)}`);
    return 1;
  }
}

// process.exitCode, not process.exit(): stdout to a pipe is written asynchronously, and exiting at once can cut off
// the end of a long report (hundreds of warnings, then the closing `ok` line) when the reader is slow.
const [command, ...args] = process.argv.slice(2);
if (command === 'validate') process.exitCode = validate(args);
else if (command === 'bundle')
  process.exitCode = await (await import('./bundle-cli.mjs')).bundleCommand(args, { usage: USAGE, printWarnings, line, countByCode, plural });
else {
  console.error(USAGE);
  process.exitCode = 2;
}
