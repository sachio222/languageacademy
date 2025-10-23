// ============================================================================
// SPEAKER COLOR UTILITIES
// ============================================================================

/**
 * Default color palette for speakers
 * Extended Tailwind -500 colors for dialogue
 */
export const DEFAULT_SPEAKER_COLORS = [
  "#3b82f6", // [0] Blue-500
  "#ef4444", // [1] Red-500
  "#10b981", // [2] Green-500
  "#f59e0b", // [3] Orange-500
  "#8b5cf6", // [4] Purple-500
  "#06b6d4", // [5] Cyan-500
  "#84cc16", // [6] Lime-500
  "#f97316", // [7] Orange-500 (darker)
  "#ec4899", // [8] Pink-500
  "#6366f1", // [9] Indigo-500
  "#14b8a6", // [10] Teal-500
  "#a855f7", // [11] Violet-500
  "#eab308", // [12] Yellow-500
  "#ef4444", // [13] Red-500 (duplicate for cycling)
  "#22c55e", // [14] Green-500 (alternative)
];

/**
 * Global array to track discovered speakers in order of appearance
 * This should be reset for each new reading session
 */
let discoveredSpeakers = [];

/**
 * Get speaker color with dynamic assignment and optional color specification
 * @param {string} speakerName - The speaker's name (may include [i] syntax)
 * @param {Array} customColorPalette - Optional custom color palette
 * @returns {Object} - Object with clean speaker name and color
 */
export const getSpeakerColor = (speakerName, customColorPalette = null) => {
  const colorPalette = customColorPalette || DEFAULT_SPEAKER_COLORS;

  // Parse speaker name and optional color index
  const { cleanName, colorIndex } = parseSpeakerName(speakerName);

  // Check if speaker already exists (look for both clean name and name with [c] flag)
  const existingIndex = discoveredSpeakers.findIndex(
    (speaker) => speaker === cleanName || speaker.startsWith(`${cleanName}[c]`)
  );

  if (existingIndex !== -1) {
    // Speaker already exists, return their assigned color (or no color)
    const existingSpeaker = discoveredSpeakers[existingIndex];
    const hasColor = existingSpeaker && existingSpeaker.includes("[c]");

    // If speaker has color, find their original color index
    if (hasColor) {
      // Extract the original color index from the stored speaker name
      const storedColorMatch = existingSpeaker.match(/\[c\](\d+)$/);
      if (storedColorMatch) {
        const originalColorIndex = parseInt(storedColorMatch[1], 10);
        return {
          speakerName: cleanName,
          color: colorPalette[originalColorIndex % colorPalette.length],
        };
      }
    }

    return {
      speakerName: cleanName,
      color: null,
    };
  }

  // New speaker - add to discovered speakers with color flag
  const speakerWithFlag =
    colorIndex !== null ? `${cleanName}[c]${colorIndex}` : cleanName;
  discoveredSpeakers.push(speakerWithFlag);

  // Return color only if specified
  return {
    speakerName: cleanName,
    color:
      colorIndex !== null
        ? colorPalette[colorIndex % colorPalette.length]
        : null,
  };
};

/**
 * Parse speaker name to extract clean name and optional color index
 * @param {string} speakerName - The speaker's name (may include [i] syntax)
 * @returns {Object} - Object with clean name and color index
 */
const parseSpeakerName = (speakerName) => {
  // Check for [i] syntax at the end
  const colorMatch = speakerName.match(/^(.+?)\[(\d+)\]$/);

  if (colorMatch) {
    const cleanName = colorMatch[1].trim();
    const colorIndex = parseInt(colorMatch[2], 10);
    return { cleanName, colorIndex };
  }

  // No color specification
  return { cleanName: speakerName.trim(), colorIndex: null };
};

/**
 * Get the list of discovered speakers
 * @returns {Array} - Array of discovered speakers in order of appearance
 */
export const getDiscoveredSpeakers = () => {
  return [...discoveredSpeakers];
};

/**
 * Reset the discovered speakers array
 * Useful for testing or when starting a new reading
 */
export const resetDiscoveredSpeakers = () => {
  discoveredSpeakers = [];
};

/**
 * Get the current discovered speakers (for debugging)
 * @returns {Array} - Current array of discovered speakers
 */
export const getCurrentDiscoveredSpeakers = () => {
  return [...discoveredSpeakers];
};

/**
 * Get speaker color for a specific speaker by index
 * @param {number} index - The index of the speaker
 * @param {Array} customColorPalette - Optional custom color palette
 * @returns {string} - The color for the speaker at that index
 */
export const getSpeakerColorByIndex = (index, customColorPalette = null) => {
  const colorPalette = customColorPalette || DEFAULT_SPEAKER_COLORS;
  return colorPalette[index % colorPalette.length];
};
