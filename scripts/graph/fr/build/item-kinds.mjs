// Item kind classifier: 'situation' | 'translate' | 'other', with the rule that decided.
// course-map.mjs writes an itemKinds entry wherever this differs from the checker's default.
const GAP = /_{2,}|\.\.\.|…|→/;
const OTHER_INSTRUCTION = /^(Negate|Combine|Turn this statement|Choose the correct|Fill in|Complete the phrase|Complete the philosophical|What does|When do you use)/;
const QUOTED = /['"‘“][^'"’”]{2,}['"’”]/;
const SITUATION = new RegExp('^(' + [
  "You're (entering|arriving|making|leaving|at|talking|looking)",
  "You (see|accidentally|can't find|want to know|don't understand a)",
  "Someone('s)? ", 'A waiter', 'At (a|the) ', 'Greet', 'Wish someone', 'Introduce yourself',
  'Politely order', "Get someone's attention", 'Ask your friend for',
  'Say good night to', 'Say goodbye during', 'Apologi[sz]e', 'Tell your kid', 'Tell a child',
  'Tell your friend (they|you want)', 'Tell someone (they need|you want)', 'Suggest going',
].join('|') + ')');

export function classify(mod, it, rawItem) {
  const ins = it.instruction ?? '';
  const prompt = it.englishPrompt ?? '';
  if (mod.kind === 'reading') return ['other', 'reading comprehension'];
  if (it.source === 'passage') return ['other', 'passage'];
  if (it.source === 'sentences' || it.source === 'fib') return ['other', 'gap-fill sentence'];
  if (it.source === 'exercises' && rawItem?.type === 'fillblank') return ['other', 'gap-fill exercise'];
  if (GAP.test(prompt)) return ['other', 'prompt has a gap'];
  if (OTHER_INSTRUCTION.test(ins)) return ['other', 'transformation or comprehension'];
  if (/^Translate/.test(ins) || QUOTED.test(ins)) return ['translate', 'quoted English or Translate'];
  if (/^Which (word|article|possessive)/.test(ins) || /\. Which (word|article)\b/.test(ins)) return ['translate', 'which-word recall'];
  // a scene that asks for one word shown as a one-word English prompt ("Ask this question word" / what) is a translation
  if (SITUATION.test(ins) && /^[A-Za-z]+$/.test(prompt.trim()) && (it.french[0] ?? '').trim().split(/\s+/).length === 1) {
    return ['translate', 'one-word English prompt, one-word answer'];
  }
  if (SITUATION.test(ins)) return ['situation', 'instruction sets a scene'];
  const def = it.englishPrompt && it.french.length ? 'translate' : 'other';
  return [def, 'default'];
}
