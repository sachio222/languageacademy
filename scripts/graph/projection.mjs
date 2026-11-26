// One projection for the pipeline's brief builder and the unit card (unit-prep design §5.4, plan Task 3), moved
// unchanged from scripts/pipeline/brief.mjs at 4fc897c (lines 159 to 179 and 220 to 276) so both compute it once.
//
// projectContext(ctx, stubs): the checker context with each stub counted as written from its plan block: the timeline
//   teaches its plan words (a form with its headword, as a vocabulary row would) and, for kinds that teach them, its
//   plan constructions, at its position; it holds no items, so no uses. Everything else is the shared context.
//   stubs: Array<{ module_key, kind, title, position, unit_key, unit_index, unit_name, plan }>.
// graphLookups(ctx): { headwords: Map<id, headword>, forms: Map<id, form> }.
// glossableForms(ctx, position, kind, plan): the forms of known words the checker does not credit at `position`, by
//   word: [{ word, lemma, forms }], in the order the words were taught.
import { buildTimeline } from './timeline.mjs';
import { parseId } from './ids.mjs';

/** Content kinds as the checker names them (content-course.mjs). */
export const CHECKER_KIND = { lesson: 'lesson', guide: 'help', reading: 'reading', practice: 'practice', unit_exam: 'exam' };
/** What each kind's own plan teaches: lessons and guides words and constructions, readings words (timeline.mjs). */
export const OWN_TEACHING = { lesson: ['words', 'constructions'], guide: ['words', 'constructions'], reading: ['words'], practice: [], unit_exam: [] };

const byId = (a, b) => (a < b ? -1 : a > b ? 1 : 0);

export function projectContext(ctx, stubs) {
  if (stubs.length === 0) return ctx;
  const formOf = new Map(ctx.graph.forms.map((f) => [f.id, f.of]));
  const entries = {};
  const extra = [];
  for (const s of stubs) {
    const words = [...new Set(s.plan.words.flatMap((id) => (formOf.has(id) ? [formOf.get(id), id] : [id])))];
    const constructions = [...s.plan.constructions];
    entries[s.module_key] = { ...(ctx.graph.courseMap?.[s.module_key] ?? {}), teachesWordsManual: words, teachesConstructions: constructions };
    extra.push({
      position: s.position, moduleKey: s.module_key, title: s.title ?? s.module_key, unitId: s.unit_index, unitKey: s.unit_key, unitTitle: s.unit_name,
      unitDescription: null, kind: CHECKER_KIND[s.kind], guide: s.kind === 'guide', vocab: [], conceptTerms: [], items: [], shapes: [], unreadShapes: [],
      blankProblems: [], teaches: { words, constructions }, tests: [],
    });
  }
  const graph = { ...ctx.graph, courseMap: { ...ctx.graph.courseMap, ...entries } };
  const course = [...ctx.course, ...extra].sort((a, b) => a.position - b.position);
  const openFrom = ctx.graph.settings?.reference?.openFrom ?? null;
  const timeline = buildTimeline(graph, course, { reference: ctx.referenceOpen, openFrom });
  return { ...ctx, graph, course, timeline };
}

export const graphLookups = (ctx) => ({ headwords: new Map(ctx.graph.headwords.map((h) => [h.id, h])), forms: new Map(ctx.graph.forms.map((f) => [f.id, f])) });

/**
 * A reading is credited when its headword is known and, for a form, the form itself or its paradigm is
 * (timeline.mjs readingIn), counting what the module's own plan teaches.
 */
export function glossableForms(ctx, position, kind, plan) {
  const g = graphLookups(ctx);
  const own = new Set();
  const formOf = new Map([...g.forms.values()].map((f) => [f.id, f.of]));
  if (OWN_TEACHING[kind].includes('words')) for (const id of plan.words) for (const x of formOf.has(id) ? [id, formOf.get(id)] : [id]) own.add(x);
  if (OWN_TEACHING[kind].includes('constructions')) for (const id of plan.constructions) own.add(id);
  const known = (id) => id != null && (own.has(id) || ctx.timeline.isAvailable(id, position - 1));
  const credited = (r) => {
    if (!known(r.headwordId)) return false;
    if (r.via === 'lemma') return true;
    if (r.via === 'irregular') return known(r.nodeId);
    if (r.via === 'generated') return known(r.nodeId) || known(r.paradigmId);
    return false;
  };
  const groups = new Map();
  for (const readings of ctx.index.values()) {
    if (readings.some(credited)) continue;
    for (const r of readings) {
      if (r.via === 'lemma' || !known(r.headwordId)) continue;
      if (!groups.has(r.headwordId)) groups.set(r.headwordId, new Set());
      groups.get(r.headwordId).add(r.surface);
    }
  }
  const at = (id) => (own.has(id) ? position : ctx.timeline.availableAt.get(id) ?? position);
  return [...groups]
    .sort(([a], [b]) => at(a) - at(b) || byId(a, b))
    .map(([word, forms]) => ({ word, lemma: g.headwords.get(word)?.lemma ?? parseId(word).key, forms: [...forms].sort(byId) }));
}
