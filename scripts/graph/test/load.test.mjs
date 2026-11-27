import test from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseId } from '../ids.mjs';
import { loadGraph } from '../load.mjs';
import { validateGraph } from '../validate.mjs';
import { issue } from '../issues.mjs';
import { fold } from '../fold.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const fixtureDir = join(here, 'fixtures', 'graph-mini');

// Copy the fixture, let the caller edit a language file, load the result.
function loadMutated(file, edit) {
  const dir = mkdtempSync(join(tmpdir(), 'graph-mini-'));
  try {
    cpSync(fixtureDir, dir, { recursive: true });
    const path = join(dir, 'languages', 'fr', file);
    writeFileSync(path, JSON.stringify(edit(JSON.parse(readFileSync(path, 'utf8')))));
    return loadGraph(dir, 'fr');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

test('parseId splits language and shared IDs', () => {
  assert.deepEqual(parseId('fr:lex:aller'), { lang: 'fr', kind: 'lex', key: 'aller' });
  assert.equal(parseId('sense:go.move').lang, null);
  assert.equal(parseId('sense:go.move').kind, 'sense');
});

test('parseId throws on a malformed ID', () => {
  assert.throws(() => parseId('aller'));
  assert.throws(() => parseId('fr:bogus:aller'));
});

test('loadGraph reads the fixture', () => {
  const g = loadGraph(fixtureDir, 'fr');
  assert.equal(g.nodes.get('fr:lex:parler').lemma, 'parler');
  assert.ok(g.names.has('marie'));
  assert.equal(g.settings.levelThreshold, 0.9);
  assert.equal(g.headwords.length, 23);
});

test('loadGraph throws with the path when a data file is missing', () => {
  const dir = mkdtempSync(join(tmpdir(), 'graph-mini-'));
  try {
    cpSync(fixtureDir, dir, { recursive: true });
    rmSync(join(dir, 'languages', 'fr', 'forms.json'));
    assert.throws(() => loadGraph(dir, 'fr'), /forms\.json/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('loadGraph reads a language with no exponents.json as having no exponents', () => {
  const dir = mkdtempSync(join(tmpdir(), 'graph-mini-'));
  try {
    cpSync(fixtureDir, dir, { recursive: true });
    rmSync(join(dir, 'languages', 'fr', 'exponents.json'));
    assert.deepEqual(loadGraph(dir, 'fr').exponents, []);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('validateGraph is clean on the fixture', () => {
  assert.deepEqual(validateGraph(loadGraph(fixtureDir, 'fr')), []);
});

test('validateGraph flags a duplicate ID', () => {
  const g = loadMutated('headwords.json', (hs) => [...hs, hs[0]]);
  assert.ok(validateGraph(g).some((i) => i.rule === 'duplicate-id' && i.nodeId === 'fr:lex:je'));
});

test('validateGraph flags a dangling ref', () => {
  const g = loadMutated('forms.json', (fs) => [...fs, { id: 'fr:form:x.prs.1sg', of: 'fr:lex:missing', cell: 'prs.1sg', surface: 'x' }]);
  assert.ok(validateGraph(g).some((i) => i.rule === 'dangling-ref'));
});

test('validateGraph flags a dangling excludeWords ref', () => {
  const g = { ...loadGraph(fixtureDir, 'fr'), courseMap: { m: { excludeWords: ['fr:lex:nope'] } } };
  assert.ok(validateGraph(g).some((i) => i.rule === 'dangling-ref' && i.message.includes('excludeWords')));
});

test('validateGraph flags dangling tests, teachesWordsManual, preTeach and override ignore refs', () => {
  const g = {
    ...loadGraph(fixtureDir, 'fr'),
    courseMap: {
      m: {
        tests: ['fr:cx:nope1'],
        teachesWordsManual: ['fr:lex:nope2'],
        preTeach: ['fr:lex:nope3'],
        overrides: { 'm#items[0]': { ignore: ['fr:lex:nope4', 'parle', 'fr:lex:parler'] } },
      },
    },
  };
  const dangling = validateGraph(g).filter((i) => i.rule === 'dangling-ref');
  assert.deepEqual(dangling.map((i) => i.message.match(/missing node (\S+)/)[1]).sort(),
    ['fr:cx:nope1', 'fr:lex:nope2', 'fr:lex:nope3', 'fr:lex:nope4']);
  assert.ok(dangling.some((i) => i.message.includes('overrides[m#items[0]].ignore')));
});

test('validateGraph flags a construction with no examples.match', () => {
  const g = loadMutated('constructions.json', (cs) => [...cs, { id: 'fr:cx:bare', label: 'Bare', needs: [], detect: null, examples: {}, contrastsWith: [], cefr: null }]);
  assert.ok(validateGraph(g).some((i) => i.rule === 'construction-no-examples' && i.nodeId === 'fr:cx:bare'));
});

test('issue fills defaults', () => {
  const i = issue({ rule: 'x', message: 'm' });
  assert.equal(i.severity, 'error');
});

test('fold lowercases, strips diacritics and straightens apostrophes', () => {
  assert.equal(fold('Café'), 'cafe');
  assert.equal(fold('l’eau'), "l'eau");
  assert.equal(fold('L‘EAU'), "l'eau");
});

test('settings.json: reference.openFrom is a course position from 1, or null to keep the Reference unit closed', () => {
  const withSettings = (reference) => {
    const dir = mkdtempSync(join(tmpdir(), 'graph-mini-'));
    try {
      cpSync(fixtureDir, dir, { recursive: true });
      const path = join(dir, 'core', 'settings.json');
      writeFileSync(path, JSON.stringify({ ...JSON.parse(readFileSync(path, 'utf8')), reference }));
      return loadGraph(dir, 'fr');
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  };
  assert.equal(withSettings({ openFrom: 1, modules: ['a'] }).settings.reference.openFrom, 1);
  assert.equal(withSettings({ openFrom: null, modules: [] }).settings.reference.openFrom, null);
  for (const bad of [{ openFrom: 0, modules: [] }, { openFrom: '1', modules: [] }, { openFrom: 1.5, modules: [] }, { modules: [] }]) {
    assert.throws(() => withSettings(bad), /reference\.openFrom/);
  }
  for (const bad of [{ openFrom: 1 }, { openFrom: 1, modules: 'a' }, { openFrom: 1, modules: [1] }]) {
    assert.throws(() => withSettings(bad), /reference\.modules/);
  }
  assert.equal(loadGraph(fixtureDir, 'fr').settings.reference, undefined);
});

test('validate: reference.modules must name Reference modules, and openFrom must fall inside the course', () => {
  const base = loadGraph(fixtureDir, 'fr');
  const course = [{ position: 1, moduleKey: 'm1', kind: 'lesson', items: [] }, { position: 2, moduleKey: 'm2', kind: 'lesson', items: [] }];
  const graph = (reference) => ({ ...base, settings: { ...base.settings, reference } });
  const referenceModules = ['2024-04-02-numbers', '2024-04-07-language-stats'];
  const rules = (reference) => validateGraph(graph(reference), { course, referenceModules })
    .filter((i) => /reference/.test(i.message)).map((i) => [i.rule, i.severity]);
  assert.deepEqual(rules({ openFrom: 1, modules: ['2024-04-02-numbers'] }), []);
  const dangling = validateGraph(graph({ openFrom: 1, modules: ['2024-04-02-numbers', 'nope'] }), { course, referenceModules });
  const hit = dangling.find((i) => i.rule === 'dangling-ref' && /nope/.test(i.message));
  assert.equal(hit.severity, 'error');
  assert.match(hit.message, /settings\.reference\.modules names nope, which is not a module of the Reference unit/);
  const past = validateGraph(graph({ openFrom: 3, modules: [] }), { course, referenceModules });
  const late = past.find((i) => i.rule === 'reference-open-from');
  assert.equal(late.severity, 'error');
  assert.match(late.message, /reference\.openFrom is 3, past the last course position \(2\)/);
  assert.equal(validateGraph(graph({ openFrom: null, modules: [] }), { course, referenceModules }).some((i) => i.rule === 'reference-open-from'), false);
});

test('validateGraph accepts use: recognize on a construction and flags any other value', () => {
  const g = loadMutated('constructions.json', (cs) => [...cs,
    { id: 'fr:cx:read-only', label: 'Read only', needs: [], detect: null, examples: { match: ['Il fut là.'] }, contrastsWith: [], cefr: null, use: 'recognize' },
    { id: 'fr:cx:bad-use', label: 'Bad use', needs: [], detect: null, examples: { match: ['Il fut là.'] }, contrastsWith: [], cefr: null, use: 'read' }]);
  const bad = validateGraph(g).filter((i) => i.rule === 'construction-use-bad');
  assert.deepEqual(bad.map((i) => i.nodeId), ['fr:cx:bad-use']);
});
