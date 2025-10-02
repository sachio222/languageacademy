/**
 * Module 10: Combining Everything - Real Sentences!
 * Put it all together: "He has it", "It's hers", "Is that his?"
 */

export const module10_combining = {
  // id and module number are set dynamically
  title: "Putting It Together - Real Conversations!",
  description:
    "Combine everything you've learned: 'He has it', 'Is that yours?', 'It's theirs' - real French!",

  concepts: [
    {
      term: "Sentence Building",
      definition:
        "Combine subject + verb + object/possessive to make real sentences",
      example: "Use everything from previous 9 modules together!",
    },
    {
      term: "Object Pronoun Placement",
      definition:
        "Object pronouns go BEFORE the verb in French (opposite of English!)",
      example: "English: 'I see IT', French: 'I IT see' - pronoun comes first",
    },
    {
      term: "Possessive Constructions",
      definition: "Multiple ways to express ownership in French",
      example: "Choose between possessive adjectives and possessive pronouns",
    },
  ],

  vocabularyReference: [
    { french: "il l'a", english: "he has it", note: "l' = le/la" },
    { french: "elle l'a", english: "she has it", note: "l' = le/la" },
    { french: "ils les ont", english: "they have them", note: "plural" },
    { french: "c'est le mien", english: "it's mine", note: "masculine thing" },
    {
      french: "c'est le sien",
      english: "it's his/hers",
      note: "masculine thing",
    },
    {
      french: "c'est le leur",
      english: "it's theirs",
      note: "masculine thing",
    },
    { french: "est-ce le tien", english: "is it yours?", note: "question" },
    { french: "est-ce le sien", english: "is it his/hers?", note: "question" },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction:
          "Someone asks about an object. Confirm the person possesses it",
        prompt: "He has it",
        hint: "Object pronoun goes BEFORE verb. Use contracted form with apostrophe",
        expectedAnswer: "il l'a",
        wrongAnswers: [
          {
            answer: "il a le",
            feedback: "Object pronoun goes BEFORE verb: il L'a",
          },
          { answer: "il a ça", feedback: "Use object pronoun, not ça here" },
        ],
      },
      {
        instruction: "Confirm a woman possesses something concisely",
        prompt: "She has it",
        hint: "Same pattern - object pronoun before verb",
        expectedAnswer: "elle l'a",
        wrongAnswers: [
          { answer: "elle a le", feedback: "Object pronoun goes BEFORE verb" },
        ],
      },
      {
        instruction:
          "A group possesses multiple objects. Use pronouns for both",
        prompt: "They have them",
        hint: "Masculine 'they' + plural object pronoun + avoir",
        expectedAnswer: "ils les ont",
        wrongAnswers: [
          {
            answer: "ils ont les",
            feedback: "Object pronoun goes BEFORE verb",
          },
        ],
      },
      {
        instruction:
          "Someone asks whose book it is. Claim ownership of it (masculine)",
        prompt: "It's mine (masculine thing)",
        hint: "Use possessive pronoun (not adjective) with article",
        expectedAnswer: "c'est le mien",
        wrongAnswers: [
          { answer: "c'est mien", feedback: "Need article: c'est LE mien" },
          {
            answer: "c'est mon",
            feedback: "Use possessive pronoun, not adjective",
          },
        ],
      },
      {
        instruction:
          "Identify ownership of something belonging to him/her (masculine thing)",
        prompt: "It's his/hers (masculine thing)",
        hint: "Possessive pronoun for his/her with masculine article",
        expectedAnswer: "c'est le sien",
        wrongAnswers: [
          {
            answer: "c'est son",
            feedback: "Use possessive pronoun, not adjective",
          },
        ],
      },
      {
        instruction:
          "Identify something as belonging to a group (masculine thing)",
        prompt: "It's theirs (masculine thing)",
        hint: "Possessive pronoun for 'their' with masculine article",
        expectedAnswer: "c'est le leur",
        wrongAnswers: [
          { answer: "c'est leur", feedback: "Need article: c'est LE leur" },
        ],
      },
      {
        instruction:
          "Ask a friend if something belongs to them (masculine thing)",
        prompt: "Is it yours? (masculine thing, informal)",
        hint: "Question form: est-ce + possessive pronoun (informal, masculine)",
        expectedAnswer: "est-ce le tien",
        wrongAnswers: [
          {
            answer: "c'est le tien",
            feedback: "For questions, use: est-ce (not c'est)",
          },
        ],
      },
      {
        instruction:
          "Ask if something belongs to a third person (masculine thing)",
        prompt: "Is that his? (masculine thing)",
        hint: "Question form: est-ce + possessive pronoun for his/her",
        expectedAnswer: "est-ce le sien",
        wrongAnswers: [],
      },
    ],
  },
};
