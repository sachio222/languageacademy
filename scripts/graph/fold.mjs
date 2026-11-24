// Norm a surface form: NFC, lowercase, straight apostrophes, diacritics kept.
export function norm(s) {
  return String(s).toLowerCase().replace(/[’ʼ‘]/g, "'").normalize('NFC');
}

// Fold a surface form for comparison: lowercase, write out œ and æ, strip diacritics, straighten apostrophes.
export function fold(s) {
  return String(s)
    .toLowerCase()
    .replace(/œ/g, 'oe')
    .replace(/æ/g, 'ae')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’ʼ‘]/g, "'");
}
