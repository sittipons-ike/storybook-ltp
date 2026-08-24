/**
 * Keep a number and the thing it counts on the same line.
 *
 * The terms under a mission broke as "รับได้หมุดละ 1" / "ครั้งต่อบัญชี" — the count landed
 * at the end of one line and its unit at the start of the next, which for a moment reads as
 * a bare "1" and then as an unattached "ครั้ง". Thai has no inter-word spaces, so the few
 * spaces that do appear are exactly the ones a wrap will find, and a count-plus-unit is
 * almost always one of them.
 *
 * Done as a rule rather than by typing U+00A0 into the copy: a non-breaking space is
 * invisible in a diff, so it survives exactly until the next person retypes the sentence.
 * This is applied where prose can wrap — conditions, notes, step captions, terms — and is
 * harmless on the short labels that never do.
 *
 * Not a general typographic engine. It binds one pattern, the one that broke.
 */

/** The units this feature counts in. A word not on the list simply is not bound. */
const UNITS = [
  'ใบ',
  'งวด',
  'ครั้ง',
  'กล่อง',
  'วัน',
  'นกพอยต์',
  'สิทธิ์',
  'บาท',
  'ประเภท',
  'เดือน',
  'หมุด',
  'อย่าง',
  'คน',
].join('|');

const PAIR = new RegExp(`(\\d[\\d,]*) (${UNITS})`, 'g');

/** The escape is written out, not typed: a real U+00A0 in source is invisible in a diff. */
export const bindUnits = (text: string): string => text.replace(PAIR, '$1\u00A0$2');

export default bindUnits;
