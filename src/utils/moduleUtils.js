/**
 * Module utility functions
 * Shared utilities for handling module titles and formatting
 */

/**
 * Splits a lesson title into module prefix and main title
 * @param {string} title - The full lesson title
 * @returns {{modulePrefix: string|null, mainTitle: string}} - Split title parts
 * @example
 * splitTitle("Module 1: Greetings") 
 * // => { modulePrefix: "Module 1", mainTitle: "Greetings" }
 */
export const splitTitle = (title) => {
  const moduleMatch = title.match(/^(Module \d+|Reference [IVX]+):\s*(.*)$/);
  if (moduleMatch) {
    return {
      modulePrefix: moduleMatch[1],
      mainTitle: moduleMatch[2]
    };
  }
  return {
    modulePrefix: null,
    mainTitle: title
  };
};

