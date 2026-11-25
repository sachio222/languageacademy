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

test('missing files fail without --allow', (t) => {
  const r = run('validate', '--root', rootWithMissingFiles(t));
  assert.equal(r.status, 1);
  assert.match(r.stderr, /outline_missing_file 2/);
});

test('--allow counts and prints the allowed problems', (t) => {
  const r = run('validate', '--root', rootWithMissingFiles(t), '--allow', 'outline_missing_file');
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /not-written-yet/);
  assert.match(r.stdout, /nor-this-one/);
  assert.match(r.stdout.trim().split('\n').at(-1), /^ok with 2 allowed problems: outline_missing_file 2$/);
});

test('--allow does not hide other codes', (t) => {
  const root = rootWithMissingFiles(t);
  const outline = JSON.parse(readFileSync(join(root, 'course.json'), 'utf8'));
  outline.units[0].name = '';
  writeFileSync(join(root, 'course.json'), JSON.stringify(outline));
  const r = run('validate', '--root', root, '--allow', 'outline_missing_file');
  assert.equal(r.status, 1);
  // The failing count names only the code that was not allowed; the allowed ones are counted on their own line.
  assert.match(r.stderr, /^1 problem: field_type 1$/m);
  assert.match(r.stderr, /^allowed: outline_missing_file 2$/m);
});

test('--allow needs a value', () => {
  for (const args of [['validate', '--allow'], ['validate', '--allow', '--root', MINI_ROOT]]) {
    const r = run(...args);
    assert.equal(r.status, 2, args.join(' '));
    assert.equal(r.stdout, '');
  }
});

test('the default content folder validates with today\'s allowance', () => {
  const r = run('validate', '--allow', 'outline_missing_file');
  assert.equal(r.status, 0, r.stderr);
  // Task 6 wrote the lessons, practice sets and unit exams; the 5 guides, 11 readings and 9 Reference pages are
  // Task 7's, which removes the allowance.
  assert.equal(r.stdout.trim().split('\n').at(-1), 'ok with 25 allowed problems: outline_missing_file 25');
  const missing = r.stdout.split('\n').filter((l) => l.startsWith('allowed ')).map((l) => l.match(/modules\/([^.]+)\.json/)?.[1] ?? l);
  const kinds = JSON.parse(readFileSync(new URL('../../../content/fr/course.json', import.meta.url), 'utf8'));
  assert.equal(missing.length, 25);
  assert.ok(kinds.shelf.pages.every((k) => missing.includes(k)), 'every Reference page is still Task 7’s');
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
