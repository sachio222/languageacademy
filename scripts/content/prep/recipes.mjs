// loadRecipes(root = CONTENT_ROOT): the recipes of the five module kinds and the time constants, from
// <root>/recipes/<kind>.json and <root>/recipes/time.json, each validated (schema/recipe.mjs). Throws ContentError
// listing every problem in every file. Returns { byKind: Map<kind, Recipe>, time, sha256 }, where sha256 is the
// SHA-256 of the canonical JSON of all six documents, so a card can pin the recipes it was made from.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { canonicalJson } from '../bundle.mjs';
import { CONTENT_ROOT, REPO_ROOT } from '../load.mjs';
import { ContentError, problem } from '../problems.mjs';
import { RECIPE_KINDS, validateRecipe, validateTime } from '../schema/recipe.mjs';

export { RECIPE_KINDS };

const rel = (p) => relative(REPO_ROOT, p).split(sep).join('/');

function readDoc(file, problems) {
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch (e) {
    problems.push(problem(rel(file), '', e.code === 'ENOENT' ? 'file_missing' : 'json_invalid', e.code === 'ENOENT' ? 'the recipe file is missing' : `not valid JSON: ${e.message}`));
    return null;
  }
}

export function loadRecipes(root = CONTENT_ROOT) {
  const dir = join(root, 'recipes');
  const problems = [];
  const byKind = new Map();
  for (const kind of RECIPE_KINDS) {
    const file = join(dir, `${kind}.json`);
    const doc = readDoc(file, problems);
    if (doc === null) continue;
    problems.push(...validateRecipe(doc, rel(file), kind));
    byKind.set(kind, doc);
  }
  const timeFile = join(dir, 'time.json');
  const time = readDoc(timeFile, problems);
  if (time !== null) problems.push(...validateTime(time, rel(timeFile)));
  if (problems.length) throw new ContentError(problems);
  const sha256 = createHash('sha256').update(canonicalJson({ recipes: Object.fromEntries(byKind), time })).digest('hex');
  return { byKind, time, sha256 };
}
