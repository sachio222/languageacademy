/**
 * Time & Frequency Adverbs
 * Essential words: now, always, never, today, tomorrow, yesterday
 * Critical for expressing when things happen!
 */

export const timeAdverbs = {
  moduleKey: "2024-04-01-time-adverbs", // Permanent identifier - never changes
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
    { french: "pour toujours", english: "forever", note: "for all time" },
    { french: "souvent", english: "often", note: "frequently" },
    { french: "parfois", english: "sometimes", note: "occasionally" },
    {
      french: "de temps en temps",
      english: "from time to time",
      note: "occasionally",
    },
    { french: "rarement", english: "rarely", note: "not often" },
    { french: "très rarement", english: "very rarely", note: "almost never" },
    { french: "jamais", english: "never (with ne)", note: "0% of the time" },
    { french: "déjà", english: "already", note: "by now, before this time" },
    {
      french: "encore",
      english: "still",
      note: "continuing, not yet finished",
    },
    { french: "juste", english: "just", note: "only, simply" },
    { french: "maintenant", english: "now", note: "present time" },
    { french: "aujourd'hui", english: "today", note: "this day" },
    { french: "demain", english: "tomorrow", note: "next day" },
    { french: "hier", english: "yesterday", note: "previous day" },
    {
      french: "avant-hier",
      english: "the day before yesterday",
      note: "two days ago",
    },
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
        instruction: "Say 'the day before yesterday'",
        prompt: "the day before yesterday",
        hint: "avant + hier (before yesterday)",
        expectedAnswer: "avant-hier",
        wrongAnswers: [
          {
            answer: "hier",
            feedback:
              "That's just 'yesterday' - use 'avant-hier' for the day before yesterday",
          },
        ],
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
      {
        instruction: "Say 'forever'",
        prompt: "forever",
        hint: "pour + toujours (for always)",
        expectedAnswer: "pour toujours",
        wrongAnswers: [
          {
            answer: "toujours",
            feedback: "That's 'always' - use 'pour toujours' for forever",
          },
        ],
      },
      {
        instruction: "Say 'often'",
        prompt: "often",
        hint: "Frequency adverb - happens frequently",
        expectedAnswer: "souvent",
        wrongAnswers: [
          {
            answer: "toujours",
            feedback: "That's 'always' - use 'souvent' for often",
          },
          {
            answer: "rarement",
            feedback: "That's 'rarely' - opposite of often",
          },
        ],
      },
      {
        instruction: "Say 'sometimes'",
        prompt: "sometimes",
        hint: "Occasionally - not always, not never",
        expectedAnswer: "parfois",
        wrongAnswers: [
          {
            answer: "souvent",
            feedback: "That's 'often' - use 'parfois' for sometimes",
          },
          {
            answer: "toujours",
            feedback: "That's 'always' - use 'parfois' for sometimes",
          },
        ],
      },
      {
        instruction: "Say 'from time to time'",
        prompt: "from time to time",
        hint: "de temps en temps - occasionally",
        expectedAnswer: "de temps en temps",
        wrongAnswers: [
          {
            answer: "parfois",
            feedback:
              "Both mean similar things, but use 'de temps en temps' for this phrase",
          },
        ],
      },
      {
        instruction: "Say 'rarely'",
        prompt: "rarely",
        hint: "Not often - infrequent",
        expectedAnswer: "rarement",
        wrongAnswers: [
          {
            answer: "souvent",
            feedback: "That's 'often' - opposite of rarely",
          },
          {
            answer: "jamais",
            feedback: "That's 'never' - use 'rarement' for rarely",
          },
        ],
      },
      {
        instruction: "Say 'very rarely'",
        prompt: "very rarely",
        hint: "très + rarement",
        expectedAnswer: "très rarement",
        wrongAnswers: [
          {
            answer: "rarement",
            feedback: "That's just 'rarely' - add 'très' for very rarely",
          },
        ],
      },
      {
        instruction: "Say 'I go often'",
        prompt: "I go often",
        hint: "je vais + souvent",
        expectedAnswer: "je vais souvent",
        wrongAnswers: [
          {
            answer: "je vais toujours",
            feedback: "That's 'I always go' - use 'souvent' for often",
          },
        ],
      },
      {
        instruction: "Say 'he speaks rarely'",
        prompt: "he speaks rarely",
        hint: "il parle + rarement",
        expectedAnswer: "il parle rarement",
        wrongAnswers: [
          {
            answer: "il parle souvent",
            feedback: "That's 'he speaks often' - use 'rarement' for rarely",
          },
        ],
      },
      {
        instruction: "Say 'I eat sometimes'",
        prompt: "I eat sometimes",
        hint: "je mange + parfois",
        expectedAnswer: "je mange parfois",
        wrongAnswers: [
          {
            answer: "je mange toujours",
            feedback: "That's 'I always eat' - use 'parfois' for sometimes",
          },
        ],
      },
      {
        instruction: "Say 'already'",
        prompt: "already",
        hint: "By now, before this time",
        expectedAnswer: "déjà",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'still'",
        prompt: "still",
        hint: "Continuing, not yet finished",
        expectedAnswer: "encore",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'just'",
        prompt: "just",
        hint: "Only, simply",
        expectedAnswer: "juste",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'I just want this'",
        prompt: "I just want this",
        hint: "je veux + juste + ça",
        expectedAnswer: "je veux juste ça",
        wrongAnswers: [],
      },
    ],
  },
};
