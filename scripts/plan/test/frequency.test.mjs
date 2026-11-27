// The local frequency file: read when present, skipped when absent, and reported as bands only.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { frequencyTrend, readRanks } from '../frequency.mjs';

const BANDS = [{ to_rank: 2, name: 'top' }, { to_rank: 4, name: 'middle' }, { to_rank: null, name: 'rare' }];

test('no file for the language gives null, so the trend is skipped', () => {
  const dir = mkdtempSync(join(tmpdir(), 'la-freq-'));
  try {
    assert.equal(readRanks('xx', dir), null);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('ranks run from the most common word, a repeated lemma keeps its highest value, and bad lines are passed over', () => {
  const dir = mkdtempSync(join(tmpdir(), 'la-freq-'));
  try {
    writeFileSync(join(dir, 'xx.tsv'), 'lemma\tvalue\nun\t50\ndeux\t900\nun\t70\ntrois\t1.5\n\nbad line\n');
    assert.deepEqual([...readRanks('xx', dir)], [['deux', 1], ['un', 2], ['trois', 3]]);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('each unit gets the band of its middle word, and a unit more common than the one before is marked', () => {
  const ranks = new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5], ['f', 9]]);
  const trend = frequencyTrend([
    { unit_key: 'u1', lemmas: ['c', 'd', 'e'] },
    { unit_key: 'u2', lemmas: ['nowhere'] },
    { unit_key: 'u3', lemmas: ['a', 'b', 'nowhere'] },
    { unit_key: 'u4', lemmas: ['e', 'f'] },
  ], ranks, BANDS);
  assert.deepEqual(trend.map((t) => [t.unit_key, t.band, t.steps_back]), [['u1', 'middle', false], ['u2', null, false], ['u3', 'top', true], ['u4', 'rare', false]]);
  assert.deepEqual(trend.map((t) => t.ranked), [3, 0, 2, 2]);
  assert.ok(trend.every((t) => !('rank' in t) && !('median' in t)), 'no rank leaves the function');
});
