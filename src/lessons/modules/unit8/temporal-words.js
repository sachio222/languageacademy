/**
 * Module: Temporal & Sequential Words
 * Unit 8 - Daily Life & Actions
 * CRITICAL: These words have been used in readings but never formally taught!
 * Essential for storytelling and sequencing actions
 */

export const temporalWordsModule = {
  title: "Temporal & Sequential Words - Time & Order",
  description:
    "Organize actions in time: pendant (during), avant (before), après (after), d'abord (first), ensuite (then), finalement (finally)",

  concepts: [
    {
      term: "Temporal Prepositions",
      definition:
        "Words that show when or for how long something happens - used with nouns",
      example:
        "pendant des heures (for hours), avant le cours (before class), après le dîner (after dinner)",
    },
    {
      term: "Sequential Connectors",
      definition:
        "Words that show the order of actions - connect sentences smoothly",
      example:
        "D'abord, je mange. Ensuite, je pars. Finalement, j'arrive. (First, I eat. Then, I leave. Finally, I arrive.)",
    },
    {
      term: "Building Smooth Narratives",
      definition:
        "Use these words to tell stories and describe routines naturally",
      example:
        "Before: 'Je mange. Je pars.' (choppy) After: 'D'abord, je mange. Ensuite, je pars.' (smooth!)",
    },
    {
      term: "Position in Sentence",
      definition:
        "Sequential connectors usually start sentences. Prepositions go before nouns.",
      example:
        "D'abord, je pars (First, I leave). Je pars après le cours (I leave after class).",
    },
  ],

  vocabularyReference: [
    {
      french: "pendant",
      english: "during / for",
      note: "duration - pendant une heure",
    },
    {
      french: "avant",
      english: "before",
      note: "time - avant le cours",
    },
    {
      french: "après",
      english: "after / afterwards",
      note: "sequence - après le dîner",
    },
    {
      french: "depuis",
      english: "since / for",
      note: "duration from past - depuis trois ans",
    },
    {
      french: "d'abord",
      english: "first / first of all",
      note: "⭐ starts sequences",
    },
    {
      french: "ensuite",
      english: "then / next",
      note: "⭐ continues sequence",
    },
    {
      french: "puis",
      english: "then",
      note: "another word for 'then'",
    },
    {
      french: "après",
      english: "after / afterwards",
      note: "can be connector or preposition",
    },
    {
      french: "finalement",
      english: "finally",
      note: "⭐ ends sequence",
    },
    {
      french: "enfin",
      english: "at last / finally",
      note: "relief or conclusion",
    },
  ],

  exercises: [
    {
      id: "temporal.1",
      instruction: "Say 'during' or 'for (a duration)'",
      prompt: "during / for",
      hint: "Temporal preposition - pendant une heure",
      expectedAnswer: "pendant",
      wrongAnswers: [
        {
          answer: "pour",
          feedback:
            "Use 'pendant' for duration, 'pour' is for purpose/recipient",
        },
      ],
    },
    {
      id: "temporal.2",
      instruction: "Say 'before'",
      prompt: "before",
      hint: "Temporal preposition - opposite of après",
      expectedAnswer: "avant",
      wrongAnswers: [
        {
          answer: "après",
          feedback: "That's 'after', not 'before'!",
        },
      ],
    },
    {
      id: "temporal.3",
      instruction: "Say 'after'",
      prompt: "after",
      hint: "Temporal word - opposite of avant",
      expectedAnswer: "après",
      wrongAnswers: [
        {
          answer: "avant",
          feedback: "That's 'before', not 'after'!",
        },
      ],
    },
    {
      id: "temporal.4",
      instruction: "Say 'since' or 'for (time period from past)'",
      prompt: "since / for",
      hint: "depuis - duration from a point in the past",
      expectedAnswer: "depuis",
      wrongAnswers: [],
    },
    {
      id: "temporal.5",
      instruction: "Say 'first' or 'first of all' (to start a sequence)",
      prompt: "first / first of all",
      hint: "Starts a sequence - d'...",
      expectedAnswer: "d'abord",
      wrongAnswers: [],
    },
    {
      id: "temporal.6",
      instruction: "Say 'then' or 'next'",
      prompt: "then / next",
      hint: "Continues a sequence - most common word",
      expectedAnswer: "ensuite",
      wrongAnswers: [
        {
          answer: "puis",
          feedback: "That also works, but 'ensuite' is more common",
        },
      ],
    },
    {
      id: "temporal.7",
      instruction: "Say 'finally'",
      prompt: "finally",
      hint: "Ends a sequence - finalement",
      expectedAnswer: "finalement",
      wrongAnswers: [
        {
          answer: "enfin",
          feedback:
            "That also means 'finally', but 'finalement' is more common",
        },
      ],
    },
    {
      id: "temporal.8",
      instruction: "Say 'First, I eat'",
      prompt: "First, I eat",
      hint: "D'abord + comma + je mange",
      expectedAnswer: "d'abord, je mange",
      wrongAnswers: [],
    },
    {
      id: "temporal.9",
      instruction: "Say 'Then, I leave'",
      prompt: "Then, I leave",
      hint: "Ensuite + comma + je pars",
      expectedAnswer: "ensuite, je pars",
      wrongAnswers: [],
    },
    {
      id: "temporal.10",
      instruction: "Say 'Before class, I study'",
      prompt: "Before class, I study",
      hint: "Avant + le cours + comma + j'étudie",
      expectedAnswer: "avant le cours, j'étudie",
      wrongAnswers: [],
    },
    {
      id: "temporal.11",
      instruction: "Say 'After class, I review'",
      prompt: "After class, I review",
      hint: "Après + le cours + comma + je révise",
      expectedAnswer: "après le cours, je révise",
      wrongAnswers: [],
    },
    {
      id: "temporal.12",
      instruction: "Say 'For an hour' or 'During an hour'",
      prompt: "for an hour",
      hint: "pendant + une heure",
      expectedAnswer: "pendant une heure",
      wrongAnswers: [],
    },
  ],
};
