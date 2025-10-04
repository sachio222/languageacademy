/**
 * Unit 5 Practice - Fill in the blank exercise
 * Typeform-style interactive sentence completion covering Unit 5 material
 * Covers: comparisons, slang, conditionals, past tense, food vocab, aimer, manger, boire
 */

export const unit5Practice = {
  title: "Unit 5 Practice - Fill in the Blanks",
  description:
    "Complete sentences using comparisons, past tense, conditionals, and food vocabulary from Unit 5!",

  // Special flags - REQUIRED for fill-in-blank modules
  isFillInTheBlank: true,
  skipStudyMode: true,

  // Leave empty - not used for fill-in-blank
  concepts: [],
  vocabularyReference: [],
  exercises: [],

  sentences: [
    // Past tense - être
    {
      text: "Hier, j' avec mon ami.",
      instruction: "Complete: 'Yesterday, I was with my friend'",
      blanks: [
        {
          position: 9,
          answer: "étais",
          hint: "être in past tense for je",
        },
      ],
    },
    {
      text: "Le restaurant  très bon.",
      instruction: "Complete: 'The restaurant was very good'",
      blanks: [
        {
          position: 14,
          answer: "était",
          hint: "être in past tense for il/elle",
        },
      ],
    },
    {
      text: "Nous  au café hier.",
      instruction: "Complete: 'We were at the café yesterday'",
      blanks: [
        {
          position: 5,
          answer: "étions",
          hint: "être in past tense for nous",
        },
      ],
    },

    // Past tense - avoir
    {
      text: "J' faim hier.",
      instruction:
        "Complete: 'I was hungry yesterday' (literally: I had hunger)",
      blanks: [
        {
          position: 2,
          answer: "avais",
          hint: "avoir in past tense for je",
        },
      ],
    },
    {
      text: "Nous  un chat.",
      instruction: "Complete: 'We had a cat'",
      blanks: [
        {
          position: 5,
          answer: "avions",
          hint: "avoir in past tense for nous",
        },
      ],
    },

    // Conditionals - should
    {
      text: "Je  manger maintenant.",
      instruction: "Complete: 'I should eat now'",
      blanks: [
        {
          position: 3,
          answer: "devrais",
          hint: "should (conditional of devoir)",
        },
      ],
    },
    {
      text: "Tu  aller au restaurant.",
      instruction: "Complete: 'You should go to the restaurant'",
      blanks: [
        {
          position: 3,
          answer: "devrais",
          hint: "should for tu",
        },
      ],
    },

    // Conditionals - could
    {
      text: "Je  venir avec toi.",
      instruction: "Complete: 'I could come with you'",
      blanks: [
        {
          position: 3,
          answer: "pourrais",
          hint: "could (conditional of pouvoir)",
        },
      ],
    },
    {
      text: "Nous  boire du café.",
      instruction: "Complete: 'We could drink coffee'",
      blanks: [
        {
          position: 5,
          answer: "pourrions",
          hint: "could for nous",
        },
      ],
    },

    // Conditionals - would
    {
      text: "Je  du pain, s'il vous plaît.",
      instruction: "Complete: 'I would like bread, please'",
      blanks: [
        {
          position: 3,
          answer: "voudrais",
          hint: "would like (polite request)",
        },
      ],
    },
    {
      text: "J' à Paris.",
      instruction: "Complete: 'I would go to Paris'",
      blanks: [
        {
          position: 2,
          answer: "irais",
          hint: "would go (conditional of aller)",
        },
      ],
    },

    // Comparisons
    {
      text: "Ce restaurant est  que l'autre restaurant.",
      instruction:
        "Complete: 'This restaurant is better than the other restaurant'",
      blanks: [
        {
          position: 22,
          answer: "meilleur",
          hint: "better (comparison)",
        },
      ],
    },
    {
      text: "C'est le  café de Paris!",
      instruction: "Complete: 'It's the best café in Paris!'",
      blanks: [
        {
          position: 9,
          answer: "meilleur",
          hint: "the best (superlative)",
        },
      ],
    },
    {
      text: "C'est  cher!",
      instruction: "Complete: 'It's too expensive!'",
      blanks: [
        {
          position: 6,
          answer: "trop",
          hint: "too much / too",
        },
      ],
    },
    {
      text: "C'est le  restaurant où nous avons mangé.",
      instruction: "Complete: 'It's the same restaurant where we ate'",
      blanks: [
        {
          position: 9,
          answer: "même",
          hint: "the same",
        },
      ],
    },

    // aimer verb
    {
      text: "J' le café!",
      instruction: "Complete: 'I like coffee!'",
      blanks: [
        {
          position: 2,
          answer: "aime",
          hint: "to like/love for je",
        },
      ],
    },
    {
      text: "Tu  la pizza?",
      instruction: "Complete: 'You like pizza?'",
      blanks: [
        {
          position: 3,
          answer: "aimes",
          hint: "to like/love for tu",
        },
      ],
    },
    {
      text: "Nous  ce restaurant.",
      instruction: "Complete: 'We like this restaurant'",
      blanks: [
        {
          position: 5,
          answer: "aimons",
          hint: "to like/love for nous",
        },
      ],
    },

    // manger verb (present)
    {
      text: "Je  du pain.",
      instruction: "Complete: 'I eat bread'",
      blanks: [
        {
          position: 3,
          answer: "mange",
          hint: "to eat for je",
        },
      ],
    },
    {
      text: "Tu  une pizza.",
      instruction: "Complete: 'You eat a pizza'",
      blanks: [
        {
          position: 3,
          answer: "manges",
          hint: "to eat for tu",
        },
      ],
    },
    {
      text: "Nous  ensemble.",
      instruction: "Complete: 'We eat together'",
      blanks: [
        {
          position: 5,
          answer: "mangeons",
          hint: "to eat for nous (note: mangeons!)",
        },
      ],
    },

    // manger verb (passé composé)
    {
      text: "J'ai  une baguette hier.",
      instruction: "Complete: 'I ate a baguette yesterday'",
      blanks: [
        {
          position: 4,
          answer: "mangé",
          hint: "past participle of manger",
        },
      ],
    },
    {
      text: "Nous avons  du poulet.",
      instruction: "Complete: 'We ate chicken'",
      blanks: [
        {
          position: 11,
          answer: "mangé",
          hint: "past participle of manger",
        },
      ],
    },

    // boire verb (present)
    {
      text: "Je  du café.",
      instruction: "Complete: 'I drink coffee'",
      blanks: [
        {
          position: 3,
          answer: "bois",
          hint: "to drink for je (irregular!)",
        },
      ],
    },
    {
      text: "Nous  de l'eau.",
      instruction: "Complete: 'We drink water'",
      blanks: [
        {
          position: 5,
          answer: "buvons",
          hint: "to drink for nous (stem change to buv-!)",
        },
      ],
    },

    // boire verb (passé composé)
    {
      text: "J'ai  du vin hier.",
      instruction: "Complete: 'I drank wine yesterday'",
      blanks: [
        {
          position: 4,
          answer: "bu",
          hint: "past participle of boire (irregular!)",
        },
      ],
    },
    {
      text: "Nous avons  du café.",
      instruction: "Complete: 'We drank coffee'",
      blanks: [
        {
          position: 11,
          answer: "bu",
          hint: "past participle of boire",
        },
      ],
    },

    // Food vocabulary
    {
      text: "Je veux une .",
      instruction: "Complete: 'I want a baguette'",
      blanks: [
        {
          position: 12,
          answer: "baguette",
          hint: "French bread (feminine)",
        },
      ],
    },
    {
      text: "Je voudrais un , s'il vous plaît.",
      instruction: "Complete: 'I would like an espresso, please'",
      blanks: [
        {
          position: 15,
          answer: "express",
          hint: "espresso in French",
        },
      ],
    },

    // Slang
    {
      text: "C'est !",
      instruction: "Complete: 'It's awesome!' (French slang)",
      blanks: [
        {
          position: 6,
          answer: "génial",
          hint: "France slang for awesome",
        },
      ],
    },
    {
      text: "Ce restaurant est !",
      instruction: "Complete: 'This restaurant is the best!' (universal slang)",
      blanks: [
        {
          position: 18,
          answer: "top",
          hint: "universal slang for 'the best'",
        },
      ],
    },

    // Complex - Multiple blanks
    {
      text: "Nous  aller  restaurant.",
      instruction: "Complete: 'We should go to the restaurant'",
      blanks: [
        {
          position: 5,
          answer: "devrions",
          hint: "should for nous",
        },
        {
          position: 15,
          answer: "au",
          hint: "contraction: à + le",
        },
      ],
    },
    {
      text: "J'  faim et je veux  maintenant.",
      instruction: "Complete: 'I was hungry and I want to eat now'",
      blanks: [
        {
          position: 2,
          answer: "avais",
          hint: "had for je (avoir in past)",
        },
        {
          position: 25,
          answer: "manger",
          hint: "to eat (infinitive after veux)",
        },
      ],
    },
    {
      text: "Le pain  très bon et j'ai  du pain.",
      instruction: "Complete: 'The bread was very good and I ate bread'",
      blanks: [
        {
          position: 8,
          answer: "était",
          hint: "was (être in past)",
        },
        {
          position: 29,
          answer: "mangé",
          hint: "eaten (past participle)",
        },
      ],
    },
    {
      text: "C'est la  pizza de ma vie!",
      instruction: "Complete: 'It's the best pizza of my life!'",
      blanks: [
        {
          position: 9,
          answer: "meilleure",
          hint: "the best (feminine form)",
        },
      ],
    },
    {
      text: "Je ne  pas de viande.",
      instruction: "Complete: 'I don't eat meat'",
      blanks: [
        {
          position: 6,
          answer: "mange",
          hint: "eat for je (present tense)",
        },
      ],
    },
    {
      text: "Nous  du café hier.",
      instruction: "Complete: 'We drank coffee yesterday'",
      blanks: [
        {
          position: 5,
          answer: "avons bu",
          hint: "drank (passé composé with irregular bu)",
        },
      ],
    },
  ],
};
