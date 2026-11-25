// Every field the course data can hold, by level, and whether the checker reads its French. fields.test.mjs walks
// the real course and fails on a field this registry does not list, so a new field that holds French cannot hide.
// "Shown" means a learner sees or hears it in the app; the reason names the component that shows it, or where we
// looked and found nothing. course.mjs does the reading; this file only records it.
const read = (reason) => ({ status: 'read', reason });
const ignored = (reason) => ({ status: 'ignored', reason });

export const FIELDS = {
  module: {
    moduleKey: ignored('id'),
    title: read('shown on every lesson screen and in the lesson list; French segments are checked'),
    description: read('shown in ConceptIntro.jsx and on the dashboard; quoted French is checked'),
    unit: ignored('unit number, no text'),
    unitNumber: ignored('unit number, no text'),
    isUnitExam: ignored('flag, no text (sets the module kind)'),
    isFillInTheBlank: ignored('flag, no text (sets the module kind)'),
    isReadingComprehension: ignored('flag, no text (sets the module kind)'),
    isHelpModule: ignored('flag, no text (sets the module kind; the screen comes from course-map.json)'),
    skipStudyMode: ignored('flag, no text'),
    emailMetadata: ignored('sent in re-engagement emails, never shown in a lesson'),
    concepts: read('concept cards, see the concept level'),
    vocabularyReference: read('vocabulary table, see the vocab level'),
    exerciseConfig: read('exercise items, see the exerciseConfig level'),
    exercises: read('exercises, see the exercise level'),
    sentences: read('fill-in-the-blank sentences, see the sentence level'),
    fillInBlanksSentences: read('gap-fill sentences, filled with the answer of the matching exercise. No component reads this field (searched src/components); it is checked as it was before'),
    readingPassage: read('reading passage, see the readingPassage level'),
    guide: read('guide screen of a help module (GuideScreen.jsx), see the guide level'),
  },
  guide: {
    sections: read('one card each (GuideScreen.jsx), see the guideSection level'),
  },
  guideSection: {
    heading: read('card heading (GuideScreen.jsx); quoted French'),
    rule: read('rule line under the heading (GuideScreen.jsx); quoted French'),
    rows: read('table rows, see the guideRow level'),
    examples: read('example sentences, see the guideExample level'),
  },
  guideRow: {
    french: read('French column of the table (GuideScreen.jsx), with a speak button; checked whole'),
    english: ignored('English column of the table'),
    note: read('note under the row (GuideScreen.jsx); quoted French'),
  },
  guideExample: {
    french: read('example sentence (GuideScreen.jsx), with a speak button; checked whole'),
    english: ignored('English meaning of the example'),
  },
  emailMetadata: {
    capabilities: ignored('email text, not shown in a lesson'),
    realWorldUse: ignored('email text, not shown in a lesson'),
    nextModuleTeaser: ignored('email text, not shown in a lesson'),
    milestone: ignored('email text, not shown in a lesson'),
    isUnitCompletion: ignored('email flag'),
    utilityScore: ignored('email number'),
  },
  readingPassage: {
    text: read('the passage (ReadingPassage.jsx); checked whole'),
    title: read('passage heading (ReadingPassage.jsx); French segments are checked'),
    subtitle: read('French line under the heading (ReadingPassage.jsx); checked whole'),
    translation: ignored('English translation of the passage'),
    subtitleTranslation: ignored('English translation of the subtitle'),
  },
  concept: {
    term: read('card heading (ConceptIntro.jsx, ConceptPane.jsx); quoted French, or the whole term when it is French'),
    definition: read('card text (ConceptIntro.jsx); quoted French, or the whole text when it is French'),
    example: read('card example (ConceptIntro.jsx:301); its French segments are checked'),
  },
  vocab: {
    french: read('the vocabulary table; it is what the module teaches (graph:extract)'),
    english: ignored('English meaning'),
    note: read('Notes column of the vocabulary table (VocabularyReference.jsx, ConceptIntro.jsx); quoted French'),
    example: ignored('not shown: no component reads vocabularyReference[].example (searched src/components)'),
    usage: ignored('not shown: no component reads vocabularyReference[].usage (searched src/components)'),
    agreement: ignored('not shown: no component reads vocabularyReference[].agreement (searched src/components)'),
    ttsText: ignored('spoken in place of the French for the voice only, a pronunciation workaround'),
    wikipedia: ignored('not shown: no lesson component reads vocabularyReference[].wikipedia (searched src/components)'),
  },
  wikipedia: {
    name: ignored('not shown, see vocab.wikipedia'),
    description: ignored('not shown, see vocab.wikipedia'),
    image: ignored('image path'),
    url: ignored('link'),
  },
  exerciseConfig: {
    type: ignored('exercise builder type'),
    verb: ignored('verb the conjugation table belongs to; buildExercises shows it only inside a generated hint'),
    items: read('exercise items, see the item level'),
    conjugations: read('conjugation table, see the conjugation level'),
  },
  conjugations: {
    je: read('one row, see the conjugation level'),
    tu: read('one row, see the conjugation level'),
    il: read('one row, see the conjugation level'),
    elle: read('one row, see the conjugation level'),
    nous: read('one row, see the conjugation level'),
    vous: read('one row, see the conjugation level'),
    ils: read('one row, see the conjugation level'),
    elles: read('one row, see the conjugation level'),
  },
  conjugation: {
    combined: read('the answer the learner types (pronoun + verb form)'),
    pronoun: ignored('part of combined, which is read'),
    conjugation: ignored('part of combined, which is read'),
    english: ignored('English prompt'),
    englishFull: ignored('English prompt'),
    note: ignored('not shown: buildExercises (src/lessons/moduleBuilder.js) never copies a conjugation note'),
  },
  item: {
    id: ignored('id'),
    key: ignored('row key into the conjugation table'),
    verb: ignored('verb name for the builder, not shown on its own'),
    conjugations: read('per-item conjugation table (type mixed), see the conjugation level'),
    instruction: read('task line (ExercisePane.jsx, StudyMode.jsx, ModuleExam.jsx); quoted French. Not in exams: UnitExam.jsx does not show it'),
    context: read('scene line shown before the generated instruction (moduleBuilder.js); quoted French'),
    prompt: read('English prompt, or French prompt of a French-to-English item (shown text)'),
    expectedAnswer: read('the answer the learner types'),
    acceptableAnswers: read('other answers the learner may type (lenient)'),
    hint: read('hint line (ExercisePane.jsx:390, StudyMode.jsx:205, ModuleExam.jsx:333, UnitExam.jsx:703); quoted French'),
    explanation: ignored('not shown: buildExercises (src/lessons/moduleBuilder.js) drops it and no component reads it'),
    ttsText: ignored('spoken in place of the answer for the voice only, a pronunciation workaround'),
    wrongAnswers: read('see the wrongAnswer level'),
    customWrongAnswers: read('see the wrongAnswer level'),
  },
  wrongAnswer: {
    answer: ignored('deliberately wrong French a learner might type; never checked'),
    feedback: read('shown after the learner types that wrong answer (testRunner.js); quoted French, minus words of the wrong answer'),
  },
  exercise: {
    id: ignored('id'),
    type: ignored('exercise type'),
    instruction: read('task line; quoted French'),
    prompt: read('English or French prompt; for a fillblank, the sentence and its quoted French ("Use \'parler\'")'),
    answer: read('fillblank answer the learner types (blankAnswers)'),
    expectedAnswer: read('the answer the learner types'),
    acceptableAnswers: read('other answers the learner may type (lenient)'),
    hint: read('hint line; quoted French'),
    wrongAnswers: read('see the wrongAnswer level'),
  },
  sentence: {
    text: read('the sentence (FillInTheBlank.jsx), filled with its blanks'),
    instruction: read('instruction line (FillInTheBlank.jsx:479); quoted French'),
    blanks: read('see the blank level'),
  },
  blank: {
    answer: read('what the learner types in the blank (blankAnswers)'),
    position: ignored('character position, no text'),
    hint: read('hint after the blank (FillInTheBlank.jsx:366); quoted French'),
  },
};

// The level of a field's value when that value holds fields of its own, else null.
const CHILD = {
  module: {
    emailMetadata: 'emailMetadata', readingPassage: 'readingPassage', concepts: 'concept', vocabularyReference: 'vocab',
    exerciseConfig: 'exerciseConfig', exercises: 'exercise', sentences: 'sentence', guide: 'guide',
  },
  guide: { sections: 'guideSection' },
  guideSection: { rows: 'guideRow', examples: 'guideExample' },
  vocab: { wikipedia: 'wikipedia' },
  exerciseConfig: { items: 'item', conjugations: 'conjugations' },
  conjugations: Object.fromEntries(Object.keys(FIELDS.conjugations).map((p) => [p, 'conjugation'])),
  item: { conjugations: 'conjugations', wrongAnswers: 'wrongAnswer', customWrongAnswers: 'wrongAnswer' },
  exercise: { wrongAnswers: 'wrongAnswer' },
  sentence: { blanks: 'blank' },
};

export function levelOf(level, name) {
  return CHILD[level]?.[name] ?? null;
}
