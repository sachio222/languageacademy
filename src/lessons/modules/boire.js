/**
 * Module: boire (to drink)
 * Unit 5 - Essential daily verb, irregular conjugation
 * High frequency verb (rank 53) - drinking is universal!
 */

export const boireModule = {
  title: "boire - To Drink (Present & Past)",
  description:
    "Express what you drink: je bois du café (I drink coffee), j'ai bu (I drank/have drunk)",

  concepts: [
    {
      term: "boire = to drink",
      definition: "Essential daily verb - talk about beverages!",
      example:
        "je bois du café (I drink coffee), nous buvons de l'eau (we drink water)",
    },
    {
      term: "Irregular verb - changes stem!",
      definition: "Uses 'boi-' for singular, 'buv-' for plural forms",
      example:
        "je bois, tu bois, il boit BUT nous buvons, vous buvez, ils boivent",
    },
    {
      term: "Passé Composé (Past Tense)",
      definition: "Use avoir + bu to say 'drank' or 'have drunk'",
      example:
        "j'ai bu (I drank/have drunk), tu as bu (you drank), il a bu (he drank)",
    },
    {
      term: "Past Participle: bu (irregular!)",
      definition: "Irregular past participle - NOT 'buvé'!",
      example: "boire → bu (short and irregular)",
    },
    {
      term: "With drink nouns",
      definition:
        "Use partitive (du/de la/de l') for some, or article for specific items",
      example:
        "je bois du café (I drink some coffee), j'ai bu de l'eau (I drank water)",
    },
  ],

  vocabularyReference: [
    {
      french: "boire",
      english: "to drink",
      note: "infinitive form - irregular",
    },
    // Present tense
    {
      french: "je bois",
      english: "I drink",
      note: "present - boi- stem",
    },
    {
      french: "tu bois",
      english: "you drink (informal)",
      note: "present - boi- stem",
    },
    {
      french: "il/elle boit",
      english: "he/she drinks",
      note: "present - boi- stem + t",
    },
    {
      french: "nous buvons",
      english: "we drink",
      note: "present - buv- stem change!",
    },
    {
      french: "vous buvez",
      english: "you drink (formal/plural)",
      note: "present - buv- stem",
    },
    {
      french: "ils/elles boivent",
      english: "they drink",
      note: "present - boi- stem + vent",
    },
    // Passé composé (past tense)
    {
      french: "j'ai bu",
      english: "I drank / I have drunk",
      note: "passé composé - avoir + bu (irregular!)",
    },
    {
      french: "tu as bu",
      english: "you drank (informal)",
      note: "passé composé",
    },
    {
      french: "il/elle a bu",
      english: "he/she drank",
      note: "passé composé",
    },
    {
      french: "nous avons bu",
      english: "we drank",
      note: "passé composé",
    },
    {
      french: "vous avez bu",
      english: "you drank (formal/plural)",
      note: "passé composé",
    },
    {
      french: "ils/elles ont bu",
      english: "they drank",
      note: "passé composé",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: 'Say "I drink coffee"',
        prompt: "I drink coffee",
        hint: "je bois + du café",
        expectedAnswer: "je bois du café",
        acceptableAnswers: ["je bois le café"],
        wrongAnswers: [
          {
            answer: "je boire du café",
            feedback: "Use conjugated form 'bois' not infinitive 'boire'",
          },
          {
            answer: "je buvons du café",
            feedback: "Use 'bois' for je, not 'buvons'",
          },
        ],
      },
      {
        instruction: 'Say "I drink water"',
        prompt: "I drink water",
        hint: "je bois + de l'eau",
        expectedAnswer: "je bois de l'eau",
        acceptableAnswers: ["je bois de l eau", "je bois l'eau"],
        wrongAnswers: [
          {
            answer: "je bois du eau",
            feedback: "eau starts with vowel, use de l'eau not 'du eau'",
          },
        ],
      },
      {
        instruction: 'Say "you drink tea" (informal)',
        prompt: "you drink tea",
        hint: "tu bois + du thé",
        expectedAnswer: "tu bois du thé",
        acceptableAnswers: ["tu bois le thé"],
        wrongAnswers: [
          {
            answer: "tu boit du thé",
            feedback: "Use 'bois' for tu, not 'boit'",
          },
        ],
      },
      {
        instruction: 'Say "you drink wine" (informal)',
        prompt: "you drink wine",
        hint: "tu bois + du vin",
        expectedAnswer: "tu bois du vin",
        acceptableAnswers: ["tu bois le vin"],
        wrongAnswers: [
          {
            answer: "tu buvez du vin",
            feedback: "Use 'bois' for tu, not 'buvez'",
          },
        ],
      },
      {
        instruction: 'Say "he drinks beer"',
        prompt: "he drinks beer",
        hint: "il boit + de la bière",
        expectedAnswer: "il boit de la bière",
        acceptableAnswers: ["il boit la bière", "il boit de la biere"],
        wrongAnswers: [
          {
            answer: "il bois de la bière",
            feedback: "Add -t for il: il boit",
          },
        ],
      },
      {
        instruction: 'Say "she drinks juice"',
        prompt: "she drinks juice",
        hint: "elle boit + du jus",
        expectedAnswer: "elle boit du jus",
        acceptableAnswers: ["elle boit le jus"],
        wrongAnswers: [
          {
            answer: "elle bois du jus",
            feedback: "Add -t for elle: elle boit",
          },
        ],
      },
      {
        instruction: 'Say "we drink water"',
        prompt: "we drink water",
        hint: "nous buvons + de l'eau (stem changes to buv-!)",
        expectedAnswer: "nous buvons de l'eau",
        acceptableAnswers: ["nous buvons de l eau", "nous buvons l'eau"],
        wrongAnswers: [
          {
            answer: "nous bois de l'eau",
            feedback: "Use 'buvons' for nous, not 'bois' - stem changes!",
          },
          {
            answer: "nous boivons de l'eau",
            feedback: "Use 'buvons' for nous, not 'boivons'",
          },
        ],
      },
      {
        instruction: 'Say "we drink coffee"',
        prompt: "we drink coffee",
        hint: "nous buvons + du café",
        expectedAnswer: "nous buvons du café",
        acceptableAnswers: ["nous buvons le café"],
        wrongAnswers: [
          {
            answer: "nous boit du café",
            feedback: "Use 'buvons' for nous, not 'boit'",
          },
        ],
      },
      {
        instruction: 'Say "you drink wine" (formal)',
        prompt: "you drink wine (formal)",
        hint: "vous buvez + du vin (stem changes to buv-!)",
        expectedAnswer: "vous buvez du vin",
        acceptableAnswers: ["vous buvez le vin"],
        wrongAnswers: [
          {
            answer: "vous bois du vin",
            feedback: "Use 'buvez' for vous, not 'bois'",
          },
          {
            answer: "vous boivez du vin",
            feedback: "Use 'buvez' for vous, not 'boivez'",
          },
        ],
      },
      {
        instruction: 'Say "you drink water" (formal)',
        prompt: "you drink water (formal)",
        hint: "vous buvez + de l'eau",
        expectedAnswer: "vous buvez de l'eau",
        acceptableAnswers: ["vous buvez de l eau", "vous buvez l'eau"],
        wrongAnswers: [
          {
            answer: "vous buvons de l'eau",
            feedback: "Use 'buvez' for vous, not 'buvons'",
          },
        ],
      },
      {
        instruction: 'Say "they drink beer"',
        prompt: "they drink beer",
        hint: "ils boivent + de la bière (stem back to boi- + vent!)",
        expectedAnswer: "ils boivent de la bière",
        acceptableAnswers: [
          "elles boivent de la bière",
          "ils boivent la bière",
          "ils boivent de la biere",
        ],
        wrongAnswers: [
          {
            answer: "ils bois de la bière",
            feedback: "Use 'boivent' for ils, not 'bois'",
          },
          {
            answer: "ils boit de la bière",
            feedback: "Use 'boivent' for ils, not 'boit'",
          },
        ],
      },
      {
        instruction: 'Say "they drink tea"',
        prompt: "they drink tea",
        hint: "ils boivent + du thé",
        expectedAnswer: "ils boivent du thé",
        acceptableAnswers: ["elles boivent du thé", "ils boivent le thé"],
        wrongAnswers: [
          {
            answer: "ils buvez du thé",
            feedback: "Use 'boivent' for ils, not 'buvez'",
          },
        ],
      },
      {
        instruction: 'Say "I do not drink coffee"',
        prompt: "I don't drink coffee",
        hint: "je ne bois pas + de café",
        expectedAnswer: "je ne bois pas de café",
        wrongAnswers: [
          {
            answer: "je ne bois pas du café",
            feedback: "After negation, use 'de' not 'du': pas de café",
          },
        ],
      },
      {
        instruction: 'Say "you do not drink wine" (informal)',
        prompt: "you don't drink wine",
        hint: "tu ne bois pas + de vin",
        expectedAnswer: "tu ne bois pas de vin",
        wrongAnswers: [
          {
            answer: "tu ne bois pas du vin",
            feedback: "After negation, use 'de' not 'du': pas de vin",
          },
        ],
      },
      {
        instruction: 'Say "we do not drink beer"',
        prompt: "we don't drink beer",
        hint: "nous ne buvons pas + de bière",
        expectedAnswer: "nous ne buvons pas de bière",
        acceptableAnswers: ["nous ne buvons pas de biere"],
        wrongAnswers: [
          {
            answer: "nous ne bois pas de bière",
            feedback: "Use 'buvons' for nous, not 'bois'",
          },
        ],
      },
      {
        instruction: 'Say "I like to drink coffee"',
        prompt: "I like to drink coffee",
        hint: "j'aime + boire + du café",
        expectedAnswer: "j'aime boire du café",
        acceptableAnswers: ["j aime boire du café", "j'aime boire le café"],
        wrongAnswers: [
          {
            answer: "j'aime bois du café",
            feedback: "Use infinitive 'boire' after 'aime', not 'bois'",
          },
        ],
      },
      {
        instruction: 'Say "I want to drink water"',
        prompt: "I want to drink water",
        hint: "je veux + boire + de l'eau",
        expectedAnswer: "je veux boire de l'eau",
        acceptableAnswers: ["je veux boire de l eau", "je veux boire l'eau"],
        wrongAnswers: [
          {
            answer: "je veux bois de l'eau",
            feedback: "Use infinitive 'boire' after 'veux', not 'bois'",
          },
        ],
      },
      {
        instruction: 'Say "what do you drink?" (informal)',
        prompt: "what do you drink?",
        hint: "qu'est-ce que + tu bois?",
        expectedAnswer: "qu'est-ce que tu bois",
        acceptableAnswers: ["qu est-ce que tu bois", "quest-ce que tu bois"],
        wrongAnswers: [
          {
            answer: "qu'est-ce que tu boit",
            feedback: "Use 'bois' for tu, not 'boit'",
          },
        ],
      },

      // PASSÉ COMPOSÉ - Past tense
      {
        instruction: 'Say "I drank" or "I have drunk"',
        prompt: "I drank",
        hint: "j'ai + bu (irregular past participle!)",
        expectedAnswer: "j'ai bu",
        acceptableAnswers: ["j ai bu"],
        wrongAnswers: [
          {
            answer: "je bois",
            feedback: "That's present 'I drink' - use 'j'ai bu' for past",
          },
          {
            answer: "j'ai buvé",
            feedback: "Irregular! Past participle is 'bu', not 'buvé'",
          },
        ],
      },
      {
        instruction: 'Say "I drank coffee"',
        prompt: "I drank coffee",
        hint: "j'ai bu + du café",
        expectedAnswer: "j'ai bu du café",
        acceptableAnswers: ["j ai bu du café"],
        wrongAnswers: [
          {
            answer: "je bois du café",
            feedback: "That's present - use 'j'ai bu' for past",
          },
        ],
      },
      {
        instruction: 'Say "you drank water" (informal)',
        prompt: "you drank water",
        hint: "tu as + bu + de l'eau",
        expectedAnswer: "tu as bu de l'eau",
        acceptableAnswers: ["tu as bu de l eau"],
        wrongAnswers: [
          {
            answer: "tu bois de l'eau",
            feedback: "That's present - use 'tu as bu' for past",
          },
        ],
      },
      {
        instruction: 'Say "he drank wine"',
        prompt: "he drank wine",
        hint: "il a + bu + du vin",
        expectedAnswer: "il a bu du vin",
        wrongAnswers: [
          {
            answer: "il boit du vin",
            feedback: "That's present - use 'il a bu' for past",
          },
          {
            answer: "il a buvé du vin",
            feedback: "Past participle is 'bu', not 'buvé'",
          },
        ],
      },
      {
        instruction: 'Say "she drank tea"',
        prompt: "she drank tea",
        hint: "elle a + bu + du thé",
        expectedAnswer: "elle a bu du thé",
        acceptableAnswers: ["elle a bu du the"],
        wrongAnswers: [
          {
            answer: "elle boit du thé",
            feedback: "That's present - use 'elle a bu' for past",
          },
        ],
      },
      {
        instruction: 'Say "we drank beer"',
        prompt: "we drank beer",
        hint: "nous avons + bu + de la bière",
        expectedAnswer: "nous avons bu de la bière",
        acceptableAnswers: ["nous avons bu de la biere"],
        wrongAnswers: [
          {
            answer: "nous buvons de la bière",
            feedback: "That's present - use 'nous avons bu' for past",
          },
        ],
      },
      {
        instruction: 'Say "you drank juice" (formal)',
        prompt: "you drank juice (formal)",
        hint: "vous avez + bu + du jus",
        expectedAnswer: "vous avez bu du jus",
        wrongAnswers: [
          {
            answer: "vous buvez du jus",
            feedback: "That's present - use 'vous avez bu' for past",
          },
        ],
      },
      {
        instruction: 'Say "they drank water"',
        prompt: "they drank water",
        hint: "ils ont + bu + de l'eau",
        expectedAnswer: "ils ont bu de l'eau",
        acceptableAnswers: ["elles ont bu de l'eau", "ils ont bu de l eau"],
        wrongAnswers: [
          {
            answer: "ils boivent de l'eau",
            feedback: "That's present - use 'ils ont bu' for past",
          },
        ],
      },
      {
        instruction: 'Say "I did not drink"',
        prompt: "I didn't drink",
        hint: "je n'ai pas + bu",
        expectedAnswer: "je n'ai pas bu",
        acceptableAnswers: ["je n ai pas bu"],
        wrongAnswers: [
          {
            answer: "je ne bois pas",
            feedback: "That's present - use 'je n'ai pas bu' for past",
          },
        ],
      },
      {
        instruction: 'Say "we did not drink coffee"',
        prompt: "we didn't drink coffee",
        hint: "nous n'avons pas + bu + de café",
        expectedAnswer: "nous n'avons pas bu de café",
        acceptableAnswers: ["nous n avons pas bu de café"],
        wrongAnswers: [
          {
            answer: "nous ne buvons pas de café",
            feedback: "That's present - use 'nous n'avons pas bu' for past",
          },
        ],
      },
    ],
  },
};
