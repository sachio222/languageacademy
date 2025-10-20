/**
 * COLORS MODULE
 * Essential colors with gender agreement rules
 */

export const colorsModule = {
  moduleKey: "2024-04-05-colors", // Permanent identifier - never changes
  id: "colors",
  title: "Les Couleurs",
  description:
    "Essential colors in French - learn how colors agree with nouns and create beautiful descriptions",

  concepts: [
    {
      term: "Colors are Adjectives",
      definition:
        "In French, colors are adjectives that agree with the noun in gender and number. They usually come AFTER the noun.",
      example:
        "le ciel bleu (the blue sky), une maison blanche (a white house), des yeux verts (green eyes)",
    },
    {
      term: "Basic Colors",
      definition:
        "The most common colors you'll use every day - memorize these first!",
      example:
        "bleu (blue), rouge (red), vert (green), jaune (yellow), blanc (white), noir (black)",
    },
    {
      term: "Feminine Forms",
      definition:
        "Add -e to make most colors feminine. Some have special forms.",
      example:
        "bleu → bleue, vert → verte, blanc → blanche, rouge → rouge (no change)",
    },
    {
      term: "Plural Forms",
      definition: "Add -s for plural (unless already ends in -s or -x)",
      example:
        "bleu → bleus (masculine plural), bleue → bleues (feminine plural), gris → gris (no change)",
    },
    {
      term: "Invariable Colors",
      definition:
        "Some colors never change: marron (brown), orange (orange). These are actually nouns used as adjectives!",
      example: "un chat marron, une maison marron, des chats marron (no -s!)",
    },
    {
      term: "Compound Colors",
      definition:
        "Colors with two words or modified colors are invariable (never change)",
      example:
        "des yeux bleu clair (light blue eyes), des robes bleu foncé (dark blue dresses)",
    },
    {
      term: "Using Colors in Questions",
      definition: "Now you can ask about colors of things!",
      example:
        "De quelle couleur est le ciel? (What color is the sky?) → Le ciel est bleu. Pourquoi est-ce que l'herbe est verte? (Why is grass green?)",
    },
  ],

  vocabularyReference: [
    // Basic colors - essential
    {
      french: "bleu / bleue",
      english: "blue",
      note: "le ciel est bleu, la mer est bleue",
    },
    {
      french: "rouge",
      english: "red",
      note: "invariable - same for masculine/feminine",
    },
    {
      french: "vert / verte",
      english: "green",
      note: "l'herbe est verte, un arbre vert",
    },
    {
      french: "jaune",
      english: "yellow",
      note: "invariable - le soleil est jaune",
    },
    {
      french: "blanc / blanche",
      english: "white",
      note: "les nuages sont blancs, la neige est blanche",
    },
    {
      french: "noir / noire",
      english: "black",
      note: "un chat noir, une voiture noire",
    },

    // Secondary colors
    {
      french: "orange",
      english: "orange",
      note: "INVARIABLE - never changes! une orange orange",
    },
    {
      french: "violet / violette",
      english: "purple/violet",
      note: "un violon violet, une fleur violette",
    },
    {
      french: "rose",
      english: "pink",
      note: "invariable - une rose rose (a pink rose)",
    },
    {
      french: "gris / grise",
      english: "gray",
      note: "un ciel gris, une souris grise",
    },
    {
      french: "marron",
      english: "brown",
      note: "INVARIABLE - never changes! des yeux marron",
    },
    {
      french: "beige",
      english: "beige",
      note: "invariable - un pantalon beige",
    },

    // Shades and variations
    {
      french: "clair",
      english: "light (shade)",
      note: "bleu clair (light blue), vert clair (light green)",
    },
    {
      french: "foncé",
      english: "dark (shade)",
      note: "bleu foncé (dark blue), vert foncé (dark green)",
    },
    {
      french: "vif / vive",
      english: "bright/vivid",
      note: "une couleur vive (a bright color)",
    },
    {
      french: "pâle",
      english: "pale",
      note: "un bleu pâle (a pale blue)",
    },

    // Metallic and special
    {
      french: "doré",
      english: "golden",
      note: "agrees - un bracelet doré, une bague dorée",
    },
    {
      french: "argenté",
      english: "silver",
      note: "agrees - un collier argenté",
    },

    // Multi-color
    {
      french: "multicolore",
      english: "multicolored",
      note: "agrees - des vêtements multicolores",
    },
    {
      french: "coloré / colorée",
      english: "colorful",
      note: "agrees - une maison colorée",
    },

    // Useful color vocabulary
    {
      french: "la couleur",
      english: "the color",
      note: "feminine - De quelle couleur?",
    },
    {
      french: "De quelle couleur?",
      english: "What color?",
      note: "essential question phrase",
    },
    {
      french: "De quelle couleur est...?",
      english: "What color is...?",
      note: "De quelle couleur est le ciel?",
    },

    // Nature elements (useful for color questions)
    {
      french: "le ciel",
      english: "the sky",
      note: "masculine - le ciel est bleu",
    },
    {
      french: "l'herbe",
      english: "the grass",
      note: "feminine (herbe) - l'herbe est verte",
    },
    {
      french: "les nuages",
      english: "the clouds",
      note: "masculine plural - les nuages sont blancs",
    },
    {
      french: "le soleil",
      english: "the sun",
      note: "masculine - le soleil est jaune",
    },
    {
      french: "la mer",
      english: "the sea",
      note: "feminine - la mer est bleue",
    },
    {
      french: "la neige",
      english: "the snow",
      note: "feminine - la neige est blanche",
    },
    {
      french: "un arbre",
      english: "a tree",
      note: "masculine - un arbre vert",
    },
    {
      french: "une fleur",
      english: "a flower",
      note: "feminine - une fleur rose",
    },
    {
      french: "les feuilles",
      english: "the leaves",
      note: "feminine plural - les feuilles sont vertes",
    },

    // Common expressions
    {
      french: "voir la vie en rose",
      english: "to see life through rose-colored glasses",
      note: "idiom - être optimiste",
    },
    {
      french: "être dans le rouge",
      english: "to be in the red (in debt)",
      note: "idiom - financial expression",
    },
    {
      french: "avoir une peur bleue",
      english: "to be scared stiff",
      note: "idiom - literally 'to have a blue fear'",
    },
    {
      french: "rire jaune",
      english: "to laugh nervously/fake laugh",
      note: "idiom - literally 'to laugh yellow'",
    },
  ],

  exercises: [],
};
