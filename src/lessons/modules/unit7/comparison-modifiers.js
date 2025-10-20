/**
 * Module: Comparison & Modifiers - tout, même, mal
 * Unit 7 - Completes comparison words from Units 5-6
 * Ranks 49, 85, 87 - essential modifiers
 */

export const comparisonModifiersModule = {
  title: "Modifiers - tout, même, mal",
  description:
    "Complete your comparison words: tout le monde (everyone), c'est la même chose (it's the same thing), je comprends mal (I understand poorly)",

  concepts: [
    {
      term: "tout = all / everything",
      definition:
        "VERY versatile word! Can be pronoun, adjective, or adverb - rank 49",
      example:
        "tout (everything), tout le monde (everyone), toute la classe (the whole class), tout petit (very small)",
    },
    {
      term: "tout le monde = everyone",
      definition:
        "Fixed expression! Literally 'all the world' but means 'everyone'",
      example:
        "Tout le monde sait (Everyone knows), Tout le monde comprend (Everyone understands)",
    },
    {
      term: "même = same / even",
      definition: "Expresses sameness OR emphasis - rank 85, very common!",
      example:
        "C'est la même chose (It's the same thing), Même moi, je sais (Even I know)",
    },
    {
      term: "mal = badly / poorly",
      definition:
        "Opposite of 'bien' (well) - rank 87, for negative descriptions",
      example:
        "Je comprends mal (I understand poorly), Ça va mal (It's going badly)",
    },
    {
      term: "Complete comparison toolkit",
      definition:
        "Now you have: plus, moins, trop, très, aussi, tout, même, mal - full range!",
      example:
        "Je comprends très bien (very well), Je comprends mal (poorly), C'est la même chose (same), Tout le monde comprend (everyone)",
    },
  ],

  vocabularyReference: [
    {
      french: "tout",
      english: "all / everything (pronoun)",
      note: "⭐ rank 49 - very common!",
    },
    {
      french: "toute",
      english: "all (feminine singular adjective)",
      note: "agrees with feminine nouns",
    },
    {
      french: "tous",
      english: "all (masculine plural adjective/pronoun)",
      note: "pronounced 'too' (adjective) or 'toos' (pronoun)",
    },
    {
      french: "toutes",
      english: "all (feminine plural adjective)",
      note: "agrees with feminine plural nouns",
    },
    {
      french: "tout le monde",
      english: "everyone / everybody",
      note: "⭐⭐⭐ fixed expression!",
    },
    {
      french: "toute la classe",
      english: "the whole class",
      note: "feminine 'toute' + la classe",
    },
    {
      french: "tout petit",
      english: "very small",
      note: "adverb use - intensifier",
    },
    {
      french: "même",
      english: "same",
      note: "rank 85 - comparison",
    },
    {
      french: "le/la même",
      english: "the same (one)",
      note: "with article",
    },
    {
      french: "même moi",
      english: "even me",
      note: "emphasis - 'même' before word",
    },
    {
      french: "mal",
      english: "badly / poorly",
      note: "rank 87 - opposite of 'bien'",
    },
    {
      french: "je comprends mal",
      english: "I understand poorly",
      note: "adverb after verb",
    },
    {
      french: "aller mal",
      english: "to go badly / to be unwell",
      note: "Ça va mal (It's going badly)",
    },
  ],

  exercises: [
    {
      id: "comparison-modifiers.1",
      instruction: "Say 'Everyone knows'",
      prompt: "Everyone knows",
      hint: "tout le monde + sait (savoir for il/elle/on form)",
      expectedAnswer: "tout le monde sait",
      wrongAnswers: [
        {
          answer: "tout le monde savent",
          feedback:
            "'Tout le monde' is singular (like 'everyone') - use 'sait' not 'savent'!",
        },
      ],
    },
    {
      id: "comparison-modifiers.2",
      instruction: "Say 'It's the same thing'",
      prompt: "It's the same thing",
      hint: "c'est + la même chose (feminine)",
      expectedAnswer: "c'est la même chose",
      wrongAnswers: [],
    },
    {
      id: "comparison-modifiers.3",
      instruction: "Say 'Even I know'",
      prompt: "Even I know",
      hint: "même + moi + comma + je sais",
      expectedAnswer: "même moi, je sais",
      wrongAnswers: [],
    },
    {
      id: "comparison-modifiers.4",
      instruction: "Say 'I understand poorly'",
      prompt: "I understand poorly",
      hint: "je comprends + mal (adverb after verb)",
      expectedAnswer: "je comprends mal",
      wrongAnswers: [
        {
          answer: "je mal comprends",
          feedback: "Put 'mal' AFTER the verb - 'je comprends mal'!",
        },
      ],
    },
    {
      id: "comparison-modifiers.5",
      instruction: "Say 'Everyone understands'",
      prompt: "Everyone understands",
      hint: "tout le monde + comprend (singular verb)",
      expectedAnswer: "tout le monde comprend",
      wrongAnswers: [],
    },
    {
      id: "comparison-modifiers.6",
      instruction: "Say 'I know everything'",
      prompt: "I know everything",
      hint: "je sais + tout (pronoun)",
      expectedAnswer: "je sais tout",
      wrongAnswers: [],
    },
  ],
};
