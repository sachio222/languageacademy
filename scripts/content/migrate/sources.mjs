// What the conversion reads from this checkout: today's module objects (through src/lessons/unitConfigLoader.js),
// the frozen L data (content/fr/legacy/l-sources.json), LiaisonHelp.jsx and src/data/frenchPhonics.js.
import '../vite-shim.mjs';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { REPO_ROOT, CONTENT_ROOT } from '../load.mjs';
import { L_SOURCES_FILE } from './l-sources.mjs';
import { fold } from '../../graph/fr/tokenize.mjs';

const importFrom = (p) => import(pathToFileURL(join(REPO_ROOT, p)).href);

// Today's builder logs [DEBUG] lines through console.log while it builds; they are not this command's output.
export async function quietly(fn) {
  const log = console.log;
  console.log = () => {};
  try {
    return await fn();
  } finally {
    console.log = log;
  }
}

/** { unitConfigs, configs: Map<moduleKey, module object> } */
export async function todaysModules() {
  const { unitConfigs } = await quietly(() => importFrom('src/lessons/unitConfigLoader.js'));
  return { unitConfigs, configs: new Map(unitConfigs.flatMap((u) => u.modules).map((m) => [m.moduleKey, m])) };
}

/** content/fr/legacy/l-sources.json, or null when it is not written yet. */
export function readLSources(root = CONTENT_ROOT) {
  const file = join(root, L_SOURCES_FILE);
  return existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : null;
}

export const liaisonJsx = () => readFileSync(join(REPO_ROOT, 'src/components/LiaisonHelp.jsx'), 'utf8');
export const frenchPhonics = async () => (await importFrom('src/data/frenchPhonics.js')).frenchPhonics;

/** Every folded spelling and form the live dictionary (src/data/dictionary/words/cambridge) has a pop-up for. */
export async function dictionaryForms() {
  const d = await importFrom('src/data/dictionary/words/cambridge/index.js');
  const forms = new Set();
  const addForm = (s) => {
    if (typeof s === 'string' && s.trim()) forms.add(fold(s.trim().replace(/[’ʼ‘]/g, "'")));
  };
  for (const words of Object.values(d))
    for (const [, w] of words) {
      if (w?.lang !== 'fr') continue;
      addForm(w.word);
      addForm(w.plural_form);
      for (const r of w.relationships || []) addForm(r.targetWord);
      for (const v of w.variants || []) addForm(typeof v === 'string' ? v : v?.word);
      if (w.adjective_forms && typeof w.adjective_forms === 'object') for (const v of Object.values(w.adjective_forms)) addForm(v);
    }
  return forms;
}
