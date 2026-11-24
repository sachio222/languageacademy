import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readScreen } from '../screens.mjs';
import { loadGraph } from '../load.mjs';
import { validateGraph } from '../validate.mjs';
import { makeModule } from './helpers.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '../../..');
const fixture = readFileSync(join(here, 'fixtures/screens/WordList.jsx'), 'utf8');
const FRENCH = new Set(['un', 'une', 'cafe', 'table', 'je', 'veux']);
const isWord = (key) => FRENCH.has(key);

test('readScreen returns the French on a help screen and nothing else', () => {
  assert.deepEqual(readScreen(fixture, { isWord }), ['un café', 'une table', 'Je veux un café']);
});

test('readScreen never returns imports, class names, log text, table or column names, or progress keys', () => {
  const all = readScreen(fixture).join('\n');
  for (const s of ['react', 'SpeakButton', 'WordList.css', 'word-list-help', 'phrase-item', 'loaded words',
    'concept_understanding', 'concept_index', 'module_key', 'what-are-words', 'fr-FR', 'coffee']) {
    assert.ok(!all.includes(s), s);
  }
});

const base = loadGraph(join(here, 'fixtures', 'graph-mini'), 'fr');
const helpCourse = [makeModule({ position: 1, moduleKey: 'h1', kind: 'help' })];

test('validateGraph reports a help module with no screen', () => {
  const issues = validateGraph({ ...base, courseMap: { h1: {} } }, { course: helpCourse, repoRoot });
  assert.deepEqual(issues.map((i) => [i.rule, i.severity, i.moduleKey]), [['screen-missing', 'error', 'h1']]);
});

test('validateGraph reports a screen file that does not exist', () => {
  const issues = validateGraph({ ...base, courseMap: { h1: { screen: 'src/components/NoSuchHelp.jsx' } } },
    { course: helpCourse, repoRoot });
  assert.deepEqual(issues.map((i) => i.rule), ['dangling-ref']);
  assert.match(issues[0].message, /NoSuchHelp\.jsx/);
});

test('validateGraph accepts a help module whose screen exists', () => {
  const courseMap = { h1: { screen: 'scripts/graph/test/fixtures/screens/WordList.jsx' } };
  assert.deepEqual(validateGraph({ ...base, courseMap }, { course: helpCourse, repoRoot }), []);
});
