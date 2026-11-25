// The course plan runs well past today's 171 modules. A synthetic course of 400 modules (the real course plus
// copies of real lessons under new keys, in new units) must still load fast and fit L's 10 MB release body.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync, cpSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadCourse, readContent, CONTENT_ROOT } from '../load.mjs';
import { buildBundle, canonicalJson } from '../bundle.mjs';
import { withoutPlanned } from '../assemble.mjs';
import { loadBundleSources } from '../bundle-sources.mjs';

const TARGET = 400;
const PER_UNIT = 15;

function syntheticRoot(t) {
  const root = mkdtempSync(join(tmpdir(), 'la-scale-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  cpSync(CONTENT_ROOT, root, { recursive: true });
  const { outlineText, files: all } = readContent(CONTENT_ROOT);
  // The written course only: the course plan's stubs (status planned) would stop the bundle at their unit (spec 7).
  const { outline, files } = withoutPlanned(JSON.parse(outlineText), all);
  const kept = new Set(files.map((f) => f.file));
  for (const f of all) if (!kept.has(f.file)) rmSync(join(root, 'modules', f.file.replace(/^.*\//, '')));
  const lessons = files.map((f) => JSON.parse(f.text)).filter((m) => m.kind === 'lesson' && m.status === 'written');
  const template = outline.units[1];
  let count = files.length;
  let n = 0;
  mkdirSync(join(root, 'modules'), { recursive: true });
  while (count < TARGET) {
    const unit = { ...template, unit_key: `unit${outline.units.length + 1}`, name: `Scale ${outline.units.length + 1}`, entries: [] };
    while (unit.entries.length < PER_UNIT && count < TARGET) {
      const m = structuredClone(lessons[n % lessons.length]);
      n += 1;
      m.module_key = `2030-01-01-scale-${n}`;
      writeFileSync(join(root, 'modules', `${m.module_key}.json`), JSON.stringify(m));
      unit.entries.push(m.module_key);
      count += 1;
    }
    outline.units.push(unit);
  }
  writeFileSync(join(root, 'course.json'), JSON.stringify(outline));
  return root;
}

test('400 modules fit', async (t) => {
  const root = syntheticRoot(t);
  const started = performance.now();
  const course = loadCourse({ root });
  const ms = performance.now() - started;
  assert.equal(course.modules.size, TARGET);
  assert.ok(ms < 5000, `loaded in ${Math.round(ms)} ms`);
  const bundle = buildBundle(course, { ...(await loadBundleSources({ root })), build: { source_commit: 'e059c59', built_at: '2026-11-25T00:00:00Z' } });
  const bytes = Buffer.byteLength(canonicalJson(bundle));
  assert.ok(bytes < 10_000_000, `${bytes} bytes`);
  assert.equal(bundle.entries.length + bundle.shelf.pages.length, TARGET);
});
