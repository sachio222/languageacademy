/**
 * Module: Discourse Markers
 * Unit 7 - Knowledge & Learning theme
 * Make speech sound NATURAL - donc, ainsi, en fait, bah, quoi
 */

export const discourseMarkersModule = {
  moduleKey: "2024-05-02-discourse-markers", // Permanent identifier - never changes
  title: "Discourse Markers - Sound Like a Native",
  description:
    "Essential connectors for natural speech: donc (so), en fait (actually), bah (well), quoi (like/you know)",

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Sound like a native speaker with donc, en fait, quoi",
      "Connect ideas naturally in conversation",
      "Add conversational flow markers that French people use constantly"
    ],
    realWorldUse: "speak with natural French rhythm and flow",
    milestone: "Natural conversational French",
    nextModuleTeaser: "Complete modifiers with tout, même, mal"
  },

  concepts: [
    {
      term: "What are discourse markers?",
      definition:
        "Words that organize speech, show transitions, add emphasis, or fill pauses - natives use them CONSTANTLY!",
      example:
        "Without: 'Je ne comprends pas. Je veux apprendre.' With: 'Bon, je ne comprends pas, donc je veux apprendre, quoi.' ← Native!",
    },
    {
      term: "donc = so / therefore",
      definition:
        "Shows logical conclusion - very common! Connects cause and effect",
      example:
        "Je pense, donc je suis (I think, therefore I am - Descartes!), Donc, tu comprends? (So, do you understand?)",
    },
    {
      term: "en fait = in fact / actually",
      definition:
        "Corrects or clarifies something - super common in conversation",
      example:
        "En fait, je ne sais pas (Actually, I don't know), En fait, c'est comme ça (In fact, that's how it is)",
    },
    {
      term: "bah = well...",
      definition:
        "Filler word - shows hesitation or introduces explanation (informal!)",
      example:
        "Bah, c'est comme ça (Well, that's how it is), Bah, je sais pas (Well, I don't know)",
    },
    {
      term: "quoi = like / you know (at end)",
      definition:
        "End-of-sentence filler - VERY French! Emphasizes or seeks agreement",
      example:
        "C'est bon, quoi (It's good, you know), Je pense ça, quoi (I think that, like)",
    },
    {
      term: "More discourse markers",
      definition: "bon (well, so), alors (so, then), ainsi (thus - formal)",
      example:
        "Bon, on commence? (Well, shall we start?), Alors, tu viens? (So, are you coming?)",
    },
  ],

  vocabularyReference: [
    {
      french: "donc",
      english: "so / therefore",
      note: "⭐ logical conclusion - very common!",
    },
    {
      french: "ainsi",
      english: "thus / in this way",
      note: "more formal than donc",
    },
    {
      french: "en fait",
      english: "in fact / actually",
      note: "⭐⭐ correction/clarification",
    },
    {
      french: "bah",
      english: "well...",
      note: "filler/hesitation - informal!",
    },
    {
      french: "bon",
      english: "well / so (discourse use)",
      note: "new use! (you know 'bon' as 'good')",
    },
    {
      french: "alors",
      english: "so / then",
      note: "you know this! now discourse use",
    },
    {
      french: "quoi",
      english: "like / you know (filler at end)",
      note: "⭐⭐⭐ end-of-sentence emphasis",
    },
    {
      french: "presque",
      english: "almost",
      note: "nearly, not quite",
    },
    {
      french: "peut-être",
      english: "maybe",
      note: "perhaps, possibly",
    },
    {
      french: "certainement",
      english: "definitely",
      note: "certainly, for sure",
    },
    {
      french: "seulement",
      english: "only",
      note: "just, merely",
    },
    {
      french: "probablement",
      english: "probably",
      note: "likely, most likely",
    },
    {
      french: "sûrement",
      english: "surely",
      note: "certainly, definitely",
    },
    {
      french: "bien sûr",
      english: "of course",
      note: "naturally, obviously",
    },
    {
      french: "Je pense, donc je suis",
      english: "I think, therefore I am",
      note: "famous Descartes quote!",
    },
    {
      french: "Donc, tu comprends?",
      english: "So, do you understand?",
      note: "donc at beginning = conclusion",
    },
    {
      french: "En fait, je ne sais pas",
      english: "Actually, I don't know",
      note: "en fait = clarification",
    },
    {
      french: "Bah, c'est comme ça",
      english: "Well, that's how it is",
      note: "bah = informal hesitation",
    },
    {
      french: "C'est bon, quoi",
      english: "It's good, you know",
      note: "quoi at end = emphasis",
    },
  ],

  exercises: [
    {
      id: "discourse-markers.1",
      instruction: "Say 'So, do you understand?' (using donc)",
      prompt: "So, do you understand? (informal)",
      hint: "donc + comma + tu comprends?",
      expectedAnswer: "donc, tu comprends",
      wrongAnswers: [
        {
          answer: "tu comprends donc",
          feedback:
            "Put 'donc' at the beginning for 'so' - 'donc, tu comprends?'",
        },
      ],
    },
    {
      id: "discourse-markers.2",
      instruction: "Say 'Actually, I don't know'",
      prompt: "Actually, I don't know",
      hint: "en fait + comma + je ne sais pas",
      expectedAnswer: "en fait, je ne sais pas",
      wrongAnswers: [],
    },
    {
      id: "discourse-markers.3",
      instruction: "Say 'Well, that's how it is' (informal, using bah)",
      prompt: "Well, that's how it is",
      hint: "bah + comma + c'est comme ça",
      expectedAnswer: "bah, c'est comme ça",
      wrongAnswers: [],
    },
    {
      id: "discourse-markers.4",
      instruction: "Say 'I think, therefore I am' (Descartes)",
      prompt: "I think, therefore I am",
      hint: "je pense + comma + donc + je suis",
      expectedAnswer: "je pense, donc je suis",
      wrongAnswers: [],
    },
    {
      id: "discourse-markers.5",
      instruction: "Say 'I believe that, like' (adding quoi at end)",
      prompt: "I believe that, you know (with quoi)",
      hint: "je crois ça + comma + quoi",
      expectedAnswer: "je crois ça, quoi",
      wrongAnswers: [],
    },
    {
      id: "discourse-markers.6",
      instruction: "Say 'Well, shall we start?' (using bon)",
      prompt: "Well, shall we start?",
      hint: "bon + comma + on commence?",
      expectedAnswer: "bon, on commence",
      wrongAnswers: [],
    },
    {
      id: "discourse-markers.7",
      instruction: "Say 'almost'",
      prompt: "almost",
      hint: "Nearly, not quite",
      expectedAnswer: "presque",
      wrongAnswers: [],
    },
    {
      id: "discourse-markers.8",
      instruction: "Say 'maybe'",
      prompt: "maybe",
      hint: "Perhaps, possibly - with hyphen",
      expectedAnswer: "peut-être",
      wrongAnswers: [
        {
          answer: "peut être",
          feedback: "Use hyphen: peut-être",
        },
      ],
    },
    {
      id: "discourse-markers.9",
      instruction: "Say 'definitely'",
      prompt: "definitely",
      hint: "Certainly, for sure",
      expectedAnswer: "certainement",
      wrongAnswers: [
        {
          answer: "sûrement",
          feedback: "Both work, but use 'certainement' for this exercise",
        },
      ],
    },
    {
      id: "discourse-markers.10",
      instruction: "Say 'only'",
      prompt: "only",
      hint: "Just, merely",
      expectedAnswer: "seulement",
      wrongAnswers: [
        {
          answer: "juste",
          feedback: "Both work, but use 'seulement' for this exercise",
        },
      ],
    },
    {
      id: "discourse-markers.11",
      instruction: "Say 'probably'",
      prompt: "probably",
      hint: "Likely, most likely",
      expectedAnswer: "probablement",
      wrongAnswers: [],
    },
    {
      id: "discourse-markers.12",
      instruction: "Say 'surely'",
      prompt: "surely",
      hint: "Certainly, definitely",
      expectedAnswer: "sûrement",
      wrongAnswers: [],
    },
    {
      id: "discourse-markers.13",
      instruction: "Say 'of course'",
      prompt: "of course",
      hint: "bien + sûr",
      expectedAnswer: "bien sûr",
      wrongAnswers: [
        {
          answer: "bien sur",
          feedback: "Use accent: bien sûr",
        },
      ],
    },
    {
      id: "discourse-markers.17",
      instruction: "Say 'I am almost ready'",
      prompt: "I am almost ready",
      hint: "je suis + presque + prêt",
      expectedAnswer: "je suis presque prêt",
      wrongAnswers: [],
    },
    {
      id: "discourse-markers.18",
      instruction: "Say 'Maybe he understands'",
      prompt: "Maybe he understands",
      hint: "peut-être + il comprend",
      expectedAnswer: "peut-être il comprend",
      wrongAnswers: [],
    },
  ],
};
