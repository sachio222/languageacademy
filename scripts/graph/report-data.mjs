// Report data for charts: level coverage (<lang>-levels.json) and function coverage (<lang>-functions.json), written
// with sorted keys so the same input gives byte-identical files.
import { join } from 'node:path';
import { levelReport } from './rules/levels.mjs';
import { functionReport } from './functions.mjs';
import { CORE_LEVELS } from './levels-data.mjs';
import { writeSortedJson } from './write-json.mjs';

export function writeReportData(dir, lang, ctx) {
  const levels = levelReport(ctx);
  const functions = functionReport(ctx);
  writeSortedJson(join(dir, `${lang}-levels.json`), levels);
  writeSortedJson(join(dir, `${lang}-functions.json`), functions);
  return { levels, functions };
}

// The counts graph:check prints and the summary JSON keeps: coverage of each core list by the end of the course,
// and how many functions of each level become possible.
export function reportStats(levels, functions) {
  const coverage = {};
  for (const [level, l] of Object.entries(levels.levels)) {
    const counts = (x) => ({
      coreWords: x.coreWords, taughtWords: x.taughtWords,
      coreConstructions: x.coreConstructions, taughtConstructions: x.taughtConstructions, reachedAt: x.reachedAt,
    });
    coverage[level] = { ...counts(l), cumulative: counts(l.cumulative) };
  }
  const functionsPossible = {};
  for (const level of CORE_LEVELS) {
    const of = functions.functions.filter((f) => f.cefr === level);
    if (of.length) functionsPossible[level] = { possible: of.filter((f) => f.position !== null).length, total: of.length };
  }
  return { coverage, functionsPossible };
}

// Share taught, as a whole percent rounded to the nearest; 100% only when every item is taught (99.9% shows 99%).
export function percent(taught, core) {
  if (core === 0) return 100;
  const p = Math.round((100 * taught) / core);
  return p === 100 && taught < core ? 99 : p;
}
