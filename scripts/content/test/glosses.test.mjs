// content:glosses (Jake, 2026-11-25): each lesson and reading holds a gloss for every form of a taught word that its
// French L glosses shows untaught. The step is deterministic, keeps rows already written, and content:migrate --check
// fails when a gloss is missing.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync, execFileSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONTENT_ROOT } from '../load.mjs';
import { planGlosses, applyGlosses, formNote, formEnglish } from '../glosses.mjs';

const REPO = fileURLToPath(new URL('../../../', import.meta.url));
const GLOSSES = join(REPO, 'scripts/content/glosses.mjs');
const RUN = join(REPO, 'scripts/content/migrate/run.mjs');
const node = (args) => spawnSync(process.execPath, ['--disable-warning=MODULE_TYPELESS_PACKAGE_JSON', ...args], { cwd: REPO, encoding: 'utf8', maxBuffer: 64 << 20 });
const hasMain = ['origin/main', 'main'].some((ref) => {
  try {
    execFileSync('git', ['rev-parse', '--verify', '--quiet', `${ref}^{commit}`], { cwd: REPO, stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
});

// A lesson taught after être (Unit 1) and aller: its concept card quotes forms the course teaches later.
const LESSON = '2024-01-27-aller';
const copy = (t) => {
  const root = mkdtempSync(join(tmpdir(), 'la-glosses-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  cpSync(CONTENT_ROOT, root, { recursive: true });
  return root;
};
const edit = (root, key, fn) => {
  const file = join(root, 'modules', `${key}.json`);
  const mod = JSON.parse(readFileSync(file, 'utf8'));
  fn(mod);
  writeFileSync(file, JSON.stringify(mod, null, 2) + '\n');
  return file;
};
const probe = (mod) => mod.concepts.push({ id: 'c-probe', term: 'Later forms', definition: 'Later you will read {nous irons} and {tu serais}.' });

test('a note names the form; a verb form takes its English from the verb', () => {
  assert.equal(formNote('cond.1sg', 'voler'), 'conditional of {voler}');
  assert.equal(formNote('impf.3sg', 'être'), 'imparfait of {être}');
  assert.equal(formNote('ptcp.fpl', 'venir'), 'past participle of {venir}');
  assert.equal(formNote('pl', 'bon'), 'plural of {bon}');
  assert.equal(formNote('fpl', 'bon'), 'feminine plural of {bon}');
  assert.equal(formNote(null, 'bon'), null);
  assert.equal(formEnglish('to fly', 'cond.1sg'), 'would fly');
  assert.equal(formEnglish('to go', 'fut.1pl'), 'will go');
  assert.equal(formEnglish('to know (people/places)', 'prs.3pl'), 'know (people/places)');
  assert.equal(formEnglish('good', 'pl'), 'good');
});

test('the committed course holds every gloss it needs', async () => {
  assert.deepEqual((await planGlosses()).map((c) => c.key), []);
});

test('a missing gloss is planned, written once, and a rerun changes nothing; rows already written stay', async (t) => {
  const root = copy(t);
  const hand = { fr: 'allons', en: 'go (we)', note: 'a hand-written row' };
  const file = edit(root, LESSON, (m) => {
    probe(m);
    m.glosses = [...(m.glosses ?? []), hand];
  });
  const changes = await planGlosses({ root });
  assert.deepEqual(changes.map((c) => c.key), [LESSON]);
  const rows = changes[0].after;
  const irons = rows.find((g) => g.fr === 'irons');
  assert.deepEqual(irons, { fr: 'irons', en: 'will go', note: 'future of {aller}' });
  assert.ok(rows.some((g) => g.fr === 'serais' && /conditional of \{être\}/.test(g.note)), JSON.stringify(rows));
  assert.deepEqual(rows.at(-1), hand, 'a row the step did not find is kept, after the rows it found');
  applyGlosses(changes);
  const written = readFileSync(file, 'utf8');
  assert.deepEqual(JSON.parse(written).glosses, rows);
  assert.deepEqual(await planGlosses({ root }), [], 'a rerun changes nothing');
  // A row the step would write, edited by hand, is kept as edited.
  edit(root, LESSON, (m) => {
    m.glosses.find((g) => g.fr === 'irons').en = 'we will go';
  });
  assert.deepEqual(await planGlosses({ root }), []);
});

test('content:glosses --check exits 1 when a module would change and writes nothing', (t) => {
  const root = copy(t);
  const file = edit(root, LESSON, probe);
  const before = readFileSync(file, 'utf8');
  const r = node([GLOSSES, '--check', '--root', root]);
  assert.equal(r.status, 1, r.stdout + r.stderr);
  assert.match(r.stdout, new RegExp(`would change .*${LESSON}\\.json: \\d+ -> \\d+ glosses \\(adds [^)]*irons`));
  assert.equal(readFileSync(file, 'utf8'), before);
  const ok = node([GLOSSES, '--check']);
  assert.equal(ok.status, 0, ok.stdout + ok.stderr);
});

test('content:migrate --check fails when a gloss is missing', { skip: !hasMain && 'no main in this checkout' }, (t) => {
  const root = copy(t);
  const work = mkdtempSync(join(tmpdir(), 'la-glosses-wt-'));
  t.after(() => rmSync(work, { recursive: true, force: true }));
  // A converted reading whose committed glosses are taken out.
  const key = '2024-02-01-reading-10';
  edit(root, key, (m) => {
    assert.ok(m.glosses?.length, `${key} holds glosses`);
    delete m.glosses;
  });
  const r = node([RUN, '--check', '--root', root, '--tmp', work]);
  assert.equal(r.status, 1, r.stdout.slice(-2000) + r.stderr.slice(-2000));
  assert.match(r.stdout, new RegExp(`would change .*${key}\\.json \\(glosses`));
});
