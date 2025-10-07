/**
 * Unit 2 Practice - Fill in the blank exercise
 * Typeform-style interactive sentence completion covering Unit 2 material
 */

export const unit2Practice = {
  title: "Unit 2 Practice - Fill in the Blanks",
  description:
    "Complete sentences using demonstratives, questions, prepositions, and adjectives from Unit 2!",

  // Special flags
  isFillInTheBlank: true,
  skipStudyMode: true,

  concepts: [],
  vocabularyReference: [],

  // Sentences with blanks to fill in
  sentences: [
    // Demonstratives - ça
    {
      text: "Qu'est-ce que c'est ?  est un livre.",
      instruction: "Complete: 'What is it? That is a book'",
      blanks: [
        {
          position: 21,
          answer: "ça",
          hint: "demonstrative meaning 'that/it'",
        },
      ],
    },

    // Demonstratives - ce/cette
    {
      text: "J'ai  livre.",
      instruction: "Complete: 'I have this book' (masculine)",
      blanks: [
        {
          position: 5,
          answer: "ce",
          hint: "demonstrative for masculine singular",
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

    // Multiple blanks: preposition + connector
    {
      text: "Elle est  moi  toi.",
      instruction: "Complete: 'She is with me and you'",
      blanks: [
        {
          position: 9,
          answer: "avec",
          hint: "preposition meaning 'with'",
        },
        {
          position: 13,
          answer: "et",
          hint: "connector meaning 'and'",
        },
      ],
    },

    // Multiple blanks: question + adjective
    {
      text: "  est le  livre ?",
      instruction: "Complete: 'Where is the good book?'",
      blanks: [
        {
          position: 0,
          answer: "où",
          hint: "question word meaning 'where'",
        },
        {
          position: 9,
          answer: "bon",
          hint: "adjective meaning 'good' (masculine)",
        },
      ],
    },

    // Multiple blanks: pouvoir + preposition + stressed pronoun
    {
      text: "Je  être  lui.",
      instruction: "Complete: 'I can be with him'",
      blanks: [
        {
          position: 3,
          answer: "peux",
          hint: "pouvoir conjugated for je",
        },
        {
          position: 9,
          answer: "avec",
          hint: "preposition meaning 'with'",
        },
      ],
    },

    // Complex: demonstrative + adjective + noun
    {
      text: "Nous voulons  livre mais  chiens.",
      instruction: "Complete: 'We want this book but these dogs'",
      blanks: [
        {
          position: 13,
          answer: "ce",
          hint: "demonstrative for masculine singular",
        },
        {
          position: 25,
          answer: "ces",
          hint: "demonstrative for plural",
        },
      ],
    },

    // Voir conjugations
    {
      text: "Je  le chat.",
      instruction: "Complete: 'I see the cat'",
      blanks: [
        {
          position: 3,
          answer: "vois",
          hint: "voir conjugated for je",
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
      text: "Tu peux   chose.",
      instruction: "Complete: 'You can see this thing'",
      blanks: [
        {
          position: 8,
          answer: "voir",
          hint: "infinitive meaning 'to see'",
        },
        {
          position: 13,
          answer: "cette",
          hint: "demonstrative for feminine singular",
        },
      ],
    },
  ],

  // Empty exercises array - not used for fill-in-blank
  exercises: [],
};
