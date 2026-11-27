// Runs the test language zz through the content loader (content:validate) and the checker (graph:check), and prints
// what they found and every French module that loaded on the way. A resolve hook records each module before it loads,
// so "French loaded" means a file under scripts/graph/fr/, the French app (src/), or the French migration and legacy
// readers, was imported by anything at all.
import { registerHooks } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const loaded = new Set();
registerHooks({
  resolve(specifier, context, next) {
    const r = next(specifier, context);
    loaded.add(r.url);
    return r;
  },
});

const here = dirname(fileURLToPath(import.meta.url));
const languageModule = join(here, 'language.mjs');
const { loadCourse } = await import('../../../../content/load.mjs');
const { ContentError } = await import('../../../../content/problems.mjs');
const { runCheck } = await import('../../../check.mjs');
const { summarize } = await import('../../../report.mjs');

const root = join(here, 'content');
let content;
let validate;
try {
  content = loadCourse({ root, graphDir: join(here, 'curriculum-graph', 'languages', 'zz'), languageModule });
  validate = { modules: content.modules.size, problems: content.problems?.filter((p) => p.severity !== 'warning') ?? [] };
} catch (e) {
  if (!(e instanceof ContentError)) throw e;
  validate = { modules: 0, problems: e.problems };
}
let check = null;
if (content) {
  const { issues, stats } = await runCheck({ repoRoot: here, lang: 'zz', content, languageModule });
  const s = summarize(issues, stats);
  check = { errors: s.errors, warnings: s.warnings, modules: content.modules.size, issues: issues.filter((i) => i.severity === 'error').map((i) => `${i.rule}: ${i.message}`) };
}
const french = /\/scripts\/graph\/fr\/|\/src\/|\/scripts\/content\/migrate\/|\/scripts\/content\/legacy\/|french/;
const frenchLoaded = [...loaded].filter((u) => u.startsWith('file:') && french.test(u)).map((u) => u.replace(/^.*\/scripts\//, 'scripts/'));
console.log(JSON.stringify({ validate, check, frenchLoaded }));
