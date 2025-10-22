// Helper to check if a paragraph is an image marker
export const isImageMarker = (text) => {
  return /^!\[(.+?)\]$/.test(text.trim());
};

// Helper to extract image path and optional size from marker
// Syntax: ![path] or ![path|maxWidth:400px] or ![path|400px]
export const extractImageInfo = (text) => {
  const match = text.trim().match(/^!\[(.+?)\]$/);
  if (!match) return null;

  const content = match[1];
  const parts = content.split("|");
  const path = parts[0].trim();

  let style = {};
  if (parts[1]) {
    const size = parts[1].trim();
    // If it's just a number with px/%, treat it as maxWidth
    if (/^\d+(%|px)$/.test(size)) {
      style.maxWidth = size;
    } else if (size.includes(":")) {
      // Parse CSS-like syntax: maxWidth:400px
      const [prop, value] = size.split(":");
      style[prop.trim()] = value.trim();
    }
  }

  return { path, style };
};
