/**
 * Module: on & General People Vocabulary
 * Unit 7 - Knowledge & Learning theme
 * CRITICAL: "on" is extremely high frequency (likely top 15-20 words!)
 * Essential for making general statements and talking informally
 */

export const onAndPeopleModule = {
  moduleKey: "2024-05-05-on-and-people", // Permanent identifier - never changes
  title: "Talking About People in General",
  description:
    "Learn 'on' (we/one/people) and general people vocabulary: on dit (people say), les gens (people), tout le monde (everyone)",

  concepts: [
    {
      term: "on = we / one / people",
      definition:
        "THE most versatile pronoun! Used MORE than 'nous' in everyday French. Three meanings depending on context.",
      example:
        "on va au cinéma (we're going to movies), on dit que (people say that), on ne peut pas (one cannot)",
    },
    {
      term: "on conjugates like il/elle (third person singular)",
      definition:
        "CRITICAL: Even though 'on' means 'we', it uses il/elle verb forms!",
      example:
        "on est (we are), on a (we have), on va (we go), on fait (we do) - all use il/elle forms",
    },
    {
      term: "on vs nous",
      definition:
        "on = informal, conversational (90% of speech). nous = formal, written (10%)",
      example:
        "Friends: 'on va manger?' Formal: 'nous allons manger' (much less common!)",
    },
    {
      term: "les gens = people (general)",
      definition:
        "Plural noun for referring to people in general - very common!",
      example:
        "les gens disent (people say), les gens pensent (people think), les gens sont gentils (people are nice)",
    },
    {
      term: "tout le monde = everyone",
      definition:
        "Fixed expression (literally 'all the world') - uses SINGULAR verb!",
      example:
        "tout le monde sait (everyone knows - singular!), tout le monde pense (everyone thinks)",
    },
    {
      term: "Making general statements",
      definition:
        "Use 'on' for universal truths or common wisdom - sounds philosophical!",
      example:
        "On apprend en faisant des erreurs (We/One learns by making mistakes), On ne peut pas tout savoir (One can't know everything)",
    },
  ],

  vocabularyReference: [
    {
      french: "on",
      english: "we / one / people",
      note: "⭐⭐⭐ most versatile pronoun!",
    },
    {
      french: "on est",
      english: "we are / one is",
      note: "uses il/elle form 'est'",
    },
    {
      french: "on a",
      english: "we have / one has",
      note: "uses il/elle form 'a'",
    },
    {
      french: "on va",
      english: "we're going / we go",
      note: "⭐ very common! 'On y va?'",
    },
    {
      french: "on fait",
      english: "we do / we make",
      note: "uses il/elle form",
    },
    {
      french: "on peut",
      english: "we can / one can",
      note: "On peut apprendre!",
    },
    {
      french: "on doit",
      english: "we must / one must",
      note: "On doit étudier",
    },
    {
      french: "on dit",
      english: "we say / people say",
      note: "On dit que... (People say that...)",
    },
    {
      french: "on voit",
      english: "we see / one sees",
      note: "general observation",
    },
    {
      french: "On y va?",
      english: "Shall we go?",
      note: "⭐⭐⭐ extremely common phrase!",
    },
    {
      french: "les gens",
      english: "people (in general)",
      note: "⭐ plural noun, very common",
    },
    {
      french: "les gens disent",
      english: "people say",
      note: "plural verb 'disent'",
    },
    {
      french: "les gens pensent",
      english: "people think",
      note: "general opinion",
    },
    {
      french: "tout le monde",
      english: "everyone / everybody",
      note: "⭐ uses SINGULAR verb!",
    },
    {
      french: "tout le monde sait",
      english: "everyone knows",
      note: "singular 'sait' not 'savent'",
    },
    {
      french: "le peuple",
      english: "the people / the population",
      note: "more formal/political",
    },
    {
      french: "la population",
      english: "the population",
      note: "demographic term",
    },
    {
      french: "personne",
      english: "person / nobody (with ne)",
      note: "une personne (a person)",
    },
    {
      french: "les personnes",
      english: "people / persons",
      note: "more formal than 'les gens'",
    },
  ],

  exercises: [
    {
      id: "on-people.1",
      instruction: "Say 'Shall we go?' using 'on' (super common phrase!)",
      prompt: "Shall we go? / Let's go",
      hint: "On + y + va + ?",
      expectedAnswer: "on y va",
      wrongAnswers: [
        {
          answer: "nous allons",
          feedback: "That's formal! Use 'on y va?' for informal 'shall we go?'",
        },
        {
          answer: "on allons",
          feedback: "'on' uses il/elle forms - 'on va' (not 'on allons')!",
        },
      ],
    },
    {
      id: "on-people.2",
      instruction: "Say 'We must study' using 'on'",
      prompt: "We must study (using on)",
      hint: "on + doit + étudier (on uses il/elle forms)",
      expectedAnswer: "on doit étudier",
      wrongAnswers: [
        {
          answer: "nous devons étudier",
          feedback: "Use 'on' for informal - 'on doit étudier'",
        },
        {
          answer: "on devons étudier",
          feedback: "'on' takes il/elle forms - 'on doit' (not 'on devons')!",
        },
      ],
    },
    {
      id: "on-people.3",
      instruction: "Say 'People say that it's good'",
      prompt: "People say that it's good",
      hint: "on dit + que + c'est bon",
      expectedAnswer: "on dit que c'est bon",
      wrongAnswers: [
        {
          answer: "les gens dit que c'est bon",
          feedback:
            "'les gens' is plural - use 'les gens disent' OR use 'on dit'",
        },
      ],
    },
    {
      id: "on-people.4",
      instruction: "Say 'One cannot know everything'",
      prompt: "One cannot know everything",
      hint: "on ne peut pas + tout + savoir",
      expectedAnswer: "on ne peut pas tout savoir",
      wrongAnswers: [
        {
          answer: "on ne peut pas savoir tout",
          feedback:
            "Put 'tout' before the infinitive - 'on ne peut pas tout savoir'",
        },
      ],
    },
    {
      id: "on-people.5",
      instruction: "Say 'Everyone knows' using the fixed expression",
      prompt: "Everyone knows",
      hint: "tout le monde + sait (SINGULAR verb!)",
      expectedAnswer: "tout le monde sait",
      wrongAnswers: [
        {
          answer: "tout le monde savent",
          feedback:
            "'tout le monde' is singular (like 'everyone') - use 'sait' not 'savent'!",
        },
        {
          answer: "tous les gens savent",
          feedback: "Use the fixed expression 'tout le monde sait'",
        },
      ],
    },
    {
      id: "on-people.6",
      instruction: "Say 'People think'",
      prompt: "People think",
      hint: "les gens + pensent (plural verb)",
      expectedAnswer: "les gens pensent",
      wrongAnswers: [
        {
          answer: "les gens pense",
          feedback: "'les gens' is plural - use 'pensent' not 'pense'!",
        },
        {
          answer: "on pense",
          feedback: "That works, but the question asks for 'les gens pensent'",
        },
      ],
    },
    {
      id: "on-people.7",
      instruction: "Say 'We learn by practicing' (using on)",
      prompt: "We learn by practicing (using on)",
      hint: "on + apprend + en pratiquant",
      expectedAnswer: "on apprend en pratiquant",
      wrongAnswers: [
        {
          answer: "nous apprenons en pratiquant",
          feedback: "Use 'on' for informal - 'on apprend'",
        },
      ],
    },
    {
      id: "on-people.8",
      instruction: "Say 'We must believe' (using on)",
      prompt: "We must believe (using on)",
      hint: "on + doit + croire",
      expectedAnswer: "on doit croire",
      wrongAnswers: [],
    },
  ],
};
