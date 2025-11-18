/**
 * Module: Dynamic ID (auto-assigned)8: Past Participle Agreement with être
 * Unit 9 - Past participles must agree with subject when using être
 * Adding e/s/es to past participles for gender/number
 */

export const passeComposeAgreementModule = {
  moduleKey: "2024-05-29-passe-compose-agreement", // Permanent identifier - never changes
  title: "Past Participle Agreement with être",
  description:
    "Learn agreement rules: il est allé (he went) vs elle est allée (she went - add e), ils sont allés (they went - add s) vs elles sont allées (add es)",
  unit: 9,

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Make past participles agree with gender and number",
      "Understand when to add e, s, or es to past participles",
      "Use agreement rules correctly with être verbs"
    ],
    realWorldUse: "write grammatically correct past tense",
    nextModuleTeaser: "Form imparfait for all verbs"
  },

  concepts: [
    {
      term: "Agreement Rule with être",
      definition:
        "When using ÊTRE in passé composé, past participle MUST agree with subject in gender and number",
      example:
        "il est allé (masculine), elle est allée (+e), ils sont allés (+s), elles sont allées (+es)",
    },
    {
      term: "Masculine singular - No change",
      definition: "Il/On: No change to past participle (base form)",
      example: "il est allé, il est venu, il est parti, on est resté",
    },
    {
      term: "Feminine singular - Add e",
      definition: "Elle: Add -e to past participle",
      example:
        "elle est allée, elle est venue, elle est partie, elle est restée",
    },
    {
      term: "Masculine plural - Add s",
      definition: "Ils/Nous/Vous (masculine): Add -s to past participle",
      example: "ils sont allés, nous sommes venus, vous êtes partis",
    },
    {
      term: "Feminine plural - Add es",
      definition: "Elles/Nous/Vous (feminine): Add -es to past participle",
      example:
        "elles sont allées, nous sommes venues (all feminine), vous êtes parties (all feminine)",
    },
    {
      term: "Mixed group - Use masculine form",
      definition:
        "When group has both masculine and feminine, use masculine plural (-s)",
      example: "Pierre et Marie sont allés (masculine plural wins)",
    },
    {
      term: "Remember: Only with ÊTRE verbs!",
      definition:
        "This rule ONLY applies to être verbs (DR MRS VANDERTRAMP + reflexives)",
      example:
        "j'ai mangé (no change with avoir!), BUT je suis allé/allée (agrees with être)",
    },
  ],

  vocabularyReference: [
    {
      french: "il est allé",
      english: "he went",
      note: "masculine singular - no change",
    },
    {
      french: "elle est allée",
      english: "she went",
      note: "⭐ feminine singular - add e",
    },
    {
      french: "ils sont allés",
      english: "they went",
      note: "masculine plural - add s",
    },
    {
      french: "elles sont allées",
      english: "they went",
      note: "⭐ feminine plural - add es",
    },
    {
      french: "nous sommes allés",
      note: "mixed/masc group - add s",
      english: "we went",
      agreement: "masculine or mixed plural (+s)",
      example: "Pierre et moi, nous sommes allés",
    },
    {
      french: "nous sommes allées",
      english: "we went",
      note: "all feminine group - add es",
    },
    {
      french: "vous êtes allé",
      english: "you went (singular formal, masculine)",
      note: "formal singular masculine",
      agreement: "masculine singular (no change)",
      example: "Monsieur, vous êtes allé où?",
    },
    {
      french: "vous êtes allée",
      english: "you went (singular formal, feminine)",
      agreement: "feminine singular (+e)",
      example: "Madame, vous êtes allée où?",
    },
    {
      french: "vous êtes allés",
      english: "you went (plural, masculine/mixed)",
      agreement: "masculine plural (+s)",
      example: "Les garçons, vous êtes allés où?",
    },
    {
      french: "vous êtes allées",
      english: "you went (plural, all feminine)",
      agreement: "feminine plural (+es)",
      example: "Les filles, vous êtes allées où?",
    },
  ],

  exercises: [
    {
      type: "fillblank",
      prompt:
        "Complete: Elle ___ au café (She went to the café) - Add agreement!",
      answer: "est allée",
      wrongAnswers: [
        {
          answer: "est allé",
          feedback:
            "Elle is feminine! Add -e for feminine singular: elle est allée.",
        },
        {
          answer: "est allés",
          feedback:
            "That's plural! Elle is singular: elle est allée (just add -e).",
        },
        {
          answer: "a allée",
          feedback:
            "Aller uses ÊTRE, not avoir! It's 'elle est allée', not 'a allée'.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Ils ___ hier (They went yesterday) - Masculine plural agreement!",
      answer: "sont allés",
      wrongAnswers: [
        {
          answer: "sont allé",
          feedback:
            "Ils is plural! Add -s for masculine plural: ils sont allés.",
        },
        {
          answer: "sont allées",
          feedback:
            "That's feminine plural! Use masculine -s for 'ils': ils sont allés.",
        },
        {
          answer: "ont allés",
          feedback:
            "Aller uses ÊTRE, not avoir! It's 'ils sont allés', not 'ont allés'.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Mes sœurs ___ à Paris (My sisters went to Paris) - Feminine plural agreement!",
      answer: "sont allées",
      wrongAnswers: [
        {
          answer: "sont allés",
          feedback:
            "Sœurs (sisters) is feminine! Add -es for feminine plural: sont allées.",
        },
        {
          answer: "sont allé",
          feedback:
            "Sœurs is plural! Add -es for feminine plural: sont allées.",
        },
        {
          answer: "ont allées",
          feedback:
            "Aller uses ÊTRE, not avoir! It's 'sont allées', not 'ont allées'.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Marie ___ hier (Marie came yesterday) - Use 'venir' with agreement!",
      answer: "est venue",
      wrongAnswers: [
        {
          answer: "est venu",
          feedback: "Marie is feminine! Add -e for feminine: Marie est venue.",
        },
        {
          answer: "est venus",
          feedback: "That's plural! Marie is singular: est venue (just -e).",
        },
        {
          answer: "a venue",
          feedback:
            "Venir uses ÊTRE, not avoir! It's 'est venue', not 'a venue'.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Nous ___ tôt (We left early) - Mixed group (Pierre et moi), use masculine!",
      answer: "sommes partis",
      wrongAnswers: [
        {
          answer: "sommes parti",
          feedback:
            "Nous is plural! Add -s for masculine plural: sommes partis.",
        },
        {
          answer: "sommes parties",
          feedback:
            "Mixed group uses masculine! Use -s (not -es): sommes partis.",
        },
        {
          answer: "avons partis",
          feedback:
            "Partir uses ÊTRE, not avoir! It's 'sommes partis', not 'avons partis'.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Les filles ___ hier soir (The girls arrived last night) - Feminine plural!",
      answer: "sont arrivées",
      wrongAnswers: [
        {
          answer: "sont arrivés",
          feedback:
            "Filles (girls) is feminine! Add -es for feminine plural: sont arrivées.",
        },
        {
          answer: "sont arrivé",
          feedback:
            "Les filles is plural! Add -es for feminine plural: sont arrivées.",
        },
        {
          answer: "ont arrivées",
          feedback:
            "Arriver uses ÊTRE, not avoir! It's 'sont arrivées', not 'ont arrivées'.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Mon frère ___ en France (My brother went to France) - Masculine singular!",
      answer: "est allé",
      wrongAnswers: [
        {
          answer: "est allée",
          feedback:
            "Frère (brother) is masculine! No -e needed: mon frère est allé.",
        },
        {
          answer: "est allés",
          feedback:
            "Mon frère is singular! No -s needed: est allé (base form).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Vous ___ où, Madame? (Where did you go, Madam?) - Formal singular feminine!",
      answer: "êtes allée",
      wrongAnswers: [
        {
          answer: "êtes allé",
          feedback: "Madame is feminine! Add -e for feminine: vous êtes allée.",
        },
        {
          answer: "êtes allées",
          feedback:
            "Addressing one person! Use singular -e (not plural -es): êtes allée.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Pierre et Marie ___ ensemble (Pierre and Marie left together) - Mixed group!",
      answer: "sont partis",
      wrongAnswers: [
        {
          answer: "sont parties",
          feedback:
            "Mixed group (boy + girl) uses masculine! Use -s: sont partis.",
        },
        {
          answer: "sont parti",
          feedback: "Two people = plural! Add -s for plural: sont partis.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Ma mère ___ au marché (My mother went to the market) - Feminine singular!",
      answer: "est allée",
      wrongAnswers: [
        {
          answer: "est allé",
          feedback:
            "Mère (mother) is feminine! Add -e for feminine: ma mère est allée.",
        },
        {
          answer: "est allées",
          feedback:
            "Ma mère is singular! Just add -e (not plural -es): est allée.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Les garçons ___ tard (The boys came home late) - Use 'rentrer', masculine plural!",
      answer: "sont rentrés",
      wrongAnswers: [
        {
          answer: "sont rentré",
          feedback:
            "Les garçons is plural! Add -s for masculine plural: sont rentrés.",
        },
        {
          answer: "sont rentrées",
          feedback:
            "Garçons (boys) is masculine! Use -s (not -es): sont rentrés.",
        },
        {
          answer: "ont rentrés",
          feedback:
            "Rentrer uses ÊTRE, not avoir! It's 'sont rentrés', not 'ont rentrés'.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Nous ___ à la maison (We stayed at home) - All girls (Marie et moi), feminine plural!",
      answer: "sommes restées",
      wrongAnswers: [
        {
          answer: "sommes restés",
          feedback:
            "All girls = feminine plural! Add -es (not -s): sommes restées.",
        },
        {
          answer: "sommes resté",
          feedback:
            "Nous is plural! Add -es for feminine plural: sommes restées.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Elle ___ dans le bus (She got on the bus) - Use 'monter', feminine!",
      answer: "est montée",
      wrongAnswers: [
        {
          answer: "est monté",
          feedback: "Elle is feminine! Add -e for feminine: elle est montée.",
        },
        {
          answer: "est montés",
          feedback:
            "That's plural masculine! Elle is singular feminine: est montée.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt: "Complete: Ils ___ à 8h (They arrived at 8) - Masculine plural!",
      answer: "sont arrivés",
      wrongAnswers: [
        {
          answer: "sont arrivé",
          feedback: "Ils is plural! Add -s for masculine plural: sont arrivés.",
        },
        {
          answer: "sont arrivées",
          feedback:
            "Ils is masculine! Use -s (not feminine -es): sont arrivés.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Elles ___ hier (They fell yesterday) - Use 'tomber', feminine plural!",
      answer: "sont tombées",
      wrongAnswers: [
        {
          answer: "sont tombés",
          feedback:
            "Elles is feminine! Add -es for feminine plural: sont tombées.",
        },
        {
          answer: "sont tombé",
          feedback:
            "Elles is plural! Add -es for feminine plural: sont tombées.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: On ___ ensemble (We went out together) - Use 'sortir', 'on' = masculine singular!",
      answer: "est sorti",
      wrongAnswers: [
        {
          answer: "est sortis",
          feedback:
            "On is grammatically singular! Use base form: on est sorti (no -s).",
        },
        {
          answer: "est sortie",
          feedback:
            "On is grammatically masculine! Use base form: on est sorti (no -e).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Vous ___ où, les filles? (Where did you go, girls?) - Plural feminine!",
      answer: "êtes allées",
      wrongAnswers: [
        {
          answer: "êtes allés",
          feedback:
            "Les filles (girls) is feminine! Add -es for feminine plural: êtes allées.",
        },
        {
          answer: "êtes allée",
          feedback:
            "Les filles is plural! Add -es for plural feminine: êtes allées.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Ton ami ___ hier? (Did your friend come yesterday?) - Masculine singular!",
      answer: "est venu",
      wrongAnswers: [
        {
          answer: "est venue",
          feedback:
            "Ami (friend - male) is masculine! No -e: ton ami est venu.",
        },
        {
          answer: "est venus",
          feedback: "Ton ami is singular! Use base form: est venu (no -s).",
        },
      ],
    },
  ],

  fillInBlanksSentences: [
    "Elle ___ au café (She went to the café)",
    "Ils ___ hier (They went yesterday)",
    "Mes sœurs ___ à Paris (My sisters went to Paris)",
    "Marie ___ hier (Marie came yesterday)",
    "Nous ___ tôt (We left early - mixed group)",
    "Les filles ___ hier soir (The girls arrived)",
    "Mon frère ___ en France (My brother went to France)",
    "Vous ___ où, Madame? (Where did you go, Madam?)",
    "Ma mère ___ au marché (My mother went to the market)",
    "Les garçons ___ tard (The boys came home late)",
  ],
};
