// Build an Issue, filling defaults. severity defaults to 'error'.
export function issue(fields) {
  return { severity: 'error', ...fields };
}
