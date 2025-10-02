/**
 * Module 6: Determiners + Nouns - Functional Composition
 * Combine demonstratives with nouns: this book, that cat, these dogs
 * Treating language like functional programming: determiner(noun) = phrase
 */

export const determinersWithNouns = {
  // id and module number are set dynamically
  title: "Determiners + Nouns - Building Phrases",
  description:
    "Compose functions! this(book) = ce livre, that(house) = cette maison, these(cats) = ces chats",

  concepts: [
    {
      term: "Functional Composition",
      definition: "Determiners are functions that take nouns as arguments",
      example: "ce(livre) → ce livre, cette(maison) → cette maison",
    },
    {
      term: "Full Sentence Practice",
      definition:
        "Every exercise uses être, avoir, or vouloir - combining multiple modules!",
      example: "Not just 'this book', but 'I have this book' - real usage!",
    },
    {
      term: "Using ALL Previous Verbs",
      definition: "Practice with être and avoir from previous modules",
      example: "Pattern: [pronoun] + [verb] + [determiner] + [noun]",
    },
  ],

  vocabularyReference: [
    {
      french: "j'ai ce livre",
      english: "I have this book",
      note: "avoir + ce + noun",
    },
    {
      french: "elle a cette maison",
      english: "she has this house",
      note: "avoir + cette + noun",
    },
    {
      french: "nous avons ces livres",
      english: "we have these books",
      note: "avoir + ces + plural",
    },
    {
      french: "tu as ce chat",
      english: "you have this cat",
      note: "combining!",
    },
    {
      french: "ils ont ces chats",
      english: "they have these cats",
      note: "avoir + ces",
    },
    {
      french: "il est cet homme",
      english: "he is this man",
      note: "être + cet",
    },
    {
      french: "j'ai ces enfants",
      english: "I have these children",
      note: "full phrase",
    },
    { french: "j'ai le chat", english: "I have the cat", note: "avoir + le" },
    {
      french: "elle a la maison",
      english: "she has the house",
      note: "avoir + la",
    },
    {
      french: "ils ont les chiens",
      english: "they have the dogs",
      note: "avoir + les",
    },
    { french: "c'est ce livre", english: "it's this book", note: "être + ce" },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: 'Say "I have this book"',
        prompt: "I have this book",
        hint: "Combine: I have + demonstrative + book",
        expectedAnswer: "j'ai ce livre",
        wrongAnswers: [
          {
            answer: "j'ai cette livre",
            feedback: "livre is masculine, use 'ce' not 'cette'",
          },
          {
            answer: "j'ai cet livre",
            feedback: "Use 'cet' only before vowel sounds",
          },
        ],
      },
      {
        instruction: 'Say "she has this house"',
        prompt: "she has this house",
        hint: "Combine: she has + demonstrative + house (feminine)",
        expectedAnswer: "elle a cette maison",
        wrongAnswers: [
          {
            answer: "elle a ce maison",
            feedback: "maison is feminine, use 'cette' not 'ce'",
          },
        ],
      },
      {
        instruction: 'Say "we have these books"',
        prompt: "we have these books",
        hint: "Combine: we have + plural demonstrative + plural noun",
        expectedAnswer: "nous avons ces livres",
        wrongAnswers: [
          {
            answer: "nous avons ce livres",
            feedback: "For plural, use 'ces' not 'ce'",
          },
          {
            answer: "nous avons les livres",
            feedback:
              "Use demonstrative 'ces' (these), not article 'les' (the)",
          },
        ],
      },
      {
        instruction: 'Say "you have this cat"',
        prompt: "you have this cat (informal)",
        hint: "Combine: you have + demonstrative + cat",
        expectedAnswer: "tu as ce chat",
        wrongAnswers: [
          {
            answer: "tu as cette chat",
            feedback: "chat is masculine, use 'ce' not 'cette'",
          },
        ],
      },
      {
        instruction: 'Say "they have these cats"',
        prompt: "they have these cats (masculine)",
        hint: "Combine: they have + plural demonstrative + cats",
        expectedAnswer: "ils ont ces chats",
        wrongAnswers: [
          { answer: "ils ont ce chats", feedback: "For plural, use 'ces'" },
        ],
      },
      {
        instruction: 'Say "he is this man"',
        prompt: "he is this man",
        hint: "Combine: he is + demonstrative (vowel form) + man",
        expectedAnswer: "il est cet homme",
        wrongAnswers: [
          {
            answer: "il est ce homme",
            feedback: "homme has silent h, use 'cet' like before vowels",
          },
        ],
      },
      {
        instruction: 'Say "I have the cat"',
        prompt: "I have the cat",
        hint: "Combine: I have + the + cat",
        expectedAnswer: "j'ai le chat",
        wrongAnswers: [
          {
            answer: "j'ai la chat",
            feedback: "chat is masculine, use 'le' not 'la'",
          },
          { answer: "j'ai un chat", feedback: "Use 'le' (the), not 'un' (a)" },
        ],
      },
      {
        instruction: 'Say "she has the house"',
        prompt: "she has the house",
        hint: "Combine: she has + the + house (feminine)",
        expectedAnswer: "elle a la maison",
        wrongAnswers: [
          {
            answer: "elle a le maison",
            feedback: "maison is feminine, use 'la' not 'le'",
          },
        ],
      },
      {
        instruction: 'Say "they have the dogs"',
        prompt: "they have the dogs (masculine)",
        hint: "Combine: they have + the + dogs (plural)",
        expectedAnswer: "ils ont les chiens",
        wrongAnswers: [
          {
            answer: "ils ont le chiens",
            feedback: "For plural, use 'les' not 'le'",
          },
        ],
      },
      {
        instruction: 'Say "I have these children"',
        prompt: "I have these children",
        hint: "Combine: I have + plural demonstrative + children",
        expectedAnswer: "j'ai ces enfants",
        wrongAnswers: [
          { answer: "j'ai cet enfants", feedback: "For plural, use 'ces'" },
        ],
      },
      {
        instruction: 'Say "you want this car"',
        prompt: "you want this car (informal)",
        hint: "Combine: you want + demonstrative + car (feminine)",
        expectedAnswer: "tu veux cette voiture",
        wrongAnswers: [
          {
            answer: "tu veux ce voiture",
            feedback: "voiture is feminine, use 'cette' not 'ce'",
          },
        ],
      },
      {
        instruction: 'Say "it\'s this book"',
        prompt: "it's this book",
        hint: "Combine: it is + demonstrative + book",
        expectedAnswer: "c'est ce livre",
        wrongAnswers: [
          {
            answer: "c'est cette livre",
            feedback: "livre is masculine, use 'ce'",
          },
        ],
      },
    ],
  },
};
