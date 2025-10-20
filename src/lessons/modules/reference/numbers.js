/**
 * NUMBERS MODULE
 * French numbers 0-100 and beyond
 */

export const numbersModule = {
  id: "numbers",
  title: "Les Nombres",
  description:
    "French numbers from 0 to infinity - including the unique 70s, 80s, and 90s!",

  concepts: [
    {
      term: "Numbers 0-20",
      definition: "The foundation numbers you need to memorize",
      example:
        "0 zéro, 1 un, 2 deux, 3 trois, 4 quatre, 5 cinq, 6 six, 7 sept, 8 huit, 9 neuf, 10 dix, 11 onze, 12 douze, 13 treize, 14 quatorze, 15 quinze, 16 seize, 17 dix-sept, 18 dix-huit, 19 dix-neuf, 20 vingt",
    },
    {
      term: "Tens (20-60)",
      definition: "Regular tens that follow a pattern",
      example: "20 vingt, 30 trente, 40 quarante, 50 cinquante, 60 soixante",
    },
    {
      term: "The Famous French 70s!",
      definition:
        "70 = sixty-ten (soixante-dix). French counts: 71 (sixty-eleven), 72 (sixty-twelve), etc.",
      example:
        "70 soixante-dix, 71 soixante-et-onze, 75 soixante-quinze, 79 soixante-dix-neuf",
    },
    {
      term: "The Infamous French 80s!",
      definition:
        "80 = four-twenties (quatre-vingts). A remnant of Celtic base-20 counting!",
      example:
        "80 quatre-vingts, 81 quatre-vingt-un, 85 quatre-vingt-cinq, 89 quatre-vingt-neuf",
    },
    {
      term: "The Wild French 90s!",
      definition:
        "90 = four-twenty-ten (quatre-vingt-dix). Combining both systems!",
      example:
        "90 quatre-vingt-dix, 91 quatre-vingt-onze, 95 quatre-vingt-quinze, 99 quatre-vingt-dix-neuf",
    },
    {
      term: "Numbers 21-69 Pattern",
      definition:
        "Add single digits with a hyphen. Use 'et' (and) for 21, 31, 41, 51, 61",
      example:
        "21 vingt-et-un, 22 vingt-deux, 35 trente-cinq, 47 quarante-sept, 69 soixante-neuf",
    },
    {
      term: "Large Numbers",
      definition: "Hundreds, thousands, millions - building bigger numbers",
      example:
        "100 cent, 200 deux cents, 1000 mille, 1,000,000 un million, 1,000,000,000 un milliard",
    },
    {
      term: "Belgian & Swiss Variation",
      definition:
        "More logical! Belgium and Switzerland use: 70 septante, 90 nonante",
      example:
        "70 septante (vs soixante-dix), 90 nonante (vs quatre-vingt-dix). Much easier!",
    },
    {
      term: "Important Exceptions & Rules",
      definition: "Key exceptions you need to know to avoid common mistakes",
      example:
        "1) 'et' (and) only for 21, 31, 41, 51, 61, 71 - NOT 81 or 91! 2) 'quatre-vingts' (80) has 's' but 'quatre-vingt-un' (81) loses it. 3) 'cents' plural: 'deux cents' (200) but 'deux cent un' (201). 4) 'mille' NEVER plural: 'trois mille' (3,000) not 'milles'. 5) Hyphens between all parts EXCEPT before/after 'et' or 'cent/mille'",
    },
  ],

  vocabularyReference: [
    { french: "zéro", english: "zero", note: "0" },
    { french: "un", english: "one", note: "1" },
    { french: "deux", english: "two", note: "2" },
    { french: "trois", english: "three", note: "3" },
    { french: "quatre", english: "four", note: "4" },
    { french: "cinq", english: "five", note: "5" },
    { french: "six", english: "six", note: "6" },
    { french: "sept", english: "seven", note: "7" },
    { french: "huit", english: "eight", note: "8" },
    { french: "neuf", english: "nine", note: "9" },
    { french: "dix", english: "ten", note: "10" },
    { french: "vingt", english: "twenty", note: "20" },
    {
      french: "vingt-et-un",
      english: "twenty-one",
      note: "21 - uses 'et' (and)",
    },
    {
      french: "vingt-deux",
      english: "twenty-two",
      note: "22 - regular hyphen",
    },
    { french: "trente", english: "thirty", note: "30" },
    {
      french: "trente-et-un",
      english: "thirty-one",
      note: "31 - uses 'et' (and)",
    },
    {
      french: "trente-cinq",
      english: "thirty-five",
      note: "35 - regular hyphen",
    },
    { french: "quarante", english: "forty", note: "40" },
    {
      french: "quarante-et-un",
      english: "forty-one",
      note: "41 - uses 'et' (and)",
    },
    { french: "cinquante", english: "fifty", note: "50" },
    {
      french: "cinquante-et-un",
      english: "fifty-one",
      note: "51 - uses 'et' (and)",
    },
    { french: "soixante", english: "sixty", note: "60" },
    {
      french: "soixante-et-un",
      english: "sixty-one",
      note: "61 - uses 'et' (and)",
    },
    { french: "soixante-neuf", english: "sixty-nine", note: "69 - nice 😏" },
    {
      french: "soixante-dix",
      english: "seventy",
      note: "70 (literally: sixty-ten)",
    },
    {
      french: "soixante-et-onze",
      english: "seventy-one",
      note: "71 - uses 'et' (sixty-and-eleven)",
    },
    {
      french: "soixante-quinze",
      english: "seventy-five",
      note: "75 - sixty-fifteen",
    },
    {
      french: "soixante-dix-neuf",
      english: "seventy-nine",
      note: "79 - sixty-nineteen",
    },
    {
      french: "quatre-vingts",
      english: "eighty",
      note: "80 - four-twenties (has 's')",
    },
    {
      french: "quatre-vingt-un",
      english: "eighty-one",
      note: "81 - NO 'et', no 's' on vingt",
    },
    {
      french: "quatre-vingt-dix",
      english: "ninety",
      note: "90 - four-twenty-ten",
    },
    {
      french: "quatre-vingt-onze",
      english: "ninety-one",
      note: "91 - NO 'et' (four-twenty-eleven)",
    },
    {
      french: "quatre-vingt-dix-neuf",
      english: "ninety-nine",
      note: "99 - four-twenty-nineteen!",
    },
    { french: "cent", english: "one hundred", note: "100" },
    { french: "deux cents", english: "two hundred", note: "200 - plural 's'" },
    {
      french: "deux cent un",
      english: "two hundred one",
      note: "201 - no 's' when followed by number",
    },
    { french: "mille", english: "one thousand", note: "1,000" },
    {
      french: "trois mille",
      english: "three thousand",
      note: "3,000 - mille NEVER plural",
    },
    { french: "un million", english: "one million", note: "1,000,000" },
  ],

  exercises: [],
};
