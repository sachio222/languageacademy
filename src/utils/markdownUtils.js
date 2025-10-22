// Strip markdown formatting and image markers for TTS
export const stripMarkdown = (text) => {
  return text
    .replace(/\*\*/g, "")
    .replace(/!\[.*?\]/g, "") // Remove image markers
    .replace(/\n\n+/g, "\n\n"); // Clean up extra newlines
};
