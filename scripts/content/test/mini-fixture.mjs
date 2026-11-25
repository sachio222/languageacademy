// Reads the hand-written mini course in fixtures/mini as data, for tests that change it in memory.
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const MINI_ROOT = fileURLToPath(new URL('./fixtures/mini/', import.meta.url));
export const OUTLINE_FILE = 'mini/course.json';

export function miniOutline() {
  return JSON.parse(readFileSync(MINI_ROOT + 'course.json', 'utf8'));
}

// { file, text } per module, named mini/modules/<key>.json, in name order.
export function miniFiles() {
  return readdirSync(MINI_ROOT + 'modules')
    .filter((n) => n.endsWith('.json'))
    .sort()
    .map((n) => ({ file: `mini/modules/${n}`, text: readFileSync(MINI_ROOT + 'modules/' + n, 'utf8') }));
}

export function miniModule(key) {
  return JSON.parse(readFileSync(`${MINI_ROOT}modules/${key}.json`, 'utf8'));
}

export const MINI_KEYS = {
  lesson: '2024-01-02-etre',
  reading: 'reading-cafe',
  guide: 'questions-help',
  practice: 'practice-etre',
  unit_exam: 'exam-places',
  reference: '2024-04-01-alphabet',
};
