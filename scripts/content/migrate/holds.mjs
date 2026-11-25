// Source exercises kept out of the converted files until Jake decides them (the "Needs Jake" list in
// content/fr/migration-report.md). Each names the module, the exercise's place in today's source and its answer,
// so a changed source stops the run instead of holding the wrong exercise.
// { module_key, ref, answer, reason }
export const HOLDS = [
  {
    module_key: '2024-01-27-aller',
    ref: 'exerciseConfig.items[19]',
    answer: "qu'est-ce que tu vas avoir?",
    reason:
      "\"qu'est-ce que tu as?\" is both an accepted answer and a mistake (\"This needs aller!\"); the live checker accepts it. Which is right: accept it, or mark it wrong?",
  },
];
