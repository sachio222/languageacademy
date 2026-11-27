// The language-module interface (scripts/graph/language.mjs): the shared checker and content loader reach a language
// only through its module, so a language that is not French runs through graph:check and content:validate with no
// French code loaded. The test language lives in fixtures/lang-zz: three words, one plural pattern, one lesson.
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { language, languageOf, defaultLanguage, MEMBERS } from '../language.mjs';
import { loadGraph } from '../load.mjs';
import { runCheck } from '../check.mjs';
import { loadCourse } from '../../content/load.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const ZZ = join(here, 'fixtures', 'lang-zz');

test('French is the configured default and its module has every member', () => {
  assert.equal(defaultLanguage(), 'fr');
  const fr = language('fr');
  for (const m of MEMBERS) assert.notEqual(fr[m], undefined, m);
  assert.equal(fr.code, 'fr');
});

test('a module that lacks a member, or names another code, is refused', () => {
  const dir = mkdtempSync(join(tmpdir(), 'la-lang-'));
  try {
    const partial = join(dir, 'partial.mjs');
    writeFileSync(partial, "export default { code: 'qq', locale: 'qq' };\n");
    assert.throws(() => language('qq', partial), /lacks .*fold/);
    const wrong = join(dir, 'wrong.mjs');
    writeFileSync(wrong, `import zz from '${join(ZZ, 'language.mjs')}';\nexport default { ...zz, code: 'qx' };\n`);
    assert.throws(() => language('qq', wrong), /says it is qx/);
    assert.throws(() => language('NOT A CODE'), /two or three lowercase letters/);
    assert.throws(() => language('qq'), /no language module for qq/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('a loaded graph carries its language, unlisted, and its form index remembers it', () => {
  const graph = loadGraph(join(ZZ, 'curriculum-graph'), 'zz', { languageModule: join(ZZ, 'language.mjs') });
  assert.equal(languageOf(graph).code, 'zz');
  assert.ok(!Object.keys(graph).includes('language'));
  const index = languageOf(graph).buildFormIndex(graph);
  assert.equal(index.language.code, 'zz');
  // the plural pattern builds kotai from kota
  assert.deepEqual(index.get('kotai').map((r) => r.headwordId), ['zz:lex:kota']);
});

test('the checker reads the test language with its own module: an untaught zz word is caught', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'la-zz-'));
  try {
    cpSync(ZZ, dir, { recursive: true });
    const file = join(dir, 'content', 'modules', 'zz-hello.json');
    const mod = JSON.parse(readFileSync(file, 'utf8'));
    mod.items.push({ id: 'i-good', type: 'translate', prompt: 'hello, good cat', answer: 'ka sela kota' });
    writeFileSync(file, JSON.stringify(mod, null, 2));
    const languageModule = join(ZZ, 'language.mjs');
    const content = loadCourse({ root: join(dir, 'content'), graphDir: join(dir, 'curriculum-graph', 'languages', 'zz'), languageModule });
    const { issues } = await runCheck({ repoRoot: dir, lang: 'zz', content, languageModule });
    const untaught = issues.filter((i) => i.rule === 'untaught-word').map((i) => i.nodeId);
    assert.deepEqual(untaught, ['zz:lex:sela']);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('the test language runs through graph:check and content:validate with no French code loaded', () => {
  const out = execFileSync(process.execPath, ['--disable-warning=MODULE_TYPELESS_PACKAGE_JSON', join(ZZ, 'run.mjs')], { encoding: 'utf8' });
  const result = JSON.parse(out);
  assert.deepEqual(result.validate, { modules: 1, problems: [] });
  assert.equal(result.check.errors, 0, JSON.stringify(result.check.issues, null, 1));
  assert.ok(result.check.modules === 1);
  assert.deepEqual(result.frenchLoaded, [], `French code loaded: ${result.frenchLoaded.join(', ')}`);
});
