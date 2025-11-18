/**
 * Dynamic Module (ID assigned automatically based on pedagogical position): Combining Everything - Real Sentences!
 * Put it all together: "He has it", "It's hers", "Is that his?"
 */

export const module10_combining = {
  moduleKey: "2024-02-02-combining", // Permanent identifier - never changes
  // id and module number are set dynamically
  title: "Putting It Together - Who Has What?",
  description:
    "Combine everything you've learned: 'He has it', 'Is that yours?', 'It's theirs' - real French!",

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Combine object pronouns and possessives in sentences",
      "Say 'He has it', 'I want it', 'It's mine' naturally",
      "Form complex sentences with movement, possession, and objects"
    ],
    realWorldUse: "have sophisticated conversations about ownership",
    milestone: "Complex sentence mastery",
    nextModuleTeaser: "Test your comprehension with cultural reading"
  },

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
    { french: "il l'a", english: "he has it", note: "l' = le/la (avoir)" },
    { french: "elle l'a", english: "she has it", note: "l' = le/la (avoir)" },
    {
      french: "ils les ont",
      english: "they have them",
      note: "plural (avoir)",
    },
    { french: "je le veux", english: "I want it", note: "vouloir + object" },
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
    {
      french: "tu viens avec moi",
      english: "you are coming with me",
      note: "venir + preposition",
    },
    {
      french: "il va partir",
      english: "he's going to leave",
      note: "aller + infinitive",
    },
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
            answer: "c'est le tien ?",
            feedback:
              "For questions, use: est-ce (not c'est). However, it is OK to use in spoken french",
          },
        ],
      },
      {
        instruction:
          "Ask if something belongs to a third person (masculine thing)",
        prompt: "Is it his? (masculine thing)",
        hint: "Question form: est-ce + possessive pronoun for his/her",
        expectedAnswer: "est-ce le sien",
        wrongAnswers: [
          {
            answer: "c'est le sien ?",
            feedback:
              "For questions, use: est-ce (not c'est). However, it is OK to use in spoken french",
          },
        ],
      },
      {
        instruction:
          "Ask if something belongs to a third person (feminine thing)",
        prompt: "Is that hers? (feminine thing)",
        hint: "Question form: est-ce possessive pronoun for his/her",
        expectedAnswer: "est-ce la sienne",
        wrongAnswers: [
          {
            answer: "c'est la sienne ?",
            feedback:
              "For questions, use: est-ce (not c'est). However, it is OK to use in spoken french",
          },
        ],
      },
      {
        instruction:
          "Say you want something using object pronoun (vouloir + object)",
        prompt: "I want it",
        hint: "Combine vouloir from M12 + object pronoun BEFORE verb",
        expectedAnswer: "je le veux",
        acceptableAnswers: ["je le veux ?", "je la veux"],
        wrongAnswers: [
          {
            answer: "je veux le",
            feedback: "Object pronoun goes BEFORE: je LE veux",
          },
          {
            answer: "je veux la",
            feedback: "Object pronoun goes BEFORE: je LE veux",
          },
          {
            answer: "je veux ça",
            feedback: "Use object pronoun 'le' or 'la', not ça",
          },
        ],
      },
      {
        instruction: "Tell your friend to come with you (venir + preposition)",
        prompt: "you are coming with me. (informal)",
        hint: "Combine venir (M17) + avec (M14) + moi",
        expectedAnswer: "tu viens avec moi",
        wrongAnswers: [
          {
            answer: "tu vas avec moi",
            feedback: "Use venir (come), not aller (go)",
          },
          {
            answer: "vous venez avec moi",
            feedback:
              "vous is correct for 'you' (formal/plural), not 'tu' (informal)",
          },
        ],
      },
      {
        instruction: "Say he's going to leave (aller + infinitive)",
        prompt: "he's going to leave",
        hint: "Combine aller (M18) + partir infinitive (M19) - future construction!",
        expectedAnswer: "il va partir",
        wrongAnswers: [
          {
            answer: "il part",
            feedback: "Use 'va partir' to express future intention",
          },
          {
            answer: "il vient partir",
            feedback: "Use aller (va), not venir",
          },
        ],
      },
    ],
  },
};
