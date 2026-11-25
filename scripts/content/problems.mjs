// A Problem is one thing wrong in one content file. ContentError carries a list of them.
// A problem is an error unless it has `severity: 'warning'`: a warning is printed and counted but never stops
// a load (spec 5.4: translate outside Unit 1 is a checker finding, not a load failure).
export function problem(file, path, code, message, severity = 'error') {
  const p = { file, path, code, message };
  if (severity !== 'error') p.severity = severity;
  return p;
}

export const isWarning = (p) => p.severity === 'warning';

export class ContentError extends Error {
  constructor(problems, warnings = []) {
    super(problems.map((p) => `${p.file}:${p.path} ${p.code} ${p.message}`).join('\n'));
    this.name = 'ContentError';
    this.problems = problems;
    this.warnings = warnings;
  }
}
