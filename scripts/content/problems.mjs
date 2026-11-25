// A Problem is one thing wrong in one content file. ContentError carries a list of them.
// A problem is an error unless it has `severity: 'warning'`: a warning is printed and counted but never stops
// a load (spec 5.4: translate outside Unit 1 is a checker finding, not a load failure).
export function problem(file, path, code, message, severity = 'error') {
  const p = { file, path, code, message };
  if (severity !== 'error') p.severity = severity;
  return p;
}

export const isWarning = (p) => p.severity === 'warning';

// How the commands print problems (content:validate, content:bundle, graph:check): one `file:path code message` line
// each, then a count by code.
export const problemLine = (p) => `${p.file}:${p.path} ${p.code} ${p.message}`;
export const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
export function countByCode(ps) {
  const byCode = new Map();
  for (const p of ps) byCode.set(p.code, (byCode.get(p.code) || 0) + 1);
  return [...byCode].sort(([a], [b]) => a.localeCompare(b)).map(([c, n]) => `${c} ${n}`).join(', ');
}

export class ContentError extends Error {
  constructor(problems, warnings = []) {
    super(problems.map(problemLine).join('\n'));
    this.name = 'ContentError';
    this.problems = problems;
    this.warnings = warnings;
  }
}
