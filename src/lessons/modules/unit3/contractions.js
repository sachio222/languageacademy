/**
 * Contractions & Partitive Articles
 * Essential combinations: du, de la, de l', au, à la, à l'
 * Uses "de" and "à" from prepositions module
 */

export const contractions = {
  moduleKey: "2024-01-25-contractions", // Permanent identifier - never changes
  title: "Contractions - du, au, de la, à la",
  description:
    "Learn how 'de' and 'à' combine with articles! Simple rules that make French flow naturally.",

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Use contractions naturally (du, au, de la, à la)",
      "Say 'some bread', 'at the café', 'of the book' in French",
      "Make your French flow smoothly with proper contractions"
    ],
    realWorldUse: "speak French that sounds natural and fluid",
    nextModuleTeaser: "Master movement verbs like venir and aller"
  },

  concepts: [
    {
      term: "Contractions with 'de' (of/from)",
      definition: "de + le = du, de + les = des (but de + la stays separate!)",
      example:
        "du chat (of the cat), de la maison (of the house), des livres (of the books)",
    },
    {
      term: "Contractions with 'à' (to/at)",
      definition: "à + le = au, à + les = aux (but à + la stays separate!)",
      example:
        "au café (at the café), à la maison (at the house), aux amis (to the friends)",
    },
    {
      term: "Partitive Articles (some/any)",
      definition:
        "Use du/de la/de l'/des to mean 'some' (unspecified quantity)",
      example:
        "du pain (some bread), de la viande (some meat), de l'eau (some water)",
    },
    {
      term: "Before Vowels",
      definition:
        "de + l' and à + l' before vowel sounds (no contraction needed)",
      example: "de l'ami (of the friend), à l'école (at the school)",
    },
  ],

  vocabularyReference: [
    {
      french: "du",
      english: "of/from the (masc)",
      note: "de + le = du (masculine)",
    },
    {
      french: "de la",
      english: "of/from the (fem)",
      note: "no contraction (feminine)",
    },
    { french: "de l'", english: "of/from the (vowel)", note: "before vowel" },
    {
      french: "des",
      english: "of/from the (plural)",
      note: "de + les = des (plural)",
    },
    {
      french: "au",
      english: "to/at the (masc)",
      note: "à + le = au (masculine) - section divider",
    },
    {
      french: "à la",
      english: "to/at the (fem)",
      note: "no contraction (feminine)",
    },
    { french: "à l'", english: "to/at the (vowel)", note: "before vowel" },
    {
      french: "aux",
      english: "to/at the (plural)",
      note: "à + les = aux (plural)",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Combine 'de' + 'le chat' (of the cat)",
        prompt: "of the cat (masculine)",
        hint: "de + le contracts to 'du'",
        expectedAnswer: "du chat",
        wrongAnswers: [
          {
            answer: "de le chat",
            feedback: "de + le must contract to 'du'",
          },
          {
            answer: "de la chat",
            feedback: "chat is masculine, and de + le = du",
          },
        ],
      },
      {
        instruction: "Combine 'de' + 'la maison' (of the house)",
        prompt: "of the house (feminine)",
        hint: "de + la does NOT contract - stays separate",
        expectedAnswer: "de la maison",
        wrongAnswers: [
          {
            answer: "du maison",
            feedback: "maison is feminine, use 'de la' not 'du'",
          },
        ],
      },
      {
        instruction: "Combine 'de' + 'les livres' (of the books)",
        prompt: "of the books (plural)",
        hint: "de + les contracts to 'des'",
        expectedAnswer: "des livres",
        wrongAnswers: [
          {
            answer: "de les livres",
            feedback: "de + les must contract to 'des'",
          },
        ],
      },
      {
        instruction: "Combine 'de' + 'l'ami' (of the friend - vowel)",
        prompt: "of the friend (starts with vowel)",
        hint: "de + l' stays as is before vowel",
        expectedAnswer: "de l'ami",
        wrongAnswers: [
          {
            answer: "du ami",
            feedback: "Before vowels, use 'de l'' not 'du'",
          },
        ],
      },
      {
        instruction: "Combine 'à' + 'le café' (to/at the café)",
        prompt: "to the café (masculine)",
        hint: "à + le contracts to 'au'",
        expectedAnswer: "au café",
        wrongAnswers: [
          {
            answer: "à le café",
            feedback: "à + le must contract to 'au'",
          },
        ],
      },
      {
        instruction: "Combine 'à' + 'la maison' (to/at the house)",
        prompt: "to the house (feminine)",
        hint: "à + la does NOT contract - stays separate",
        expectedAnswer: "à la maison",
        wrongAnswers: [
          {
            answer: "au maison",
            feedback: "maison is feminine, use 'à la' not 'au'",
          },
        ],
      },
      {
        instruction: "Combine 'à' + 'les amis' (to the friends)",
        prompt: "to the friends (plural)",
        hint: "à + les contracts to 'aux'",
        expectedAnswer: "aux amis",
        wrongAnswers: [
          {
            answer: "à les amis",
            feedback: "à + les must contract to 'aux'",
          },
        ],
      },
      {
        instruction: "Say 'I am at the café'",
        prompt: "I am at the café",
        hint: "je suis + à + le café (contracts!)",
        expectedAnswer: "je suis au café",
        wrongAnswers: [
          {
            answer: "je suis à le café",
            feedback: "à + le must contract to 'au'",
          },
        ],
      },
      {
        instruction: "Say 'the cat is at the house'",
        prompt: "the cat is at the house",
        hint: "le chat + est + à la maison",
        expectedAnswer: "le chat est à la maison",
        wrongAnswers: [
          {
            answer: "le chat est au maison",
            feedback: "maison is feminine, use 'à la' not 'au'",
          },
        ],
      },
      {
        instruction: "Say 'I am with the friends'",
        prompt: "I am with the friends",
        hint: "je suis + avec + les amis (avec doesn't contract!)",
        expectedAnswer: "je suis avec les amis",
        wrongAnswers: [
          {
            answer: "je suis aux amis",
            feedback: "avec doesn't contract - use 'avec les amis'",
          },
        ],
      },
    ],
  },
};
