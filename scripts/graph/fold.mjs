// Fold a surface form for comparison: lowercase, strip diacritics, straighten apostrophes.
export function fold(s) {
  return String(s)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’ʼ‘]/g, "'");
}
