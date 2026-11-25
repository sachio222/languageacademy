// Task 7 (spec 6): the Unit 1 exam learners take is its module file's 24 items. Every screen that renders
// <UnitExam passes the lesson, so UnitExam.jsx's hard-coded Unit 1 exam was unreachable and is deleted.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = fileURLToPath(new URL('../../../', import.meta.url));

test('unit 1 exam comes from its module file', () => {
  const files = execFileSync('grep', ['-rl', '<UnitExam', 'src'], { cwd: REPO, encoding: 'utf8' }).trim().split('\n').filter(Boolean);
  assert.ok(files.length > 0);
  for (const f of files) {
    const src = readFileSync(join(REPO, f), 'utf8');
    const uses = [...src.matchAll(/<UnitExam\b([\s\S]*?)\/>/g)];
    assert.ok(uses.length > 0, f);
    for (const u of uses) assert.match(u[1], /\blesson=\{/, `${f}: <UnitExam without lesson=`);
  }
  const exam = readFileSync(join(REPO, 'src/components/UnitExam.jsx'), 'utf8');
  assert.doesNotMatch(exam, /Unit 1: Foundation Exam/, 'the hard-coded Unit 1 exam is gone');
  assert.doesNotMatch(exam, /lesson \? \{/, 'the exam always comes from the lesson');
  const mod = JSON.parse(readFileSync(join(REPO, 'content/fr/modules/2024-01-11-unit1-exam.json'), 'utf8'));
  assert.equal(mod.kind, 'unit_exam');
  assert.equal(mod.items.length, 24);
});
