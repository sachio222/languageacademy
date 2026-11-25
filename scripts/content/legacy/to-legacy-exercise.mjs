// toLegacyExercise: a content item in the shape src/lessons/testRunner.js grades. The app's checker reads
// expectedAnswer, acceptableAnswers and wrongAnswers (moduleBuilder.js normalizeExercise maps authored
// `answer` onto expectedAnswer). Pure: no app imports.
const join = (...parts) => parts.filter((p) => typeof p === 'string' && p.trim() !== '').join(' ');

function promptOf(item) {
  switch (item.type) {
    case 'translate':
      return item.prompt;
    case 'respond':
      return join(item.situation, item.cue);
    case 'transform':
      return join(item.instruction, item.shown);
    case 'gapfill':
      return join(item.gloss, item.text);
    case 'meaning':
      return item.shown;
    default:
      return item.question;
  }
}

function fillText(item) {
  let i = 0;
  return String(item.text).replace(/___/g, () => item.blanks[i++]?.answer ?? '___');
}

/**
 * @param item  a content item
 * @param opts  { liveId?: string, blank?: number }
 *   blank: for a gapfill, grade one blank on its own (expectedAnswer is that blank's answer and its accepts).
 *   Without it a gapfill's expectedAnswer is the whole sentence with the blanks filled.
 */
export function toLegacyExercise(item, { liveId, blank } = {}) {
  const ex = { id: liveId ?? item.id, prompt: promptOf(item) };
  if (item.type === 'gapfill') {
    if (blank !== undefined) {
      const b = item.blanks[blank];
      ex.expectedAnswer = b.answer;
      ex.acceptableAnswers = [...(b.accept || [])];
    } else {
      ex.expectedAnswer = fillText(item);
      ex.acceptableAnswers = [];
    }
  } else {
    ex.expectedAnswer = item.answer;
    ex.acceptableAnswers = [...(item.accept || [])];
  }
  ex.wrongAnswers = (item.mistakes || []).map((m) => ({ answer: m.answer, feedback: m.feedback }));
  if (item.hint !== undefined) ex.hint = item.hint;
  if ((item.type === 'transform' || item.type === 'meaning') && item.instruction !== undefined) ex.instruction = item.instruction;
  return ex;
}
