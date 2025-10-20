/**
 * Module 101: Causal & Reason Words - parce que, car, puisque
 * Unit 9 - Explain WHY and provide reasoning
 * Enables explanation for all actions and decisions
 */

export const causalWordsModule = {
  moduleKey: "2024-05-26-causal-words", // Permanent identifier - never changes
  title: "Causal & Reason Words - Explaining Why",
  description:
    "Learn to explain reasons and causes: parce que (because), car (for), puisque (since), comme (as), grâce à (thanks to), à cause de (because of)",
  unit: 9,

  concepts: [
    {
      term: "parce que - because (most common)",
      definition: "Answers 'pourquoi?' - used in all situations",
      example:
        "Je mange parce que j'ai faim (I eat because I'm hungry), Je ne viens pas parce que je suis malade (I'm not coming because I'm sick)",
    },
    {
      term: "car - for, because (formal/literary)",
      definition:
        "More formal than 'parce que', CANNOT start a sentence, common in writing",
      example:
        "On étudie le français car c'est utile (We study French for it's useful), Je reste ici car il pleut (I'm staying here for it's raining)",
    },
    {
      term: "puisque - since, seeing as",
      definition:
        "Indicates logical conclusion or something already known, slightly formal",
      example:
        "Puisque tu es là, on commence (Since you're here, we'll start), Puisque c'est vrai, je te crois (Since it's true, I believe you)",
    },
    {
      term: "comme - as, since (at START of sentence)",
      definition: "Explains reason, MUST come at beginning of sentence",
      example:
        "Comme il fait beau, on va au parc (As it's nice, we're going to the park), Comme je suis fatigué, je reste à la maison (As I'm tired, I'm staying home)",
    },
    {
      term: "grâce à - thanks to (positive reason + NOUN)",
      definition: "Positive attribution, followed by a noun or pronoun",
      example:
        "Grâce à toi, je comprends mieux (Thanks to you, I understand better), Grâce au professeur, j'ai réussi (Thanks to the teacher, I succeeded)",
    },
    {
      term: "à cause de - because of (negative/neutral + NOUN)",
      definition:
        "Often negative or neutral, followed by a noun (NOT a clause!)",
      example:
        "À cause de la pluie, on reste ici (Because of the rain, we're staying here), À cause du traffic, je suis en retard (Because of traffic, I'm late)",
    },
  ],

  vocabularyReference: [
    {
      french: "parce que",
      english: "because",
      note: "⭐ most common - use with clauses",
    },
    {
      french: "car",
      english: "for, because",
      note: "formal/literary - never at start!",
    },
    {
      french: "puisque",
      english: "since, seeing as",
      note: "established fact - more formal",
    },
    {
      french: "comme",
      english: "as, since",
      note: "MUST start sentence - formal",
    },
    {
      french: "grâce à",
      english: "thanks to",
      note: "positive reason + noun only",
    },
    {
      french: "à cause de",
      english: "because of",
      note: "negative/neutral reason + noun",
    },
    {
      french: "pourquoi",
      english: "why",
      note: "question word - answer with parce que",
    },
    {
      french: "la raison",
      english: "the reason",
      note: "feminine noun - la raison pour...",
    },
    {
      french: "le motif",
      english: "the motive, reason",
      note: "masculine noun - formal context",
    },
    {
      french: "la cause",
      english: "the cause",
      note: "feminine noun - à cause de...",
    },
  ],

  exercises: [
    {
      type: "fillblank",
      prompt:
        "Complete: Je ne viens pas ___ je suis malade (I'm not coming because I'm sick)",
      answer: "parce que",
      wrongAnswers: [
        {
          answer: "car",
          feedback:
            "Car works here! But 'parce que' is more natural in spoken French.",
        },
        {
          answer: "grâce à",
          feedback:
            "Grâce à is for positive reasons + NOUN: 'grâce à toi'. Use 'parce que' + clause here.",
        },
        {
          answer: "à cause de",
          feedback:
            "À cause de needs a NOUN: 'à cause de la maladie'. Use 'parce que' + clause here.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: On étudie le français ___ c'est utile (We study French for it's useful)",
      answer: "car",
      wrongAnswers: [
        {
          answer: "parce que",
          feedback:
            "Parce que works! But 'car' is more elegant in this context.",
        },
        {
          answer: "comme",
          feedback:
            "Comme must come at the START of the sentence: 'Comme c'est utile, on étudie...'",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: ___ il fait beau, on va au parc (As it's nice, we're going to the park)",
      answer: "Comme",
      wrongAnswers: [
        {
          answer: "Parce que",
          feedback:
            "Parce que doesn't typically start sentences. Use 'Comme' at the beginning!",
        },
        {
          answer: "Car",
          feedback:
            "Car CANNOT start a sentence! Use 'Comme' at the beginning.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: ___ tu es là, on commence (Since you're here, we'll start)",
      answer: "Puisque",
      wrongAnswers: [
        {
          answer: "Comme",
          feedback:
            "Comme works! But 'puisque' is perfect for logical conclusions.",
        },
        {
          answer: "Parce que",
          feedback:
            "Parce que is less natural at the start. Use 'puisque' for 'since'.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: ___ toi, je comprends mieux (Thanks to you, I understand better)",
      answer: "Grâce à",
      wrongAnswers: [
        {
          answer: "Parce que",
          feedback:
            "Parce que needs a CLAUSE (subject + verb). Use 'grâce à' + noun here!",
        },
        {
          answer: "À cause de",
          feedback:
            "À cause de is for negative/neutral! Use 'grâce à' for positive thanks.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: ___ la pluie, on reste ici (Because of the rain, we're staying here)",
      answer: "À cause de",
      wrongAnswers: [
        {
          answer: "Parce que",
          feedback:
            "Parce que needs a CLAUSE: 'parce qu'il pleut'. Use 'à cause de' + noun here!",
        },
        {
          answer: "Grâce à",
          feedback:
            "Grâce à is for POSITIVE reasons! Use 'à cause de' for negative/neutral.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Pourquoi tu restes? - ___ je suis fatigué (Why are you staying? - Because I'm tired)",
      answer: "Parce que",
      wrongAnswers: [
        {
          answer: "Car",
          feedback:
            "Car works but sounds formal. Use 'parce que' to answer 'pourquoi'.",
        },
        {
          answer: "Puisque",
          feedback:
            "Puisque is for known facts, not direct answers to 'pourquoi'. Use 'parce que'!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Je suis en retard ___ le traffic (I'm late because of traffic)",
      answer: "à cause du",
      wrongAnswers: [
        {
          answer: "parce que",
          feedback:
            "Parce que needs a CLAUSE: 'parce qu'il y a du traffic'. Use 'à cause de' + noun!",
        },
        {
          answer: "grâce au",
          feedback:
            "Being late isn't positive! Use 'à cause de' for negative reasons.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: J'ai réussi ___ professeur (I succeeded thanks to the teacher)",
      answer: "grâce au",
      wrongAnswers: [
        {
          answer: "parce que le",
          feedback:
            "Close! But 'grâce à' + noun is more elegant than 'parce que' + clause here.",
        },
        {
          answer: "à cause du",
          feedback:
            "Succeeding is positive! Use 'grâce à' for positive attribution.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Il ne travaille pas ___ il est riche (He doesn't work because he's rich)",
      answer: "car",
      wrongAnswers: [
        {
          answer: "parce que",
          feedback:
            "Parce que works! But 'car' sounds more sophisticated here.",
        },
        {
          answer: "comme",
          feedback:
            "Comme must be at the START: 'Comme il est riche, il ne travaille pas'.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: ___ du mauvais temps, on annule le match (Because of bad weather, we're canceling the match)",
      answer: "À cause",
      wrongAnswers: [
        {
          answer: "Grâce à",
          feedback:
            "Bad weather isn't positive! Use 'à cause de' for negative reasons.",
        },
        {
          answer: "Parce que",
          feedback:
            "Parce que needs a CLAUSE: 'parce qu'il fait mauvais'. Use 'à cause de' + noun!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: On va partir ___ tu es prêt (We'll leave since you're ready)",
      answer: "puisque",
      wrongAnswers: [
        {
          answer: "parce que",
          feedback:
            "Parce que works! But 'puisque' emphasizes the logical conclusion better.",
        },
        {
          answer: "car",
          feedback: "Car works but 'puisque' is more natural for 'since'.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: ___ c'est ton anniversaire, on va au restaurant (Since/As it's your birthday, we're going to a restaurant)",
      answer: "Comme",
      wrongAnswers: [
        {
          answer: "Parce que",
          feedback:
            "Parce que rarely starts sentences. Use 'Comme' at the beginning!",
        },
        {
          answer: "Puisque",
          feedback: "Puisque works! But 'Comme' is more natural here.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Je t'aime ___ tu es gentil (I love you because you're kind)",
      answer: "parce que",
      wrongAnswers: [
        {
          answer: "car",
          feedback: "Car works! But 'parce que' is more natural in speech.",
        },
        {
          answer: "grâce à",
          feedback: "Grâce à needs a NOUN, not a clause. Use 'parce que' here!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: On parle français ___ on est en France (We speak French since we're in France)",
      answer: "car",
      wrongAnswers: [
        {
          answer: "parce que",
          feedback:
            "Parce que works! Both are correct, but 'car' is slightly more formal.",
        },
        {
          answer: "puisque",
          feedback: "Puisque works! All three work here actually.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: ___ mon aide, tu as fini à temps (Thanks to my help, you finished on time)",
      answer: "Grâce à",
      wrongAnswers: [
        {
          answer: "Parce que",
          feedback:
            "Parce que needs a CLAUSE. Use 'grâce à' + noun for attribution!",
        },
        {
          answer: "À cause de",
          feedback:
            "Finishing on time is positive! Use 'grâce à' for positive reasons.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Je ne dors pas bien ___ bruit (I don't sleep well because of the noise)",
      answer: "à cause du",
      wrongAnswers: [
        {
          answer: "parce que le",
          feedback:
            "Close! But 'à cause de' + noun is more direct than parce que + clause.",
        },
        {
          answer: "grâce au",
          feedback:
            "Not sleeping well isn't positive! Use 'à cause de' for problems.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: ___ j'ai le temps, je vais t'aider (Since I have time, I'm going to help you)",
      answer: "Comme",
      wrongAnswers: [
        {
          answer: "Parce que",
          feedback:
            "Parce que rarely starts sentences. 'Comme' is perfect at the start!",
        },
        {
          answer: "Puisque",
          feedback: "Puisque works! Both comme and puisque work here.",
        },
      ],
    },
  ],

  fillInBlanksSentences: [
    "Je mange ___ j'ai faim (I eat because I'm hungry)",
    "On reste ici ___ il pleut (We're staying here for it's raining)",
    "___ tu es là, on commence (Since you're here, let's start)",
    "___ il fait beau, on va dehors (As it's nice, we're going outside)",
    "___ toi, j'ai réussi (Thanks to you, I succeeded)",
    "___ la pluie, on annule (Because of the rain, we're canceling)",
    "Je ne viens pas ___ je suis malade (I'm not coming because I'm sick)",
    "Il est content ___ il a gagné (He's happy for he won)",
    "___ c'est vrai, je te crois (Since it's true, I believe you)",
    "___ du professeur, on comprend (Thanks to the teacher, we understand)",
  ],
};
