// Prototype L's guide and story data, read as data (spec 6): `GUIDES` from prototypes/l/j-guides.js and `LA_STORIES`
// from prototypes/l/stories-data.js, each evaluated in a `vm` context with a stub `window`, never imported into src/.
// `run.mjs l-sources` freezes them into content/fr/legacy/l-sources.json, so the guide and reading conversion (and
// CI, which has no copy of the vault) read the same data on every run; rerun it after L's guides or stories change.
import { readFileSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import vm from 'node:vm';

export const L_DIR =
  process.env.LA_L_DIR ?? join(homedir(), 'dev/agent_workspaces/language_academy/projects/product/mockups/2026-11-23-dashboard-revisions/prototypes/l');
export const L_SOURCES_FILE = 'legacy/l-sources.json';

function evaluate(file) {
  const window = {};
  const context = vm.createContext({ window });
  vm.runInContext(readFileSync(file, 'utf8'), context, { filename: file });
  return window;
}

// JSON copies: the vm's objects belong to another realm.
const plain = (v) => JSON.parse(JSON.stringify(v));

/** { guides, stories } from an L folder. Stories keep everything but `questions`, which come from the module files. */
export function readLFolder(dir = L_DIR) {
  for (const f of ['j-guides.js', 'stories-data.js'])
    if (!existsSync(join(dir, f))) throw new Error(`${join(dir, f)} not found; set LA_L_DIR to prototype L's folder`);
  const g = evaluate(join(dir, 'j-guides.js'));
  if (!g.LAGuides?.list) throw new Error('j-guides.js did not set window.LAGuides');
  const s = evaluate(join(dir, 'stories-data.js'));
  if (!Array.isArray(s.LA_STORIES)) throw new Error('stories-data.js did not set window.LA_STORIES');
  return {
    source: 'prototypes/l/j-guides.js (GUIDES) and prototypes/l/stories-data.js (LA_STORIES), written by `pnpm content:migrate l-sources`',
    guides: plain(g.LAGuides.list()),
    stories: plain(s.LA_STORIES).map(({ questions, ...story }) => story),
  };
}
