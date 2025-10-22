/**
 * Unit 2 Practice - Fill in the blank exercise
 * Typeform-style interactive sentence completion covering Unit 2 material
 */

export const unit2Practice = {
  moduleKey: "2024-01-23-unit2-practice", // Permanent identifier - never changes
  title: "Unit 2 Practice - Fill in the Blanks",
  description:
    "Complete sentences using demonstratives, questions, prepositions, and adjectives from Unit 2!",

  // Special flags
  isFillInTheBlank: true,
  skipStudyMode: true,

  concepts: [
    {
      term: "Composition Practice",
      definition:
        "Interactive exercises to master combining demonstratives with essential verbs and descriptive language",
      example:
        "Practice ça va?, je veux ce livre, tu peux voir la maison, où est le chat?, avec moi, très bon",
    },
    {
      term: "Essential Verb Mastery",
      definition:
        "Build fluency with the three most important French verbs through contextual practice",
      example:
        "vouloir (want) + pouvoir (can) + voir (see) in real sentence contexts with proper conjugations",
    },
    {
      term: "Question Building",
      definition:
        "Learn to construct natural French questions using question words and proper word order",
      example:
        "Comment + ça va?, Où + est + le livre?, Qu'est-ce que + c'est?, Avec + qui?",
    },
  ],
  vocabularyReference: [],

  // Sentences with blanks to fill in
  sentences: [
    // Demonstratives - ça
    {
      text: "Qu'est-ce que c'est ? 'est un livre.",
      instruction: "Complete: 'What is it? It is a book'",
      blanks: [
        {
          position: 21,
          answer: "c",
          hint: "contraction of 'ce' - use with être",
        },
      ],
    },

    // Demonstratives - ce/cette
    {
      text: "J'ai  voiture.",
      instruction: "Complete: 'I have this car' (feminine)",
      blanks: [
        {
          position: 5,
          answer: "cette",
          hint: "demonstrative for feminine singular",
        },
      ],
    },

    // Vouloir
    {
      text: "Je  ça.",
      instruction: "Complete: 'I want that'",
      blanks: [
        {
          position: 3,
          answer: "veux",
          hint: "vouloir conjugated for je",
        },
      ],
    },

    // Pouvoir
    {
      text: "Tu  voir le chat.",
      instruction: "Complete: 'You can see the cat'",
      blanks: [
        {
          position: 3,
          answer: "peux",
          hint: "pouvoir conjugated for tu",
        },
      ],
    },

    // Question word - où
    {
      text: "  est le livre ?",
      instruction: "Complete: 'Where is the book?'",
      blanks: [
        {
          position: 0,
          answer: "où",
          hint: "question word meaning 'where'",
        },
      ],
    },

    // Question word - qui
    {
      text: "  est-ce ?",
      instruction: "Complete: 'Who is it?'",
      blanks: [
        {
          position: 0,
          answer: "qui",
          hint: "question word meaning 'who'",
        },
      ],
    },

    // Stressed pronouns with preposition
    {
      text: "Il est avec .",
      instruction: "Complete: 'He is with me'",
      blanks: [
        {
          position: 12,
          answer: "moi",
          hint: "stressed pronoun for 'me'",
        },
      ],
    },

    // Preposition - dans
    {
      text: "Le chat est  la maison.",
      instruction: "Complete: 'The cat is in the house'",
      blanks: [
        {
          position: 12,
          answer: "dans",
          hint: "preposition meaning 'in'",
        },
      ],
    },

    // Adjective - bon/bonne
    {
      text: "C'est une  chose.",
      instruction: "Complete: 'It's a good thing' (feminine)",
      blanks: [
        {
          position: 10,
          answer: "bonne",
          hint: "adjective 'good' in feminine form",
        },
      ],
    },

    // Adjective - grand
    {
      text: "Il est un  homme.",
      instruction: "Complete: 'He is a big/tall man'",
      blanks: [
        {
          position: 10,
          answer: "grand",
          hint: "adjective meaning 'big/tall' (masculine)",
        },
      ],
    },

    // Multiple blanks: vouloir + demonstrative
    {
      text: "Tu  voir  maison.",
      instruction: "Complete: 'You want to see this house' (feminine)",
      blanks: [
        {
          position: 3,
          answer: "veux",
          hint: "vouloir conjugated for tu",
        },
        {
          position: 9,
          answer: "cette",
          hint: "demonstrative for feminine singular",
        },
      ],
    },

    // Multiple blanks: preposition + noun
    {
      text: "Le chien est  la  .",
      instruction: "Complete: 'The dog is under the car'",
      blanks: [
        {
          position: 13,
          answer: "sous",
          hint: "preposition meaning 'under'",
        },
        {
          position: 18,
          answer: "voiture",
          hint: "noun meaning 'car'",
        },
      ],
    },

    // Multiple blanks: question phrase
    {
      text: "  veux- ?",
      instruction: "Complete: 'What do you want?'",
      blanks: [
        {
          position: 0,
          answer: "que",
          hint: "question word meaning 'what'",
        },
        {
          position: 7,
          answer: "tu",
          hint: "pronoun meaning 'you'",
        },
      ],
    },

    // Multiple blanks: pouvoir + voir + noun
    {
      text: "Il  la maison.",
      instruction: "Complete: 'He can see the house'",
      blanks: [
        {
          position: 3,
          answer: "peut",
          hint: "pouvoir conjugated for il",
        },
        {
          position: 3,
          answer: "voir",
          hint: "infinitive meaning 'to see'",
        },
      ],
    },

    // Complex: demonstrative + adjective + noun
    {
      text: "Nous avons  livre et   chiens.",
      instruction: "Complete: 'We have this book and these dogs'",
      blanks: [
        {
          position: 11,
          answer: "ce",
          hint: "demonstrative for masculine singular",
        },
        {
          position: 22,
          answer: "ces",
          hint: "demonstrative for plural",
        },
      ],
    },

    // Vouloir conjugations
    {
      text: "Nous  le livre.",
      instruction: "Complete: 'We want the book'",
      blanks: [
        {
          position: 5,
          answer: "voulons",
          hint: "vouloir conjugated for nous",
        },
      ],
    },

    {
      text: "Elle  cette maison.",
      instruction: "Complete: 'She sees this house'",
      blanks: [
        {
          position: 5,
          answer: "voit",
          hint: "voir conjugated for elle",
        },
      ],
    },

    // Complex: vouloir + voir infinitive
    {
      text: "Nous voulons  Mont-Saint-Michel.",
      instruction: "Complete: 'We want to see Mont-Saint-Michel'",
      blanks: [
        {
          position: 13,
          answer: "voir",
          hint: "infinitive meaning 'to see'",
        },
      ],
    },

    // Complex: pouvoir + voir + demonstrative
    {
      text: "Tu peux   choses.",
      instruction: "Complete: 'You can have these things'",
      blanks: [
        {
          position: 8,
          answer: "avoir",
          hint: "infinitive meaning 'to have'",
        },
        {
          position: 9,
          answer: "ces",
          hint: "demonstrative for plural",
        },
      ],
    },

    // Preposition - chez + stressed pronoun
    {
      text: "Est-ce que le chien est      ?",
      instruction: "Complete: 'Is the dog at your house?'",
      blanks: [
        {
          position: 26,
          answer: "chez",
          hint: "preposition meaning 'at (someone's place)'",
        },
        {
          position: 28,
          answer: "toi",
          hint: "stressed pronoun meaning 'you' (informal)",
        },
      ],
    },
  ],

  // Empty exercises array - not used for fill-in-blank
  exercises: [],
};
