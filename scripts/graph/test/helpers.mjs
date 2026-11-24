import { buildFormIndex } from '../fr/forms.mjs';
import { buildTimeline } from '../timeline.mjs';

export function makeModule(partial = {}) {
  const position = partial.position ?? 1;
  return {
    position,
    moduleKey: 'm' + position,
    title: 'Module ' + position,
    kind: 'lesson',
    unitId: 1,
    unitTitle: 'Unit 1',
    vocab: [],
    conceptTerms: [],
    items: [],
    shapes: [],
    unreadShapes: [],
    ...partial,
  };
}

// reference: node IDs the Reference unit lists, open from openFrom on (settings.reference.openFrom, else 1). With no
// reference, or openFrom null, nothing is open.
export function makeCtx({ graph, course, reference, openFrom }) {
  const index = buildFormIndex(graph);
  if (!reference) return { graph, course, index, timeline: buildTimeline(graph, course) };
  const from = openFrom === undefined ? graph.settings?.reference?.openFrom ?? 1 : openFrom;
  return { graph, course, index, reference, timeline: buildTimeline(graph, course, { reference, openFrom: from }) };
}
