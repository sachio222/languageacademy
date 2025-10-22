// Convert year to French words for TTS
export const convertYearToFrench = (year) => {
  const num = parseInt(year);

  if (num < 1000) return year; // Don't convert years before 1000

  if (num === 1000) return "mille";
  if (num < 2000) {
    const hundreds = Math.floor(num / 100);
    const remainder = num % 100;

    if (hundreds === 10) {
      return remainder === 0
        ? "mille"
        : `mille ${convertTensAndOnes(remainder)}`;
    } else if (hundreds === 11) {
      return remainder === 0
        ? "onze cents"
        : `onze cent ${convertTensAndOnes(remainder)}`;
    } else if (hundreds === 12) {
      return remainder === 0
        ? "douze cents"
        : `douze cent ${convertTensAndOnes(remainder)}`;
    } else if (hundreds === 13) {
      return remainder === 0
        ? "treize cents"
        : `treize cent ${convertTensAndOnes(remainder)}`;
    } else if (hundreds === 14) {
      return remainder === 0
        ? "quatorze cents"
        : `quatorze cent ${convertTensAndOnes(remainder)}`;
    } else if (hundreds === 15) {
      return remainder === 0
        ? "quinze cents"
        : `quinze cent ${convertTensAndOnes(remainder)}`;
    } else if (hundreds === 16) {
      return remainder === 0
        ? "seize cents"
        : `seize cent ${convertTensAndOnes(remainder)}`;
    } else if (hundreds === 17) {
      return remainder === 0
        ? "dix-sept cents"
        : `dix-sept cent ${convertTensAndOnes(remainder)}`;
    } else if (hundreds === 18) {
      return remainder === 0
        ? "dix-huit cents"
        : `dix-huit cent ${convertTensAndOnes(remainder)}`;
    } else if (hundreds === 19) {
      return remainder === 0
        ? "dix-neuf cents"
        : `dix-neuf cent ${convertTensAndOnes(remainder)}`;
    }
  }

  // For 2000 and beyond
  if (num >= 2000) {
    const thousands = Math.floor(num / 1000);
    const remainder = num % 1000;

    if (thousands === 2) {
      return remainder === 0
        ? "deux mille"
        : `deux mille ${convertHundreds(remainder)}`;
    }
  }

  return year; // Fallback to original if not handled
};

const convertHundreds = (num) => {
  if (num === 0) return "";
  if (num < 100) return convertTensAndOnes(num);

  const hundreds = Math.floor(num / 100);
  const remainder = num % 100;

  const hundredsText =
    hundreds === 1 ? "cent" : `${convertOnes(hundreds)} cent`;
  const remainderText =
    remainder === 0 ? "" : ` ${convertTensAndOnes(remainder)}`;

  return hundredsText + remainderText;
};

const convertTensAndOnes = (num) => {
  if (num === 0) return "";
  if (num < 10) return convertOnes(num);
  if (num < 20) return convertTeens(num);

  const tens = Math.floor(num / 10);
  const ones = num % 10;

  const tensText = convertTens(tens);
  const onesText = ones === 0 ? "" : `-${convertOnes(ones)}`;

  return tensText + onesText;
};

const convertOnes = (num) => {
  const ones = [
    "",
    "un",
    "deux",
    "trois",
    "quatre",
    "cinq",
    "six",
    "sept",
    "huit",
    "neuf",
  ];
  return ones[num] || "";
};

const convertTeens = (num) => {
  const teens = [
    "",
    "onze",
    "douze",
    "treize",
    "quatorze",
    "quinze",
    "seize",
    "dix-sept",
    "dix-huit",
    "dix-neuf",
  ];
  return teens[num - 10] || "";
};

const convertTens = (num) => {
  const tens = [
    "",
    "",
    "vingt",
    "trente",
    "quarante",
    "cinquante",
    "soixante",
    "soixante",
    "quatre-vingt",
    "quatre-vingt",
  ];
  return tens[num] || "";
};
