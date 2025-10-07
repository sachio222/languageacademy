/**
 * Unit 10 Exam - Comprehensive test for Mastery & Nuance unit
 * Tests: special forms, necessity, wishes, emotions, opinions, hypotheticals, regrets,
 * "had already", adverbs, temporal phrases, service phrases, and all B2 level expressions
 */

export const unit10Exam = {
  title: "Unit 10 Final Exam - Mastery & Nuance",
  description:
    "Test everything from Unit 10! Master B2 level phrases: necessity (il faut que), wishes (je veux que), emotions (je suis content que), hypotheticals (si j'étais...), regrets (si j'avais su...), and more advanced expressions.",

  // Special flags
  isUnitExam: true,
  unitNumber: 10,
  skipStudyMode: true,

  concepts: [],
  vocabularyReference: [],

  exerciseConfig: {
    type: "custom",
    items: [
      // SECTION 1: Special Forms Recognition (6 questions)
      {
        instruction: "Complete the phrase",
        prompt: "il faut que tu _____ (you need to be)",
        hint: "Special form of 'être' after 'il faut que'",
        expectedAnswer: "sois",
      },
      {
        instruction: "Complete the phrase",
        prompt: "je veux qu'il _____ (I want him to have)",
        hint: "Special form of 'avoir' after 'je veux que'",
        expectedAnswer: "ait",
      },
      {
        instruction: "Complete the phrase",
        prompt: "il faut que tu _____ (you need to go)",
        hint: "Special form of 'aller' after 'il faut que'",
        expectedAnswer: "ailles",
      },
      {
        instruction: "Complete the phrase",
        prompt:
          "je veux que tu _____ tes devoirs (I want you to do your homework)",
        hint: "Special form of 'faire' after 'je veux que'",
        expectedAnswer: "fasses",
      },
      {
        instruction: "Complete the phrase",
        prompt: "il faut qu'elle _____ (she needs to come)",
        hint: "Special form of 'venir' after 'il faut que'",
        expectedAnswer: "vienne",
      },
      {
        instruction: "Complete the phrase",
        prompt: "je veux qu'il _____ (I want him to leave)",
        hint: "Special form of 'partir' after 'je veux que'",
        expectedAnswer: "parte",
      },

      // SECTION 2: Necessity Phrases (4 questions)
      {
        instruction: "Translate to French",
        prompt: "You need to eat",
        hint: "Direct necessity to a specific person",
        expectedAnswer: "il faut que tu manges",
      },
      {
        instruction: "Translate to French",
        prompt: "We need to leave",
        hint: "Group necessity",
        expectedAnswer: "il faut qu'on parte",
      },
      {
        instruction: "Translate to French",
        prompt: "She needs to know",
        hint: "Information necessity",
        expectedAnswer: "il faut qu'elle sache",
      },
      {
        instruction: "Translate to French",
        prompt: "I need to be careful",
        hint: "Personal necessity - use 'sage' or 'attention'",
        expectedAnswer: "il faut que je fasse attention",
        acceptableAnswers: ["il faut que je sois sage"],
      },

      // SECTION 3: Wish Phrases (4 questions)
      {
        instruction: "Translate to French",
        prompt: "I want you to come",
        hint: "Direct wish to someone",
        expectedAnswer: "je veux que tu viennes",
      },
      {
        instruction: "Translate to French",
        prompt: "I'd like you to be there (polite)",
        hint: "Softer version of wish",
        expectedAnswer: "j'aimerais que tu sois là",
      },
      {
        instruction: "Translate to French",
        prompt: "I want him to understand",
        hint: "Wish about understanding",
        expectedAnswer: "je veux qu'il comprenne",
      },
      {
        instruction: "Translate to French",
        prompt: "I want us to succeed",
        hint: "Group wish",
        expectedAnswer: "je veux qu'on réussisse",
        acceptableAnswers: ["je veux que nous réussissions"],
      },

      // SECTION 4: Emotion Phrases (5 questions)
      {
        instruction: "Translate to French",
        prompt: "I'm happy you're here",
        hint: "Emotion about someone's presence",
        expectedAnswer: "je suis content que tu sois là",
        acceptableAnswers: [
          "je suis heureux que tu sois là",
          "je suis contente que tu sois là",
          "je suis heureuse que tu sois là",
        ],
      },
      {
        instruction: "Translate to French",
        prompt: "I'm afraid he'll leave",
        hint: "Worry about someone's action",
        expectedAnswer: "j'ai peur qu'il parte",
      },
      {
        instruction: "Translate to French",
        prompt: "I'm sorry you're sick",
        hint: "Sympathy expression",
        expectedAnswer: "je suis désolé que tu sois malade",
        acceptableAnswers: ["je suis désolée que tu sois malade"],
      },
      {
        instruction: "Translate to French",
        prompt: "I'm surprised you know that",
        hint: "Unexpected knowledge",
        expectedAnswer: "je suis surpris que tu saches ça",
        acceptableAnswers: [
          "je suis surprise que tu saches ça",
          "je suis surpris que tu le saches",
        ],
      },
      {
        instruction: "Translate to French",
        prompt: "I regret you can't come",
        hint: "Disappointment expression",
        expectedAnswer: "je regrette que tu ne puisses pas venir",
      },

      // SECTION 5: Hypothetical Phrases (4 questions)
      {
        instruction: "Translate to French",
        prompt: "If I were rich, I'd travel",
        hint: "Fantasy/daydream scenario",
        expectedAnswer: "si j'étais riche, je voyagerais",
      },
      {
        instruction: "Translate to French",
        prompt: "If I were you, I'd do that",
        hint: "Giving advice",
        expectedAnswer: "si j'étais toi, je ferais ça",
      },
      {
        instruction: "Translate to French",
        prompt: "If we had time, we'd walk",
        hint: "Hypothetical group activity",
        expectedAnswer: "si on avait le temps, on marcherait",
        acceptableAnswers: ["si nous avions le temps, nous marcherions"],
      },
      {
        instruction: "Translate to French",
        prompt: "If you were here, I'd be happy",
        hint: "Wishful thinking",
        expectedAnswer: "si tu étais là, je serais content",
        acceptableAnswers: [
          "si tu étais ici, je serais heureux",
          "si tu étais là, je serais heureux",
        ],
      },

      // SECTION 6: Past Regret Phrases (3 questions)
      {
        instruction: "Translate to French",
        prompt: "If I had known, I would have come",
        hint: "Past regret - missed opportunity",
        expectedAnswer: "si j'avais su, je serais venu",
        acceptableAnswers: ["si j'avais su, je serais venue"],
      },
      {
        instruction: "Translate to French",
        prompt: "If I had time, I would have helped",
        hint: "Past conditional regret",
        expectedAnswer: "si j'avais eu le temps, j'aurais aidé",
      },
      {
        instruction: "Translate to French",
        prompt: "If she had told me, I would have understood",
        hint: "Information regret",
        expectedAnswer: "si elle m'avait dit, j'aurais compris",
      },

      // SECTION 7: "Had Already" Phrases (3 questions)
      {
        instruction: "Translate to French",
        prompt: "I had already eaten",
        hint: "Show what happened first in past",
        expectedAnswer: "j'avais déjà mangé",
      },
      {
        instruction: "Translate to French",
        prompt: "She had already left",
        hint: "Explaining someone's absence",
        expectedAnswer: "elle était déjà partie",
      },
      {
        instruction: "Translate to French",
        prompt: "We had already seen this movie",
        hint: "Previous experience",
        expectedAnswer: "nous avions déjà vu ce film",
        acceptableAnswers: ["on avait déjà vu ce film"],
      },

      // SECTION 8: Temporal & Purpose Phrases (4 questions)
      {
        instruction: "Translate to French",
        prompt: "Before you leave, call me",
        hint: "Before someone does something",
        expectedAnswer: "avant que tu partes, appelle-moi",
      },
      {
        instruction: "Translate to French",
        prompt: "I'm explaining so you understand",
        hint: "Purpose expression",
        expectedAnswer: "j'explique pour que tu comprennes",
      },
      {
        instruction: "Translate to French",
        prompt: "Although it's difficult, I continue",
        hint: "Contrast expression",
        expectedAnswer: "bien que ce soit difficile, je continue",
      },
      {
        instruction: "Translate to French",
        prompt: "While eating, we talk",
        hint: "Simultaneous actions",
        expectedAnswer: "en mangeant, nous parlons",
        acceptableAnswers: ["en mangeant, on parle"],
      },

      // SECTION 9: Advanced Combinations (4 questions)
      {
        instruction: "Translate to French",
        prompt: "It's possible he doesn't understand",
        hint: "Uncertainty expression",
        expectedAnswer: "il est possible qu'il ne comprenne pas",
      },
      {
        instruction: "Translate to French",
        prompt: "I'm really happy we're friends",
        hint: "Strong emotion + relationship",
        expectedAnswer: "je suis vraiment content que nous soyons amis",
        acceptableAnswers: [
          "je suis vraiment heureux qu'on soit amis",
          "je suis vraiment contente que nous soyons amis",
        ],
      },
      {
        instruction: "Translate to French",
        prompt: "I'm getting my car repaired",
        hint: "Service expression",
        expectedAnswer: "je me fais réparer ma voiture",
      },
      {
        instruction: "Complete the philosophical thought",
        prompt: "Si on ne fait rien, on ne _____ jamais",
        hint: "Marc's wisdom from Reading 10: 'If we don't do anything, we'll never _____'",
        expectedAnswer: "saura",
        acceptableAnswers: ["sait", "savoir"],
      },

      // SECTION 10: Reading 10 Integration (2 questions)
      {
        instruction: "From Reading 10: What did Sophie want about her life?",
        prompt: "Je veux que ma vie _____",
        hint: "Sophie's main wish",
        expectedAnswer: "soit différente",
      },
      {
        instruction:
          "From Reading 10: What had Sophie already done before talking to Marc?",
        prompt: "J'avais déjà _____",
        hint: "What Sophie had lost",
        expectedAnswer: "perdu espoir",
        acceptableAnswers: ["essayé", "perdu l'espoir"],
      },
    ],
  },
};
