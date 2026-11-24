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

export function makeCtx({ graph, course }) {
  return { graph, course, index: buildFormIndex(graph), timeline: buildTimeline(graph, course) };
}
