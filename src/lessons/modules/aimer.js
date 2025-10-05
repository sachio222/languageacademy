/**
 * Module: aimer (to like/love)
 * Unit 5 - Essential emotion verb, regular -ER conjugation
 * First -ER verb after parler - very high frequency (rank 51)
 */

export const aimerModule = {
  title: "aimer - To Like / To Love",
  description:
    "Express what you like and love: j'aime le café (I like coffee), j'aime bien (I like), je t'aime (I love you)",

  concepts: [
    {
      term: "aimer = to like OR to love",
      definition:
        "Context determines meaning - can mean both 'like' and 'love'",
      example:
        "j'aime le café (I like coffee), j'aime ma mère (I love my mother)",
    },
    {
      term: "aimer bien = to like (casual)",
      definition:
        "Adding 'bien' makes it clearly 'like' not 'love' - less intense",
      example: "j'aime bien ce livre (I like this book)",
    },
    {
      term: "Regular -ER verb pattern",
      definition: "Follows same pattern as parler - drop -er, add endings",
      example: "je parle → j'aime, tu parles → tu aimes, il parle → il aime",
    },
    {
      term: "With people vs things",
      definition: "With people often means 'love', with things means 'like'",
      example: "j'aime Pierre (I love Pierre), j'aime le pain (I like bread)",
    },
    {
      term: "With infinitives",
      definition: "Use aimer + infinitive to say you like doing something",
      example: "j'aime parler français (I like speaking French)",
    },
  ],

  vocabularyReference: [
    {
      french: "aimer",
      english: "to like / to love",
      note: "infinitive form - regular -ER verb",
    },
    {
      french: "j'aime",
      english: "I like / I love",
      note: "j' before vowel",
    },
    {
      french: "tu aimes",
      english: "you like / you love (informal)",
      note: "regular -ER ending: -es",
    },
    {
      french: "il/elle aime",
      english: "he/she likes / loves",
      note: "regular -ER ending: -e",
    },
    {
      french: "nous aimons",
      english: "we like / we love",
      note: "regular -ER ending: -ons",
    },
    {
      french: "vous aimez",
      english: "you like / you love (formal/plural)",
      note: "regular -ER ending: -ez",
    },
    {
      french: "ils/elles aiment",
      english: "they like / they love",
      note: "regular -ER ending: -ent (silent)",
    },
    {
      french: "aimer bien",
      english: "to like (casual)",
      note: "less intense than aimer alone",
    },
    {
      french: "je t'aime",
      english: "I love you",
      note: "❤️ famous phrase!",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: 'Say "I like coffee"',
        prompt: "I like coffee",
        hint: "j'aime + le café",
        expectedAnswer: "j'aime le café",
        acceptableAnswers: ["j aime le café"],
        wrongAnswers: [
          {
            answer: "je aime le café",
            feedback: "Use j' before vowel: j'aime",
          },
        ],
      },
      {
        instruction: 'Say "I like this book"',
        prompt: "I like this book",
        hint: "j'aime + ce livre",
        expectedAnswer: "j'aime ce livre",
        acceptableAnswers: ["j aime ce livre"],
        wrongAnswers: [
          {
            answer: "j'aime bien ce livre",
            feedback: "Both work! But the expected answer is just 'j'aime'",
          },
        ],
      },
      {
        instruction: 'Say "you like bread" (informal)',
        prompt: "you like bread",
        hint: "tu + aimes + le pain",
        expectedAnswer: "tu aimes le pain",
        wrongAnswers: [
          {
            answer: "tu aime le pain",
            feedback: "Add -s for 'tu': tu aimes",
          },
        ],
      },
      {
        instruction: 'Say "you like Paris" (informal)',
        prompt: "you like Paris",
        hint: "tu + aimes + Paris",
        expectedAnswer: "tu aimes Paris",
        wrongAnswers: [
          {
            answer: "tu aime Paris",
            feedback: "Add -s for 'tu': tu aimes",
          },
        ],
      },
      {
        instruction: 'Say "he likes water"',
        prompt: "he likes water",
        hint: "il + aime + l'eau",
        expectedAnswer: "il aime l'eau",
        acceptableAnswers: ["il aime l eau"],
        wrongAnswers: [
          {
            answer: "il aimes l'eau",
            feedback: "Third person uses 'aime' not 'aimes'",
          },
        ],
      },
      {
        instruction: 'Say "she loves Paris"',
        prompt: "she loves Paris",
        hint: "elle + aime + Paris",
        expectedAnswer: "elle aime Paris",
        wrongAnswers: [
          {
            answer: "elle aimes Paris",
            feedback: "Third person uses 'aime' not 'aimes'",
          },
        ],
      },
      {
        instruction: 'Say "we like this"',
        prompt: "we like this",
        hint: "nous + aimons + ça",
        expectedAnswer: "nous aimons ça",
        wrongAnswers: [
          {
            answer: "nous aime ça",
            feedback: "Use 'aimons' for nous: nous aimons",
          },
        ],
      },
      {
        instruction: 'Say "we love coffee"',
        prompt: "we love coffee",
        hint: "nous + aimons + le café",
        expectedAnswer: "nous aimons le café",
        wrongAnswers: [
          {
            answer: "nous aimez le café",
            feedback: "Use 'aimons' for nous, not 'aimez'",
          },
        ],
      },
      {
        instruction: 'Say "you like that" (formal or plural)',
        prompt: "you like that (formal)",
        hint: "vous + aimez + ça",
        expectedAnswer: "vous aimez ça",
        wrongAnswers: [
          {
            answer: "vous aime ça",
            feedback: "Use 'aimez' for vous: vous aimez",
          },
        ],
      },
      {
        instruction: 'Say "you love Paris" (formal)',
        prompt: "you love Paris (formal)",
        hint: "vous + aimez + Paris",
        expectedAnswer: "vous aimez Paris",
        wrongAnswers: [
          {
            answer: "vous aimons Paris",
            feedback: "Use 'aimez' for vous, not 'aimons'",
          },
        ],
      },
      {
        instruction: 'Say "they like bread"',
        prompt: "they like bread",
        hint: "ils/elles + aiment + le pain",
        expectedAnswer: "ils aiment le pain",
        acceptableAnswers: ["elles aiment le pain"],
        wrongAnswers: [
          {
            answer: "ils aime le pain",
            feedback: "Add -nt for ils/elles: ils aiment",
          },
        ],
      },
      {
        instruction: 'Say "they love Paris"',
        prompt: "they love Paris",
        hint: "ils/elles + aiment + Paris",
        expectedAnswer: "ils aiment Paris",
        acceptableAnswers: ["elles aiment Paris"],
        wrongAnswers: [
          {
            answer: "ils aimes Paris",
            feedback: "Use 'aiment' for ils/elles, not 'aimes'",
          },
        ],
      },
      {
        instruction: 'Say "I like speaking French"',
        prompt: "I like speaking French",
        hint: "j'aime + parler français",
        expectedAnswer: "j'aime parler français",
        acceptableAnswers: ["j aime parler français"],
        wrongAnswers: [
          {
            answer: "j'aime parle français",
            feedback: "Use infinitive 'parler' not 'parle'",
          },
        ],
      },
      {
        instruction: 'Say "you like going to Paris" (informal)',
        prompt: "you like going to Paris",
        hint: "tu aimes + aller + à Paris",
        expectedAnswer: "tu aimes aller à Paris",
        wrongAnswers: [
          {
            answer: "tu aimes vas à Paris",
            feedback: "Use infinitive 'aller' not 'vas'",
          },
        ],
      },
      {
        instruction: 'Say "we like working"',
        prompt: "we like working",
        hint: "nous aimons + travailler",
        expectedAnswer: "nous aimons travailler",
        wrongAnswers: [
          {
            answer: "nous aimons travail",
            feedback: "Use infinitive 'travailler' not noun 'travail'",
          },
        ],
      },
      {
        instruction: 'Say "I do not like that"',
        prompt: "I don't like that",
        hint: "je n'aime pas + ça",
        expectedAnswer: "je n'aime pas ça",
        acceptableAnswers: ["je n aime pas ça"],
        wrongAnswers: [
          {
            answer: "j'aime ne pas ça",
            feedback: "Put 'ne' before verb: je n'aime pas",
          },
        ],
      },
      {
        instruction: 'Say "you do not like coffee" (informal)',
        prompt: "you don't like coffee",
        hint: "tu n'aimes pas + le café",
        expectedAnswer: "tu n'aimes pas le café",
        acceptableAnswers: ["tu n aimes pas le café"],
        wrongAnswers: [
          {
            answer: "tu ne aimes pas le café",
            feedback: "Use n' before vowel: tu n'aimes pas",
          },
        ],
      },
      {
        instruction: 'Say "we do not like that"',
        prompt: "we don't like that",
        hint: "nous n'aimons pas + ça",
        expectedAnswer: "nous n'aimons pas ça",
        acceptableAnswers: ["nous n aimons pas ça"],
        wrongAnswers: [
          {
            answer: "nous aimons ne pas ça",
            feedback: "Put 'ne' before verb: nous n'aimons pas",
          },
        ],
      },
      {
        instruction: 'Say "I love you" (famous phrase!)',
        prompt: "I love you",
        hint: "je t'aime (t' = object pronoun 'you')",
        expectedAnswer: "je t'aime",
        acceptableAnswers: ["je t aime"],
        wrongAnswers: [
          {
            answer: "j'aime tu",
            feedback: "Use object pronoun 't' before verb: je t'aime",
          },
          {
            answer: "j'aime toi",
            feedback: "Use 't' not 'toi': je t'aime",
          },
        ],
      },
      {
        instruction: 'Say "I really like this book" (casual like)',
        prompt: "I really like this book",
        hint: "j'aime bien + ce livre",
        expectedAnswer: "j'aime bien ce livre",
        acceptableAnswers: ["j aime bien ce livre"],
        wrongAnswers: [
          {
            answer: "j'aime ce livre bien",
            feedback: "Put 'bien' after 'aime': j'aime bien",
          },
        ],
      },
    ],
  },
};
