import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { language } from './language.mjs';
import { loadPair, ALLOW_IN } from './pairs.mjs';
import { readCoreLists } from './levels-data.mjs';

function readJson(path) {
  let text;
  try {
    text = readFileSync(path, 'utf8');
  } catch (err) {
    throw new Error(`Graph data file missing or unreadable: ${path} (${err.code || err.message})`);
  }
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error(`Graph data file is not valid JSON: ${path} (${err.message})`);
  }
}

// course-map.json holds checker corrections only, per module: excludeWords (homograph ids extraction must not credit),
// overrides (keyed "<moduleKey>#<item_id>" and the other refs of content-course.mjs, each { ignore: [...] }),
// itemKinds (keyed the same way) and contentNotes (lesson text to fix, listed in the fix list). What a module teaches
// and tests is written in its own file under content/<lang>/modules.
export const CORRECTION_FIELDS = ['excludeWords', 'overrides', 'itemKinds', 'contentNotes'];

// The corrections the checker uses, and a problem line for anything else in the file: a field that is not a
// correction (a course map from before the split) or a key outside its own module. The file is kept whole in
// courseMap, so the migration can still split an old map; graph:check reports each problem as course-map-field.
function corrections(courseMap) {
  const out = {};
  const problems = [];
  for (const [moduleKey, entry] of Object.entries(courseMap)) {
    const kept = {};
    for (const [field, value] of Object.entries(entry ?? {})) {
      if (!CORRECTION_FIELDS.includes(field)) {
        problems.push({ moduleKey, message: `course-map.json ${moduleKey}.${field} is not a correction (${CORRECTION_FIELDS.join(', ')}); write teaching and tests in the module file` });
        continue;
      }
      if (field === 'overrides' || field === 'itemKinds') {
        const keys = Object.keys(value ?? {});
        for (const ref of keys.filter((k) => !k.startsWith(`${moduleKey}#`))) {
          problems.push({ moduleKey, message: `course-map.json ${moduleKey}.${field} key ${ref} must start with "${moduleKey}#"` });
        }
        kept[field] = Object.fromEntries(keys.filter((k) => k.startsWith(`${moduleKey}#`)).map((k) => [k, value[k]]));
      } else kept[field] = value;
    }
    if (Object.keys(kept).length) out[moduleKey] = kept;
  }
  return { corrections: out, problems };
}

const DEFAULT_SETTINGS = {
  reuse: { immediateWindow: 2, windows: [5, 12, 30] },
  translateAllowedThroughUnit: 1,
  levelThreshold: 0.9,
  defaultNative: 'en',
  cognates: { allowIn: 'shown' },
  levelOrder: { words: 1, patterns: 1 },
};

// opts.native: the learner's native language, which picks the language pair (pairs.mjs); settings.defaultNative
// when left out. opts.languageModule: the file of the language module to read text with (language.mjs), for a test
// language kept outside scripts/graph.
export function loadGraph(graphDir, lang, opts = {}) {
  const reader = language(lang, opts.languageModule);
  // Settings: the defaults, then core/settings.json (shared by every language), then the language's own
  // languages/<lang>/settings.json when it has one, each replacing the keys it names.
  const ownSettings = join(graphDir, 'languages', lang, 'settings.json');
  const settings = {
    ...DEFAULT_SETTINGS,
    ...readJson(join(graphDir, 'core', 'settings.json')),
    ...(existsSync(ownSettings) ? readJson(ownSettings) : {}),
  };
  if (!ALLOW_IN.includes(settings.cognates?.allowIn)) {
    throw new Error(`settings.json: cognates.allowIn must be one of ${ALLOW_IN.join(', ')}, not ${JSON.stringify(settings.cognates?.allowIn)}`);
  }
  // levelOrder: how many levels above the highest level the course has reached a lesson may teach, for words and for
  // patterns (constructions, paradigms and forms). 1, the default, suits a course ordered by level; a course ordered by
  // its own method, such as grammar first and common words first, allows more. The level-order rule reads it.
  settings.levelOrder = { ...DEFAULT_SETTINGS.levelOrder, ...settings.levelOrder };
  for (const kind of ['words', 'patterns']) {
    const n = settings.levelOrder[kind];
    if (!(Number.isInteger(n) && n >= 1)) {
      throw new Error(`settings.json: levelOrder.${kind} must be a whole number of levels (1 or more), not ${JSON.stringify(n)}`);
    }
  }
  // reference.openFrom: the course position from which the Reference unit's words count as available, or null to keep
  // the unit closed. reference.modules: the module keys of the Reference unit whose words open. With no reference
  // block, the unit stays closed. validateGraph checks the keys and that openFrom falls inside the course.
  if (settings.reference !== undefined) {
    const from = settings.reference?.openFrom;
    if (from !== null && !(Number.isInteger(from) && from >= 1)) {
      throw new Error(`settings.json: reference.openFrom must be a course position (1 or more) or null, not ${from === undefined ? 'missing' : JSON.stringify(from)}`);
    }
    const modules = settings.reference?.modules;
    if (!Array.isArray(modules) || !modules.every((k) => typeof k === 'string')) {
      throw new Error(`settings.json: reference.modules must be a list of Reference module keys, not ${modules === undefined ? 'missing' : JSON.stringify(modules)}`);
    }
  }
  const native = opts.native ?? settings.defaultNative;
  const pair = loadPair(graphDir, native, lang);
  const functions = readJson(join(graphDir, 'core', 'functions.json'));
  const langDir = join(graphDir, 'languages', lang);
  const headwords = readJson(join(langDir, 'headwords.json'));
  const forms = readJson(join(langDir, 'forms.json'));
  const paradigms = readJson(join(langDir, 'paradigms.json'));
  const constructions = readJson(join(langDir, 'constructions.json'));
  const nameList = readJson(join(langDir, 'names.json'));
  const courseMap = readJson(join(langDir, 'course-map.json'));
  const { corrections: fixes, problems: courseMapProblems } = corrections(courseMap);
  // How this language performs the shared functions (functions.mjs), core lists per level
  // (core/levels/<lang>-<level>.json) and headwords the checker cannot yet read in running text
  // (reading-limits.json). A language may have none of them yet.
  const exponentsPath = join(langDir, 'exponents.json');
  const exponents = existsSync(exponentsPath) ? readJson(exponentsPath) : [];
  const coreLists = readCoreLists(graphDir, lang);
  const limitsPath = join(langDir, 'reading-limits.json');
  const readingLimits = existsSync(limitsPath) ? readJson(limitsPath) : [];

  const nodes = new Map();
  const duplicates = [];
  const add = (node) => {
    if (nodes.has(node.id)) duplicates.push(node.id);
    else nodes.set(node.id, node);
  };
  for (const list of [functions, headwords, forms, paradigms, constructions, nameList]) {
    for (const node of list) add(node);
  }

  const names = new Set(nameList.map((n) => reader.fold(n.surface)));
  // courseMap is the file as written; runCheck replaces it with the per-module entries built from the content layer and
  // the corrections (content-course.mjs courseMapFromContent).
  const graph = {
    lang, native, pair, settings, functions, exponents, coreLists, readingLimits, nodes, duplicates, headwords, forms, paradigms, constructions, names,
    courseMap, corrections: fixes, courseMapProblems,
  };
  // The language module rides along unlisted, so the graph's own fields stay what they were (languageOf reads it).
  return Object.defineProperty(graph, 'language', { value: reader });
}
