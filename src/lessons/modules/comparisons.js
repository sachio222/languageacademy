/**
 * Module: Comparisons & Intensity
 * Unit 5 - Express comparisons, intensity, and quantity
 * Essential words: plus, moins, meilleur, pire, trop, tout, même
 */

export const comparisons = {
  title: "Comparisons & Intensity",
  description:
    "Compare things and express intensity: plus (more), moins (less), meilleur (better), pire (worse), trop (too much), tout (all)",

  concepts: [
    {
      term: "Basic Comparisons - plus/moins",
      definition:
        "Use 'plus' (more) and 'moins' (less) with adjectives to compare things",
      example: "plus grand (bigger), moins cher (less expensive)",
    },
    {
      term: "Better and Worse - meilleur/pire",
      definition:
        "Special forms for 'better' and 'worse' - they agree with gender!",
      example:
        "un meilleur livre (a better book), une meilleure maison (a better house)",
    },
    {
      term: "Superlatives - the best/the worst",
      definition:
        "Add 'le/la/les' before meilleur/pire for 'the best/the worst'",
      example: "le meilleur (the best), la pire (the worst)",
    },
    {
      term: "Intensity Modifiers",
      definition:
        "Words like 'trop' (too much), 'tout' (all), and 'même' (same/even) add nuance",
      example: "c'est trop cher (it's too expensive), tout le monde (everyone)",
    },
  ],

  vocabularyReference: [
    {
      french: "plus",
      english: "more",
      note: "comparison - plus grand (bigger)",
    },
    {
      french: "moins",
      english: "less",
      note: "comparison - moins cher (less expensive)",
    },
    {
      french: "meilleur / meilleure",
      english: "better",
      note: "adjective - agrees with gender",
    },
    {
      french: "le meilleur / la meilleure",
      english: "the best",
      note: "superlative - with article",
    },
    {
      french: "pire",
      english: "worse",
      note: "same form both genders",
    },
    {
      french: "le/la pire",
      english: "the worst",
      note: "superlative - with article",
    },
    {
      french: "trop",
      english: "too much / too",
      note: "intensity - trop cher (too expensive)",
    },
    {
      french: "tout / toute / tous / toutes",
      english: "all / every / everything",
      note: "quantifier - agrees with noun",
    },
    {
      french: "même",
      english: "same / even",
      note: "comparison - le même livre (the same book)",
    },
    {
      french: "mal",
      english: "badly / bad",
      note: "adverb - opposite of 'bien'",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: 'Say "more good" or "bigger"',
        prompt: "more (in comparisons)",
        hint: "This word makes adjectives comparative",
        expectedAnswer: "plus",
        wrongAnswers: [
          { answer: "moins", feedback: "That's 'less', not 'more'" },
          { answer: "aussi", feedback: "That's 'as/also', not 'more'" },
        ],
      },
      {
        instruction: 'Say "less expensive" or "smaller"',
        prompt: "less (in comparisons)",
        hint: "Opposite of 'plus'",
        expectedAnswer: "moins",
        wrongAnswers: [
          { answer: "plus", feedback: "That's 'more', not 'less'" },
        ],
      },
      {
        instruction: 'Say "this book is bigger"',
        prompt: "this book is bigger",
        hint: "ce livre + est + plus + grand",
        expectedAnswer: "ce livre est plus grand",
        wrongAnswers: [
          {
            answer: "ce livre est moins grand",
            feedback: "Use 'plus' for 'more/bigger', not 'moins'",
          },
          {
            answer: "ce livre est grand plus",
            feedback: "Put 'plus' BEFORE the adjective: plus grand",
          },
        ],
      },
      {
        instruction: 'Say "this house is smaller" (less big)',
        prompt: "this house is smaller",
        hint: "cette maison + est + moins + grande (feminine!)",
        expectedAnswer: "cette maison est moins grande",
        wrongAnswers: [
          {
            answer: "cette maison est plus grande",
            feedback: "Use 'moins' for 'less/smaller', not 'plus'",
          },
          {
            answer: "cette maison est moins grand",
            feedback: "maison is feminine, use 'grande' not 'grand'",
          },
        ],
      },
      {
        instruction: 'Say "a better book" (masculine)',
        prompt: "a better book",
        hint: "Use 'meilleur' for better with masculine nouns",
        expectedAnswer: "un meilleur livre",
        wrongAnswers: [
          {
            answer: "un plus bon livre",
            feedback: "Don't use 'plus bon' - use 'meilleur' for better",
          },
          {
            answer: "une meilleure livre",
            feedback: "livre is masculine, use 'un meilleur'",
          },
        ],
      },
      {
        instruction: 'Say "a better house" (feminine)',
        prompt: "a better house",
        hint: "Use 'meilleure' for better with feminine nouns",
        expectedAnswer: "une meilleure maison",
        wrongAnswers: [
          {
            answer: "un meilleur maison",
            feedback: "maison is feminine, use 'une meilleure'",
          },
          {
            answer: "une plus bonne maison",
            feedback: "Use 'meilleure' for better, not 'plus bonne'",
          },
        ],
      },
      {
        instruction: 'Say "the best book" (masculine)',
        prompt: "the best book",
        hint: "Add article: le + meilleur + livre",
        expectedAnswer: "le meilleur livre",
        wrongAnswers: [
          {
            answer: "la meilleure livre",
            feedback: "livre is masculine, use 'le meilleur'",
          },
          {
            answer: "un meilleur livre",
            feedback: "Use 'le' (the) for superlative, not 'un' (a)",
          },
        ],
      },
      {
        instruction: 'Say "the best house" (feminine)',
        prompt: "the best house",
        hint: "la + meilleure + maison",
        expectedAnswer: "la meilleure maison",
        wrongAnswers: [
          {
            answer: "le meilleur maison",
            feedback: "maison is feminine, use 'la meilleure'",
          },
        ],
      },
      {
        instruction: 'Say "it\'s worse"',
        prompt: "it's worse",
        hint: "'pire' is same for both genders",
        expectedAnswer: "c'est pire",
        wrongAnswers: [
          {
            answer: "c'est plus mal",
            feedback: "Use 'pire' for worse, not 'plus mal'",
          },
        ],
      },
      {
        instruction: 'Say "the worst thing"',
        prompt: "the worst thing",
        hint: "chose is feminine - la pire chose",
        expectedAnswer: "la pire chose",
        wrongAnswers: [
          {
            answer: "le pire chose",
            feedback: "chose is feminine, use 'la pire'",
          },
        ],
      },
      {
        instruction: 'Say "it\'s too expensive"',
        prompt: "it's too expensive",
        hint: "c'est + trop + cher",
        expectedAnswer: "c'est trop cher",
        wrongAnswers: [
          {
            answer: "c'est très cher",
            feedback: "Use 'trop' for 'too much', not 'très' (very)",
          },
          {
            answer: "c'est cher trop",
            feedback: "Put 'trop' BEFORE the adjective: trop cher",
          },
        ],
      },
      {
        instruction: 'Say "I have too much work"',
        prompt: "I have too much work",
        hint: "j'ai + trop de + travail (use 'de' after trop!)",
        expectedAnswer: "j'ai trop de travail",
        acceptableAnswers: ["j ai trop de travail"],
        wrongAnswers: [
          {
            answer: "j'ai trop travail",
            feedback: "Need 'de' after 'trop': trop de travail",
          },
        ],
      },
      {
        instruction: 'Say "all the world" or "everyone"',
        prompt: "everyone",
        hint: "literally 'all the world' - tout le monde",
        expectedAnswer: "tout le monde",
        wrongAnswers: [
          {
            answer: "tous les gens",
            feedback: "The common phrase is 'tout le monde' (everyone)",
          },
        ],
      },
      {
        instruction: 'Say "I want everything"',
        prompt: "I want everything",
        hint: "je veux + tout (everything as object)",
        expectedAnswer: "je veux tout",
        wrongAnswers: [
          {
            answer: "je veux tous",
            feedback: "Use 'tout' for everything, 'tous' is for 'all' (plural)",
          },
        ],
      },
      {
        instruction: 'Say "the same book"',
        prompt: "the same book",
        hint: "le + même + livre",
        expectedAnswer: "le même livre",
        wrongAnswers: [
          {
            answer: "le livre même",
            feedback: "Put 'même' BEFORE the noun: le même livre",
          },
        ],
      },
      {
        instruction: 'Say "it\'s the same thing"',
        prompt: "it's the same thing",
        hint: "c'est + la même chose (chose is feminine)",
        expectedAnswer: "c'est la même chose",
        wrongAnswers: [
          {
            answer: "c'est le même chose",
            feedback: "chose is feminine, use 'la même'",
          },
        ],
      },
      {
        instruction: 'Say "he speaks badly"',
        prompt: "he speaks badly",
        hint: "il parle + mal (adverb - opposite of 'bien')",
        expectedAnswer: "il parle mal",
        wrongAnswers: [
          {
            answer: "il parle mauvais",
            feedback: "Use adverb 'mal' not adjective 'mauvais'",
          },
        ],
      },
      {
        instruction: 'Say "that\'s better"',
        prompt: "that's better",
        hint: "c'est + meilleur (can use masculine as default)",
        expectedAnswer: "c'est meilleur",
        wrongAnswers: [
          {
            answer: "c'est mieux",
            feedback:
              "Both work! 'mieux' is also better, but we're learning 'meilleur'",
          },
        ],
      },
    ],
  },
};
