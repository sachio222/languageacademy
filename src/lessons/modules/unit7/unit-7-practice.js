/**
 * Unit 7 Practice - Fill in the blank exercise
 * Typeform-style interactive sentence completion covering Unit 7 material
 * Covers: on, cognitive verbs (étudier, apprendre, comprendre, savoir, connaître, penser, croire), discourse markers, modifiers
 */

export const unit7Practice = {
  moduleKey: "2024-05-11-unit-7-practice", // Permanent identifier - never changes
  title: "Unit 7 Practice - Fill in the Blanks",
  description:
    "Complete sentences using cognitive verbs, on, discourse markers, and essential vocabulary from Unit 7!",

  // Special flags - REQUIRED for fill-in-blank modules
  isFillInTheBlank: true,
  skipStudyMode: true,

  // Leave empty - not used for fill-in-blank
  concepts: [
    {
      term: "Cognitive Practice",
      definition:
        "Interactive exercises to master the essential verbs for expressing knowledge, understanding, and learning",
      example:
        "Practice on comprend, je pense, tu sais, il connaît, nous apprenons, vous enseignez, ils étudient",
    },
    {
      term: "Knowledge Verb Mastery",
      definition:
        "Build fluency with the cognitive verbs through varied learning contexts",
      example:
        "comprendre (understand) + penser (think) + savoir (know facts) + connaître (know people) in academic and cultural contexts",
    },
    {
      term: "Learning Context Integration",
      definition:
        "Learn to use cognitive verbs naturally in educational and cultural situations",
      example:
        "on apprend le français, nous comprenons la culture, je sais que, tu connais le professeur, il pense à l'examen",
    },
  ],
  vocabularyReference: [],
  exercises: [],

  sentences: [
    // on pronoun
    {
      text: "  doit étudier le français.",
      instruction: "Complete: 'We must study French' (using on)",
      blanks: [
        {
          position: 0,
          answer: "on",
          hint: "informal 'we' - uses il/elle verb forms",
        },
      ],
    },
    {
      text: "  y va?",
      instruction: "Complete: 'Shall we go?' (using on)",
      blanks: [
        {
          position: 0,
          answer: "on",
          hint: "very common phrase with on",
        },
      ],
    },

    // étudier
    {
      text: "J'  le français à l'université.",
      instruction: "Complete: 'I study French at university'",
      blanks: [
        {
          position: 2,
          answer: "étudie",
          hint: "étudier conjugated for je",
        },
      ],
    },

    // réviser
    {
      text: "Je  mes leçons.",
      instruction: "Complete: 'I review my lessons'",
      blanks: [
        {
          position: 3,
          answer: "révise",
          hint: "réviser conjugated for je",
        },
      ],
    },

    // apprendre
    {
      text: "Tu  le français.",
      instruction: "Complete: 'You're learning French'",
      blanks: [
        {
          position: 3,
          answer: "apprends",
          hint: "apprendre conjugated for tu",
        },
      ],
    },

    // comprendre
    {
      text: "Je ne  pas.",
      instruction: "Complete: 'I don't understand'",
      blanks: [
        {
          position: 6,
          answer: "comprends",
          hint: "comprendre conjugated for je",
        },
      ],
    },
    {
      text: "Tu ?",
      instruction: "Complete: 'Do you understand?'",
      blanks: [
        {
          position: 3,
          answer: "comprends",
          hint: "comprendre for tu in a question",
        },
      ],
    },

    // savoir
    {
      text: "Je ne  pas.",
      instruction: "Complete: 'I don't know' (most common phrase!)",
      blanks: [
        {
          position: 6,
          answer: "sais",
          hint: "savoir conjugated for je - rank 21!",
        },
      ],
    },
    {
      text: "Je  parler français.",
      instruction: "Complete: 'I know how to speak French'",
      blanks: [
        {
          position: 3,
          answer: "sais",
          hint: "savoir + infinitive for skills",
        },
      ],
    },

    // connaître
    {
      text: "Je  Paris.",
      instruction: "Complete: 'I know Paris'",
      blanks: [
        {
          position: 3,
          answer: "connais",
          hint: "connaître for places - NOT savoir!",
        },
      ],
    },
    {
      text: "Tu  Marie?",
      instruction: "Complete: 'Do you know Marie?'",
      blanks: [
        {
          position: 3,
          answer: "connais",
          hint: "connaître for people - NOT savoir!",
        },
      ],
    },

    // penser
    {
      text: "Je  que c'est bon.",
      instruction: "Complete: 'I think it's good'",
      blanks: [
        {
          position: 3,
          answer: "pense",
          hint: "penser conjugated for je",
        },
      ],
    },
    {
      text: "Qu'est-ce que tu ?",
      instruction: "Complete: 'What do you think?'",
      blanks: [
        {
          position: 17,
          answer: "penses",
          hint: "penser conjugated for tu",
        },
      ],
    },

    // croire
    {
      text: "Je  que oui.",
      instruction: "Complete: 'I believe so'",
      blanks: [
        {
          position: 3,
          answer: "crois",
          hint: "croire conjugated for je",
        },
      ],
    },
    {
      text: "On doit  en soi.",
      instruction: "Complete: 'We must believe in ourselves'",
      blanks: [
        {
          position: 8,
          answer: "croire",
          hint: "infinitive form after doit",
        },
      ],
    },

    // Multiple verbs - distinguish savoir vs connaître
    {
      text: "Je  la réponse mais je ne  pas Paris.",
      instruction: "Complete: 'I know the answer but I don't know Paris'",
      blanks: [
        {
          position: 3,
          answer: "sais",
          hint: "savoir for facts",
        },
        {
          position: 29,
          answer: "connais",
          hint: "connaître for places",
        },
      ],
    },

    // Discourse markers - donc
    {
      text: "Je pense,  je suis.",
      instruction: "Complete: 'I think, therefore I am' (Descartes)",
      blanks: [
        {
          position: 10,
          answer: "donc",
          hint: "therefore / so",
        },
      ],
    },

    // en fait
    {
      text: ", je ne sais pas.",
      instruction: "Complete: 'Actually, I don't know'",
      blanks: [
        {
          position: 0,
          answer: "en fait",
          hint: "discourse marker: actually / in fact",
        },
      ],
    },

    // Knowledge nouns
    {
      text: "J'ai une .",
      instruction: "Complete: 'I have a question'",
      blanks: [
        {
          position: 9,
          answer: "question",
          hint: "feminine noun",
        },
      ],
    },
    {
      text: "C'est une bonne .",
      instruction: "Complete: 'That's a good idea'",
      blanks: [
        {
          position: 16,
          answer: "idée",
          hint: "feminine noun - idea",
        },
      ],
    },

    // tout le monde
    {
      text: "  peut apprendre.",
      instruction: "Complete: 'Everyone can learn'",
      blanks: [
        {
          position: 0,
          answer: "tout le monde",
          hint: "fixed expression - everyone",
        },
      ],
    },

    // même
    {
      text: " moi, je sais.",
      instruction: "Complete: 'Even I know'",
      blanks: [
        {
          position: 0,
          answer: "même",
          hint: "emphasis - even",
        },
      ],
    },

    // mal
    {
      text: "Je comprends .",
      instruction: "Complete: 'I understand poorly'",
      blanks: [
        {
          position: 14,
          answer: "mal",
          hint: "adverb - opposite of bien",
        },
      ],
    },

    // Complex - multiple blanks with on + cognitive verb
    {
      text: "  que tout le monde peut .",
      instruction: "Complete: 'We think that everyone can learn'",
      blanks: [
        {
          position: 0,
          answer: "on pense",
          hint: "on + penser",
        },
        {
          position: 32,
          answer: "apprendre",
          hint: "infinitive after peut",
        },
      ],
    },
  ],
};
