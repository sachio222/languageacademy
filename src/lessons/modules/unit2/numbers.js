/**
 * Dynamic Module (ID assigned automatically based on pedagogical position): Numbers - 0 to 100
 * Opens Unit 2. Every sentence uses Unit 1 words (avoir, être, pronouns, articles, basic nouns) plus the numbers.
 * The Reference unit's Numbers page (2024-04-02-numbers) stays open for lookup and covers 200 and up.
 */

// One fill-in-the-blank item. `words` lists the accepted spellings of the number, the preferred one first;
// the learner may type the number alone or the whole sentence. A wrong answer given as `blank` (what the learner
// might write in the blank) gets its feedback both typed alone and inside the sentence; one given as `answer` is
// a whole sentence and is matched as written.
const fill = (sentence, digits, words, { hint, wrongAnswers = [] }) => {
  const withWord = (w) => {
    const s = sentence.replace("___", w);
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  return {
    instruction: "Fill in the blank with the number in words",
    prompt: `${sentence} (${digits})`,
    hint,
    expectedAnswer: withWord(words[0]),
    acceptableAnswers: [...words, ...words.slice(1).map(withWord)],
    wrongAnswers: wrongAnswers.flatMap(({ blank, answer, feedback }) =>
      blank === undefined
        ? [{ answer, feedback }]
        : [{ answer: blank, feedback }, { answer: withWord(blank), feedback }]),
  };
};

// One count-on item: the learner writes the number that comes next.
const next = (sequence, words, { hint, wrongAnswers = [] }) => ({
  instruction: "Fill in the next number in words",
  prompt: `${sequence}, ___`,
  hint,
  expectedAnswer: words[0],
  acceptableAnswers: words.slice(1),
  wrongAnswers,
});

export const numbersLesson = {
  moduleKey: "2026-11-24-numbers", // Permanent identifier - never changes
  // id and module number are set dynamically
  title: "Numbers - 0 to 100",
  description:
    "Count from 0 to 100, say how old you are and how many things you have.",

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Count from 0 to 100 in French",
      "Say how old you are: j'ai vingt ans",
      "Say how many: nous avons deux enfants",
    ],
    realWorldUse: "say ages and count people and things",
    nextModuleTeaser: "Learn to say no: je ne suis pas, je n'ai pas",
  },

  concepts: [
    {
      term: "0 to 16",
      definition: "Each number up to 16 has its own word. Learn these by heart.",
      example:
        "zéro, un, deux, trois, quatre, cinq, six, sept, huit, neuf, dix, onze, douze, treize, quatorze, quinze, seize",
    },
    {
      term: "17 to 19",
      definition: "Say ten, then the number: 17 is ten-seven.",
      example: "dix-sept (17), dix-huit (18), dix-neuf (19)",
    },
    {
      term: "Tens up to 60",
      definition: "Learn the tens, then add the numbers 1 to 9 after them.",
      example: "vingt (20), trente (30), quarante (40), cinquante (50), soixante (60)",
    },
    {
      term: "21, 31, 41, 51 and 61",
      definition:
        "Put 'et' between the ten and 'un'. From 2 to 9, join them with a hyphen. Before a feminine noun, 'un' becomes 'une', as in 'une voiture'.",
      example:
        "vingt et un (21), vingt-deux (22), trente et un (31), quarante-cinq (45), cinquante et une voitures (51)",
    },
    {
      term: "70 to 79",
      definition:
        "French says 70 as sixty-ten, then counts on with 11 to 19: sixty-eleven, sixty-twelve, up to sixty-nineteen. 71 keeps 'et': 'soixante et onze'.",
      example:
        "soixante-dix (70), soixante et onze (71), soixante-douze (72), soixante-quinze (75), soixante-dix-neuf (79)",
    },
    {
      term: "80 to 100",
      definition:
        "80 is four twenties, with an s. From 81 on, the s goes and there is no 'et'. 90 to 99 add 10 to 19 to four twenties. 100 is 'cent'.",
      example:
        "quatre-vingts (80), quatre-vingt-un (81), quatre-vingt-cinq (85), quatre-vingt-dix (90), quatre-vingt-onze (91), quatre-vingt-dix-neuf (99), cent (100)",
    },
    {
      term: "Age uses avoir",
      definition:
        "To give an age, French says you have that many years: 'avoir', the number, then 'ans'.",
      example: "J'ai vingt ans. Paul a trente et un ans. La maison a cent ans.",
    },
    {
      term: "More numbers in the Reference section",
      definition:
        "The Numbers page in the Reference section lists 200, 1,000 and more, and the words Belgium and Switzerland use for 70 and 90. Open it whenever you need a number.",
      example: "deux cents (200), mille (1,000)",
    },
  ],

  vocabularyReference: [
    { french: "zéro", english: "zero", note: "0" },
    { french: "un", english: "one", note: "1, before a masculine noun" },
    { french: "une", english: "one", note: "1, before a feminine noun" },
    { french: "deux", english: "two", note: "2" },
    { french: "trois", english: "three", note: "3" },
    { french: "quatre", english: "four", note: "4" },
    { french: "cinq", english: "five", note: "5" },
    { french: "six", english: "six", note: "6" },
    { french: "sept", english: "seven", note: "7" },
    { french: "huit", english: "eight", note: "8" },
    { french: "neuf", english: "nine", note: "9" },
    { french: "dix", english: "ten", note: "10" },
    { french: "onze", english: "eleven", note: "11" },
    { french: "douze", english: "twelve", note: "12" },
    { french: "treize", english: "thirteen", note: "13" },
    { french: "quatorze", english: "fourteen", note: "14" },
    { french: "quinze", english: "fifteen", note: "15" },
    { french: "seize", english: "sixteen", note: "16" },
    { french: "dix-sept", english: "seventeen", note: "17, ten-seven" },
    { french: "dix-huit", english: "eighteen", note: "18" },
    { french: "dix-neuf", english: "nineteen", note: "19" },
    { french: "vingt", english: "twenty", note: "20" },
    { french: "vingt et un", english: "twenty-one", note: "21, also written vingt-et-un" },
    { french: "vingt-deux", english: "twenty-two", note: "22" },
    { french: "trente", english: "thirty", note: "30" },
    { french: "quarante", english: "forty", note: "40" },
    { french: "cinquante", english: "fifty", note: "50" },
    { french: "soixante", english: "sixty", note: "60" },
    { french: "soixante-dix", english: "seventy", note: "70, sixty-ten" },
    { french: "soixante et onze", english: "seventy-one", note: "71, sixty-eleven" },
    { french: "quatre-vingts", english: "eighty", note: "80, four twenties" },
    { french: "quatre-vingt-un", english: "eighty-one", note: "81, no s and no et" },
    { french: "quatre-vingt-dix", english: "ninety", note: "90, four twenties and ten" },
    { french: "cent", english: "one hundred", note: "100" },
    { french: "ans", english: "years (of age)", note: "j'ai vingt ans = I am 20" },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      fill("Il a ___ chats.", 3, ["trois"], {
        hint: "3 is 'trois'.",
        wrongAnswers: [{ blank: "deux", feedback: "'Deux' is 2. Write 3." }],
      }),
      fill("Nous avons ___ enfants.", 2, ["deux"], {
        hint: "2 is 'deux'.",
        wrongAnswers: [
          { blank: "des", feedback: "'Des' gives no number. Write 2." },
        ],
      }),
      fill("J'ai ___ voiture.", 1, ["une"], {
        hint: "'Voiture' is feminine.",
        wrongAnswers: [
          { blank: "un", feedback: "'Voiture' is feminine, so 1 is 'une'." },
        ],
      }),
      fill("Elle a ___ livres.", 12, ["douze"], {
        hint: "12 has its own word.",
        wrongAnswers: [{ blank: "deux", feedback: "'Deux' is 2. 12 is 'douze'." }],
      }),
      fill("Le chien a ___ ans.", 16, ["seize"], {
        hint: "16 has its own word, like 11 to 15.",
        wrongAnswers: [{ blank: "six", feedback: "'Six' is 6. 16 is 'seize'." }],
      }),
      next("quinze, seize", ["dix-sept", "dix sept"], {
        hint: "Ten, then seven.",
        wrongAnswers: [{ answer: "sept", feedback: "'Sept' is 7. 17 is ten-seven: 'dix-sept'." }],
      }),
      fill("Marie a ___ ans.", 19, ["dix-neuf", "dix neuf"], {
        hint: "Ten, then nine.",
        wrongAnswers: [{ blank: "neuf", feedback: "'Neuf' is 9. 19 is 'dix-neuf'." }],
      }),
      fill("J'ai ___ ans.", 20, ["vingt"], {
        hint: "For age, French uses avoir and 'ans'.",
        wrongAnswers: [
          { answer: "Je suis vingt ans.", feedback: "Age uses avoir, not être: 'j'ai vingt ans'." },
        ],
      }),
      fill("Tu as ___ ans.", 21, ["vingt et un", "vingt-et-un"], {
        hint: "21 puts 'et' between 'vingt' and 'un'.",
        wrongAnswers: [
          { blank: "vingt-un", feedback: "21 needs 'et': 'vingt et un'." },
        ],
      }),
      fill("Vous avez ___ amis.", 35, ["trente-cinq", "trente cinq"], {
        hint: "30 is 'trente'. Join 5 with a hyphen.",
        wrongAnswers: [
          { blank: "trente et cinq", feedback: "Only 21, 31, 41, 51, 61 and 71 take 'et'. 35 is 'trente-cinq'." },
        ],
      }),
      fill("Paul a ___ ans.", 48, ["quarante-huit", "quarante huit"], {
        hint: "40 is 'quarante'.",
      }),
      fill("Elles ont ___ voitures.", 51, ["cinquante et une", "cinquante-et-une"], {
        hint: "50 is 'cinquante'. 'Voiture' is feminine.",
        wrongAnswers: [
          {
            blank: "cinquante et un",
            feedback: "'Voiture' is feminine, so 51 ends in 'une': 'cinquante et une voitures'.",
          },
        ],
      }),
      fill("La maison a ___ ans.", 60, ["soixante"], {
        hint: "60 is the last ten with its own word.",
      }),
      next("soixante-huit, soixante-neuf", ["soixante-dix", "soixante dix"], {
        hint: "Sixty, then ten.",
        wrongAnswers: [
          { answer: "septante", feedback: "That is the Belgian and Swiss word. In France, 70 is 'soixante-dix'." },
        ],
      }),
      fill("Il a ___ ans.", 71, ["soixante et onze", "soixante-et-onze"], {
        hint: "Sixty, then eleven, with 'et'.",
        wrongAnswers: [
          { blank: "soixante-dix-un", feedback: "71 is sixty and eleven: 'soixante et onze'." },
        ],
      }),
      fill("Nous avons ___ livres.", 75, ["soixante-quinze", "soixante quinze"], {
        hint: "Sixty, then fifteen.",
        wrongAnswers: [
          { blank: "soixante-dix-cinq", feedback: "75 is sixty and fifteen: 'soixante-quinze'." },
        ],
      }),
      fill("J'ai ___ livres.", 80, ["quatre-vingts", "quatre vingts"], {
        hint: "Four twenties, with an s.",
        wrongAnswers: [
          { blank: "quatre-vingt", feedback: "80 alone keeps its s: 'quatre-vingts'." },
        ],
      }),
      fill("Elle a ___ ans.", 85, ["quatre-vingt-cinq", "quatre vingt cinq"], {
        hint: "Four twenties, then five. The s goes.",
        wrongAnswers: [
          {
            blank: "quatre-vingts-cinq",
            feedback: "The s goes when a number follows: 'quatre-vingt-cinq'.",
          },
        ],
      }),
      next("quatre-vingt-huit, quatre-vingt-neuf", ["quatre-vingt-dix", "quatre vingt dix"], {
        hint: "Four twenties, then ten.",
      }),
      fill("Il a ___ ans.", 91, ["quatre-vingt-onze", "quatre vingt onze"], {
        hint: "Four twenties, then eleven. No 'et' after 80.",
        wrongAnswers: [
          { blank: "quatre-vingt-et-onze", feedback: "There is no 'et' after 80: 'quatre-vingt-onze'." },
        ],
      }),
      fill("Le livre a ___ ans.", 99, ["quatre-vingt-dix-neuf", "quatre vingt dix neuf"], {
        hint: "Four twenties, then nineteen.",
      }),
      fill("La maison a ___ ans.", 100, ["cent"], {
        hint: "100 is one word.",
        wrongAnswers: [{ blank: "un cent", feedback: "100 is 'cent', with no 'un'." }],
      }),
    ],
  },
};
