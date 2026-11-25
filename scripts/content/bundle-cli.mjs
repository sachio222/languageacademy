// `content:bundle`: builds the la-bundle@1 release bundle from the content files and writes it, or checks it.
//
//   bundle [--root <dir>] [--out <file>] [--units unit1,...] [--previous <bundle.json>] [--check]
//
// Writes dist/content/bundle.json (with --units, dist/content/bundle-<units>.json) and prints its hash, byte size and
// counts. With --previous it also prints the module keys added, retired, moved and changed since that bundle, and runs
// the release checks that need it. A content problem prints like `validate` and writes nothing; so does a release
// problem. --check builds the bundle, runs the release checks and L's checker (vendored in vendor/la-bundle, Python
// 3.9+) on it, and writes nothing.
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { loadCourse, CONTENT_ROOT, REPO_ROOT } from './load.mjs';
import { ContentError } from './problems.mjs';
import { buildBundleWithReport, bundleHash, canonicalJson } from './bundle.mjs';
import { releaseProblems, diffBundles } from './release-checks.mjs';
import { loadBundleSources, sourceCommit } from './bundle-sources.mjs';

export const DEFAULT_OUT = join(REPO_ROOT, 'dist', 'content', 'bundle.json');
export const CHECKER = fileURLToPath(new URL('./vendor/la-bundle/check/check_bundle.py', import.meta.url));

const OPTIONS = { '--root': true, '--out': true, '--units': true, '--previous': true, '--check': false };

function parse(args) {
  const opts = {};
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (!(a in OPTIONS)) return { error: `${a}: not an option here` };
    if (!OPTIONS[a]) {
      opts[a] = true;
      continue;
    }
    const v = args[i + 1];
    if (v === undefined || v.startsWith('--')) return { error: `${a} needs a value` };
    opts[a] = v;
    i++;
  }
  return { opts };
}

const list = (label, keys) => `${label} ${keys.length}${keys.length ? `: ${keys.join(', ')}` : ''}`;
const nowUtc = () => new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');

/** L's checker on a bundle: { ok, problems, output } or { error } when Python or the checker cannot run. */
export function runChecker(bundle) {
  const dir = mkdtempSync(join(tmpdir(), 'la-bundle-check-'));
  try {
    const file = join(dir, 'bundle.json');
    writeFileSync(file, canonicalJson(bundle) + '\n');
    const r = spawnSync('python3', [CHECKER, file, '--json'], { encoding: 'utf8', maxBuffer: 256 << 20 });
    if (r.error) return { error: `python3 could not run: ${r.error.message}` };
    if (r.status === 2) return { error: `the checker could not read the bundle: ${r.stderr.trim()}` };
    const report = JSON.parse(r.stdout);
    return { ok: report.ok, problems: report.problems };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

export async function bundleCommand(args, { usage, printWarnings, line, countByCode, plural }) {
  const { opts, error } = parse(args);
  if (error) {
    console.error(`${error}\n${usage}`);
    return 2;
  }
  const root = opts['--root'] ? resolve(opts['--root']) : CONTENT_ROOT;
  if (!existsSync(root)) {
    console.error(`${opts['--root']}: no such content folder`);
    return 1;
  }
  let previous = null;
  if (opts['--previous']) {
    try {
      previous = JSON.parse(readFileSync(resolve(opts['--previous']), 'utf8'));
    } catch (e) {
      console.error(`${opts['--previous']}: cannot read a bundle (${e.message})`);
      return 1;
    }
  }

  let course;
  try {
    course = loadCourse({ root });
  } catch (e) {
    if (!(e instanceof ContentError)) throw e;
    printWarnings(e.warnings);
    for (const p of e.problems) console.error(line(p));
    console.error(`${plural(e.problems.length, 'problem')}: ${countByCode(e.problems)}`);
    console.error('no bundle written');
    return 1;
  }

  const units = opts['--units'] ? opts['--units'].split(',').map((s) => s.trim()).filter(Boolean) : null;
  const known = new Set(course.units.map((u) => u.unit_key));
  const unknown = (units || []).filter((u) => !known.has(u));
  if (unknown.length) {
    console.error(`${unknown.join(', ')}: no such unit\n${usage}`);
    return 2;
  }

  const commit = sourceCommit(root);
  const build = commit ? { source_commit: commit, built_at: nowUtc() } : null;
  const { bundle, report } = buildBundleWithReport(course, { ...(await loadBundleSources({ root })), previous, units, build });
  const text = canonicalJson(bundle) + '\n';
  const items = bundle.content.reduce((n, c) => n + c.items.length, 0);

  console.log(`hash ${bundleHash(bundle)}`);
  console.log(`bytes ${Buffer.byteLength(text)}`);
  console.log(`entries ${bundle.entries.length} (units ${bundle.units.length}, reference pages ${bundle.shelf.pages.length}, items ${items}, words ${bundle.words.length})`);
  if (report.units_stopped_at) console.log(`stopped before ${report.units_stopped_at}, which holds a planned module`);
  if (report.topic_defaulted.length) console.log(`topic defaulted to the unit name for ${report.topic_defaulted.length} entries`);
  for (const n of report.notes) console.log(`note ${n.code} ${n.detail}`);
  if (previous) {
    const d = diffBundles(bundle, previous);
    for (const k of ['added', 'retired', 'moved', 'changed']) console.log(list(k, d[k]));
  }

  const problems = releaseProblems(bundle, previous);
  for (const p of problems) console.error(`${p.severity} ${p.code} ${p.module_key ?? ''}${p.section_id ? `/${p.section_id}` : ''} ${p.detail}`);
  const errors = problems.filter((p) => p.severity === 'error');

  if (opts['--check']) {
    const checked = runChecker(bundle);
    if (checked.error) {
      console.error(checked.error);
      return 1;
    }
    for (const p of checked.problems) console.error(`checker ${p.severity} ${p.code} ${p.pointer} ${p.detail}`);
    console.log(checked.ok ? "checker ok (L's check_bundle.py)" : "checker FAIL (L's check_bundle.py)");
    return errors.length || !checked.ok ? 1 : 0;
  }
  if (errors.length) {
    console.error(`${plural(errors.length, 'release problem')}; no bundle written`);
    return 1;
  }
  const out = opts['--out'] ? resolve(opts['--out']) : units ? join(dirname(DEFAULT_OUT), `bundle-${units.join('-')}.json`) : DEFAULT_OUT;
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, text);
  console.log(`wrote ${relative(process.cwd(), out) || out}`);
  return 0;
}
