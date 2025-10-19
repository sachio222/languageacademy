/**
 * Gender Split Utilities
 * Handles color coding for masculine/feminine word pairs
 */
import React from "react";

/**
 * Check if a French word contains masculine/feminine splits
 * @param {string} frenchText - The French text to check
 * @param {string} note - The note field to help determine if it's a gender split
 * @returns {boolean} - True if it contains gender splits
 */
export function hasGenderSplit(frenchText, note = "") {
  if (!frenchText) return false;

  // Check for slash separator OR parentheses pattern like "allé(e)"
  const slashPattern = /\s*\/\s*/;
  const parenPattern = /\([eE]\)$/;

  if (!slashPattern.test(frenchText) && !parenPattern.test(frenchText)) {
    return false;
  }

  // Check if the note indicates this is about gender agreement
  const noteLower = note.toLowerCase();
  if (
    noteLower.includes("masculine") ||
    noteLower.includes("feminine") ||
    noteLower.includes("agreement") ||
    noteLower.includes("adjective") ||
    noteLower.includes("past participle") ||
    noteLower.includes("participe")
  ) {
    return true;
  }

  // Handle parentheses pattern like "allé(e)" - these are always gender agreements
  if (parenPattern.test(frenchText)) {
    return true;
  }

  // Check for common masculine/feminine adjective patterns (slash format)
  if (slashPattern.test(frenchText)) {
    const parts = frenchText.split(/\s*\/\s*/);

    // Handle special multi-part cases like "tout / toute / tous / toutes"
    if (parts.length === 4) {
      const [masc_sing, fem_sing, masc_plur, fem_plur] = parts.map(p => p.trim().toLowerCase());

      // Check for "tout" pattern specifically
      if (masc_sing === 'tout' && fem_sing === 'toute' &&
        masc_plur === 'tous' && fem_plur === 'toutes') {
        return true;
      }

      // Could add other 4-part patterns here in the future
    }

    // Handle standard 2-part patterns
    if (parts.length === 2) {
      const [first, second] = parts.map((p) => p.trim().toLowerCase());

      // Common patterns for masculine/feminine adjectives
      const genderPatterns = [
        // -e ending (grand/grande, petit/petite)
        { masc: /^(.+)$/, fem: /^(.+)e$/ },
        // -eux/-euse (heureux/heureuse)
        { masc: /^(.+)eux$/, fem: /^(.+)euse$/ },
        // -er/-ère (premier/première)
        { masc: /^(.+)er$/, fem: /^(.+)ère$/ },
        // -f/-ve (neuf/neuve)
        { masc: /^(.+)f$/, fem: /^(.+)ve$/ },
        // -on/-onne (bon/bonne)
        { masc: /^(.+)on$/, fem: /^(.+)onne$/ },
        // -el/-elle (naturel/naturelle)
        { masc: /^(.+)el$/, fem: /^(.+)elle$/ },
      ];

      for (const pattern of genderPatterns) {
        const mascMatch = first.match(pattern.masc);
        const femMatch = second.match(pattern.fem);

        if (mascMatch && femMatch) {
          // Check if the stems are similar (allowing for minor variations)
          const mascStem = mascMatch[1];
          const femStem = femMatch[1];

          if (
            mascStem === femStem ||
            Math.abs(mascStem.length - femStem.length) <= 2
          ) {
            return true;
          }
        }
      }
    }
  }

  return false;
}

/**
 * Render French text with gender-specific coloring for splits
 * @param {string} frenchText - The French text (e.g., "bon / bonne")
 * @param {string} note - The note field to determine overall gender context
 * @returns {JSX.Element|string} - Colored JSX or plain string
 */
export function renderGenderSplitText(frenchText, note = "") {
  if (!hasGenderSplit(frenchText, note)) {
    return frenchText;
  }

  // Handle parentheses pattern like "allé(e)"
  const parenPattern = /^(.+)\([eE]\)$/;
  const parenMatch = frenchText.match(parenPattern);

  if (parenMatch) {
    const basePart = parenMatch[1];
    return React.createElement(
      "span",
      null,
      React.createElement("span", { className: "gender-masculine" }, basePart),
      React.createElement("span", { className: "gender-separator" }, "("),
      React.createElement("span", { className: "gender-feminine" }, "e"),
      React.createElement("span", { className: "gender-separator" }, ")")
    );
  }

  // Handle slash patterns
  const parts = frenchText.split(/\s*\/\s*/);

  // Handle 4-part pattern like "tout / toute / tous / toutes"
  if (parts.length === 4) {
    const [masc_sing, fem_sing, masc_plur, fem_plur] = parts;

    return React.createElement(
      "span",
      null,
      React.createElement("span", { className: "gender-masculine" }, masc_sing),
      React.createElement("span", { className: "gender-separator" }, " / "),
      React.createElement("span", { className: "gender-feminine" }, fem_sing),
      React.createElement("span", { className: "gender-separator" }, " / "),
      React.createElement("span", { className: "gender-masculine" }, masc_plur),
      React.createElement("span", { className: "gender-separator" }, " / "),
      React.createElement("span", { className: "gender-feminine" }, fem_plur)
    );
  }

  // Handle 2-part pattern like "bon / bonne"
  if (parts.length === 2) {
    const [masculinePart, femininePart] = parts;

    return React.createElement(
      "span",
      null,
      React.createElement(
        "span",
        { className: "gender-masculine" },
        masculinePart
      ),
      React.createElement("span", { className: "gender-separator" }, " / "),
      React.createElement("span", { className: "gender-feminine" }, femininePart)
    );
  }

  // Fallback for unexpected formats
  return frenchText;
}

/**
 * Get the appropriate CSS class for gender coloring
 * @param {string} note - The note field
 * @param {boolean} isForSplit - Whether this is for a split word
 * @returns {string} - CSS class name
 */
export function getGenderClass(note, isForSplit = false) {
  if (!note) return "";

  const noteLower = note.toLowerCase();

  if (isForSplit) {
    // For split words, we don't apply overall gender class
    // since individual parts will be colored
    return "";
  }

  if (noteLower.includes("feminine")) return "feminine";
  if (noteLower.includes("masculine")) return "masculine";
  return "";
}
