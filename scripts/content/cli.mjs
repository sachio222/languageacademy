// Content CLI. `node scripts/content/cli.mjs validate [--root <dir>] [--allow <code>]...` prints `ok <n> modules`,
// or every problem as `file:path code message` and a count by code, and exits 1.
// --allow <code> (until plan Task 7 writes every module file; Task 7 removes it): problems with that code are
// still printed, to stdout, and counted, but do not fail the run. Any other problem still fails it.
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

function validate(args) {
  const allowed = new Set();
  for (let j = 0; j < args.length; j++) {
    if (args[j] !== '--allow') continue;
    const code = args[j + 1];
    if (code === undefined || code.startsWith('--')) {
      console.error('--allow needs a problem code');
      return 2;
    }
    allowed.add(code);
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
    console.log(`ok ${course.modules.size} modules`);
    return 0;
  } catch (e) {
    if (!(e instanceof ContentError)) throw e;
    const allow = e.problems.filter((p) => allowed.has(p.code));
    const fail = e.problems.filter((p) => !allowed.has(p.code));
    for (const p of allow) console.log(`allowed ${line(p)}`);
    if (fail.length === 0) {
      console.log(`ok with ${plural(allow.length, 'allowed problem')}: ${countByCode(allow)}`);
      return 0;
    }
    for (const p of fail) console.error(line(p));
    console.error(`${plural(fail.length, 'problem')}: ${countByCode(fail)}`);
    if (allow.length) console.error(`allowed: ${countByCode(allow)}`);
    return 1;
  }
}

const [command, ...args] = process.argv.slice(2);
if (command === 'validate') process.exit(validate(args));
console.error('usage: node scripts/content/cli.mjs validate [--root <content dir>] [--allow <problem code>]...');
process.exit(2);
