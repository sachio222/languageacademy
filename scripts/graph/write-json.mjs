import { writeFileSync } from 'node:fs';

function sortKeys(value) {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((k) => [k, sortKeys(value[k])]));
  }
  return value;
}

// 2-space indentation, object keys sorted at every depth, trailing newline.
export function writeSortedJson(path, value) {
  writeFileSync(path, JSON.stringify(sortKeys(value), null, 2) + '\n');
}
