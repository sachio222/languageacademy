/**
 * French Phonics Reference
 * Comprehensive guide to French sound-to-spelling correspondences
 * Organized by sound categories for speech-to-print learning
 */

export const frenchPhonics = [
  {
    category: "Basic Vowel Sounds",
    icon: "🔤",
    patterns: [
      {
        sound: "/a/",
        description: "As in 'father'",
        spellings: [
          {
            spelling: "a",
            examples: ["chat", "la", "va"],
            notes: "Most common",
          },
          {
            spelling: "à",
            examples: ["à", "là", "voilà"],
            notes: "With grave accent",
          },
          {
            spelling: "â",
            examples: ["pâte", "âge"],
            notes: "With circumflex",
          },
        ],
      },
      {
        sound: "/e/",
        description: "As in 'day' (closed e)",
        spellings: [
          {
            spelling: "é",
            examples: ["été", "café", "école"],
            notes: "With acute accent",
          },
          {
            spelling: "er",
            examples: ["parler", "aller", "manger"],
            notes: "Verb infinitive endings",
          },
          {
            spelling: "et",
            examples: ["et", "ballet"],
            notes: "Word 'and' and some words",
          },
          {
            spelling: "ez",
            examples: ["vous allez", "parlez"],
            notes: "Verb endings",
          },
          {
            spelling: "es",
            examples: ["mes", "tes", "ses"],
            notes: "Some possessives",
          },
        ],
      },
      {
        sound: "/ɛ/",
        description: "As in 'bed' (open e)",
        spellings: [
          {
            spelling: "è",
            examples: ["très", "père", "mère"],
            notes: "With grave accent",
          },
          {
            spelling: "ê",
            examples: ["être", "fête", "fenêtre"],
            notes: "With circumflex",
          },
          {
            spelling: "ai",
            examples: ["j'ai", "mais", "maison"],
            notes: "Very common",
          },
          { spelling: "ei", examples: ["neige"], notes: "Less common" },
          {
            spelling: "e",
            examples: ["belle", "cette", "elle"],
            notes: "Before double consonants or final consonants",
          },
          {
            spelling: "et",
            examples: ["poulet", "jouet"],
            notes: "At end of some words",
          },
        ],
      },
      {
        sound: "/ə/",
        description: "Schwa - the neutral 'uh' sound",
        spellings: [
          {
            spelling: "e",
            examples: ["je", "le", "de"],
            notes: "In short words and unstressed syllables",
          },
        ],
      },
      {
        sound: "/i/",
        description: "As in 'see'",
        spellings: [
          {
            spelling: "i",
            examples: ["si", "il", "ici"],
            notes: "Most common",
          },
          {
            spelling: "î",
            examples: ["île", "dîner"],
            notes: "With circumflex",
          },
          {
            spelling: "ï",
            examples: ["naïf"],
            notes: "With diaeresis (shows separate syllable)",
          },
          {
            spelling: "y",
            examples: ["système", "il y a"],
            notes: "Less common",
          },
        ],
      },
      {
        sound: "/o/",
        description: "As in 'go' (closed o)",
        spellings: [
          { spelling: "o", examples: ["métro", "gros"], notes: "Common" },
          {
            spelling: "ô",
            examples: ["hôtel", "drôle"],
            notes: "With circumflex",
          },
          {
            spelling: "au",
            examples: ["au", "auto", "jaune"],
            notes: "Very common",
          },
          {
            spelling: "eau",
            examples: ["eau", "beau", "nouveau"],
            notes: "Very common",
          },
        ],
      },
      {
        sound: "/ɔ/",
        description: "As in 'off' (open o)",
        spellings: [
          {
            spelling: "o",
            examples: ["homme", "bonne"],
            notes: "Before consonants",
          },
          { spelling: "au", examples: ["Paul"], notes: "In some names" },
        ],
      },
      {
        sound: "/u/",
        description: "As in 'food'",
        spellings: [
          {
            spelling: "ou",
            examples: ["ou", "vous", "nous"],
            notes: "Most common",
          },
          { spelling: "où", examples: ["où"], notes: "The word 'where'" },
          {
            spelling: "oû",
            examples: ["goût"],
            notes: "With circumflex (rare)",
          },
        ],
      },
      {
        sound: "/y/",
        description: "Like German 'ü' - say 'ee' with rounded lips",
        spellings: [
          {
            spelling: "u",
            examples: ["tu", "une", "plus"],
            notes: "Most common",
          },
          { spelling: "û", examples: ["sûr"], notes: "With circumfex" },
          { spelling: "ü", examples: ["Müller"], notes: "In German names" },
        ],
      },
    ],
  },
  {
    category: "Nasal Vowels",
    icon: "👃",
    patterns: [
      {
        sound: "/ɑ̃/",
        description: "Nasal 'ah' - as in French 'en'",
        spellings: [
          {
            spelling: "an",
            examples: ["dans", "grand", "avant"],
            notes: "Very common",
          },
          {
            spelling: "en",
            examples: ["en", "enfant", "comment"],
            notes: "Very common",
          },
          { spelling: "am", examples: ["jambe", "lampe"], notes: "Before b/p" },
          {
            spelling: "em",
            examples: ["temps", "ensemble"],
            notes: "Before b/p",
          },
        ],
      },
      {
        sound: "/ɛ̃/",
        description: "Nasal 'eh' - as in French 'un'",
        spellings: [
          {
            spelling: "in",
            examples: ["vin", "cinq", "fin"],
            notes: "Very common",
          },
          {
            spelling: "im",
            examples: ["impossible", "important"],
            notes: "Before b/p",
          },
          {
            spelling: "ain",
            examples: ["pain", "main", "demain"],
            notes: "Common",
          },
          { spelling: "aim", examples: ["faim"], notes: "Before b/p (rare)" },
          { spelling: "ein", examples: ["plein"], notes: "Less common" },
          { spelling: "un", examples: ["un", "lundi"], notes: "Common" },
          { spelling: "yn", examples: ["syntaxe"], notes: "Greek origin" },
          {
            spelling: "ym",
            examples: ["sympa"],
            notes: "Greek origin, before b/p",
          },
        ],
      },
      {
        sound: "/ɔ̃/",
        description: "Nasal 'oh' - as in French 'bon'",
        spellings: [
          {
            spelling: "on",
            examples: ["on", "bon", "sont"],
            notes: "Very common",
          },
          {
            spelling: "om",
            examples: ["nombre", "tomber"],
            notes: "Before b/p",
          },
        ],
      },
    ],
  },
  {
    category: "Compound Vowels & Diphthongs",
    icon: "🔗",
    patterns: [
      {
        sound: "/wa/",
        description: "As in 'wah'",
        spellings: [
          {
            spelling: "oi",
            examples: ["moi", "toi", "trois"],
            notes: "Very common",
          },
          { spelling: "oy", examples: ["royal"], notes: "Rare" },
        ],
      },
      {
        sound: "/wɛ̃/",
        description: "Nasal 'weh'",
        spellings: [
          {
            spelling: "oin",
            examples: ["loin", "coin", "moins"],
            notes: "Common in some words",
          },
        ],
      },
      {
        sound: "/ɥi/",
        description: "Like 'wee' with rounded lips",
        spellings: [
          {
            spelling: "ui",
            examples: ["lui", "je suis", "nuit"],
            notes: "Common",
          },
        ],
      },
      {
        sound: "/j/",
        description: "Y sound - as in 'yes'",
        spellings: [
          { spelling: "i", examples: ["bien", "hier"], notes: "Before vowels" },
          { spelling: "y", examples: ["yeux"], notes: "Less common" },
          {
            spelling: "il",
            examples: ["travail", "soleil"],
            notes: "At end of words",
          },
          {
            spelling: "ill",
            examples: ["fille", "famille"],
            notes: "In middle or end",
          },
        ],
      },
    ],
  },
  {
    category: "Consonant Sounds",
    icon: "🗣️",
    patterns: [
      {
        sound: "/s/",
        description: "As in 'sun'",
        spellings: [
          {
            spelling: "s",
            examples: ["si", "sur", "aussi"],
            notes: "At beginning or after consonant",
          },
          {
            spelling: "ss",
            examples: ["poisson", "aussi"],
            notes: "Between vowels",
          },
          {
            spelling: "c",
            examples: ["ce", "ça", "cinq"],
            notes: "Before e, i, y",
          },
          {
            spelling: "ç",
            examples: ["ça", "français", "garçon"],
            notes: "Before a, o, u",
          },
          {
            spelling: "t",
            examples: ["nation", "attention"],
            notes: "In -tion endings",
          },
          { spelling: "x", examples: ["six", "dix"], notes: "In some numbers" },
        ],
      },
      {
        sound: "/z/",
        description: "As in 'zoo'",
        spellings: [
          {
            spelling: "s",
            examples: ["maison", "chose"],
            notes: "Between vowels",
          },
          { spelling: "z", examples: ["zéro", "onze"], notes: "Common" },
          { spelling: "x", examples: ["deuxième"], notes: "In some words" },
        ],
      },
      {
        sound: "/k/",
        description: "As in 'cat'",
        spellings: [
          {
            spelling: "c",
            examples: ["chat", "avec", "comme"],
            notes: "Before a, o, u",
          },
          { spelling: "k", examples: ["kilo"], notes: "Foreign words" },
          {
            spelling: "qu",
            examples: ["que", "qui", "quoi"],
            notes: "Very common",
          },
          { spelling: "q", examples: ["cinq"], notes: "Rare" },
          { spelling: "ch", examples: ["orchestre"], notes: "Greek origin" },
          { spelling: "ck", examples: ["ticket"], notes: "English borrowings" },
        ],
      },
      {
        sound: "/ʒ/",
        description: "As in 'measure'",
        spellings: [
          {
            spelling: "j",
            examples: ["je", "jour", "joli"],
            notes: "Most common",
          },
          {
            spelling: "g",
            examples: ["je mange", "orange"],
            notes: "Before e, i, y",
          },
          {
            spelling: "ge",
            examples: ["mangeons"],
            notes: "To keep /ʒ/ sound before a, o",
          },
        ],
      },
      {
        sound: "/ʃ/",
        description: "As in 'shoe'",
        spellings: [
          {
            spelling: "ch",
            examples: ["chat", "chez", "chose"],
            notes: "Most common",
          },
          {
            spelling: "sch",
            examples: ["schéma"],
            notes: "Greek/German origin",
          },
        ],
      },
      {
        sound: "/ɲ/",
        description: "As in 'onion' (Spanish ñ)",
        spellings: [
          { spelling: "gn", examples: ["oignon", "montagne"], notes: "Common" },
        ],
      },
      {
        sound: "/ʁ/",
        description: "French R - guttural sound",
        spellings: [
          {
            spelling: "r",
            examples: ["rouge", "très", "parler"],
            notes: "Always",
          },
          {
            spelling: "rr",
            examples: ["terrible", "terre"],
            notes: "Double R",
          },
        ],
      },
      {
        sound: "/g/",
        description: "As in 'go'",
        spellings: [
          {
            spelling: "g",
            examples: ["gare", "grand"],
            notes: "Before a, o, u",
          },
          {
            spelling: "gu",
            examples: ["guide", "guerre"],
            notes: "Before e, i to keep /g/ sound",
          },
          { spelling: "gg", examples: ["aggraver"], notes: "Rare" },
        ],
      },
    ],
  },
  {
    category: "Silent Letters",
    icon: "🤫",
    patterns: [
      {
        sound: "Silent final consonants",
        description: "Usually not pronounced at word end",
        spellings: [
          {
            spelling: "-s",
            examples: ["les", "vous", "trois"],
            notes: "Plural marker, usually silent",
          },
          {
            spelling: "-t",
            examples: ["et", "est", "chat"],
            notes: "Usually silent at end",
          },
          {
            spelling: "-d",
            examples: ["grand"],
            notes: "Usually silent at end",
          },
          {
            spelling: "-x",
            examples: ["deux", "heureux"],
            notes: "Usually silent at end",
          },
          {
            spelling: "-z",
            examples: ["chez", "assez"],
            notes: "Sometimes pronounced",
          },
          {
            spelling: "-p",
            examples: ["beaucoup", "trop"],
            notes: "Usually silent at end",
          },
        ],
      },
      {
        sound: "Silent h",
        description: "Never pronounced in French",
        spellings: [
          {
            spelling: "h",
            examples: ["homme", "hôtel", "heure"],
            notes: "Always silent",
          },
        ],
      },
      {
        sound: "Silent e",
        description: "Often dropped in speech",
        spellings: [
          {
            spelling: "e",
            examples: ["je", "le", "que"],
            notes: "Often silent in casual speech",
          },
          {
            spelling: "-e",
            examples: ["grande", "porte"],
            notes: "Silent at end of words",
          },
        ],
      },
    ],
  },
  {
    category: "Special Patterns",
    icon: "⭐",
    patterns: [
      {
        sound: "Liaison",
        description: "Connecting final consonant to next vowel",
        spellings: [
          {
            spelling: "s → /z/",
            examples: ["les amis", "vous êtes"],
            notes: "S becomes Z sound",
          },
          {
            spelling: "t → /t/",
            examples: ["c'est un", "tout à fait"],
            notes: "T is pronounced",
          },
          {
            spelling: "n → /n/",
            examples: ["un ami", "mon école"],
            notes: "N is pronounced",
          },
          {
            spelling: "d → /t/",
            examples: ["grand ami"],
            notes: "D becomes T sound",
          },
          {
            spelling: "x → /z/",
            examples: ["deux ans"],
            notes: "X becomes Z sound",
          },
        ],
      },
      {
        sound: "Elision",
        description: "Dropping vowel before another vowel",
        spellings: [
          {
            spelling: "je → j'",
            examples: ["j'ai", "j'aime"],
            notes: "Before vowel sounds",
          },
          {
            spelling: "le/la → l'",
            examples: ["l'homme", "l'école"],
            notes: "Before vowel sounds",
          },
          {
            spelling: "ce → c'",
            examples: ["c'est"],
            notes: "Before vowel sounds",
          },
          {
            spelling: "me/te/se → m'/t'/s'",
            examples: ["s'il", "m'appelle"],
            notes: "Before vowel sounds",
          },
        ],
      },
      {
        sound: "Double consonants",
        description: "Often affect preceding vowel sound",
        spellings: [
          {
            spelling: "ll",
            examples: ["elle", "quelle", "belle"],
            notes: "Creates open /ɛ/ sound before",
          },
          {
            spelling: "tt",
            examples: ["cette", "mettre"],
            notes: "Creates open /ɛ/ sound before",
          },
          {
            spelling: "ss",
            examples: ["poisson", "adresse"],
            notes: "Keeps /s/ sound between vowels",
          },
          {
            spelling: "nn",
            examples: ["bonne", "donne"],
            notes: "Often creates nasal release",
          },
        ],
      },
    ],
  },
];
