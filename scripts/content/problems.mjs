// A Problem is one thing wrong in one content file. ContentError carries a list of them.
export function problem(file, path, code, message) {
  return { file, path, code, message };
}

export class ContentError extends Error {
  constructor(problems) {
    super(problems.map((p) => `${p.file}:${p.path} ${p.code} ${p.message}`).join('\n'));
    this.name = 'ContentError';
    this.problems = problems;
  }
}
