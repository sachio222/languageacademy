/**
 * Unit 5 Exam - Comprehensive test for Sophistication unit
 * Tests comparisons, slang, conditionals, past tense, food vocab, and essential verbs
 */

export const unit5Exam = {
  title: "Unit 5 Final Exam - Sophistication",
  description:
    "Test everything from Unit 5! Comparisons, slang, past tense, conditionals, and food vocabulary.",

  // Special flags
  isUnitExam: true,
  unitNumber: 5,
  skipStudyMode: true,

  concepts: [],
  vocabularyReference: [],

  exerciseConfig: {
    type: "custom",
    items: [
      // SECTION 1: Comparisons & Intensity (6 questions)
      {
        instruction: "Translate to French",
        prompt: "more",
        hint: "Comparison word - makes adjectives comparative",
        expectedAnswer: "plus",
      },
      {
        instruction: "Translate to French",
        prompt: "less",
        hint: "Opposite of 'plus'",
        expectedAnswer: "moins",
      },
      {
        instruction: "Translate to French",
        prompt: "it's better (masculine)",
        hint: "c'est + comparative adjective",
        expectedAnswer: "c'est meilleur",
      },
      {
        instruction: "Translate to French",
        prompt: "the best book (masculine)",
        hint: "Superlative: article + meilleur + noun",
        expectedAnswer: "le meilleur livre",
      },
      {
        instruction: "Translate to French",
        prompt: "too expensive",
        hint: "Intensity modifier + adjective",
        expectedAnswer: "trop cher",
      },
      {
        instruction: "Translate to French",
        prompt: "the same thing",
        hint: "article + même + chose (feminine)",
        expectedAnswer: "la même chose",
        acceptableAnswers: ["le même chose"],
      },

      // SECTION 2: Slang Expressions (5 questions)
      {
        instruction: "Translate to French (France slang)",
        prompt: "it's awesome",
        hint: "Very common positive slang in France",
        expectedAnswer: "c'est génial",
        acceptableAnswers: ["c est génial", "c'est genial"],
      },
      {
        instruction: "Translate to French (France slang - verlan)",
        prompt: "it's crazy",
        hint: "Verlan for 'fou'",
        expectedAnswer: "c'est ouf",
        acceptableAnswers: ["c est ouf"],
      },
      {
        instruction: "Translate to French (universal slang)",
        prompt: "it's the best",
        hint: "Borrowed from English - one word",
        expectedAnswer: "c'est top",
        acceptableAnswers: ["c est top"],
      },
      {
        instruction: "Translate to French (France slang)",
        prompt: "it's really good (vachement)",
        hint: "c'est + slang intensity word + bon",
        expectedAnswer: "c'est vachement bon",
        acceptableAnswers: ["c est vachement bon"],
      },
      {
        instruction: "Translate to French (Quebec slang)",
        prompt: "it's sick/awesome",
        hint: "Quebec positive slang - literally 'sick'",
        expectedAnswer: "c'est malade",
        acceptableAnswers: ["c est malade"],
      },

      // SECTION 3: Conditionals - Should & Could (6 questions)
      {
        instruction: "Translate to French",
        prompt: "I should",
        hint: "Conditional form of devoir for je",
        expectedAnswer: "je devrais",
      },
      {
        instruction: "Translate to French",
        prompt: "you should (informal)",
        hint: "Conditional form of devoir for tu",
        expectedAnswer: "tu devrais",
      },
      {
        instruction: "Translate to French",
        prompt: "we should go",
        hint: "nous devrions + infinitive",
        expectedAnswer: "nous devrions aller",
      },
      {
        instruction: "Translate to French",
        prompt: "I could",
        hint: "Conditional form of pouvoir for je",
        expectedAnswer: "je pourrais",
      },
      {
        instruction: "Translate to French",
        prompt: "you could see (informal)",
        hint: "tu pourrais + infinitive voir",
        expectedAnswer: "tu pourrais voir",
      },
      {
        instruction: "Translate to French",
        prompt: "I should not go",
        hint: "Negation: je ne devrais pas + partir",
        expectedAnswer: "je ne devrais pas partir",
        acceptableAnswers: ["je ne devrais pas aller"],
      },

      // SECTION 4: Conditionals - Would Forms (5 questions)
      {
        instruction: "Translate to French",
        prompt: "I would like",
        hint: "Conditional form of vouloir - polite!",
        expectedAnswer: "je voudrais",
      },
      {
        instruction: "Translate to French",
        prompt: "we would like water",
        hint: "nous voudrions + de l'eau",
        expectedAnswer: "nous voudrions de l'eau",
        acceptableAnswers: ["nous voudrions de l eau"],
      },
      {
        instruction: "Translate to French",
        prompt: "I would go",
        hint: "Conditional form of aller for je",
        expectedAnswer: "j'irais",
        acceptableAnswers: ["j irais"],
      },
      {
        instruction: "Translate to French",
        prompt: "you would go there (informal)",
        hint: "tu irais + location adverb",
        expectedAnswer: "tu irais là",
        acceptableAnswers: ["tu irais la"],
      },
      {
        instruction: "Translate to French",
        prompt: "I would do that",
        hint: "Conditional form of faire + ça",
        expectedAnswer: "je ferais ça",
        acceptableAnswers: ["je ferais ca"],
      },

      // SECTION 5: Past Tense - être (5 questions)
      {
        instruction: "Translate to French",
        prompt: "I was",
        hint: "Imperfect tense of être for je",
        expectedAnswer: "j'étais",
        acceptableAnswers: ["j étais", "j'etais"],
      },
      {
        instruction: "Translate to French",
        prompt: "you were (informal)",
        hint: "Imperfect tense of être for tu",
        expectedAnswer: "tu étais",
        acceptableAnswers: ["tu etais"],
      },
      {
        instruction: "Translate to French",
        prompt: "it was good",
        hint: "c'était + adjective",
        expectedAnswer: "c'était bon",
        acceptableAnswers: ["c etait bon", "c'etait bon"],
      },
      {
        instruction: "Translate to French",
        prompt: "we were here",
        hint: "nous étions + location adverb",
        expectedAnswer: "nous étions ici",
        acceptableAnswers: ["nous etions ici"],
      },
      {
        instruction: "Translate to French",
        prompt: "they were happy",
        hint: "ils étaient + adjective",
        expectedAnswer: "ils étaient contents",
        acceptableAnswers: ["elles étaient contents", "ils etaient contents"],
      },

      // SECTION 6: Past Tense - avoir (5 questions)
      {
        instruction: "Translate to French",
        prompt: "I had",
        hint: "Imperfect tense of avoir for je",
        expectedAnswer: "j'avais",
        acceptableAnswers: ["j avais"],
      },
      {
        instruction: "Translate to French",
        prompt: "you had (informal)",
        hint: "Imperfect tense of avoir for tu",
        expectedAnswer: "tu avais",
      },
      {
        instruction: "Translate to French",
        prompt: "I was hungry",
        hint: "avoir faim in past tense",
        expectedAnswer: "j'avais faim",
        acceptableAnswers: ["j avais faim"],
      },
      {
        instruction: "Translate to French",
        prompt: "we had a cat",
        hint: "nous avions + un chat",
        expectedAnswer: "nous avions un chat",
      },
      {
        instruction: "Translate to French",
        prompt: "she had time",
        hint: "elle avait + le temps",
        expectedAnswer: "elle avait le temps",
      },

      // SECTION 7: aimer Verb (4 questions)
      {
        instruction: "Translate to French",
        prompt: "I like coffee",
        hint: "aimer + article + noun",
        expectedAnswer: "j'aime le café",
        acceptableAnswers: ["j aime le café", "j'aime le cafe"],
      },
      {
        instruction: "Translate to French",
        prompt: "you like bread (informal)",
        hint: "tu aimes + article + noun",
        expectedAnswer: "tu aimes le pain",
      },
      {
        instruction: "Translate to French",
        prompt: "we like pizza",
        hint: "nous aimons + article + noun",
        expectedAnswer: "nous aimons la pizza",
      },
      {
        instruction: "Translate to French",
        prompt: "I love you",
        hint: "Famous phrase! Object pronoun before verb",
        expectedAnswer: "je t'aime",
        acceptableAnswers: ["je t aime"],
      },

      // SECTION 8: manger Verb - Present & Past (5 questions)
      {
        instruction: "Translate to French",
        prompt: "I eat",
        hint: "manger conjugated for je",
        expectedAnswer: "je mange",
      },
      {
        instruction: "Translate to French",
        prompt: "you eat (informal)",
        hint: "manger conjugated for tu",
        expectedAnswer: "tu manges",
      },
      {
        instruction: "Translate to French",
        prompt: "we eat",
        hint: "manger conjugated for nous - careful with spelling!",
        expectedAnswer: "nous mangeons",
      },
      {
        instruction: "Translate to French",
        prompt: "I ate",
        hint: "Passé composé: avoir + past participle",
        expectedAnswer: "j'ai mangé",
        acceptableAnswers: ["j ai mangé", "j'ai mange"],
      },
      {
        instruction: "Translate to French",
        prompt: "we ate bread",
        hint: "Passé composé + partitive article",
        expectedAnswer: "nous avons mangé du pain",
        acceptableAnswers: ["nous avons mange du pain"],
      },

      // SECTION 9: boire Verb - Present & Past (5 questions)
      {
        instruction: "Translate to French",
        prompt: "I drink",
        hint: "boire conjugated for je (irregular!)",
        expectedAnswer: "je bois",
      },
      {
        instruction: "Translate to French",
        prompt: "you drink (informal)",
        hint: "boire conjugated for tu",
        expectedAnswer: "tu bois",
      },
      {
        instruction: "Translate to French",
        prompt: "we drink",
        hint: "boire conjugated for nous - stem changes to buv-!",
        expectedAnswer: "nous buvons",
      },
      {
        instruction: "Translate to French",
        prompt: "I drank",
        hint: "Passé composé: avoir + irregular past participle!",
        expectedAnswer: "j'ai bu",
        acceptableAnswers: ["j ai bu"],
      },
      {
        instruction: "Translate to French",
        prompt: "we drank coffee",
        hint: "Passé composé + partitive article",
        expectedAnswer: "nous avons bu du café",
        acceptableAnswers: ["nous avons bu du cafe"],
      },

      // SECTION 10: Food Vocabulary (6 questions)
      {
        instruction: "Translate to French",
        prompt: "bread",
        hint: "Essential food - masculine",
        expectedAnswer: "le pain",
        acceptableAnswers: ["pain"],
      },
      {
        instruction: "Translate to French",
        prompt: "a baguette",
        hint: "Iconic French bread - feminine",
        expectedAnswer: "une baguette",
      },
      {
        instruction: "Translate to French",
        prompt: "an espresso",
        hint: "Short strong coffee",
        expectedAnswer: "un express",
      },
      {
        instruction: "Translate to French",
        prompt: "pizza",
        hint: "Italian food - feminine in French",
        expectedAnswer: "la pizza",
        acceptableAnswers: ["pizza"],
      },
      {
        instruction: "Translate to French",
        prompt: "water",
        hint: "Essential drink - feminine, starts with vowel",
        expectedAnswer: "l'eau",
        acceptableAnswers: ["l eau", "eau"],
      },
      {
        instruction: "Translate to French",
        prompt: "wine",
        hint: "Drink - masculine",
        expectedAnswer: "le vin",
        acceptableAnswers: ["vin"],
      },

      // SECTION 11: Complex Combinations (8 questions)
      {
        instruction: "Translate to French",
        prompt: "I would like a coffee, please",
        hint: "Polite request with survival phrase",
        expectedAnswer: "je voudrais un café s'il vous plaît",
        acceptableAnswers: [
          "je voudrais un café, s'il vous plaît",
          "je voudrais un cafe s'il vous plait",
        ],
      },
      {
        instruction: "Translate to French",
        prompt: "I ate a baguette yesterday",
        hint: "Passé composé + article + noun + time adverb",
        expectedAnswer: "j'ai mangé une baguette hier",
        acceptableAnswers: ["j ai mange une baguette hier"],
      },
      {
        instruction: "Translate to French",
        prompt: "we drank wine at the restaurant",
        hint: "Passé composé + partitive + location",
        expectedAnswer: "nous avons bu du vin au restaurant",
      },
      {
        instruction: "Translate to French",
        prompt: "this restaurant is better than the other",
        hint: "demonstrative + noun + comparison structure",
        expectedAnswer: "ce restaurant est meilleur que l'autre",
        acceptableAnswers: ["ce restaurant est meilleur que l autre"],
      },
      {
        instruction: "Translate to French",
        prompt: "you should eat here (informal)",
        hint: "Conditional + infinitive + location",
        expectedAnswer: "tu devrais manger ici",
      },
      {
        instruction: "Translate to French",
        prompt: "I was very happy yesterday",
        hint: "Past tense être + très + adjective + time",
        expectedAnswer: "j'étais très content hier",
        acceptableAnswers: [
          "j etais très content hier",
          "j'étais très contente hier",
        ],
      },
      {
        instruction: "Translate to French",
        prompt: "we could go to the café",
        hint: "Conditional + infinitive + contraction",
        expectedAnswer: "nous pourrions aller au café",
        acceptableAnswers: ["nous pourrions aller au cafe"],
      },
      {
        instruction: "Translate to French",
        prompt: "I like to eat pizza",
        hint: "aimer + infinitive + article + noun",
        expectedAnswer: "j'aime manger de la pizza",
        acceptableAnswers: [
          "j aime manger de la pizza",
          "j'aime manger la pizza",
        ],
      },

      // SECTION 12: Negations in New Tenses (4 questions)
      {
        instruction: "Translate to French",
        prompt: "I did not eat",
        hint: "Passé composé negative: ne + avoir + pas + mangé",
        expectedAnswer: "je n'ai pas mangé",
        acceptableAnswers: ["je n ai pas mangé", "je n'ai pas mange"],
      },
      {
        instruction: "Translate to French",
        prompt: "we did not drink",
        hint: "Passé composé negative: ne + avoir + pas + bu",
        expectedAnswer: "nous n'avons pas bu",
        acceptableAnswers: ["nous n avons pas bu"],
      },
      {
        instruction: "Translate to French",
        prompt: "I was not here",
        hint: "Past tense negative: je n'étais pas + ici",
        expectedAnswer: "je n'étais pas ici",
        acceptableAnswers: ["je n étais pas ici", "je n'etais pas ici"],
      },
      {
        instruction: "Translate to French",
        prompt: "I should not go",
        hint: "Conditional negative: je ne devrais pas + partir",
        expectedAnswer: "je ne devrais pas partir",
        acceptableAnswers: ["je ne devrais pas aller"],
      },

      // SECTION 13: Mixed Mastery (6 questions)
      {
        instruction: "Translate to French",
        prompt: "everybody",
        hint: "Literally 'all the world'",
        expectedAnswer: "tout le monde",
      },
      {
        instruction: "Translate to French",
        prompt: "I don't like meat",
        hint: "Negation with aimer - keep definite article!",
        expectedAnswer: "je n'aime pas la viande",
        acceptableAnswers: ["je n aime pas la viande"],
      },
      {
        instruction: "Translate to French",
        prompt: "we eat together",
        hint: "nous mangeons + adverb",
        expectedAnswer: "nous mangeons ensemble",
      },
      {
        instruction: "Translate to French",
        prompt: "they were at the restaurant yesterday",
        hint: "Past tense être + location + time",
        expectedAnswer: "ils étaient au restaurant hier",
        acceptableAnswers: [
          "elles étaient au restaurant hier",
          "ils etaient au restaurant hier",
        ],
      },
      {
        instruction: "Translate to French",
        prompt: "it's the best pizza of my life",
        hint: "Superlative + de + possessive + vie",
        expectedAnswer: "c'est la meilleure pizza de ma vie",
        acceptableAnswers: ["c est la meilleure pizza de ma vie"],
      },
      {
        instruction: "Translate to French",
        prompt: "you could drink wine here (informal)",
        hint: "Conditional + infinitive + partitive + location",
        expectedAnswer: "tu pourrais boire du vin ici",
      },
    ],
  },
};
