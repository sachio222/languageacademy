// A stable identity for every checker issue (design §17 item 2, §4.1 finding.fingerprint). The pipeline's issue
// delta check (C6) compares the course's issues with and without a draft as multisets of fingerprints, so a
// fingerprint names what an issue is about and never where the course happens to place it.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { issueFingerprint, fingerprintCounts } from '../issue-identity.mjs';
import { canonicalJson } from '../../content/bundle.mjs';
import { loadCourse, CONTENT_ROOT } from '../../content/load.mjs';
import { runCheck } from '../check.mjs';
import { repoRoot } from './content-helpers.mjs';

test('the fingerprint ignores message and positions', () => {
  const a = { rule: 'untaught-word', moduleKey: 'm', nodeId: 'fr:lex:x', itemRef: 'm#i-1', message: 'at 12', position: 12 };
  assert.equal(issueFingerprint(a), issueFingerprint({ ...a, message: 'at 40', position: 40, taughtLaterAt: 41 }));
  assert.notEqual(issueFingerprint(a), issueFingerprint({ ...a, itemRef: 'm#i-2' }));
  assert.match(issueFingerprint(a), /^[0-9a-f]{64}$/);
});

test('a reuse miss is identified by the module it is charged to', () => {
  const r = { rule: 'reuse-missed', moduleKey: 'a', budgetModuleKey: 'b', nodeId: 'fr:lex:arbre' };
  assert.notEqual(issueFingerprint(r), issueFingerprint({ ...r, budgetModuleKey: 'c' }));
});

test('fingerprintCounts counts duplicates', () => {
  const i = { rule: 'unknown-word', moduleKey: 'm', itemRef: 'm#i', surface: 'zut' };
  assert.equal(fingerprintCounts([i, { ...i }]).get(issueFingerprint(i)), 2);
});

test('the fingerprint is SHA-256 of the canonical tuple, with missing fields as null', () => {
  const i = { rule: 'untaught-word', moduleKey: 'm', itemRef: 'm#i-1/hint', surface: 'chat', severity: 'warning' };
  const tuple = { rule: 'untaught-word', module_key: 'm', charged_module_key: 'm', node_id: null, item_id: 'i-1/hint', surface: 'chat' };
  assert.equal(issueFingerprint(i), createHash('sha256').update(canonicalJson(tuple)).digest('hex'));
  // No item ref, or a ref without '#', gives item_id null; a course-wide issue has no module at all.
  const wide = { rule: 'level-data-missing', message: '12 taught words have no level' };
  const none = { rule: 'level-data-missing', module_key: null, charged_module_key: null, node_id: null, item_id: null, surface: null };
  assert.equal(issueFingerprint(wide), createHash('sha256').update(canonicalJson(none)).digest('hex'));
  assert.equal(issueFingerprint({ ...wide, itemRef: 'no-hash' }), issueFingerprint(wide));
});

test('the fingerprint never reads message, position, any *At field or severity, and changes no issue', () => {
  const i = { rule: 'untaught-word', moduleKey: 'm', itemRef: 'm#i', nodeId: 'fr:lex:x', surface: 'x', severity: 'error',
    message: 'one', position: 3, taughtLaterAt: { position: 9, title: 'T' }, taughtEarlierAt: null, reason: 'later' };
  const frozen = structuredClone(i);
  const fp = issueFingerprint(i);
  assert.deepEqual(i, frozen);
  assert.equal(fp, issueFingerprint({ ...i, message: 'two', position: 30, taughtLaterAt: null, taughtEarlierAt: { position: 1 },
    reachedAt: 4, dueAt: 5, severity: 'warning', reason: 'nowhere', fix: { kind: 'teach-earlier' } }));
  // Each identity field moves the fingerprint.
  for (const change of [{ rule: 'unknown-word' }, { moduleKey: 'n' }, { budgetModuleKey: 'n' }, { nodeId: 'fr:lex:y' }, { surface: 'X' }]) {
    assert.notEqual(issueFingerprint({ ...i, ...change }), fp, JSON.stringify(change));
  }
});

test('fingerprintCounts is a multiset: one more copy of an issue is one more count', () => {
  const i = { rule: 'untaught-word', moduleKey: 'm', itemRef: 'm#i', nodeId: 'fr:lex:x', surface: 'x' };
  const j = { ...i, surface: 'y' };
  const counts = fingerprintCounts([i, j, { ...i, message: 'again', position: 99 }]);
  assert.ok(counts instanceof Map);
  assert.equal(counts.size, 2);
  assert.equal(counts.get(issueFingerprint(i)), 2);
  assert.equal(counts.get(issueFingerprint(j)), 1);
  assert.equal(fingerprintCounts([]).size, 0);
});

test('level-order adds its sorted node ids: a changed node list is a new fingerprint, a reordered one is not', () => {
  const lo = { rule: 'level-order', moduleKey: 'm', position: 40, nodes: ['fr:lex:b', 'fr:lex:a'], message: 'teaches 2 words' };
  const base = { rule: 'level-order', module_key: 'm', charged_module_key: 'm', node_id: null, item_id: null, surface: null };
  assert.equal(issueFingerprint(lo), createHash('sha256').update(canonicalJson({ ...base, nodes: ['fr:lex:a', 'fr:lex:b'] })).digest('hex'));
  assert.equal(issueFingerprint({ ...lo, nodes: ['fr:lex:a', 'fr:lex:b'], position: 41, nodeLevels: [] }), issueFingerprint(lo));
  assert.notEqual(issueFingerprint({ ...lo, nodes: ['fr:lex:a', 'fr:lex:b', 'fr:lex:c'] }), issueFingerprint(lo));
  assert.notEqual(issueFingerprint({ ...lo, nodes: ['fr:lex:a'] }), issueFingerprint(lo));
  assert.deepEqual(lo.nodes, ['fr:lex:b', 'fr:lex:a'], 'the issue is not changed');
  // Another rule never takes a nodes field into its fingerprint.
  const other = { rule: 'taught-twice', moduleKey: 'm', nodeId: 'fr:lex:a' };
  assert.equal(issueFingerprint({ ...other, nodes: ['fr:lex:z'] }), issueFingerprint(other));
});

test('real course: fingerprints are unchanged when an unrelated module is edited', async (t) => {
  const root = mkdtempSync(join(tmpdir(), 'la-fp-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  cpSync(CONTENT_ROOT, root, { recursive: true });
  const graphDir = join(repoRoot, 'curriculum-graph', 'languages', 'fr');
  const counts = async () => {
    const content = loadCourse({ root, graphDir });
    const { issues } = await runCheck({ repoRoot, lang: 'fr', content });
    return { content, issues, counts: fingerprintCounts(issues) };
  };
  const before = await counts();
  assert.ok(before.issues.length > 0, 'the real course reports issues to compare');

  // One Unit 1 item's hint, native text outside the taught-before rule with no French in it.
  const key = '2024-01-01-pronouns';
  const file = join(root, 'modules', `${key}.json`);
  const mod = JSON.parse(readFileSync(file, 'utf8'));
  const item = mod.items.find((it) => it.id === 'i-je');
  assert.equal(item.hint, 'First person singular');
  item.hint = 'First person singular, the one speaking';
  writeFileSync(file, JSON.stringify(mod, null, 2) + '\n');

  const after = await counts();
  assert.equal(after.content.modules.get(key).items.find((it) => it.id === 'i-je').hint, item.hint, 'the edit was loaded');
  assert.deepEqual(after.counts, before.counts);
});
