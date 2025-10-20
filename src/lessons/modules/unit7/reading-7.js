/**
 * Reading 7: L'Art d'Apprendre (The Art of Learning)
 * Unit 7 - Philosophical article about learning and knowledge
 * Uses: All Unit 7 cognitive verbs + discourse markers + previously taught vocabulary
 * Theme: Meta-learning - students reading about learning while learning!
 */

export const reading7 = {
  moduleKey: "2024-05-07-reading-7", // Permanent identifier - never changes
  title: "Reading 7 - L'Art d'Apprendre",
  description:
    "A philosophical article about learning and education. Uses all cognitive verbs from Unit 7!",

  skipStudyMode: true,
  isReadingComprehension: true,
  concepts: [
    {
      term: "Academic Reading Milestone",
      definition:
        "You can now read complex French texts about education, learning, and cultural understanding",
      example:
        "Story featuring on/nous usage, comprendre/understand, penser/think, savoir/know facts, connaître/know people, and academic vocabulary",
    },
    {
      term: "Educational Context",
      definition:
        "Experience how French people discuss learning, education, and cultural exchange",
      example:
        "University life, language learning, cultural understanding, academic discussions, and intellectual discourse",
    },
    {
      term: "Cognitive Language Integration",
      definition:
        "See how cognitive verbs combine with previous units to create sophisticated academic French",
      example:
        "Complex sentences combining knowledge verbs, past tense, progressive actions, and cultural vocabulary",
    },
  ],

  readingPassage: {
    title: "L'Art d'Apprendre",
    text: `Qu'est-ce que l'apprentissage? En fait, c'est une grande question. Tout le monde étudie, mais est-ce que tout le monde apprend bien?

Bon, je pense que l'apprentissage va avec une question. Quand on a une question, on veut étudier. On cherche une réponse. Donc, les questions sont très bonnes pour apprendre.

Mais étudier, ce n'est pas la même chose qu'apprendre. Je peux étudier pendant des heures, mais si je ne comprends pas, je n'apprends pas vraiment. L'apprentissage, c'est quand je comprends une idée.

Alors, comment est-ce qu'on apprend bien? Voici mes pensées:

D'abord, on doit demander des questions. Socrate pense que les questions sont essentielles. Si on ne demande pas de questions, on ne pense pas. Et si on ne pense pas, on ne comprend pas.

Ensuite, on doit étudier bien. On ne peut pas apprendre si on étudie mal. L'étude demande du temps.

Après, on doit réviser. La révision est très bonne. Quand on révise, on comprend mieux. On voit les choses entre les idées.

Finalement, on doit croire en soi. Si on ne croit pas qu'on peut apprendre, on ne va pas apprendre.

Je connais beaucoup d'étudiants. Certains pensent qu'ils ne sont pas bons en apprentissage. Mais en fait, tout le monde peut apprendre. C'est une question de méthode.

Même les choses sont meilleures avec le temps. Maintenant, je comprends beaucoup. Je sais parler un peu. Je connais des mots, des phrases, des idées.

Donc, l'apprentissage est un voyage. On veut une réponse. On étudie. On cherche. On trouve des réponses. On comprend. Et finalement, on sait. C'est magnifique, quoi!

En fait, vous êtes en train d'apprendre maintenant. Vous comprenez mes idées. C'est la preuve que vous pouvez apprendre. Vous le faites déjà!`,

    translation: `What is learning? Actually, it's a big question. Everyone studies, but does everyone learn well?

Well, I think that learning goes with a question. When we have a question, we want to study. We look for an answer. So, questions are very good for learning.

But studying isn't the same thing as learning. I can study for hours, but if I don't understand, I'm not really learning. Learning is when I understand an idea.

So, how do we learn well? Here are my thoughts:

First, we must ask questions. Socrates thinks that questions are essential. If we don't ask questions, we don't think. And if we don't think, we don't understand.

Next, we must study well. We can't learn if we study poorly. Study requires time.

After that, we must review. Review is very good. When we review, we understand better. We see the things between ideas.

Finally, we must believe in ourselves. If we don't believe we can learn, we're not going to learn.

I know many students. Some think they're not good at learning. But actually, everyone can learn. It's a question of method.

Even things are better with time. Now, I understand a lot. I know how to speak a little. I know words, phrases, ideas.

So, learning is a journey. We want an answer. We study. We search. We find answers. We understand. And finally, we know. It's magnificent, you know!

Actually, you're learning right now. You understand my ideas. That's proof that you can learn. You're already doing it!`,
  },

  vocabularyReference: [
    // Unit 7 - Knowledge verbs
    { french: "apprendre", english: "to learn", note: "Unit 7 verb" },
    { french: "apprend", english: "learns", note: "3rd person" },
    { french: "étudier", english: "to study", note: "Unit 7 verb" },
    { french: "étudie", english: "studies", note: "3rd person" },
    { french: "étudiant(s)", english: "student(s)", note: "noun" },
    { french: "comprendre", english: "to understand", note: "Unit 7 verb" },
    { french: "comprends", english: "understand", note: "1st/2nd person" },
    { french: "comprend", english: "understands", note: "3rd person" },
    { french: "comprenez", english: "understand", note: "formal/plural" },
    { french: "savoir", english: "to know", note: "Unit 7 verb" },
    { french: "sais", english: "know", note: "1st person" },
    { french: "sait", english: "knows", note: "3rd person" },
    {
      french: "connaître",
      english: "to know (people/places)",
      note: "Unit 7 verb",
    },
    { french: "connais", english: "know", note: "1st person" },
    { french: "penser", english: "to think", note: "Unit 7 verb" },
    { french: "pense", english: "think(s)", note: "present" },
    { french: "pensent", english: "think", note: "plural" },
    { french: "pensées", english: "thoughts", note: "noun" },
    { french: "croire", english: "to believe", note: "Unit 7 verb" },
    { french: "croit", english: "believes", note: "3rd person" },
    { french: "réviser", english: "to review", note: "Unit 7 verb" },
    { french: "révise", english: "review(s)", note: "present" },
    { french: "révision", english: "review", note: "noun" },
    { french: "chercher", english: "to look for", note: "Unit 6 verb" },
    { french: "cherche", english: "look(s) for", note: "present" },
    { french: "trouver", english: "to find", note: "Unit 6 verb" },
    { french: "trouve", english: "find(s)", note: "present" },

    // Unit 7 - Knowledge nouns
    {
      french: "l'apprentissage",
      english: "learning (process)",
      note: "masculine noun",
    },
    { french: "question", english: "question", note: "feminine" },
    { french: "questions", english: "questions", note: "plural" },
    { french: "réponse", english: "answer", note: "feminine" },
    { french: "réponses", english: "answers", note: "plural" },
    { french: "idée", english: "idea", note: "feminine" },
    { french: "idées", english: "ideas", note: "plural" },
    { french: "l'étude", english: "study", note: "feminine noun" },
    { french: "connaissance", english: "knowledge", note: "feminine" },
    { french: "pensée", english: "thought", note: "feminine" },

    // Unit 7 - Discourse markers
    { french: "donc", english: "so / therefore", note: "connector" },
    {
      french: "en fait",
      english: "actually / in fact",
      note: "discourse marker",
    },
    { french: "bon", english: "well", note: "discourse marker" },
    { french: "alors", english: "so / then", note: "connector" },
    { french: "quoi", english: "you know (filler)", note: "end of sentence" },

    // Unit 7 - Modifiers
    { french: "tout le monde", english: "everyone", note: "fixed expression" },
    { french: "même", english: "even / same", note: "modifier" },
    { french: "mal", english: "badly / poorly", note: "adverb" },

    // Proper nouns
    {
      french: "Socrate",
      english: "Socrates",
      note: "⭐ Greek philosopher - Socratic method",
    },

    // Previously taught (Units 1-6)
    { french: "pendant", english: "during / for", note: "preposition" },
    { french: "des heures", english: "hours", note: "time" },
    { french: "vraiment", english: "really / truly", note: "adverb" },
    { french: "comment", english: "how", note: "question word" },
    { french: "voici", english: "here is/are", note: "demonstrative" },
    { french: "d'abord", english: "first", note: "sequence" },
    { french: "ensuite", english: "next / then", note: "sequence" },
    { french: "après", english: "after", note: "sequence" },
    { french: "finalement", english: "finally", note: "sequence" },
    { french: "demander", english: "to ask", note: "Unit 6 verb" },
    { french: "demande", english: "ask(s)", note: "present" },
    { french: "mieux", english: "better", note: "comparative" },
    { french: "soi", english: "oneself", note: "stressed pronoun" },
    { french: "certains", english: "some (people)", note: "pronoun" },
    { french: "bons", english: "good (plural)", note: "adjective" },
    { french: "méthode", english: "method", note: "noun" },
    {
      french: "meilleures",
      english: "better (fem plural)",
      note: "comparative",
    },
    { french: "avec le temps", english: "with time", note: "expression" },
    { french: "maintenant", english: "now", note: "time adverb" },
    { french: "beaucoup", english: "a lot / much", note: "quantity" },
    { french: "un peu", english: "a little", note: "quantity" },
    { french: "des mots", english: "words", note: "noun plural" },
    { french: "mot", english: "word", note: "noun" },
    { french: "des phrases", english: "phrases", note: "plural" },
    { french: "phrase", english: "phrase / sentence", note: "noun" },
    { french: "voyage", english: "journey / trip", note: "noun" },
    { french: "magnifique", english: "magnificent", note: "adjective" },
    {
      french: "en train de",
      english: "in the process of",
      note: "progressive",
    },
    { french: "preuve", english: "proof", note: "noun" },
    { french: "déjà", english: "already", note: "adverb" },
    { french: "faites", english: "do/make", note: "faire - vous form" },
    { french: "le faites", english: "do it", note: "with object pronoun" },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        id: "reading-7.1",
        instruction: "According to the text, what does learning begin with?",
        prompt: "Learning begins with...",
        hint: "First paragraph mentions this",
        expectedAnswer: "une question",
        acceptableAnswers: ["question", "des questions"],
        wrongAnswers: [
          {
            answer: "un livre",
            feedback:
              "The text says learning begins with a question, not a book",
          },
          {
            answer: "un professeur",
            feedback:
              "The text says learning begins with a question, not a teacher",
          },
        ],
      },
      {
        id: "reading-7.2",
        instruction: "What's the difference between studying and learning?",
        prompt: "Learning is when you...",
        hint: "Third paragraph explains this",
        expectedAnswer: "comprends",
        acceptableAnswers: [
          "je comprends",
          "quand je comprends",
          "on comprend",
        ],
        wrongAnswers: [
          {
            answer: "étudies",
            feedback:
              "Learning is when you understand, not just when you study",
          },
        ],
      },
      {
        id: "reading-7.3",
        instruction: "What is the first thing we must do to learn well?",
        prompt: "First, we must...",
        hint: "Look for 'D'abord'",
        expectedAnswer: "demander des questions",
        acceptableAnswers: ["demander", "questions", "poser des questions"],
        wrongAnswers: [
          {
            answer: "réviser",
            feedback: "Asking questions comes first, review comes later",
          },
        ],
      },
      {
        id: "reading-7.4",
        instruction: "What happens when we review?",
        prompt: "When we review, we understand...",
        hint: "The text says 'on comprend...'",
        expectedAnswer: "on comprend mieux",
        acceptableAnswers: [
          "nous comprenons mieux",
          "mieux",
          "on voit les choses entre les idées",
        ],
        wrongAnswers: [],
      },
      {
        id: "reading-7.5",
        instruction: "What must we believe in to learn?",
        prompt: "We must believe in...",
        hint: "Look for 'croire en...'",
        expectedAnswer: "soi",
        acceptableAnswers: ["croire en soi", "en soi"],
        wrongAnswers: [
          {
            answer: "le professeur",
            feedback: "The text says we must believe in ourselves (soi)",
          },
        ],
      },
      {
        id: "reading-7.6",
        instruction: "According to the author, can everyone learn?",
        prompt: "Everyone can learn because...",
        hint: "Look for 'tout le monde peut...'",
        expectedAnswer: "oui",
        acceptableAnswers: [
          "c'est une question de méthode",
          "question de méthode",
          "méthode",
        ],
        wrongAnswers: [
          {
            answer: "c'est facile",
            feedback:
              "The text says it's a question of method, not that it's easy",
          },
        ],
      },
      {
        id: "reading-7.7",
        instruction: "Things do what over time according to the text?",
        prompt: "Things are...",
        hint: "Look for 'même les choses sont...'",
        expectedAnswer: "les choses sont meilleures avec le temps",
        acceptableAnswers: [
          "meilleures",
          "meilleures avec le temps",
          "elles sont meilleures",
        ],
        wrongAnswers: [],
      },
      {
        id: "reading-7.8",
        instruction: "What is learning described as?",
        prompt: "Learning is a...",
        hint: "Near the end: 'l'apprentissage est un...'",
        expectedAnswer: "un voyage",
        acceptableAnswers: ["voyage"],
        wrongAnswers: [
          {
            answer: "problème",
            feedback:
              "Learning is described as a journey (voyage), not a problem",
          },
        ],
      },
      {
        id: "reading-7.9",
        instruction: "What is the proof that you can learn?",
        prompt: "The proof is that you...",
        hint: "Last paragraph: 'C'est la preuve que...'",
        expectedAnswer: "vous comprenez mes idées",
        acceptableAnswers: [
          "comprenez mes idées",
          "comprenez les idées",
          "vous comprenez",
          "je comprends mes idées",
          "je comprends les idées",
          "vous comprendez les idées",
        ],
        wrongAnswers: [
          {
            answer: "parlez français",
            feedback: "The proof is that you understand the ideas",
          },
        ],
      },
      {
        id: "reading-7.10",
        instruction: "What are you doing right now according to the text?",
        prompt: "You are...",
        hint: "Last paragraph: 'vous êtes en train de...'",
        expectedAnswer: "apprendre",
        acceptableAnswers: [
          "vous êtes en train d'apprendre",
          "en train d'apprendre",
          "je suis en train d'apprendre",
        ],
        wrongAnswers: [
          {
            answer: "étudier seulement",
            feedback:
              "The text says you're learning (apprendre), not just studying",
          },
        ],
      },
    ],
  },
};
