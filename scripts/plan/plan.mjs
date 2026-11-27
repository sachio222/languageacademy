// The course plan of one language: content/<lang>/course-plan.json (schema/la-course-plan@1.json), the part of the
// course that is planned and not yet written. Every plan tool reads the plan through here and reads only that
// language's folders: content/<lang>/ and curriculum-graph/languages/<lang>/ (with the pair folder for glosses).
//
//   planPaths(repoRoot, lang)      where a language's plan, content and graph live
//   readPlan(repoRoot, lang)       the plan, parsed; PlanError when the file is missing or is not JSON
//   schemaProblems(plan)           every schema problem as "<json pointer>: <message>"
//   planModules(plan)              every module in plan order, each with its unit: [{ unit, module, nth }]
//   readMethod()                   the limits every plan keeps (method.json), the same for every language
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createValidator } from '../pipeline/contracts/json-schema.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = resolve(HERE, '../..');
export const PLAN_FILE = 'course-plan.json';
export const PLAN_SCHEMA = 'la-course-plan@1';
/** Module kinds that teach, and what each may teach. A practice set and a unit exam teach nothing. */
export const TEACHES = { lesson: ['words', 'constructions'], guide: ['words', 'constructions'], reading: ['words'], practice: [], unit_exam: [] };

export class PlanError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PlanError';
  }
}

export function planPaths(repoRoot, lang) {
  const content = join(repoRoot, 'content', lang);
  return {
    content,
    plan: join(content, PLAN_FILE),
    graph: join(repoRoot, 'curriculum-graph'),
    graphLang: join(repoRoot, 'curriculum-graph', 'languages', lang),
    pair: (native) => join(repoRoot, 'curriculum-graph', 'pairs', `${native}-${lang}`),
  };
}

export function readPlan(repoRoot, lang) {
  const file = planPaths(repoRoot, lang).plan;
  if (!existsSync(file)) throw new PlanError(`${file}: no course plan for ${lang}`);
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch (e) {
    throw new PlanError(`${file}: not valid JSON (${e.message})`);
  }
}

let validator = null;
export function schemaProblems(plan) {
  validator ??= createValidator([join(HERE, 'schema')]);
  return validator.validate(PLAN_SCHEMA, plan);
}

export const planModules = (plan) => plan.units.flatMap((unit) => unit.modules.map((module, nth) => ({ unit, module, nth })));

export const readMethod = () => JSON.parse(readFileSync(join(HERE, 'method.json'), 'utf8'));

/** A title or line as plain text: braces mark words of the language taught and are dropped. */
export const plain = (text) => String(text ?? '').replace(/[{}]/g, '');
