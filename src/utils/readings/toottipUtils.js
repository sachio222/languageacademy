// Calculate tooltip position on mobile to prevent viewport overflow
export const calculateTooltipPosition = (
  hoveredWord,
  wordRefs,
  setTooltipPosition
) => {
  if (!hoveredWord) {
    setTooltipPosition({ shift: 0, arrowShift: 0, isVisible: false });
    return;
  }

  // Only calculate on mobile screens
  const isMobile = window.innerWidth <= 640;
  if (!isMobile) {
    // Desktop: show immediately, no calculation needed
    setTooltipPosition({ shift: 0, arrowShift: 0, isVisible: true });
    return;
  }

  const wordElement = wordRefs.current[hoveredWord];
  if (!wordElement) return;

  // Check if this is a regular word tooltip - if so, skip positioning logic
  const hasRegularTooltip = wordElement.querySelector(".word-tooltip");
  if (hasRegularTooltip) {
    // Regular tooltips don't need complex positioning, show immediately
    setTooltipPosition({ shift: 0, arrowShift: 0, isVisible: true });
    return;
  }

  // Only Wikipedia tooltips need complex positioning logic
  // Start with hidden tooltip so we can measure it
  setTooltipPosition({ shift: 0, arrowShift: 0, isVisible: false });

  // Use requestAnimationFrame to measure in next frame
  requestAnimationFrame(() => {
    const tooltipElement = wordElement.querySelector(".wiki-tooltip");
    if (!tooltipElement) return;

    const wordRect = wordElement.getBoundingClientRect();
    const tooltipRect = tooltipElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const safeMargin = 8; // 8px margin from edge

    // Calculate word center position
    const wordCenter = wordRect.left + wordRect.width / 2;

    // Calculate where tooltip would be positioned (centered on word)
    const tooltipLeft = wordCenter - tooltipRect.width / 2;
    const tooltipRight = wordCenter + tooltipRect.width / 2;

    let shift = 0;

    // Would overflow left edge?
    if (tooltipLeft < safeMargin) {
      shift = safeMargin - tooltipLeft;
    }
    // Would overflow right edge?
    else if (tooltipRight > viewportWidth - safeMargin) {
      shift = viewportWidth - safeMargin - tooltipRight;
    }

    // Update position and make visible
    setTooltipPosition({
      shift: shift,
      arrowShift: -shift, // Arrow moves opposite to keep pointing at word
      isVisible: true,
    });
  });
};
