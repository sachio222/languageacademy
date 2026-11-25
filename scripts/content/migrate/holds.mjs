// Decisions Jake made about single source exercises, keyed by module, the exercise's place in today's source
// and its answer, so a changed source stops the run instead of applying a decision to the wrong exercise.
//
// HOLDS: kept out of the converted files until Jake decides them (the "Needs Jake" list in the report).
//   { module_key, ref, answer, reason }
// REWRITES: written as Jake ruled, in the exercise's place, because no conversion of today's text fits.
//   { module_key, ref, answer, ruling, item } (item without id; makeItemId gives it one)
export const HOLDS = [];

export const REWRITES = [
  {
    module_key: '2024-05-10-unit-7-exam',
    ref: 'exerciseConfig.items[18]',
    answer: 'facts',
    ruling: 'Jake, 2026-11-25: "When do you use savoir?" as a choice item (its English answers fit no typed item)',
    item: {
      type: 'choice',
      question: 'When do you use {savoir}?',
      options: [
        { text: 'For facts and skills: what you know, and how to do something', right: true },
        { text: 'For people and places you are familiar with' },
        { text: 'For both' },
      ],
      hint: 'Facts or skills, not people or places',
    },
  },
  {
    module_key: '2024-05-10-unit-7-exam',
    ref: 'exerciseConfig.items[23]',
    answer: 'people',
    ruling: 'Jake, 2026-11-25: "When do you use connaître?" as a choice item (its English answers fit no typed item)',
    item: {
      type: 'choice',
      question: 'When do you use {connaître}?',
      options: [
        { text: 'For people, places and things you are familiar with', right: true },
        { text: 'For facts and skills' },
        { text: 'For both' },
      ],
      hint: 'People or places, not facts',
    },
  },
];
