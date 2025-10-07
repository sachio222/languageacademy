/**
 * Unit 10 Practice - Fill in the blank exercise
 * Typeform-style interactive sentence completion covering Unit 10 material
 * Covers: necessity (il faut que), wishes (je veux que), emotions (je suis content que),
 * hypotheticals (si j'étais), regrets (si j'avais su), "had already" (j'avais déjà), etc.
 */

export const unit10Practice = {
  title: "Unit 10 Practice - Fill in the Blanks",
  description:
    "Complete sentences using Unit 10's B2 level phrases: necessity, wishes, emotions, hypotheticals, and more!",

  // Special flags - REQUIRED for fill-in-blank modules
  isFillInTheBlank: true,
  skipStudyMode: true,

  // Leave empty - not used for fill-in-blank
  concepts: [],
  vocabularyReference: [],
  exercises: [],

  sentences: [
    // Necessity phrases
    {
      text: " que tu manges quelque chose.",
      instruction: "Complete: 'You need to eat something' (directed necessity)",
      blanks: [
        {
          position: 0,
          answer: "Il faut",
          hint: "it's necessary (directed to someone)",
        },
      ],
    },
    {
      text: "Il faut  tu sois sage!",
      instruction: "Complete: 'You need to be good!' (parent to child)",
      blanks: [
        {
          position: 8,
          answer: "que",
          hint: "connector after 'il faut'",
        },
      ],
    },

    // Wish phrases
    {
      text: "Je veux  tu viennes avec moi.",
      instruction: "Complete: 'I want you to come with me' (expressing a wish)",
      blanks: [
        {
          position: 8,
          answer: "que",
          hint: "connector after 'je veux'",
        },
      ],
    },
    {
      text: "J'aimerais que nous  ensemble.",
      instruction: "Complete: 'I'd like us to go together' (polite wish)",
      blanks: [
        {
          position: 20,
          answer: "allions",
          hint: "special form of 'aller' after 'que'",
        },
      ],
    },

    // Emotion phrases
    {
      text: "Je suis content que tu  là!",
      instruction: "Complete: 'I'm happy you're here!' (emotion about someone)",
      blanks: [
        {
          position: 23,
          answer: "sois",
          hint: "special form of 'être' after 'que'",
        },
      ],
    },
    {
      text: "J'ai peur qu'il .",
      instruction: "Complete: 'I'm afraid he'll leave' (worry)",
      blanks: [
        {
          position: 16,
          answer: "parte",
          hint: "special form of 'partir' after 'que'",
        },
      ],
    },

    // Hypothetical phrases
    {
      text: " j'étais riche, j'achèterais une maison.",
      instruction: "Complete: 'If I were rich, I'd buy a house' (daydream)",
      blanks: [
        {
          position: 0,
          answer: "Si",
          hint: "if (for hypothetical situations)",
        },
      ],
    },
    {
      text: "Si j'avais plus de temps, je  plus.",
      instruction:
        "Complete: 'If I had more time, I'd travel more' (hypothetical)",
      blanks: [
        {
          position: 33,
          answer: "voyagerais",
          hint: "would travel (conditional form)",
        },
      ],
    },

    // Past regret phrases
    {
      text: "Si j'avais su, j' continué mes études.",
      instruction:
        "Complete: 'If I had known, I would have continued my studies' (regret)",
      blanks: [
        {
          position: 17,
          answer: "aurais",
          hint: "would have (past conditional)",
        },
      ],
    },

    // Had already phrases
    {
      text: "J'avais  fini quand il est arrivé.",
      instruction:
        "Complete: 'I had already finished when he arrived' (sequencing past events)",
      blanks: [
        {
          position: 8,
          answer: "déjà",
          hint: "already",
        },
      ],
    },

    // Opinion phrases
    {
      text: "Je pense qu'il .",
      instruction: "Complete: 'I think he's coming' (positive opinion)",
      blanks: [
        {
          position: 15,
          answer: "vient",
          hint: "normal form after positive 'je pense que'",
        },
      ],
    },
    {
      text: "Je ne pense pas qu'il .",
      instruction: "Complete: 'I don't think he's coming' (diplomatic doubt)",
      blanks: [
        {
          position: 22,
          answer: "vienne",
          hint: "special form after negative 'je ne pense pas que'",
        },
      ],
    },

    // Before phrases
    {
      text: " qu'on parte, il faut finir.",
      instruction: "Complete: 'Before we leave, we need to finish' (temporal)",
      blanks: [
        {
          position: 0,
          answer: "Avant",
          hint: "before (temporal connector)",
        },
      ],
    },

    // So that phrases
    {
      text: "Je t'explique  tu comprennes.",
      instruction: "Complete: 'I'm explaining so you understand' (purpose)",
      blanks: [
        {
          position: 14,
          answer: "pour que",
          hint: "so that (expressing purpose)",
        },
      ],
    },

    // Although phrases
    {
      text: " j'aie peu d'argent, je suis content.",
      instruction:
        "Complete: 'Although I have little money, I'm happy' (contrast)",
      blanks: [
        {
          position: 0,
          answer: "Bien que",
          hint: "although (expressing contrast)",
        },
      ],
    },

    // Common adverbs
    {
      text: "Je suis  content de te voir!",
      instruction: "Complete: 'I'm really happy to see you!' (emphasis)",
      blanks: [
        {
          position: 8,
          answer: "vraiment",
          hint: "really (emphasis adverb)",
        },
      ],
    },

    // While doing phrases
    {
      text: " mangeant, nous parlions.",
      instruction:
        "Complete: 'While eating, we were talking' (simultaneous actions)",
      blanks: [
        {
          position: 0,
          answer: "En",
          hint: "while (doing something)",
        },
      ],
    },

    // Service phrases
    {
      text: "Je me fais  les cheveux demain.",
      instruction: "Complete: 'I'm getting my hair cut tomorrow' (service)",
      blanks: [
        {
          position: 12,
          answer: "couper",
          hint: "cut (service verb)",
        },
      ],
    },

    // Possibility phrases
    {
      text: "Il est possible  soit en retard.",
      instruction: "Complete: 'It's possible he's late' (uncertainty)",
      blanks: [
        {
          position: 15,
          answer: "qu'il",
          hint: "that he (after possibility expression)",
        },
      ],
    },

    // Complex combination - multiple blanks
    {
      text: "Si j'étais toi, je  que tu  tes rêves.",
      instruction:
        "Complete: 'If I were you, I'd want you to follow your dreams' (advice + wish)",
      blanks: [
        {
          position: 16,
          answer: "voudrais",
          hint: "would want (conditional)",
        },
        {
          position: 32,
          answer: "suives",
          hint: "follow (special form after 'que')",
        },
      ],
    },
  ],
};
