/**
 * Module: Everyday Nouns
 * Unit 4 - High-frequency nouns for real-world communication
 * Nouns from top 100-200 frequency words
 */

export const everydayNouns = {
  title: "Everyday Nouns - Life & World",
  description:
    "Essential high-frequency nouns for real conversations: le monde (world), la vie (life), l'eau (water), le pain (bread)",

  concepts: [
    {
      term: "Abstract vs Concrete Nouns",
      definition:
        "Abstract nouns (temps, vie, monde) express ideas. Concrete nouns (pain, eau, table) are physical objects.",
      example: "la vie (life - abstract), le pain (bread - concrete)",
    },
    {
      term: "Using in Real Conversations",
      definition:
        "These are the nouns you'll use constantly in French - combine with verbs you know!",
      example: "je veux du pain, j'ai le temps, il parle du monde",
    },
    {
      term: "Remember the Gender!",
      definition:
        "Always learn the article with the noun - it shows the gender",
      example: "le temps (masculine), la vie (feminine)",
    },
  ],

  vocabularyReference: [
    {
      french: "le temps",
      english: "time/weather",
      note: "masculine - can mean time OR weather!",
    },
    { french: "la vie", english: "life", note: "feminine - very common!" },
    {
      french: "le monde",
      english: "world",
      note: "masculine - tout le monde = everyone",
    },
    { french: "l'eau", english: "water", note: "feminine (eau)" },
    { french: "le pain", english: "bread", note: "masculine - very common!" },
    {
      french: "l'argent",
      english: "money",
      note: "masculine (argent) - also means silver",
    },
    {
      french: "le travail",
      english: "work",
      note: "masculine - very common noun",
    },
    {
      french: "la ville",
      english: "city",
      note: "feminine - where you live or visit",
    },
    {
      french: "la place",
      english: "square/place",
      note: "feminine - public square or space",
    },
    {
      french: "la rue",
      english: "street",
      note: "feminine - dans la rue (in the street)",
    },
    {
      french: "la table",
      english: "table",
      note: "feminine - sur la table (on the table)",
    },
    {
      french: "la main",
      english: "hand",
      note: "feminine - dans la main (in the hand)",
    },
    {
      french: "la tête",
      english: "head",
      note: "feminine - very common body part",
    },
    {
      french: "le nom",
      english: "name",
      note: "masculine - mon nom est... (my name is...)",
    },
    {
      french: "la porte",
      english: "door",
      note: "feminine - la porte est ouverte (door is open)",
    },
    {
      french: "tout le monde",
      english: "everybody/everyone",
      note: "masculine - literally 'all the world'",
    },
    {
      french: "personne",
      english: "nobody/no one",
      note: "feminine - often used with 'ne': je ne vois personne",
    },
    {
      french: "la carte de crédit",
      english: "credit card",
      note: "feminine - essential for shopping!",
    },
    {
      french: "les espèces",
      english: "cash",
      note: "feminine plural - payer en espèces (pay in cash)",
    },
    {
      french: "une carafe d'eau",
      english: "carafe of water",
      note: "feminine - free water at restaurants!",
    },
    {
      french: "l'addition",
      english: "the bill/check",
      note: "feminine (addition) - at restaurants",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: 'Say "I have time"',
        prompt: "I have time",
        hint: "j'ai + article + temps (masculine)",
        expectedAnswer: "j'ai le temps",
        wrongAnswers: [
          {
            answer: "j'ai la temps",
            feedback: "temps is masculine, use 'le' not 'la'",
          },
          {
            answer: "j'ai un temps",
            feedback: "Use definite article 'le' for 'the time'",
          },
        ],
      },
      {
        instruction: 'Say "life is good"',
        prompt: "life is good",
        hint: "la vie + est + bon/bonne (feminine form!)",
        expectedAnswer: "la vie est bonne",
        wrongAnswers: [
          {
            answer: "la vie est bon",
            feedback: "vie is feminine, adjective needs 'bonne' not 'bon'",
          },
          {
            answer: "le vie est bonne",
            feedback: "vie is feminine, use 'la' not 'le'",
          },
        ],
      },
      {
        instruction: 'Say "the world is big"',
        prompt: "the world is big",
        hint: "le monde + est + grand (masculine)",
        expectedAnswer: "le monde est grand",
        wrongAnswers: [
          {
            answer: "la monde est grand",
            feedback: "monde is masculine, use 'le' not 'la'",
          },
          {
            answer: "le monde est grande",
            feedback: "monde is masculine, use 'grand' not 'grande'",
          },
        ],
      },
      {
        instruction: 'Say "I want water"',
        prompt: "I want water",
        hint: "je veux + de l'eau (use partitive with food/drink!)",
        expectedAnswer: "je veux de l'eau",
        acceptableAnswers: ["je veux l'eau", "je veux de l eau"],
        wrongAnswers: [
          {
            answer: "je veux le eau",
            feedback: "eau starts with vowel, use l'eau not 'le eau'",
          },
        ],
      },
      {
        instruction: 'Say "we have bread"',
        prompt: "we have bread",
        hint: "nous avons + du pain (use partitive with food!)",
        expectedAnswer: "nous avons du pain",
        acceptableAnswers: ["nous avons le pain"],
        wrongAnswers: [
          {
            answer: "nous avons la pain",
            feedback: "pain is masculine, use 'le/du' not 'la'",
          },
        ],
      },
      {
        instruction: 'Say "he does not have money"',
        prompt: "he doesn't have money",
        hint: "il n'a pas + d'argent (negative with partitive!)",
        expectedAnswer: "il n'a pas d'argent",
        acceptableAnswers: ["il n a pas d argent", "il ne a pas d'argent"],
        wrongAnswers: [
          {
            answer: "il n'a pas l'argent",
            feedback:
              "With negation and partitive, use 'pas d'argent' not 'pas l'argent'",
          },
        ],
      },
      {
        instruction: 'Say "I must work"',
        prompt: "I must work",
        hint: "je dois + travailler (work as a verb!)",
        expectedAnswer: "je dois travailler",
        wrongAnswers: [
          {
            answer: "je dois le travail",
            feedback: "'work' as verb is 'travailler', not 'travail' (noun)",
          },
        ],
      },
      {
        instruction: 'Say "she lives in the city"',
        prompt: "she lives in the city",
        hint: "elle + verb vivre (lives) + dans + la ville",
        expectedAnswer: "elle vit dans la ville",
        acceptableAnswers: ["elle habite dans la ville"],
        wrongAnswers: [
          {
            answer: "elle vit dans le ville",
            feedback: "ville is feminine, use 'la' not 'le'",
          },
        ],
      },
      {
        instruction: 'Say "the square is here"',
        prompt: "the square is here",
        hint: "la place + est + ici",
        expectedAnswer: "la place est ici",
        wrongAnswers: [
          {
            answer: "le place est ici",
            feedback: "place is feminine, use 'la' not 'le'",
          },
        ],
      },
      {
        instruction: 'Say "I see the street"',
        prompt: "I see the street",
        hint: "je vois + la rue",
        expectedAnswer: "je vois la rue",
        wrongAnswers: [
          {
            answer: "je vois le rue",
            feedback: "rue is feminine, use 'la' not 'le'",
          },
        ],
      },
      {
        instruction: 'Say "the bread is on the table"',
        prompt: "the bread is on the table",
        hint: "le pain + est + sur + la table",
        expectedAnswer: "le pain est sur la table",
        wrongAnswers: [
          {
            answer: "le pain est sur le table",
            feedback: "table is feminine, use 'la' not 'le'",
          },
        ],
      },
      {
        instruction: 'Say "I have it in my hand"',
        prompt: "I have it in my hand",
        hint: "je l'ai + dans + ma main (possessive!)",
        expectedAnswer: "je l'ai dans ma main",
        acceptableAnswers: ["je l ai dans ma main"],
        wrongAnswers: [
          {
            answer: "je l'ai dans mon main",
            feedback: "main is feminine, use 'ma' not 'mon'",
          },
        ],
      },
      {
        instruction: 'Say "my name is Marc"',
        prompt: "my name is Marc",
        hint: "mon nom + est + Marc",
        expectedAnswer: "mon nom est Marc",
        wrongAnswers: [
          {
            answer: "ma nom est Marc",
            feedback: "nom is masculine, use 'mon' not 'ma'",
          },
        ],
      },
      {
        instruction: 'Say "the door is there"',
        prompt: "the door is there",
        hint: "la porte + est + là",
        expectedAnswer: "la porte est là",
        wrongAnswers: [
          {
            answer: "le porte est là",
            feedback: "porte is feminine, use 'la' not 'le'",
          },
        ],
      },
      {
        instruction: 'Say "everybody is here"',
        prompt: "everybody is here",
        hint: "tout le monde + est + ici (singular verb!)",
        expectedAnswer: "tout le monde est ici",
        wrongAnswers: [
          {
            answer: "tout le monde sont ici",
            feedback: "tout le monde is singular, use 'est' not 'sont'",
          },
        ],
      },
      {
        instruction: 'Say "I see nobody"',
        prompt: "I see nobody",
        hint: "je ne vois personne (negation with personne!)",
        expectedAnswer: "je ne vois personne",
        acceptableAnswers: ["je ne vois personne"],
        wrongAnswers: [
          {
            answer: "je vois personne",
            feedback: "Need negation: 'je ne vois personne'",
          },
        ],
      },
      {
        instruction: 'Say "I want to pay with credit card"',
        prompt: "I want to pay with credit card",
        hint: "je veux payer avec + la carte de crédit",
        expectedAnswer: "je veux payer avec la carte de crédit",
        acceptableAnswers: ["je veux payer avec une carte de crédit"],
        wrongAnswers: [
          {
            answer: "je veux payer avec le carte de crédit",
            feedback: "carte is feminine, use 'la' not 'le'",
          },
        ],
      },
      {
        instruction: 'Say "I have cash"',
        prompt: "I have cash",
        hint: "j'ai + des espèces (plural!)",
        expectedAnswer: "j'ai des espèces",
        acceptableAnswers: ["j ai des espèces"],
        wrongAnswers: [
          {
            answer: "j'ai les espèces",
            feedback: "Use 'des espèces' (some cash) not 'les espèces'",
          },
        ],
      },
      {
        instruction: 'Say "we want a carafe of water"',
        prompt: "we want a carafe of water",
        hint: "nous voulons + une carafe d'eau",
        expectedAnswer: "nous voulons une carafe d'eau",
        acceptableAnswers: ["nous voulons une carafe d eau"],
        wrongAnswers: [
          {
            answer: "nous voulons un carafe d'eau",
            feedback: "carafe is feminine, use 'une' not 'un'",
          },
        ],
      },
      {
        instruction: 'Say "the bill please" (formal)',
        prompt: "the bill please",
        hint: "l'addition + s'il vous plaît (formal please!)",
        expectedAnswer: "l'addition, s'il vous plaît",
        acceptableAnswers: [
          "l addition s il vous plaît",
          "l'addition s'il vous plaît",
          "l'addition s il vous plait",
        ],
        wrongAnswers: [
          {
            answer: "l'addition, s'il te plaît",
            feedback:
              "Use formal 's'il vous plaît' when asking for the bill in a restaurant",
          },
        ],
      },
    ],
  },
};
