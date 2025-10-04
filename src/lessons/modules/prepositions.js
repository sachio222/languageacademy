/**
 * Prepositions Module
 * Essential prepositions: avec, dans, sur, à, de, pour
 * Critical connectors for real French sentences
 */

export const prepositions = {
  // id and module number are set dynamically
  title: "Prepositions - With, In, On, To",
  description:
    "Connect words together! Combine with stressed pronouns: 'avec moi' (with me), 'pour toi' (for you) - essential for real sentences.",

  concepts: [
    {
      term: "Prepositions Connect Ideas",
      definition:
        "Small words that show relationships between nouns and pronouns",
      example:
        "avec moi (with me), dans la maison (in the house), pour toi (for you)",
    },
    {
      term: "Use with Stressed Pronouns!",
      definition: "After prepositions, use moi/toi/lui (NOT je/tu/il)!",
      example: "avec moi ✓ (not avec je ✗), pour toi ✓ (not pour tu ✗)",
    },
    {
      term: "High Frequency",
      definition: "These 6 prepositions are extremely common!",
      example: "You'll use these in almost every sentence",
    },
    {
      term: "Building Real Sentences",
      definition: "Combine with verbs, nouns, and stressed pronouns",
      example: "je suis avec toi (I am with you), le chat est dans la maison",
    },
  ],

  vocabularyReference: [
    { french: "avec", english: "with", note: "with friends, with you" },
    { french: "dans", english: "in", note: "in the house, in the car" },
    { french: "sur", english: "on", note: "on the table" },
    { french: "à", english: "to / at", note: "to Paris, at the café" },
    { french: "de", english: "of / from", note: "of the house, from Paris" },
    { french: "pour", english: "for", note: "for you, for friends" },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "You're with someone. Which word means 'with'?",
        prompt: "with",
        hint: "High-frequency preposition for accompaniment",
        expectedAnswer: "avec",
        wrongAnswers: [
          { answer: "dans", feedback: "That means 'in', not 'with'" },
          { answer: "pour", feedback: "That means 'for', not 'with'" },
        ],
      },
      {
        instruction: "Something is inside a space. Which word means 'in'?",
        prompt: "in",
        hint: "Preposition for being inside something",
        expectedAnswer: "dans",
        wrongAnswers: [
          { answer: "sur", feedback: "That means 'on', not 'in'" },
          { answer: "avec", feedback: "That means 'with', not 'in'" },
        ],
      },
      {
        instruction: "Something is on top of a surface. Which word means 'on'?",
        prompt: "on",
        hint: "Preposition for surfaces",
        expectedAnswer: "sur",
        wrongAnswers: [
          { answer: "dans", feedback: "That means 'in', not 'on'" },
        ],
      },
      {
        instruction:
          "You're going somewhere or something belongs to someone. Which word?",
        prompt: "to / at",
        hint: "Single letter - shows direction or location",
        expectedAnswer: "à",
        wrongAnswers: [
          { answer: "de", feedback: "That means 'of/from', not 'to/at'" },
        ],
      },
      {
        instruction:
          "Something belongs to or comes from somewhere. Which word?",
        prompt: "of / from",
        hint: "Shows origin or possession - two letters",
        expectedAnswer: "de",
        wrongAnswers: [
          { answer: "à", feedback: "That means 'to/at', not 'of/from'" },
        ],
      },
      {
        instruction:
          "Something is intended for someone. Which word means 'for'?",
        prompt: "for",
        hint: "Shows purpose or recipient",
        expectedAnswer: "pour",
        wrongAnswers: [
          { answer: "avec", feedback: "That means 'with', not 'for'" },
        ],
      },
      {
        instruction:
          "Say 'I am with friends' - combine pronoun + verb + preposition + noun",
        prompt: "I am with friends",
        hint: "je suis + [with] + les amis",
        expectedAnswer: "je suis avec les amis",
        wrongAnswers: [
          { answer: "je suis les amis", feedback: "Missing 'avec' (with)!" },
        ],
      },
      {
        instruction: "Say 'the cat is in the house'",
        prompt: "the cat is in the house",
        hint: "le chat + est + [in] + la maison",
        expectedAnswer: "le chat est dans la maison",
        wrongAnswers: [
          {
            answer: "le chat est sur la maison",
            feedback: "Use 'dans' (in), not 'sur' (on)",
          },
        ],
      },
      {
        instruction:
          "Say 'the book is on the table' (you haven't learned 'table' - use 'thing')",
        prompt: "the book is on the thing",
        hint: "le livre + est + [on] + la chose",
        expectedAnswer: "le livre est sur la chose",
        wrongAnswers: [
          {
            answer: "le livre est dans la chose",
            feedback: "Use 'sur' (on), not 'dans' (in)",
          },
        ],
      },
      {
        instruction: "Say 'I want this for you' (informal)",
        prompt: "I want this for you",
        hint: "je veux + ça + pour + [stressed pronoun for 'you' informal]",
        expectedAnswer: "je veux ça pour toi",
        wrongAnswers: [
          {
            answer: "je veux ça pour tu",
            feedback:
              "After 'pour', use stressed pronoun 'toi' not subject pronoun 'tu'",
          },
        ],
      },
    ],
  },
};
