// ============================================================================
// SPEAKER COLOR UTILITIES
// ============================================================================

/**
 * Default color palette for speakers
 * Extended Tailwind -500 colors for dialogue
 */
export const DEFAULT_SPEAKER_COLORS = [
  "#3b82f6", // Blue-500
  "#ef4444", // Red-500
  "#10b981", // Green-500
  "#f59e0b", // Orange-500
  "#8b5cf6", // Purple-500
  "#06b6d4", // Cyan-500
  "#84cc16", // Lime-500
  "#f97316", // Orange-500 (darker)
  "#ec4899", // Pink-500
  "#6366f1", // Indigo-500
  "#14b8a6", // Teal-500
  "#a855f7", // Violet-500
  "#eab308", // Yellow-500
  "#ef4444", // Red-500 (duplicate for cycling)
  "#22c55e", // Green-500 (alternative)
];

/**
 * Global array to track discovered speakers in order of appearance
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
    (speaker) => speaker === cleanName || speaker === `${cleanName}[c]`
  );

  if (existingIndex !== -1) {
    // Speaker already exists, return their assigned color (or no color)
    const existingSpeaker = discoveredSpeakers[existingIndex];
    const hasColor = existingSpeaker && existingSpeaker.includes("[c]");

    return {
      speakerName: cleanName,
      color: hasColor
        ? colorPalette[existingIndex % colorPalette.length]
        : null,
    };
  }

  // New speaker - add to discovered speakers with color flag
  const speakerWithFlag = colorIndex !== null ? `${cleanName}[c]` : cleanName;
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
 * Get speaker color for a specific speaker by index
 * @param {number} index - The index of the speaker
 * @param {Array} customColorPalette - Optional custom color palette
 * @returns {string} - The color for the speaker at that index
 */
export const getSpeakerColorByIndex = (index, customColorPalette = null) => {
  const colorPalette = customColorPalette || DEFAULT_SPEAKER_COLORS;
  return colorPalette[index % colorPalette.length];
};
