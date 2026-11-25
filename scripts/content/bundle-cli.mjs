// `content:bundle`: builds the la-bundle@1 release bundle from the content files and writes it, or checks it.
//
//   bundle [--root <dir>] [--out <file>] [--units unit1,...] [--previous <bundle.json>] [--check]
//
// Writes dist-content/bundle.json (with --units, dist-content/bundle-<units>.json) and prints its hash, byte size and
// counts. With --previous it also prints the module keys added, retired, moved and changed since that bundle, and runs
// the release checks that need it. A content problem prints like `validate` and writes nothing; so does a release
// problem. --check builds the bundle, runs the release checks and L's checker (vendored in vendor/la-bundle, Python
// 3.9+) on it, and writes nothing. Without --previous (and without --units), --check compares with the last release,
// <content root>/legacy/last-release.json, so item_id_reused, module_key_missing and the changed keys run in CI.
// After L imports a new release, that bundle replaces last-release.json.
//
// The bundles live in dist-content/, outside Vite's dist/. Vercel serves dist/, and a release bundle holds every answer
// key and all Premium text, so it must never ship with the site. L's prototype adapter reads it from dist-content/.
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { loadCourse, CONTENT_ROOT, REPO_ROOT } from './load.mjs';
import { ContentError } from './problems.mjs';
import { buildBundleWithReport, bundleHash, canonicalJson } from './bundle.mjs';
import { releaseProblems, diffBundles } from './release-checks.mjs';
import { loadBundleSources, sourceCommit } from './bundle-sources.mjs';
import { writeFileAtomic } from './atomic-write.mjs';

export const OUT_DIR = join(REPO_ROOT, 'dist-content');
export const DEFAULT_OUT = join(OUT_DIR, 'bundle.json');
export const LAST_RELEASE_FILE = 'legacy/last-release.json'; // in the content root
export const CHECKER = fileURLToPath(new URL('./vendor/la-bundle/check/check_bundle.py', import.meta.url));
const BUNDLE_SCHEMA = fileURLToPath(new URL('./vendor/la-bundle/contracts/curriculum.bundle.schema.json', import.meta.url));

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

/**
 * build.source_commit for a { commit, dirty } source: the commit, marked `-dirty` when the content tree has
 * uncommitted changes. la-bundle@1 (ff1bc35) allows only a bare commit hash there, so until L's pattern accepts the
 * mark the field keeps the bare hash and `warning` says the commit does not hold what was built.
 */
export function sourceCommitField({ commit, dirty }, schemaFile = BUNDLE_SCHEMA) {
  if (!dirty) return { value: commit, warning: null };
  const marked = `${commit}-dirty`;
  const pattern = JSON.parse(readFileSync(schemaFile, 'utf8')).properties.build.properties.source_commit.pattern;
  if (new RegExp(pattern).test(marked)) return { value: marked, warning: null };
  return {
    value: commit,
    warning:
      `the content has uncommitted changes, so commit ${commit.slice(0, 7)} does not hold what was built; ` +
      `la-bundle@1 allows only a commit hash in build.source_commit (${pattern}), so it is not marked -dirty`,
  };
}

/** The first thing a --previous file lacks to be read as a la-bundle@1 bundle, or null. */
export function notABundle(b) {
  if (!b || typeof b !== 'object' || Array.isArray(b)) return 'it is not a JSON object';
  for (const k of ['entries', 'content', 'retired']) if (!Array.isArray(b[k])) return `it has no ${k} list`;
  if (!Array.isArray(b.shelf?.pages)) return 'it has no shelf.pages list';
  if (b.content.some((c) => !c || !Array.isArray(c.items))) return 'a content object has no items list';
  return null;
}

/** L's checker on a bundle: { ok, status, problems }, or { error } when Python or the checker cannot run or report. */
export function runChecker(bundle, checker = CHECKER) {
  const dir = mkdtempSync(join(tmpdir(), 'la-bundle-check-'));
  try {
    const file = join(dir, 'bundle.json');
    writeFileSync(file, canonicalJson(bundle) + '\n');
    const r = spawnSync('python3', [checker, file, '--json'], { encoding: 'utf8', maxBuffer: 256 << 20 });
    if (r.error) return { error: `python3 could not run: ${r.error.message}` };
    if (r.status === 2) return { error: `the checker could not read the bundle: ${r.stderr.trim()}` };
    let report = null;
    try {
      report = JSON.parse(r.stdout);
    } catch {
      // empty or not JSON: reported below
    }
    if (!report || !Array.isArray(report.problems)) {
      const why = r.stderr.trim() ? `: ${r.stderr.trim()}` : '';
      return { error: `the checker gave no report (exit ${r.status}${r.signal ? `, ${r.signal}` : ''})${why}` };
    }
    return { ok: report.ok === true, status: r.status, problems: report.problems };
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
  const lastRelease = join(root, LAST_RELEASE_FILE);
  const previousFile = opts['--previous'] ? resolve(opts['--previous']) : opts['--check'] && !opts['--units'] && existsSync(lastRelease) ? lastRelease : null;
  if (previousFile) {
    const name = opts['--previous'] ?? relative(process.cwd(), previousFile);
    try {
      previous = JSON.parse(readFileSync(previousFile, 'utf8'));
    } catch (e) {
      console.error(`${name}: cannot read a bundle (${e.message})`);
      return 1;
    }
    const lacks = notABundle(previous);
    if (lacks) {
      console.error(`${name}: not a la-bundle@1 bundle (${lacks})`);
      return 1;
    }
    console.log(`previous ${name} (hash ${bundleHash(previous)})`);
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

  const source = sourceCommit(root);
  const commit = source ? sourceCommitField(source) : null;
  if (commit?.warning) console.log(`warning ${commit.warning}`);
  const build = commit ? { source_commit: commit.value, built_at: nowUtc() } : null;
  const sources = await loadBundleSources({ root });
  const { bundle, report } = buildBundleWithReport(course, { ...sources, previous, units, build });
  const text = canonicalJson(bundle) + '\n';
  const items = bundle.content.reduce((n, c) => n + c.items.length, 0);

  console.log(`hash ${bundleHash(bundle)}`);
  console.log(`bytes ${Buffer.byteLength(text)}`);
  console.log(`entries ${bundle.entries.length} (units ${bundle.units.length}, reference pages ${bundle.shelf.pages.length}, items ${items}, words ${bundle.words.length})`);
  if (report.stopped_because?.code === 'planned') console.log(`stopped before ${report.units_stopped_at}, which holds a planned module (${report.stopped_because.module_key})`);
  else if (report.stopped_because?.code === 'story_missing')
    console.log(
      `stopped before ${report.units_stopped_at}: ${report.stopped_because.module_key} names story ${report.stopped_because.story_id}, which has no record in legacy/l-sources.json ` +
        '(its story art is not in L yet; `pnpm content:migrate l-sources` adds it once L has it)',
    );
  if (report.topic_defaulted.length) console.log(`topic defaulted to the unit name for ${report.topic_defaulted.length} entries`);
  for (const n of report.notes) console.log(`note ${n.code} ${n.detail}`);
  // IPA refused for the dictionary owner: those phrases go out with no IPA.
  for (const r of sources.dictionary.refused || [])
    console.log(`note ipa_refused ${r.id} ${JSON.stringify(r.phonetic)} (${r.why}) ${r.file}:${r.line ?? '?'}`);
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
    // The bundle stops before the first unit that is not ready, so the written modules of that unit and later ones
    // are not in it. The written course alone (planned modules left out, no stop) is built and checked too, never
    // written. A reading there waiting for its story art is a warning (story_missing), since it cannot publish yet.
    let writtenOk = true;
    if (report.units_stopped_at && !units) {
      const written = buildBundleWithReport(loadCourse({ root, planned: false }), { ...sources, previous, build, stopAtUnready: false }).bundle;
      const reached = new Set(bundle.units.map((u) => u.unit_key));
      const warnUnits = new Set(written.units.map((u) => u.unit_key).filter((k) => !reached.has(k)));
      const wp = releaseProblems(written, previous, { warnUnits });
      for (const p of wp) console.error(`written course: ${p.severity} ${p.code} ${p.module_key ?? ''} ${p.detail}`);
      const wc = runChecker(written);
      if (wc.error) {
        console.error(`written course: ${wc.error}`);
        return 1;
      }
      // L's checker reports the same story_missing at /entries/<i>/story_id; it is a warning there too.
      const unreached = (p) => {
        const m = /^\/entries\/(\d+)\/story_id$/.exec(p.pointer ?? '');
        return p.code === 'story_missing' && !!m && warnUnits.has(written.entries[+m[1]]?.unit_key);
      };
      for (const p of wc.problems) console.error(`written course: checker ${unreached(p) ? 'warning' : p.severity} ${p.code} ${p.pointer} ${p.detail}`);
      const checkerOk = !wc.problems.some((p) => p.severity === 'error' && !unreached(p));
      writtenOk = checkerOk && !wp.some((p) => p.severity === 'error');
      console.log(`written course (planned modules left out): entries ${written.entries.length} (units ${written.units.length}); checker ${checkerOk ? 'ok' : 'FAIL'}`);
    }
    return errors.length || !checked.ok || !writtenOk ? 1 : 0;
  }
  if (errors.length) {
    console.error(`${plural(errors.length, 'release problem')}; no bundle written`);
    return 1;
  }
  const out = opts['--out'] ? resolve(opts['--out']) : units ? join(dirname(DEFAULT_OUT), `bundle-${units.join('-')}.json`) : DEFAULT_OUT;
  writeFileAtomic(out, text);
  console.log(`wrote ${relative(process.cwd(), out) || out}`);
  return 0;
}
