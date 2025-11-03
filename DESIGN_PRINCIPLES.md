# Design Principles

This document outlines the design principles for Language Academy, inspired by modern web standards from companies like Airbnb, Stripe, and Linear.

## Philosophy

**"Less is More"** - Reduce visual elements by 30-40%, increase white space proportionally. Focus on content hierarchy and readability rather than decorative elements.

## 1. Typography Hierarchy

### Font Weights & Sizes

- **Hero numbers**: 2.5rem+, weight 300 (thin)
- **Page titles**: 2rem, weight 600
- **Section headers (h3)**: 1.25rem, weight 600
- **Subsection headers (h4)**: 1.125rem, weight 500
- **Body text**: 0.9375-1rem, weight 400-500
- **Small text**: 0.875rem, weight 400-500

### Letter Spacing

- Large text (1.5rem+): -0.03em to -0.04em
- Medium text (1rem-1.5rem): -0.015em to -0.025em
- Small text (<1rem): -0.01em or 0

### Line Height

- Body text: 1.6-1.8
- Headers: 1.2-1.4
- Tight (stats, numbers): 1-1.2

## 2. Color System

### Grayscale Foundation

Use a near-zero color approach with mostly grayscale:

- **Primary text**: `#1a1a1a` (not #1e293b)
- **Secondary text**: `#665665` (not #64748b)
- **Tertiary text**: `#999999`
- **Borders/dividers**: `#f0f0f0` (subtle)
- **Light borders**: `#e0e0e0`
- **Backgrounds**: `#fafbfc`, `#f7f9fc` (very subtle)

### Accent Colors

- **Primary action**: Blue (`#3b82f6` or brand color)
- Use color sparingly - only for actions and important highlights
- Avoid colored decorative elements (like colored left borders)

## 3. Spacing Philosophy

### Base Unit: 1rem (16px)

#### Generous Spacing

- **Between major sections**: 2.5-3rem
- **Section padding (sides)**: 2.5-3rem
- **Card internal padding**: 1.25-1.5rem
- **Between section header and content**: 1-1.5rem

#### Micro Spacing

- **Between list items**: 0.75-1rem
- **Between related elements**: 0.5-0.75rem
- **Between label and value**: 0.25-0.5rem

### Rule: Double Current Margins

Modern apps use 2-3x more spacing than traditional designs.

## 4. Visual Simplification

### Borders

- **Default**: No borders - use subtle shadows or background color changes instead
- **When needed**: Use minimal borders (`1px solid #f0f0f0`)
- **Dividers**: Horizontal lines between major sections only
- **Never**: Border overload with every card having borders

### Backgrounds

- **Primary**: White (`#ffffff`)
- **Subtle variants**: `#fafbfc`, `#f7f9fc` for slight differentiation
- **Avoid**: Heavy gradients, multiple nested background colors

### Shadows

- **Modals**: `0 24px 80px rgba(0, 0, 0, 0.2)`
- **Cards** (if needed): `0 2px 8px rgba(0, 0, 0, 0.06)`
- **Hover states**: `0 4px 12px rgba(0, 0, 0, 0.08)`
- **Principle**: Almost no shadows except on modals/elevated surfaces

## 5. Layout Guidelines

### Modal Dialogs

- **Max width**: 600-650px (not 700px+)
- **Padding**: 3rem on all sides
- **Border radius**: 16px
- **Backdrop**: `rgba(0, 0, 0, 0.48)` with 8px blur

### Cards & Containers

- **Border radius**: 8-12px
- **Padding**: 1.25-2rem
- **Avoid**: Nested cards with multiple borders

### Grids

- **Vocabulary/Lists**: Prefer vertical list over cramped grid
- **Stats**: Horizontal flex layout, not individual card containers
- **When using grid**: 2 columns max for content cards, generous gap (1rem+)

## 6. Interactive Elements

### Buttons

#### Primary Button

- **Background**: Solid color (brand blue)
- **Padding**: 1rem vertical, 1.5rem horizontal
- **Border radius**: 10px
- **Font size**: 1rem
- **Font weight**: 600
- **Letter spacing**: -0.01em

#### Secondary Button (Ghost Style)

- **Background**: Transparent
- **Color**: `#665665`
- **Border**: None or subtle 1px
- **Hover**: Subtle background (`#f7f9fc`)

### Transitions

- **Duration**: 0.15s (faster, not 0.2s)
- **Easing**: ease or ease-out
- **Avoid**: Transform on hover (feels gimmicky)
- **Use**: Opacity or subtle shadow changes only

### Hover States

- **Text**: Opacity change (0.7)
- **Cards**: Subtle background change
- **Buttons**: Slight opacity or background change
- **Avoid**: Lifts, transforms, dramatic color changes

## 7. Content Patterns

### Stats Display

```
✓ Large, thin numbers
✓ Clean labels below
✓ No card containers
✓ Horizontal layout with generous gaps
✗ Individual bordered cards
```

### List Items

```
✓ Vertical list with space
✓ Fixed-width labels for alignment
✓ Subtle bottom borders only
✓ Padding between items
✗ Cramped grids
✗ Borders on all sides
```

### Concept/Info Cards

```
✓ Subtle background (#fafbfc)
✓ Generous internal padding
✓ Clean typography hierarchy
✗ Colored left borders
✗ Multiple nested borders
```

## 8. Animation Principles

### Modal Entrance

```css
@keyframes slideUp {
  from {
    transform: translateY(30px) scale(0.98);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}
```

- Duration: 0.25s
- Combined scale and translate
- Feels premium and smooth

### Fade In

- Duration: 0.15s
- Use for overlays
- Simple opacity transition

## 9. Scrollbar Styling

Keep minimal and unobtrusive:

```css
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #dddddd;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #bbbbbb;
}
```

## 10. Accessibility

### Text Contrast

- Ensure minimum 4.5:1 contrast ratio
- Primary text on white: `#1a1a1a` ✓
- Secondary text on white: `#665665` ✓

### Focus States

- Visible focus rings on interactive elements
- Use browser defaults or subtle custom rings

### Font Sizes

- Minimum 0.875rem (14px) for body text
- Prefer 1rem (16px) for main content

## 11. Common Mistakes to Avoid

1. **Border Overload**: Don't put borders on everything
2. **Insufficient Spacing**: Don't be afraid of white space
3. **Weak Typography**: Make size differences significant (not 14px → 15px)
4. **Too Many Colors**: Stick to grayscale + one accent
5. **Gimmicky Animations**: Keep it subtle and fast
6. **Cramped Layouts**: Give content room to breathe
7. **Nested Containers**: Flatten your structure
8. **Inconsistent Spacing**: Use a consistent spacing scale

## 12. Quick Reference

### Spacing Scale

- `0.5rem` (8px) - Tight
- `0.75rem` (12px) - Small
- `1rem` (16px) - Base
- `1.5rem` (24px) - Medium
- `2rem` (32px) - Large
- `2.5rem` (40px) - XL
- `3rem` (48px) - XXL

### Font Size Scale

- `0.75rem` (12px) - Tiny
- `0.875rem` (14px) - Small
- `1rem` (16px) - Base
- `1.125rem` (18px) - Medium
- `1.25rem` (20px) - Large
- `1.5rem` (24px) - XL
- `2rem` (32px) - XXL
- `2.5rem` (40px) - Hero

### Border Radius Scale

- `4px` - Small elements
- `8px` - Cards, inputs
- `10px` - Buttons
- `12px` - Large cards
- `16px` - Modals

## Implementation Checklist

When designing a new component:

- [ ] Typography has clear hierarchy (3+ size/weight levels)
- [ ] Colors limited to grayscale + one accent
- [ ] Spacing is generous (2-3rem between sections)
- [ ] Borders are minimal (only where truly needed)
- [ ] Hover states are subtle and fast (0.15s)
- [ ] Text has proper contrast ratios
- [ ] Layout is clean and uncluttered
- [ ] White space is embraced, not feared
- [ ] Component follows mobile-first approach
- [ ] Screen Real Estate is devoted to content not excessive padding and margin on mobile
- [ ] Interactions feel smooth and natural

---

**Remember**: The goal is clarity and elegance. When in doubt, remove elements and add space.
