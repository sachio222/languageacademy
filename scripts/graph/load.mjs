import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fold } from './fold.mjs';
import { loadPair, ALLOW_IN } from './pairs.mjs';

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

const DEFAULT_SETTINGS = {
  reuse: { immediateWindow: 2, windows: [5, 12, 30] },
  translateAllowedThroughUnit: 1,
  levelThreshold: 0.9,
  defaultNative: 'en',
  cognates: { allowIn: 'shown' },
};

// opts.native: the learner's native language, which picks the language pair (pairs.mjs); settings.defaultNative
// when left out.
export function loadGraph(graphDir, lang, opts = {}) {
  const settings = { ...DEFAULT_SETTINGS, ...readJson(join(graphDir, 'core', 'settings.json')) };
  if (!ALLOW_IN.includes(settings.cognates?.allowIn)) {
    throw new Error(`settings.json: cognates.allowIn must be one of ${ALLOW_IN.join(', ')}, not ${JSON.stringify(settings.cognates?.allowIn)}`);
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

  const nodes = new Map();
  const duplicates = [];
  const add = (node) => {
    if (nodes.has(node.id)) duplicates.push(node.id);
    else nodes.set(node.id, node);
  };
  for (const list of [functions, headwords, forms, paradigms, constructions, nameList]) {
    for (const node of list) add(node);
  }

  const names = new Set(nameList.map((n) => fold(n.surface)));
  return { lang, native, pair, settings, functions, nodes, duplicates, headwords, forms, paradigms, constructions, names, courseMap };
}
