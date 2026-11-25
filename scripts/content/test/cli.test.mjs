import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { MINI_ROOT } from './mini-fixture.mjs';

const CLI = fileURLToPath(new URL('../cli.mjs', import.meta.url));
const run = (...args) => spawnSync(process.execPath, [CLI, ...args], { encoding: 'utf8' });

test('validate the fixture', () => {
  const r = run('validate', '--root', MINI_ROOT);
  assert.equal(r.status, 0, r.stderr);
  assert.equal(r.stdout.trim(), 'ok 6 modules');
});

// A copy of the mini course whose outline lists two modules that have no file.
function rootWithMissingFiles(t) {
  const root = mkdtempSync(join(tmpdir(), 'la-content-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  cpSync(MINI_ROOT, root, { recursive: true });
  const outline = JSON.parse(readFileSync(join(root, 'course.json'), 'utf8'));
  outline.units[0].entries.push('not-written-yet', 'nor-this-one');
  writeFileSync(join(root, 'course.json'), JSON.stringify(outline));
  return root;
}

test('a translate item outside Unit 1 is a warning, printed and counted', (t) => {
  const root = mkdtempSync(join(tmpdir(), 'la-content-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  cpSync(MINI_ROOT, root, { recursive: true });
  const outline = JSON.parse(readFileSync(join(root, 'course.json'), 'utf8'));
  // The mini lesson's translate items, moved into unit2.
  outline.units[0].entries = outline.units[0].entries.filter((k) => k !== '2024-01-02-etre');
  outline.units[1].entries.unshift('2024-01-02-etre');
  writeFileSync(join(root, 'course.json'), JSON.stringify(outline));
  const r = run('validate', '--root', root);
  assert.equal(r.status, 0, r.stderr);
  const out = r.stdout.trim().split('\n');
  assert.ok(out.includes('warnings:'), r.stdout);
  assert.ok(out.some((l) => /^warning .*2024-01-02-etre\.json:items\[\d+\]\.type translate_outside_unit1 /.test(l)), r.stdout);
  assert.match(out.at(-2), /^\d+ warnings?: translate_outside_unit1 \d+$/);
  assert.equal(out.at(-1), 'ok 6 modules');
});

test('missing files fail', (t) => {
  const r = run('validate', '--root', rootWithMissingFiles(t));
  assert.equal(r.status, 1);
  assert.match(r.stderr, /outline_missing_file 2/);
});

test('--allow is no longer an option', () => {
  for (const args of [['validate', '--allow', 'outline_missing_file'], ['validate', '--root', MINI_ROOT, '--allow', 'outline_missing_file']]) {
    const r = run(...args);
    assert.equal(r.status, 2, args.join(' '));
    assert.equal(r.stdout, '');
    assert.match(r.stderr, /usage/);
  }
});

test('the default content folder validates clean', () => {
  const r = run('validate');
  assert.equal(r.status, 0, r.stderr);
  // Every module of the outline has its file: 146 lessons, practice sets and unit exams, 12 guides, 11 readings and
  // 9 Reference pages. Translations outside Unit 1 still print as warnings.
  assert.equal(r.stdout.trim().split('\n').at(-1), 'ok 178 modules');
  assert.match(r.stdout, /^\d+ warnings: translate_outside_unit1 \d+$/m);
});

test('an explicit root that is missing is an error', () => {
  const r = run('validate', '--root', MINI_ROOT + 'does-not-exist');
  assert.equal(r.status, 1);
  assert.equal(r.stdout, '');
  assert.match(r.stderr, /does-not-exist/);
});

test('--root needs a value', () => {
  for (const args of [['validate', '--root'], ['validate', '--root', '--other']]) {
    const r = run(...args);
    assert.equal(r.status, 2, args.join(' '));
    assert.equal(r.stdout, '');
  }
});

test('unknown command', () => {
  const r = run('frobnicate');
  assert.equal(r.status, 2);
});
