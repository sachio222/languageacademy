/**
 * Unit 9: Discourse & Past Tense Configuration
 * Defines the pedagogical sequence and metadata for Unit 9
 */

import { causalWordsModule } from "./causal-words.js";
import { spatialPrepositionsModule } from "./spatial-prepositions.js";
import { moreSpatialRelationsModule } from "./more-spatial-relations.js";
import { passeComposeERModule } from "./passe-compose-er.js";
import { passeComposeIrregular1Module } from "./passe-compose-irregular-1.js";
import { passeComposeIrregular2Module } from "./passe-compose-irregular-2.js";
import { passeComposeEtreModule } from "./passe-compose-etre.js";
import { passeComposeAgreementModule } from "./passe-compose-agreement.js";
import { imparfaitAllVerbsModule } from "./imparfait-all-verbs.js";
import { pcVsImparfaitModule } from "./pc-vs-imparfait.js";
import { pastTenseCompositionModule } from "./past-tense-composition.js";
import { reading9 } from "./reading-9.js";
import { unit9Practice } from "./unit-9-practice.js";
import { unit9Exam } from "./unit-9-exam.js";

export const unit9Config = {
  metadata: {
    id: 9,
    title: "Unit 9: Discourse & Past Tense",
    description:
      "Complete storytelling mastery: causal/spatial words (parce que, près de), passé composé (j'ai mangé, je suis allé), imparfait (j'étais, il faisait), and the critical PC vs IMP distinction",
    icon: "⏳",
    color: "#ef4444",
  },
  modules: [
    causalWordsModule, // 103. Causal & Reason Words - parce que, car, puisque
    spatialPrepositionsModule, // 104. Spatial Prepositions - devant, derrière, entre
    moreSpatialRelationsModule, // 105. More Spatial Relations - près de, loin de
    passeComposeERModule, // 106. Passé Composé Foundation - Regular -ER verbs
    passeComposeIrregular1Module, // 107. Irregular Past Participles Set 1
    passeComposeIrregular2Module, // 108. Irregular Past Participles Set 2
    passeComposeEtreModule, // 109. être verbs - DR & MRS VANDERTRAMP
    passeComposeAgreementModule, // 110. Past Participle Agreement
    imparfaitAllVerbsModule, // 111. Imparfait Formation - All Verbs
    pcVsImparfaitModule, // 112. Passé Composé vs Imparfait - THE GOLDEN RULE
    pastTenseCompositionModule, // 113. Past Tense Composition - Complex Narratives
    reading9, // 114. Reading Test 9 - Une Histoire du Passé
    unit9Practice, // 115. Unit 9 Practice
    unit9Exam, // 116. Unit 9 Final Exam
  ],
};
