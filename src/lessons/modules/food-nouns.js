/**
 * Module: Everyday Food Nouns
 * Unit 5 - Essential food vocabulary for daily life and restaurants
 * Common foods: bread, water, coffee, meat, vegetables, fruit
 */

export const foodNouns = {
  title: "Everyday Food Nouns",
  description:
    "Essential food vocabulary: une baguette, un croissant, un express (espresso), la pizza, le pain, l'eau, le café, la viande, les légumes",

  concepts: [
    {
      term: "Food Genders - Learn the article!",
      definition:
        "Always learn food nouns with their article - gender matters!",
      example: "le pain (masculine), la viande (feminine), l'eau (feminine)",
    },
    {
      term: "Using Partitive Articles",
      definition:
        "With food, use du/de la/des for 'some' - je veux du pain (I want some bread)",
      example:
        "je veux du café (some coffee), de la viande (some meat), des légumes (some vegetables)",
    },
    {
      term: "At the Restaurant",
      definition: "These are the foods you'll see and order every day!",
      example:
        "je voudrais du pain, s'il vous plaît (I would like some bread, please)",
    },
    {
      term: "With aimer",
      definition:
        "Use definite article (le/la/les) with aimer - j'aime le pain (I like bread)",
      example: "j'aime le café (I like coffee), j'aime la viande (I like meat)",
    },
  ],

  vocabularyReference: [
    // Drinks
    { french: "l'eau", english: "water", note: "feminine (l'eau)" },
    { french: "le café", english: "coffee", note: "masculine - very common!" },
    {
      french: "un express",
      english: "espresso",
      note: "masculine - short strong coffee",
    },
    { french: "le thé", english: "tea", note: "masculine" },
    { french: "le lait", english: "milk", note: "masculine" },
    { french: "le vin", english: "wine", note: "masculine" },
    { french: "la bière", english: "beer", note: "feminine" },
    { french: "le jus", english: "juice", note: "masculine" },

    // Basics
    { french: "le pain", english: "bread", note: "masculine - essential!" },
    {
      french: "une baguette",
      english: "baguette",
      note: "feminine - iconic French bread!",
    },
    {
      french: "un croissant",
      english: "croissant",
      note: "masculine - classic breakfast!",
    },
    { french: "le beurre", english: "butter", note: "masculine" },
    { french: "le fromage", english: "cheese", note: "masculine" },
    { french: "la pizza", english: "pizza", note: "feminine" },
    { french: "le sel", english: "salt", note: "masculine" },
    { french: "le poivre", english: "pepper", note: "masculine" },
    { french: "le sucre", english: "sugar", note: "masculine" },

    // Proteins
    { french: "la viande", english: "meat", note: "feminine" },
    { french: "le poulet", english: "chicken", note: "masculine" },
    { french: "le poisson", english: "fish", note: "masculine" },
    { french: "le bœuf", english: "beef", note: "masculine" },
    { french: "le porc", english: "pork", note: "masculine" },
    { french: "les œufs", english: "eggs", note: "masculine plural" },

    // Vegetables
    { french: "les légumes", english: "vegetables", note: "masculine plural" },
    { french: "la salade", english: "salad/lettuce", note: "feminine" },
    { french: "la tomate", english: "tomato", note: "feminine" },
    {
      french: "la pomme de terre",
      english: "potato",
      note: "feminine - literally 'apple of earth'",
    },
    { french: "les frites", english: "fries", note: "feminine plural" },
    { french: "les haricots", english: "beans", note: "masculine plural" },

    // Fruits
    { french: "les fruits", english: "fruits", note: "masculine plural" },
    { french: "la pomme", english: "apple", note: "feminine" },
    { french: "la banane", english: "banana", note: "feminine" },
    { french: "l'orange", english: "orange", note: "feminine" },

    // Carbs
    { french: "le riz", english: "rice", note: "masculine" },
    { french: "les pâtes", english: "pasta", note: "feminine plural" },

    // Desserts
    { french: "le gâteau", english: "cake", note: "masculine" },
    { french: "la glace", english: "ice cream", note: "feminine" },
    { french: "le chocolat", english: "chocolate", note: "masculine" },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: 'Say "I want water"',
        prompt: "I want water",
        hint: "je veux + de l'eau (use partitive!)",
        expectedAnswer: "je veux de l'eau",
        acceptableAnswers: ["je veux de l eau", "je veux l'eau"],
        wrongAnswers: [
          {
            answer: "je veux le eau",
            feedback: "eau starts with vowel, use l'eau not 'le eau'",
          },
        ],
      },
      {
        instruction: 'Say "I like coffee"',
        prompt: "I like coffee",
        hint: "j'aime + le café (definite article with aimer!)",
        expectedAnswer: "j'aime le café",
        acceptableAnswers: ["j aime le café"],
        wrongAnswers: [
          {
            answer: "j'aime du café",
            feedback: "Use 'le' with aimer, not 'du': j'aime le café",
          },
        ],
      },
      {
        instruction: 'Say "I would like some bread" (polite)',
        prompt: "I would like some bread",
        hint: "je voudrais + du pain",
        expectedAnswer: "je voudrais du pain",
        wrongAnswers: [
          {
            answer: "je voudrais le pain",
            feedback: "Use partitive 'du' for some: je voudrais du pain",
          },
        ],
      },
      {
        instruction: 'Say "I want a baguette"',
        prompt: "I want a baguette",
        hint: "je veux + une baguette (feminine!)",
        expectedAnswer: "je veux une baguette",
        wrongAnswers: [
          {
            answer: "je veux un baguette",
            feedback: "baguette is feminine, use 'une' not 'un'",
          },
        ],
      },
      {
        instruction: 'Say "I would like a croissant"',
        prompt: "I would like a croissant",
        hint: "je voudrais + un croissant",
        expectedAnswer: "je voudrais un croissant",
        wrongAnswers: [
          {
            answer: "je voudrais une croissant",
            feedback: "croissant is masculine, use 'un' not 'une'",
          },
        ],
      },
      {
        instruction: 'Say "I like pizza"',
        prompt: "I like pizza",
        hint: "j'aime + la pizza (feminine!)",
        expectedAnswer: "j'aime la pizza",
        acceptableAnswers: ["j aime la pizza"],
        wrongAnswers: [
          {
            answer: "j'aime le pizza",
            feedback: "pizza is feminine, use 'la' not 'le'",
          },
        ],
      },
      {
        instruction: 'Say "I want an espresso" (express)',
        prompt: "I want an espresso",
        hint: "je veux + un express",
        expectedAnswer: "je veux un express",
        wrongAnswers: [
          {
            answer: "je veux une express",
            feedback: "express is masculine, use 'un' not 'une'",
          },
        ],
      },
      {
        instruction: 'Say "I want some tea"',
        prompt: "I want some tea",
        hint: "je veux + du thé",
        expectedAnswer: "je veux du thé",
        acceptableAnswers: ["je veux du thé"],
        wrongAnswers: [
          {
            answer: "je veux de thé",
            feedback: "Use 'du' (de + le) for masculine: du thé",
          },
        ],
      },
      {
        instruction: 'Say "the bread is good"',
        prompt: "the bread is good",
        hint: "le pain + est + bon",
        expectedAnswer: "le pain est bon",
        wrongAnswers: [
          {
            answer: "la pain est bon",
            feedback: "pain is masculine, use 'le' not 'la'",
          },
        ],
      },
      {
        instruction: 'Say "I like cheese"',
        prompt: "I like cheese",
        hint: "j'aime + le fromage",
        expectedAnswer: "j'aime le fromage",
        acceptableAnswers: ["j aime le fromage"],
        wrongAnswers: [
          {
            answer: "j'aime la fromage",
            feedback: "fromage is masculine, use 'le' not 'la'",
          },
        ],
      },
      {
        instruction: 'Say "I want some meat"',
        prompt: "I want some meat",
        hint: "je veux + de la viande (feminine!)",
        expectedAnswer: "je veux de la viande",
        wrongAnswers: [
          {
            answer: "je veux du viande",
            feedback: "viande is feminine, use 'de la' not 'du'",
          },
        ],
      },
      {
        instruction: 'Say "I like chicken"',
        prompt: "I like chicken",
        hint: "j'aime + le poulet",
        expectedAnswer: "j'aime le poulet",
        acceptableAnswers: ["j aime le poulet"],
        wrongAnswers: [
          {
            answer: "j'aime la poulet",
            feedback: "poulet is masculine, use 'le' not 'la'",
          },
        ],
      },
      {
        instruction: 'Say "I want some fish"',
        prompt: "I want some fish",
        hint: "je veux + du poisson",
        expectedAnswer: "je veux du poisson",
        wrongAnswers: [
          {
            answer: "je veux de la poisson",
            feedback: "poisson is masculine, use 'du' not 'de la'",
          },
        ],
      },
      {
        instruction: 'Say "I like vegetables"',
        prompt: "I like vegetables",
        hint: "j'aime + les légumes",
        expectedAnswer: "j'aime les légumes",
        acceptableAnswers: ["j aime les légumes"],
        wrongAnswers: [
          {
            answer: "j'aime des légumes",
            feedback: "Use definite article 'les' with aimer, not 'des'",
          },
        ],
      },
      {
        instruction: 'Say "I want a salad"',
        prompt: "I want a salad",
        hint: "je veux + une salade",
        expectedAnswer: "je veux une salade",
        wrongAnswers: [
          {
            answer: "je veux un salade",
            feedback: "salade is feminine, use 'une' not 'un'",
          },
        ],
      },
      {
        instruction: 'Say "I like fries"',
        prompt: "I like fries",
        hint: "j'aime + les frites",
        expectedAnswer: "j'aime les frites",
        acceptableAnswers: ["j aime les frites"],
        wrongAnswers: [
          {
            answer: "j'aime des frites",
            feedback: "Use 'les' with aimer, not 'des'",
          },
        ],
      },
      {
        instruction: 'Say "I want some fruit"',
        prompt: "I want some fruit",
        hint: "je veux + des fruits (plural!)",
        expectedAnswer: "je veux des fruits",
        wrongAnswers: [
          {
            answer: "je veux les fruits",
            feedback: "Use partitive 'des' for some: je veux des fruits",
          },
        ],
      },
      {
        instruction: 'Say "I like apples"',
        prompt: "I like apples",
        hint: "j'aime + les pommes (plural!)",
        expectedAnswer: "j'aime les pommes",
        acceptableAnswers: ["j aime les pommes"],
        wrongAnswers: [
          {
            answer: "j'aime des pommes",
            feedback: "Use 'les' with aimer for general like, not 'des'",
          },
        ],
      },
      {
        instruction: 'Say "I want some rice"',
        prompt: "I want some rice",
        hint: "je veux + du riz",
        expectedAnswer: "je veux du riz",
        wrongAnswers: [
          {
            answer: "je veux de la riz",
            feedback: "riz is masculine, use 'du' not 'de la'",
          },
        ],
      },
      {
        instruction: 'Say "I like pasta"',
        prompt: "I like pasta",
        hint: "j'aime + les pâtes (plural!)",
        expectedAnswer: "j'aime les pâtes",
        acceptableAnswers: ["j aime les pâtes", "j'aime les pates"],
        wrongAnswers: [
          {
            answer: "j'aime la pâtes",
            feedback: "pâtes is plural, use 'les' not 'la'",
          },
        ],
      },
      {
        instruction: 'Say "I want some cake"',
        prompt: "I want some cake",
        hint: "je veux + du gâteau",
        expectedAnswer: "je veux du gâteau",
        acceptableAnswers: ["je veux du gateau"],
        wrongAnswers: [
          {
            answer: "je veux de la gâteau",
            feedback: "gâteau is masculine, use 'du' not 'de la'",
          },
        ],
      },
      {
        instruction: 'Say "I like ice cream"',
        prompt: "I like ice cream",
        hint: "j'aime + la glace",
        expectedAnswer: "j'aime la glace",
        acceptableAnswers: ["j aime la glace"],
        wrongAnswers: [
          {
            answer: "j'aime le glace",
            feedback: "glace is feminine, use 'la' not 'le'",
          },
        ],
      },
      {
        instruction: 'Say "I want some chocolate"',
        prompt: "I want some chocolate",
        hint: "je veux + du chocolat",
        expectedAnswer: "je veux du chocolat",
        wrongAnswers: [
          {
            answer: "je veux de la chocolat",
            feedback: "chocolat is masculine, use 'du' not 'de la'",
          },
        ],
      },
      {
        instruction: 'Say "I do not like fish"',
        prompt: "I don't like fish",
        hint: "je n'aime pas + le poisson",
        expectedAnswer: "je n'aime pas le poisson",
        acceptableAnswers: ["je n aime pas le poisson"],
        wrongAnswers: [
          {
            answer: "je n'aime pas de poisson",
            feedback:
              "Keep 'le' with aimer even in negative: je n'aime pas le poisson",
          },
        ],
      },
    ],
  },
};
