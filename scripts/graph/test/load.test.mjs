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
