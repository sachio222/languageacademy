/**
 * Reference Materials Configuration
 */

import { alphabetModule } from "./alphabet.js";
import { numbersModule } from "./numbers.js";
import { daysMonthsModule } from "./days-months.js";
import { holidaysModule } from "./holidays.js";
import { frenchCountriesModule } from "./french-countries.js";
import { languageStatsModule } from "./language-stats.js";
import { colorsModule } from "./colors.js";
import { frenchSpellingPatternsModule } from "./french-spelling-patterns.js";
import { liaisonHelpModule } from "../unit1/liaison-help.js";
import { cognatesHelpModule } from "../unit1/cognates-help.js";
import { verbPatternHelp } from "../unit2/verb-pattern-help.js";

export const referenceConfig = {
  metadata: {
    id: 13,
    title: "Reference",
    description:
      "Essential reference materials - alphabet, numbers, dates, holidays, French-speaking countries, language facts, colors, spelling patterns, and learning guides",
    icon: "📚",
    color: "#6366f1",
    isReference: true,
  },
  modules: [
    alphabetModule,                 // 156. L'Alphabet
    numbersModule,                  // 157. Les Nombres  
    daysMonthsModule,               // 158. Jours et Mois
    holidaysModule,                 // 159. Les Fêtes
    colorsModule,                   // 160. Les Couleurs (moved after fêtes)
    frenchCountriesModule,          // 161. La Francophonie
    languageStatsModule,            // 162. Le Français en Chiffres
    frenchSpellingPatternsModule,   // 163. French Spelling Patterns - Phonics reference
    cognatesHelpModule,             // 164. Cognates Help - French and English Share Many Words
    liaisonHelpModule,             // 165. Liaison Help - French Flow
    verbPatternHelp,                // 166. Understanding Verb Patterns
  ],
};
