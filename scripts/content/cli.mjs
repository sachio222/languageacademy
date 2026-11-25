// Content CLI. `node scripts/content/cli.mjs validate [--root <dir>]` prints `ok <n> modules`, or every
// problem as `file:path code message` and a count by code, and exits 1.
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadCourse, CONTENT_ROOT } from './load.mjs';
import { ContentError } from './problems.mjs';

function arg(args, name) {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args[i + 1];
}

function validate(args) {
  const root = arg(args, '--root') ? resolve(arg(args, '--root')) : CONTENT_ROOT;
  // Until the outline is written (plan Task 5), a missing content folder is an empty course.
  if (!existsSync(root)) {
    console.log('ok 0 modules');
    return 0;
  }
  try {
    const course = loadCourse({ root });
    console.log(`ok ${course.modules.size} modules`);
    return 0;
  } catch (e) {
    if (!(e instanceof ContentError)) throw e;
    for (const p of e.problems) console.error(`${p.file}:${p.path} ${p.code} ${p.message}`);
    const byCode = new Map();
    for (const p of e.problems) byCode.set(p.code, (byCode.get(p.code) || 0) + 1);
    const counts = [...byCode].sort(([a], [b]) => a.localeCompare(b)).map(([c, n]) => `${c} ${n}`);
    console.error(`${e.problems.length} problem${e.problems.length === 1 ? '' : 's'}: ${counts.join(', ')}`);
    return 1;
  }
}

const [command, ...args] = process.argv.slice(2);
if (command === 'validate') process.exit(validate(args));
console.error('usage: node scripts/content/cli.mjs validate [--root <content dir>]');
process.exit(2);
