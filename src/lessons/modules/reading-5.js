/**
 * Reading Comprehension 5
 * Unit 5 vocabulary: comparisons, slang, conditionals, past tense, food, aimer, manger, boire
 * ONLY uses vocabulary from modules 1-58!
 */

export const reading5 = {
  title: "Reading Comprehension 5 - Le Meilleur Restaurant",
  description:
    "Unit 5 mastery! An article about a restaurant experience using comparisons, past tense, and food vocabulary.",

  skipStudyMode: true,
  isReadingComprehension: true,
  concepts: [
    {
      term: "Food and Memory Milestone",
      definition:
        "You can now read complex French stories about food, past experiences, and cultural memories",
      example:
        "Story featuring comparisons (plus...que, moins...que), conditionals (si), aimer verb, past tense (passé composé), and food vocabulary",
    },
    {
      term: "Cultural Memory",
      definition:
        "Experience how French people talk about food, family, and shared experiences",
      example:
        "Grandmother's cooking, family traditions, food preferences, and nostalgic memories",
    },
    {
      term: "Past Tense Narrative",
      definition:
        "Learn to follow and understand French stories that use past tense naturally",
      example:
        "j'ai mangé, nous avons bu, il est venu, elle a fait - authentic past tense usage in context",
    },
  ],

  readingPassage: {
    title: "Le Meilleur Restaurant de Paris (The Best Restaurant in Paris)",
    text: `Hier, j'étais avec mon ami Pierre. Nous avions faim. «Pierre, je veux manger maintenant!»

«Moi aussi! Nous devrions aller au restaurant,» Pierre a dit.

«Oui! Nous pourrions aller au meilleur restaurant!» j'ai dit.

Le restaurant était sur la grande place. C'était un petit restaurant, mais c'était génial! Tout le monde était là. Nous avons vu des hommes, des femmes et des enfants.

**La femme:** Bonjour! Qu'est-ce que vous voudriez?

**Pierre:** Nous voudrions du pain et de l'eau, s'il vous plaît. Et une pizza aussi!

**Moi:** Et je voudrais un express, s'il vous plaît.

**La femme:** Très bien! Voilà votre pain et votre eau.

Le pain était très bon. J'ai mangé du pain avec du beurre. Pierre a mangé une baguette. Nous avons bu de l'eau et du café. C'était trop bon!

«Ce restaurant est meilleur que les autres restaurants!» Pierre a dit.

«Oui! C'est le meilleur! Je devrais venir ici toujours! J'aime ce restaurant!»

Nous avons mangé la pizza. Elle était grande et très bonne. Nous avons bu du vin aussi. C'était la meilleure pizza de ma vie!

«Tu vois,» Pierre a dit, «je ne vais jamais aux autres restaurants. Ce restaurant est top!»

«C'est vachement bon ici!»

Nous avions trop mangé. Nous étions très contents, mais nous ne pouvions pas manger plus.

«L'addition, s'il vous plaît!» Pierre a dit à la femme.

«Vous voulez payer maintenant? Bon!»

«Je paie!» j'ai dit à Pierre.

«Non, non! Moi, je paie! Tu es mon ami.»

«Bon. Merci Pierre! Tu es le meilleur ami!»

Maintenant, je vais toujours à ce restaurant. C'est le même restaurant où Pierre et moi avons mangé hier. Je viens ici avec mes amis. Tout le monde aime ce restaurant.

Tu devrais aller à ce restaurant! C'est sur la grande place. Tu pourrais manger du pain, de la pizza, et boire du bon vin. C'est génial!

**Fin.**`,
    translation: `Yesterday, I was with my friend Pierre. We were hungry. "Pierre, I want to eat now!"

"Me too! We should go to the restaurant," Pierre said.

"Yes! We could go to the best restaurant!" I said.

The restaurant was on the big square. It was a small restaurant, but it was awesome! Everybody was there. We saw men, women and children.

**The woman:** Hello! What would you like?

**Pierre:** We would like bread and water, please. And a pizza too!

**Me:** And I would like an espresso, please.

**The woman:** Very good! Here is your bread and your water.

The bread was very good. I ate bread with butter. Pierre ate a baguette. We drank water and coffee. It was too good!

"This restaurant is better than the other restaurants!" Pierre said.

"Yes! It's the best! I should come here always! I like this restaurant!"

We ate the pizza. It was big and very good. We drank wine too. It was the best pizza of my life!

"You see," Pierre said, "I never go to the other restaurants. This restaurant is top!"

"It's really good here!"

We had eaten too much. We were very happy, but we could not eat more.

"The bill, please!" Pierre said to the woman.

"You want to pay now? Good!"

"I'll pay!" I said to Pierre.

"No, no! Me, I'll pay! You're my friend."

"Okay. Thank you Pierre! You're the best friend!"

Now, I always go to this restaurant. It's the same restaurant where Pierre and I ate yesterday. I come here with my friends. Everybody likes this restaurant.

You should go to this restaurant! It's on the big square. You could eat bread, pizza, and drink good wine. It's awesome!

**The End.**`,
  },

  vocabularyReference: [
    // Past tense - être
    { french: "j'étais", english: "I was", note: "être imperfect" },
    { french: "était", english: "was", note: "être imperfect - il/elle" },
    { french: "c'était", english: "it was", note: "very common expression" },
    {
      french: "nous étions",
      english: "we were",
      note: "être imperfect - nous",
    },

    // Past tense - avoir
    { french: "nous avions", english: "we had", note: "avoir imperfect" },
    {
      french: "avions faim",
      english: "were hungry",
      note: "avoir faim in past",
    },
    { french: "avions mangé", english: "had eaten", note: "pluperfect" },

    // Passé composé
    { french: "j'ai mangé", english: "I ate", note: "passé composé - manger" },
    { french: "a mangé", english: "ate", note: "passé composé - il/elle" },
    { french: "nous avons mangé", english: "we ate", note: "passé composé" },
    {
      french: "nous avons bu",
      english: "we drank",
      note: "passé composé - boire (irregular!)",
    },
    {
      french: "nous avons vu",
      english: "we saw",
      note: "passé composé - voir",
    },
    { french: "a dit", english: "said", note: "passé composé - dire (NEW!)" },
    {
      french: "j'ai dit",
      english: "I said",
      note: "passé composé - dire (NEW!)",
    },

    // Food & drink verbs
    { french: "manger", english: "to eat", note: "essential verb" },
    { french: "boire", english: "to drink", note: "irregular verb" },
    { french: "j'aime", english: "I like / I love", note: "emotion verb" },
    { french: "payer", english: "to pay", note: "regular verb" },
    { french: "je paie", english: "I pay", note: "present tense" },

    // Conditionals
    {
      french: "nous devrions",
      english: "we should",
      note: "conditional - devoir",
    },
    { french: "je devrais", english: "I should", note: "conditional - devoir" },
    {
      french: "tu devrais",
      english: "you should",
      note: "conditional - devoir",
    },
    {
      french: "nous pourrions",
      english: "we could",
      note: "conditional - pouvoir",
    },
    {
      french: "nous ne pouvions pas",
      english: "we could not",
      note: "imperfect negative",
    },
    {
      french: "tu pourrais",
      english: "you could",
      note: "conditional - pouvoir",
    },
    {
      french: "vous voudriez",
      english: "you would like (formal)",
      note: "conditional - vouloir",
    },
    {
      french: "je voudrais",
      english: "I would like",
      note: "conditional - vouloir",
    },
    {
      french: "nous voudrions",
      english: "we would like",
      note: "conditional - vouloir",
    },

    // Comparisons
    { french: "le meilleur", english: "the best (masc)", note: "superlative" },
    { french: "meilleur que", english: "better than", note: "comparison" },
    { french: "la meilleure", english: "the best (fem)", note: "superlative" },
    { french: "plus", english: "more", note: "comparison" },
    { french: "trop", english: "too much", note: "intensity" },
    { french: "le même", english: "the same", note: "comparison" },
    { french: "tout le monde", english: "everybody", note: "expression" },

    // Slang
    { french: "génial", english: "awesome / great", note: "France slang" },
    { french: "top", english: "top / the best", note: "universal slang" },
    { french: "vachement", english: "really / very", note: "France slang" },

    // Food nouns
    { french: "le pain", english: "bread", note: "essential food" },
    { french: "l'eau", english: "water", note: "essential drink" },
    { french: "une pizza", english: "a pizza", note: "popular food" },
    { french: "un express", english: "an espresso", note: "strong coffee" },
    { french: "une baguette", english: "a baguette", note: "French bread" },
    { french: "le beurre", english: "butter", note: "with bread" },
    { french: "le café", english: "coffee", note: "drink" },
    { french: "le vin", english: "wine", note: "drink" },

    // Other key words
    { french: "le restaurant", english: "the restaurant", note: "place" },
    { french: "faim", english: "hunger", note: "avoir faim = to be hungry" },
    { french: "la vie", english: "life", note: "abstract noun" },
    { french: "l'addition", english: "the bill", note: "at restaurant" },
    { french: "votre", english: "your (formal)", note: "possessive - vous" },
    { french: "où", english: "where", note: "location/question" },
    {
      french: "contents",
      english: "happy",
      note: "adjective - masculine plural",
    },
    { french: "aussi", english: "also / too", note: "addition" },
    { french: "moi aussi", english: "me too", note: "agreement" },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "How were the narrator and Pierre feeling?",
        prompt: "Nous avions ___",
        hint: "They were hungry (avoir + hunger)",
        expectedAnswer: "faim",
        wrongAnswers: [],
      },
      {
        instruction: "What did Pierre say about the restaurant?",
        prompt: "Le ___ restaurant de Paris",
        hint: "The best (superlative)",
        expectedAnswer: "meilleur",
        wrongAnswers: [],
      },
      {
        instruction: "What slang did the narrator use?",
        prompt: "C'est ___!",
        hint: "French slang for 'it's crazy'",
        expectedAnswer: "ouf",
        acceptableAnswers: ["c'est ouf"],
        wrongAnswers: [],
      },
      {
        instruction: "What conditional did they use?",
        prompt: "Nous ___ aller",
        hint: "We should go",
        expectedAnswer: "devrions",
        wrongAnswers: [],
      },
      {
        instruction: "Where was the restaurant?",
        prompt: "Sur la grande ___",
        hint: "Square/place",
        expectedAnswer: "place",
        wrongAnswers: [],
      },
      {
        instruction: "What was the restaurant like?",
        prompt: "C'était ___!",
        hint: "French slang for awesome",
        expectedAnswer: "génial",
        wrongAnswers: [],
      },
      {
        instruction: "What did Pierre order?",
        prompt: "Du pain, de l'eau, et une ___",
        hint: "Italian food",
        expectedAnswer: "pizza",
        wrongAnswers: [],
      },
      {
        instruction: "What kind of coffee did the narrator want?",
        prompt: "Je voudrais un ___",
        hint: "Espresso (in French)",
        expectedAnswer: "express",
        wrongAnswers: [],
      },
      {
        instruction: "What did they eat the bread with?",
        prompt: "Du pain avec du ___",
        hint: "Butter",
        expectedAnswer: "beurre",
        wrongAnswers: [],
      },
      {
        instruction: "What did Pierre eat?",
        prompt: "Pierre a mangé une ___",
        hint: "French bread",
        expectedAnswer: "baguette",
        wrongAnswers: [],
      },
      {
        instruction: "How did the narrator describe the food?",
        prompt: "C'était ___ bon!",
        hint: "Too (much)",
        expectedAnswer: "trop",
        wrongAnswers: [],
      },
      {
        instruction: "How did Pierre compare this restaurant to others?",
        prompt: "Ce restaurant est ___ que les autres",
        hint: "Better than",
        expectedAnswer: "meilleur",
        wrongAnswers: [],
      },
      {
        instruction: "What was the best thing?",
        prompt: "La ___ pizza de ma vie",
        hint: "The best (feminine)",
        expectedAnswer: "meilleure",
        wrongAnswers: [],
      },
      {
        instruction: "What slang did Pierre use?",
        prompt: "Ce restaurant est ___!",
        hint: "Universal slang for 'the best'",
        expectedAnswer: "top",
        wrongAnswers: [],
      },
      {
        instruction: "What expression did the narrator use?",
        prompt: "Tu avais ___",
        hint: "You were right (avoir + reason)",
        expectedAnswer: "raison",
        wrongAnswers: [],
      },
      {
        instruction: "What French slang intensity word was used?",
        prompt: "C'est ___ bon ici!",
        hint: "France slang for 'really'",
        expectedAnswer: "vachement",
        wrongAnswers: [],
      },
      {
        instruction: "Why couldn't they eat more?",
        prompt: "Nous ne ___ pas manger plus",
        hint: "Could not (conditional past)",
        expectedAnswer: "pouvions",
        wrongAnswers: [],
      },
      {
        instruction: "What did they ask for at the end?",
        prompt: "_____, s'il vous plaît!",
        hint: "The bill/check",
        expectedAnswer: "l'addition",
        acceptableAnswers: ["l addition"],
        wrongAnswers: [],
      },
      {
        instruction: "What does the narrator say about visiting now?",
        prompt: "Je vais ___ à ce restaurant",
        hint: "Always",
        expectedAnswer: "toujours",
        wrongAnswers: [],
      },
      {
        instruction: "What comparison word describes which restaurant?",
        prompt: "C'est le ___ restaurant",
        hint: "The same",
        expectedAnswer: "même",
        wrongAnswers: [],
      },
      {
        instruction: "What advice is given to readers?",
        prompt: "Tu ___ aller à ce restaurant",
        hint: "You should (conditional)",
        expectedAnswer: "devrais",
        wrongAnswers: [],
      },
      {
        instruction: "What possibility is mentioned?",
        prompt: "Tu ___ manger du pain",
        hint: "You could (conditional)",
        expectedAnswer: "pourrais",
        wrongAnswers: [],
      },
    ],
  },
};
