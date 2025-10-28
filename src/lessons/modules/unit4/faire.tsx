/**
 * faire (to do/make)
 * One of the most essential French verbs
 * Super irregular but extremely useful!
 */

export const faireModule = {
  moduleKey: "2024-03-25-faire", // Permanent identifier - never changes
  title: "Essential Verb - faire (to do/make)",
  description:
    "One of the most useful verbs in French! Express what you do, make, and experience.",

  concepts: [
    {
      term: "faire = to do/make",
      definition: "Extremely versatile verb - doing actions and making things",
      example: "Used constantly in daily life - one of the top 15 words!",
    },
    {
      term: "Irregular Pattern",
      definition:
        "faire is irregular - but you've seen a pattern like this before!",
      example:
        "je fais, tu fais, il fait, elle fait, are all the same sounding, but different spellings. Nous faisons, vous faites, ils font, elles font are like the other irregular verbs you've learned. Easy!",
    },
    {
      term: "Common Uses",
      definition: "Doing activities, making things, weather expressions",
      example: "je fais ça (I do that), il fait beau (it's nice weather)",
    },
  ],

  vocabularyReference: [
    { french: "faire", english: "to do / to make", note: "infinitive form" },
    { french: "je fais", english: "I do/make", note: "irregular form" },
    {
      french: "tu fais",
      english: "you do/make (informal)",
      note: "same as je",
    },
    { french: "il fait", english: "he does/makes", note: "different ending" },
    { french: "elle fait", english: "she does/makes", note: "same as il" },
    { french: "nous faisons", english: "we do/make", note: "unique form" },
    {
      french: "vous faites",
      english: "you do/make (formal)",
      note: "unique form",
    },
    { french: "ils font", english: "they do/make (masc)", note: "irregular" },
    {
      french: "elles font",
      english: "they do/make (fem)",
      note: "same as ils",
    },
  ],

  exercises: [
    {
      instruction:
        "You're introducing yourself and want to say what you do for work.",
      prompt: "I do/make",
      hint: "Use je + faire conjugation",
      expectedAnswer: "je fais",
      wrongAnswers: [
        {
          answer: "je faire",
          feedback:
            "Use the conjugated form 'fais', not the infinitive 'faire'",
        },
        { answer: "tu fais", feedback: "That's 'you do', not 'I do'" },
        {
          answer: "je suis",
          feedback: "That's 'I am' (être), not 'I do' (faire)",
        },
      ],
    },
    {
      instruction: "You're asking your friend what they do on weekends.",
      prompt: "you do/make (informal)",
      hint: "Use tu + faire conjugation",
      expectedAnswer: "tu fais",
      wrongAnswers: [
        {
          answer: "tu faire",
          feedback:
            "Use the conjugated form 'fais', not the infinitive 'faire'",
        },
        { answer: "je fais", feedback: "That's 'I do', not 'you do'" },
        {
          answer: "tu es",
          feedback: "That's 'you are' (être), not 'you do' (faire)",
        },
      ],
    },
    {
      instruction: "You're describing what your brother does for a living.",
      prompt: "he does/makes",
      hint: "Use il + faire conjugation",
      expectedAnswer: "il fait",
      wrongAnswers: [
        {
          answer: "il faire",
          feedback:
            "Use the conjugated form 'fait', not the infinitive 'faire'",
        },
        { answer: "il fais", feedback: "il fait has a 't' at the end" },
        {
          answer: "il est",
          feedback: "That's 'he is' (être), not 'he does' (faire)",
        },
      ],
    },
    {
      instruction: "You're talking about what your sister does at work.",
      prompt: "she does/makes",
      hint: "Use elle + faire conjugation",
      expectedAnswer: "elle fait",
      wrongAnswers: [
        {
          answer: "elle faire",
          feedback:
            "Use the conjugated form 'fait', not the infinitive 'faire'",
        },
        { answer: "elle fais", feedback: "elle fait has a 't' at the end" },
        {
          answer: "elle est",
          feedback: "That's 'she is' (être), not 'she does' (faire)",
        },
      ],
    },
    {
      instruction:
        "You're describing what your family does together on Sundays.",
      prompt: "we do/make",
      hint: "Use nous + faire conjugation",
      expectedAnswer: "nous faisons",
      wrongAnswers: [
        {
          answer: "nous faire",
          feedback:
            "Use the conjugated form 'faisons', not the infinitive 'faire'",
        },
        { answer: "nous fais", feedback: "nous faisons has 'ons' at the end" },
        {
          answer: "nous sommes",
          feedback: "That's 'we are' (être), not 'we do' (faire)",
        },
      ],
    },
    {
      instruction:
        "You're asking your teacher what they do in their free time.",
      prompt: "you do/make (formal)",
      hint: "Use vous + faire conjugation",
      expectedAnswer: "vous faites",
      wrongAnswers: [
        {
          answer: "vous faire",
          feedback:
            "Use the conjugated form 'faites', not the infinitive 'faire'",
        },
        { answer: "vous fais", feedback: "vous faites has 'tes' at the end" },
        {
          answer: "vous êtes",
          feedback: "That's 'you are' (être), not 'you do' (faire)",
        },
      ],
    },
    {
      instruction: "You're talking about what your male friends do for fun.",
      prompt: "they do/make (masculine)",
      hint: "Use ils + faire conjugation",
      expectedAnswer: "ils font",
      wrongAnswers: [
        {
          answer: "ils faire",
          feedback:
            "Use the conjugated form 'font', not the infinitive 'faire'",
        },
        {
          answer: "ils fais",
          feedback: "ils font is irregular - no 's' at the end",
        },
        {
          answer: "ils sont",
          feedback: "That's 'they are' (être), not 'they do' (faire)",
        },
      ],
    },
    {
      instruction: "You're describing what your female friends do on vacation.",
      prompt: "they do/make (feminine)",
      hint: "Use elles + faire conjugation",
      expectedAnswer: "elles font",
      wrongAnswers: [
        {
          answer: "elles faire",
          feedback:
            "Use the conjugated form 'font', not the infinitive 'faire'",
        },
        {
          answer: "elles fais",
          feedback: "elles font is irregular - no 's' at the end",
        },
        {
          answer: "elles sont",
          feedback: "That's 'they are' (être), not 'they do' (faire)",
        },
      },
    },
    {
      instruction: "You're talking about the weather - it's nice outside.",
      prompt: "it makes/is (weather)",
      hint: "Use il + faire for weather expressions",
      expectedAnswer: "il fait",
      wrongAnswers: [
        {
          answer: "il est",
          feedback: "For weather, use 'il fait' not 'il est'",
        },
        {
          answer: "il a",
          feedback: "For weather, use 'il fait' not 'il a'",
        },
        {
          answer: "il faire",
          feedback: "Use the conjugated form 'fait', not the infinitive 'faire'",
        },
      ],
    },
    {
      instruction: "You want to say 'I do that' using the demonstrative from previous modules.",
      prompt: "I do that",
      hint: "Combine je fais + ça",
      expectedAnswer: "je fais ça",
      wrongAnswers: [
        {
          answer: "je suis ça",
          feedback: "That's 'I am that' (être), not 'I do that' (faire)",
        },
        {
          answer: "j'ai ça",
          feedback: "That's 'I have that' (avoir), not 'I do that' (faire)",
        },
        {
          answer: "je fais ce",
          feedback: "Use 'ça' (that) not 'ce' (this)",
        },
      ],
    },
    {
      instruction: "You're asking someone what they're doing right now.",
      prompt: "What do you do? (informal)",
      hint: "Use que + tu fais",
      expectedAnswer: "que tu fais",
      wrongAnswers: [
        {
          answer: "que tu es",
          feedback: "That's 'what you are' (être), not 'what you do' (faire)",
        },
        {
          answer: "que tu as",
          feedback: "That's 'what you have' (avoir), not 'what you do' (faire)",
        },
        {
          answer: "que tu faire",
          feedback: "Use the conjugated form 'fais', not the infinitive 'faire'",
        },
      ],
    },
    {
      instruction: "You want to say 'We do it' referring to something specific.",
      prompt: "We do it",
      hint: "Use nous faisons + le",
      expectedAnswer: "nous le faisons",
      wrongAnswers: [
        {
          answer: "nous le sommes",
          feedback: "That's 'we are it' (être), not 'we do it' (faire)",
        },
        {
          answer: "nous l'avons",
          feedback: "That's 'we have it' (avoir), not 'we do it' (faire)",
        },
        {
          answer: "nous faisons le",
          feedback: "Object pronouns go before the verb: 'nous le faisons'",
        },
      ],
    },
    {
      instruction: "You're describing what your friends do - they make dinner.",
      prompt: "They make dinner",
      hint: "Use ils font + le dîner",
      expectedAnswer: "ils font le dîner",
      wrongAnswers: [
        {
          answer: "ils sont le dîner",
          feedback: "That's 'they are dinner' (être), not 'they make dinner' (faire)",
        },
        {
          answer: "ils ont le dîner",
          feedback: "That's 'they have dinner' (avoir), not 'they make dinner' (faire)",
        },
        {
          answer: "ils faire le dîner",
          feedback: "Use the conjugated form 'font', not the infinitive 'faire'",
        },
      ],
    },
    {
      instruction: "You want to say 'She doesn't do it' using negation.",
      prompt: "She doesn't do it",
      hint: "Use elle ne fait pas + le",
      expectedAnswer: "elle ne le fait pas",
      wrongAnswers: [
        {
          answer: "elle ne le est pas",
          feedback: "That's 'she isn't it' (être), not 'she doesn't do it' (faire)",
        },
        {
          answer: "elle ne l'a pas",
          feedback: "That's 'she doesn't have it' (avoir), not 'she doesn't do it' (faire)",
        },
        {
          answer: "elle ne fait pas le",
          feedback: "Object pronouns go before the verb: 'elle ne le fait pas'",
        },
      ],
    },
    {
      instruction: "You're asking what time it is - 'What time do you make it?'",
      prompt: "What time do you make it? (formal)",
      hint: "Use quelle heure + vous faites",
      expectedAnswer: "quelle heure vous faites",
      wrongAnswers: [
        {
          answer: "quelle heure vous êtes",
          feedback: "That's 'what time are you' (être), not 'what time do you make it' (faire)",
        },
        {
          answer: "quelle heure vous avez",
          feedback: "That's 'what time do you have' (avoir), not 'what time do you make it' (faire)",
        },
        {
          answer: "quelle heure vous faire",
          feedback: "Use the conjugated form 'faites', not the infinitive 'faire'",
        },
      ],
    },
    {
      instruction: "You want to say 'I'm doing my homework'.",
      prompt: "I'm doing my homework",
      hint: "Use je fais + mes devoirs",
      expectedAnswer: "je fais mes devoirs",
      wrongAnswers: [
        {
          answer: "je suis mes devoirs",
          feedback: "That's 'I am my homework' (être), not 'I'm doing my homework' (faire)",
        },
        {
          answer: "j'ai mes devoirs",
          feedback: "That's 'I have my homework' (avoir), not 'I'm doing my homework' (faire)",
        },
        {
          answer: "je faire mes devoirs",
          feedback: "Use the conjugated form 'fais', not the infinitive 'faire'",
        },
      ],
    },
    {
      instruction: "You're talking about what you do for fun - 'I do sports'.",
      prompt: "I do sports",
      hint: "Use je fais + du sport",
      expectedAnswer: "je fais du sport",
      wrongAnswers: [
        {
          answer: "je suis du sport",
          feedback: "That's 'I am sports' (être), not 'I do sports' (faire)",
        },
        {
          answer: "j'ai du sport",
          feedback: "That's 'I have sports' (avoir), not 'I do sports' (faire)",
        },
        {
          answer: "je faire du sport",
          feedback: "Use the conjugated form 'fais', not the infinitive 'faire'",
        },
      ],
    },
    {
      instruction: "You want to say 'They're making a cake'.",
      prompt: "They're making a cake",
      hint: "Use elles font + un gâteau",
      expectedAnswer: "elles font un gâteau",
      wrongAnswers: [
        {
          answer: "elles sont un gâteau",
          feedback: "That's 'they are a cake' (être), not 'they're making a cake' (faire)",
        },
        {
          answer: "elles ont un gâteau",
          feedback: "That's 'they have a cake' (avoir), not 'they're making a cake' (faire)",
        },
        {
          answer: "elles faire un gâteau",
          feedback: "Use the conjugated form 'font', not the infinitive 'faire'",
        },
      ],
    },
  ],
};
