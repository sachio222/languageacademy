import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fold } from './fold.mjs';

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
};

export function loadGraph(graphDir, lang) {
  const settings = { ...DEFAULT_SETTINGS, ...readJson(join(graphDir, 'core', 'settings.json')) };
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
  return { lang, settings, functions, nodes, duplicates, headwords, forms, paradigms, constructions, names, courseMap };
}
