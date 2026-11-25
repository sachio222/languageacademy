import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseSpans, frenchSpans, spanProblems } from '../spans.mjs';
import { problem, ContentError } from '../problems.mjs';

test('parseSpans splits braces', () => {
  assert.deepEqual(parseSpans('Use {être} with {fatigué}.'), [
    { lang: 'native', text: 'Use ' },
    { lang: 'fr', text: 'être' },
    { lang: 'native', text: ' with ' },
    { lang: 'fr', text: 'fatigué' },
    { lang: 'native', text: '.' },
  ]);
});

test('escaped brace is literal', () => {
  assert.deepEqual(frenchSpans('a \\{b} {c}'), ['c']);
  assert.deepEqual(parseSpans('a \\{b}')[0], { lang: 'native', text: 'a {b}' });
});

test('unclosed brace', () => {
  assert.deepEqual(spanProblems('Use {être'), ['span_unclosed']);
});

test('nested and empty braces', () => {
  assert.deepEqual(spanProblems('{a {b}}'), ['span_nested']);
  assert.deepEqual(spanProblems('x {} y'), ['span_empty']);
  assert.deepEqual(spanProblems('Use {être} fine'), []);
});

test('ContentError lists every problem', () => {
  const p = [problem('a.json', 'items[0].id', 'id_invalid', 'bad'), problem('b.json', 'x', 'c', 'm')];
  const e = new ContentError(p);
  assert.equal(e.message, 'a.json:items[0].id id_invalid bad\nb.json:x c m');
  assert.deepEqual(e.problems, p);
  assert.ok(e instanceof Error);
});
