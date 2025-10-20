/**
 * Module 105: Passé Composé - Irregular Past Participles (Set 1)
 * Unit 9 - Most common irregular verbs in past tense
 * avoir, être, faire, voir - the top 4 most frequent
 */

export const passeComposeIrregular1Module = {
  moduleKey: "2024-06-01-passe-compose-irregular-1", // Permanent identifier - never changes
  title: "Irregular Past Participles - Set 1 (had, was, did, saw)",
  description:
    "Learn the 4 most common irregular past participles: avoir → eu (had), être → été (was/been), faire → fait (did/made), voir → vu (saw)",
  unit: 9,

  concepts: [
    {
      term: "avoir → eu (had)",
      definition: "Irregular past participle: j'ai eu, tu as eu, il a eu",
      example:
        "J'ai eu le temps (I had time), J'ai eu de la chance (I had luck/I was lucky)",
    },
    {
      term: "être → été (was/been)",
      definition: "Irregular past participle: j'ai été, tu as été, il a été",
      example:
        "J'ai été content (I was happy), J'ai été à Paris (I went to Paris - informal)",
    },
    {
      term: "faire → fait (did/made)",
      definition: "Irregular past participle: j'ai fait, tu as fait, il a fait",
      example:
        "J'ai fait ça (I did that), J'ai fait mes devoirs (I did my homework), J'ai fait un gâteau (I made a cake)",
    },
    {
      term: "voir → vu (saw)",
      definition: "Irregular past participle: j'ai vu, tu as vu, il a vu",
      example:
        "J'ai vu le film (I saw the movie), Tu as vu Marie? (Did you see Marie?)",
    },
    {
      term: "Memory tip",
      definition: "These 4 verbs are the most common - memorize them!",
      example: "eu, été, fait, vu - practice these until automatic",
    },
    {
      term: "All use AVOIR as auxiliary",
      definition: "These 4 verbs all use 'avoir' (not être) in passé composé",
      example: "j'ai eu, j'ai été, j'ai fait, j'ai vu (all with 'avoir')",
    },
  ],

  vocabularyReference: [
    {
      french: "j'ai eu",
      english: "I had",
      note: "⭐ avoir → eu (irregular!)",
    },
    {
      french: "j'ai été",
      english: "I was / I have been",
      note: "⭐ être → été (irregular!)",
    },
    {
      french: "j'ai fait",
      english: "I did / I made",
      note: "⭐ faire → fait (irregular!)",
    },
    {
      french: "j'ai vu",
      english: "I saw",
      note: "⭐ voir → vu (irregular!)",
    },
    {
      french: "tu as eu",
      english: "you had",
      note: "avoir → eu conjugated",
    },
    {
      french: "il a fait",
      english: "he did / he made",
      note: "faire → fait conjugated",
    },
    {
      french: "nous avons vu",
      english: "we saw",
      note: "voir → vu conjugated",
    },
    {
      french: "ils ont été",
      english: "they were / they have been",
      note: "être → été conjugated",
    },
    {
      french: "la chance",
      english: "luck",
      note: "feminine noun - avoir de la chance = to be lucky",
      example: "J'ai eu de la chance",
    },
    {
      french: "les devoirs",
      english: "homework",
      usage: "plural noun",
      example: "faire ses devoirs",
    },
  ],

  exercises: [
    {
      type: "fillblank",
      prompt:
        "Complete: Hier, j'___ le temps (Yesterday, I had time) - Use 'avoir'",
      answer: "ai eu",
      wrongAnswers: [
        {
          answer: "ai avoir",
          feedback:
            "The past participle of avoir is 'eu' (irregular): j'ai eu.",
        },
        {
          answer: "avais",
          feedback:
            "That's imparfait! Use passé composé for specific time: j'ai eu.",
        },
        {
          answer: "ai été",
          feedback:
            "Été is the past participle of être! Use 'eu' for avoir: j'ai eu.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt: "Complete: Tu ___ content? (Were you happy?) - Use 'être'",
      answer: "as été",
      wrongAnswers: [
        {
          answer: "as être",
          feedback:
            "The past participle of être is 'été' (irregular): tu as été.",
        },
        {
          answer: "étais",
          feedback:
            "That's imparfait! Use passé composé for specific moment: tu as été.",
        },
        {
          answer: "es",
          feedback:
            "That's present tense! Use passé composé: tu as été (you were).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Elle ___ ses devoirs (She did her homework) - Use 'faire'",
      answer: "a fait",
      wrongAnswers: [
        {
          answer: "a faire",
          feedback:
            "The past participle of faire is 'fait' (irregular): elle a fait.",
        },
        {
          answer: "fait",
          feedback:
            "You need the auxiliary verb! It's 'elle a fait', not just 'fait'.",
        },
        {
          answer: "faisait",
          feedback:
            "That's imparfait! Use passé composé for completed action: elle a fait.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: J'___ le film hier (I saw the movie yesterday) - Use 'voir'",
      answer: "ai vu",
      wrongAnswers: [
        {
          answer: "ai voir",
          feedback: "The past participle of voir is 'vu' (irregular): j'ai vu.",
        },
        {
          answer: "vois",
          feedback: "That's present tense! Use passé composé: j'ai vu (I saw).",
        },
        {
          answer: "voyais",
          feedback:
            "That's imparfait! Use passé composé for specific event: j'ai vu.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Nous ___ de la chance (We were lucky/We had luck) - Use 'avoir'",
      answer: "avons eu",
      wrongAnswers: [
        {
          answer: "avons avoir",
          feedback: "The past participle of avoir is 'eu': nous avons eu.",
        },
        {
          answer: "avions",
          feedback:
            "That's imparfait! Use passé composé: nous avons eu (we had).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt: "Complete: Vous ___ ça? (Did you do/make that?) - Use 'faire'",
      answer: "avez fait",
      wrongAnswers: [
        {
          answer: "avez faire",
          feedback: "The past participle of faire is 'fait': vous avez fait.",
        },
        {
          answer: "faites",
          feedback:
            "That's present tense! Use passé composé: vous avez fait (you did).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Ils ___ Marie hier (They saw Marie yesterday) - Use 'voir'",
      answer: "ont vu",
      wrongAnswers: [
        {
          answer: "ont voir",
          feedback: "The past participle of voir is 'vu': ils ont vu.",
        },
        {
          answer: "voient",
          feedback:
            "That's present tense! Use passé composé: ils ont vu (they saw).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: On ___ à Paris (We went to Paris / We were in Paris) - Use 'être'",
      answer: "a été",
      wrongAnswers: [
        {
          answer: "a être",
          feedback: "The past participle of être is 'été': on a été à Paris.",
        },
        {
          answer: "était",
          feedback:
            "That's imparfait! Use passé composé: on a été (we were/went).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Je n'___ pas ___ raison (I wasn't right/I didn't have reason) - Use 'avoir'",
      answer: "ai pas eu",
      wrongAnswers: [
        {
          answer: "ai pas avoir",
          feedback: "The past participle of avoir is 'eu': je n'ai pas eu.",
        },
        {
          answer: "avais pas",
          feedback:
            "That's imparfait! Use passé composé: je n'ai pas eu raison.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Tu n'___ pas ___ content? (Weren't you happy?) - Use 'être'",
      answer: "as pas été",
      wrongAnswers: [
        {
          answer: "as pas être",
          feedback: "The past participle of être is 'été': tu n'as pas été.",
        },
        {
          answer: "étais pas",
          feedback:
            "That's imparfait! Use passé composé: tu n'as pas été content?",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Qu'est-ce que tu ___ ? (What did you do?) - Use 'faire'",
      answer: "as fait",
      wrongAnswers: [
        {
          answer: "as faire",
          feedback: "The past participle of faire is 'fait': tu as fait.",
        },
        {
          answer: "fais",
          feedback:
            "That's present tense! Use passé composé: tu as fait (you did).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Est-ce que vous ___ le problème? (Did you see the problem?) - Use 'voir'",
      answer: "avez vu",
      wrongAnswers: [
        {
          answer: "avez voir",
          feedback: "The past participle of voir is 'vu': vous avez vu.",
        },
        {
          answer: "voyez",
          feedback:
            "That's present tense! Use passé composé: vous avez vu (you saw).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt: "Complete: J'___ un gâteau (I made a cake) - Use 'faire'",
      answer: "ai fait",
      wrongAnswers: [
        {
          answer: "ai faire",
          feedback: "The past participle of faire is 'fait': j'ai fait.",
        },
        {
          answer: "fais",
          feedback:
            "That's present tense! Use passé composé: j'ai fait (I made).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Elle ___ très occupée (She was very busy) - Use 'être'",
      answer: "a été",
      wrongAnswers: [
        {
          answer: "a être",
          feedback: "The past participle of être is 'été': elle a été.",
        },
        {
          answer: "était",
          feedback:
            "That's imparfait! Use passé composé for specific time: elle a été.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Ils n'___ pas ___ le temps (They didn't have time) - Use 'avoir'",
      answer: "ont pas eu",
      wrongAnswers: [
        {
          answer: "ont pas avoir",
          feedback: "The past participle of avoir is 'eu': ils n'ont pas eu.",
        },
        {
          answer: "avaient pas",
          feedback:
            "That's imparfait! Use passé composé: ils n'ont pas eu le temps.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Nous ___ un bon film (We saw a good movie) - Use 'voir'",
      answer: "avons vu",
      wrongAnswers: [
        {
          answer: "avons voir",
          feedback: "The past participle of voir is 'vu': nous avons vu.",
        },
        {
          answer: "voyons",
          feedback:
            "That's present tense! Use passé composé: nous avons vu (we saw).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: On ___ attention (We paid attention / We were careful) - Use 'faire'",
      answer: "a fait",
      wrongAnswers: [
        {
          answer: "a faire",
          feedback: "The past participle of faire is 'fait': on a fait.",
        },
        {
          answer: "fait",
          feedback:
            "You need avoir! It's 'on a fait attention', not just 'fait'.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: J'___ au cinéma hier (I was at the cinema yesterday / I went to the cinema) - Use 'être'",
      answer: "ai été",
      wrongAnswers: [
        {
          answer: "ai être",
          feedback: "The past participle of être is 'été': j'ai été.",
        },
        {
          answer: "étais",
          feedback: "That's imparfait! Use passé composé: j'ai été au cinéma.",
        },
      ],
    },
  ],

  fillInBlanksSentences: [
    "J'___ le temps (I had time)",
    "Tu ___ content (You were happy)",
    "Elle ___ ses devoirs (She did her homework)",
    "J'___ le film (I saw the movie)",
    "Nous ___ de la chance (We were lucky)",
    "Vous ___ ça? (Did you do that?)",
    "Ils ___ Marie (They saw Marie)",
    "On ___ à Paris (We went to Paris)",
    "Qu'est-ce que tu ___ ? (What did you do?)",
    "J'___ un gâteau (I made a cake)",
  ],
};
