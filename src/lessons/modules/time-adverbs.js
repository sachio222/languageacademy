/**
 * Time & Frequency Adverbs
 * Essential words: now, always, never, today, tomorrow, yesterday
 * Ranks 93-98 in top 100 words!
 */

export const timeAdverbs = {
  title: "Time & Frequency - now, always, never, today",
  description:
    "Express when and how often! Add time context to everything you've learned.",

  concepts: [
    {
      term: "Frequency Adverbs",
      definition: "Words that express how often something happens",
      example: "toujours (always), jamais (never)",
    },
    {
      term: "Time Expressions",
      definition: "Words that express when something happens",
      example:
        "maintenant (now), aujourd'hui (today), demain (tomorrow), hier (yesterday)",
    },
    {
      term: "Position in Sentence",
      definition: "Usually placed AFTER the verb in French",
      example: "je vais maintenant (I go now), il a toujours (he always has)",
    },
  ],

  vocabularyReference: [
    { french: "toujours", english: "always", note: "100% of the time" },
    { french: "jamais", english: "never (with ne)", note: "0% of the time" },
    { french: "maintenant", english: "now", note: "present time" },
    { french: "aujourd'hui", english: "today", note: "this day" },
    { french: "demain", english: "tomorrow", note: "next day" },
    { french: "hier", english: "yesterday", note: "previous day" },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Say 'now'",
        prompt: "now",
        hint: "Present moment",
        expectedAnswer: "maintenant",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'today'",
        prompt: "today",
        hint: "This day - literally 'of today'",
        expectedAnswer: "aujourd'hui",
        wrongAnswers: [
          {
            answer: "demain",
            feedback: "That's 'tomorrow', not 'today'",
          },
        ],
      },
      {
        instruction: "Say 'tomorrow'",
        prompt: "tomorrow",
        hint: "Next day",
        expectedAnswer: "demain",
        wrongAnswers: [
          {
            answer: "hier",
            feedback: "That's 'yesterday', not 'tomorrow'",
          },
        ],
      },
      {
        instruction: "Say 'yesterday'",
        prompt: "yesterday",
        hint: "Previous day",
        expectedAnswer: "hier",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'always'",
        prompt: "always",
        hint: "100% of the time",
        expectedAnswer: "toujours",
        wrongAnswers: [
          {
            answer: "jamais",
            feedback: "That's 'never', not 'always'",
          },
        ],
      },
      {
        instruction: "Say 'never' (will use with negation)",
        prompt: "never",
        hint: "0% of the time - used with 'ne'",
        expectedAnswer: "jamais",
        wrongAnswers: [
          {
            answer: "toujours",
            feedback: "That's 'always', not 'never'",
          },
        ],
      },
      {
        instruction: "Say 'I am now'",
        prompt: "I am now",
        hint: "je suis + maintenant",
        expectedAnswer: "je suis maintenant",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'he goes today'",
        prompt: "he goes today",
        hint: "il va + aujourd'hui",
        expectedAnswer: "il va aujourd'hui",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'I want this tomorrow'",
        prompt: "I want this tomorrow",
        hint: "je veux + ça + demain",
        expectedAnswer: "je veux ça demain",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'we are always here'",
        prompt: "we are always here",
        hint: "nous sommes + toujours + ici",
        expectedAnswer: "nous sommes toujours ici",
        wrongAnswers: [],
      },
    ],
  },
};
