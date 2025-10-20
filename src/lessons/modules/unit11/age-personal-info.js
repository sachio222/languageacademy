/**
 * Module: Dynamic ID (auto-assigned)0: Age & Personal Information
 * Unit 11 - Essential life skills: saying age, birthdate, personal details
 */

export const agePersonalInfoModule = {
  moduleKey: "2024-02-08-age-personal-info", // Permanent identifier - never changes
  title: "Age & Personal Information",
  description:
    "Essential life skills! Learn to say your age (J'ai 25 ans), ask others' ages (Quel âge avez-vous?), and share personal information. Finally complete what should have been in Unit 1!",
  unit: 11,

  concepts: [
    {
      term: "French Age Expression: J'ai ... ans",
      definition:
        "French uses 'avoir' (to have) + number + 'ans' (years) to express age",
      example:
        "J'ai vingt-cinq ans (I am 25 years old - literally 'I have 25 years')",
    },
    {
      term: "Asking Age: Quel âge...?",
      definition: "Use 'quel âge' (what age) to ask someone's age politely",
      example:
        "Quel âge avez-vous? (How old are you? - formal), Quel âge as-tu? (informal)",
    },
    {
      term: "Birth Information",
      definition: "Express when and where you were born using être + né(e)",
      example:
        "Je suis né en 1995 (I was born in 1995), Je suis née à Paris (I was born in Paris - feminine)",
    },
    {
      term: "Personal Details Integration",
      definition:
        "Combine with s'appeler, être, avoir for complete self-introduction",
      example:
        "Je m'appelle Marie, j'ai 30 ans, je suis née à Lyon (My name is Marie, I'm 30, I was born in Lyon)",
    },
  ],

  vocabularyReference: [
    {
      french: "j'ai ... ans",
      english: "I am ... years old",
      note: "⭐ Essential: literally 'I have X years'",
    },
    {
      french: "quel âge avez-vous?",
      english: "how old are you? (formal)",
      note: "polite way to ask age",
    },
    {
      french: "quel âge as-tu?",
      english: "how old are you? (informal)",
      note: "with friends/family",
    },
    {
      french: "j'ai vingt ans",
      english: "I'm twenty years old",
      note: "example with number",
    },
    {
      french: "tu as quel âge?",
      english: "how old are you?",
      note: "casual question order",
    },
    {
      french: "il a quinze ans",
      english: "he's fifteen years old",
      note: "describing someone else",
    },
    {
      french: "elle a trente ans",
      english: "she's thirty years old",
      note: "describing a woman",
    },
    {
      french: "je suis né",
      english: "I was born (masculine)",
      note: "for males",
    },
    {
      french: "je suis née",
      english: "I was born (feminine)",
      note: "for females - add 'e'",
    },
    {
      french: "en mille neuf cent quatre-vingt-quinze",
      english: "in nineteen ninety-five",
      note: "birth year example",
    },
    {
      french: "né en",
      english: "born in (year)",
      note: "temporal preposition",
    },
    {
      french: "né à",
      english: "born in/at (place)",
      note: "location preposition",
    },
    {
      french: "quelle est votre date de naissance?",
      english: "what is your date of birth? (formal)",
      note: "official/formal question",
    },
    {
      french: "ma date de naissance",
      english: "my date of birth",
      note: "for forms/documents",
    },
    {
      french: "l'âge",
      english: "age (noun)",
      note: "masculine noun",
    },
    {
      french: "les ans",
      english: "years (for age)",
      note: "always plural with numbers",
    },
    {
      french: "la naissance",
      english: "birth",
      note: "feminine noun",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Say your age: 'I am 22 years old'",
        prompt: "I am 22 years old",
        hint: "Use avoir: j'ai + number + ans",
        expectedAnswer: "j'ai vingt-deux ans",
        acceptableAnswers: ["j'ai 22 ans"],
        wrongAnswers: [
          {
            answer: "je suis vingt-deux ans",
            feedback: "Use 'avoir' for age in French: j'ai vingt-deux ans",
          },
        ],
      },
      {
        instruction: "Ask someone's age (informal)",
        prompt: "How old are you? (informal)",
        hint: "quel âge + informal you + avoir",
        expectedAnswer: "quel âge as-tu",
        acceptableAnswers: ["tu as quel âge"],
      },
      {
        instruction: "Ask someone's age (formal)",
        prompt: "How old are you? (formal)",
        hint: "quel âge + formal you + avoir",
        expectedAnswer: "quel âge avez-vous",
      },
      {
        instruction: "Say someone else's age",
        prompt: "She is 18 years old",
        hint: "elle + avoir + number + ans",
        expectedAnswer: "elle a dix-huit ans",
        acceptableAnswers: ["elle a 18 ans"],
      },
      {
        instruction: "Say you were born in a year",
        prompt: "I was born in 2000 (male)",
        hint: "je suis né + en + year",
        expectedAnswer: "je suis né en deux mille",
        acceptableAnswers: ["je suis né en 2000"],
      },
      {
        instruction: "Say you were born in a year (female)",
        prompt: "I was born in 2000 (female)",
        hint: "je suis née + en + year (add 'e' for feminine)",
        expectedAnswer: "je suis née en deux mille",
        acceptableAnswers: ["je suis née en 2000"],
      },
      {
        instruction: "Say you were born in a place",
        prompt: "I was born in Paris",
        hint: "je suis né/née + à + city",
        expectedAnswer: "je suis né à Paris",
        acceptableAnswers: ["je suis née à Paris"],
      },
      {
        instruction: "Complete self-introduction",
        prompt: "My name is Sophie, I'm 28 years old",
        hint: "je m'appelle + name + j'ai + age + ans",
        expectedAnswer: "je m'appelle Sophie, j'ai vingt-huit ans",
        acceptableAnswers: ["je m'appelle Sophie, j'ai 28 ans"],
      },
      {
        instruction: "Ask about someone's birth year",
        prompt: "What year were you born?",
        hint: "en quelle année + être + né(e)",
        expectedAnswer: "en quelle année êtes-vous né",
        acceptableAnswers: [
          "en quelle année es-tu né",
          "en quelle année êtes-vous née",
        ],
      },
      {
        instruction: "Respond to age question",
        prompt: "Answer: I'm 30 years old",
        hint: "Direct response with avoir",
        expectedAnswer: "j'ai trente ans",
        acceptableAnswers: ["j'ai 30 ans"],
      },
    ],
  },

  skipStudyMode: false,
};
