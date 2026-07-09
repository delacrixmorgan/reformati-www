---
name: Archive WWW
description: A minimalist timeline archive for historians, optimized for deep reading
colors:
  primary: "rgb(109 94 15)"
  on-primary: "rgb(255 255 255)"
  primary-container: "rgb(248 226 135)"
  on-primary-container: "rgb(83 70 0)"
  secondary: "rgb(102 94 64)"
  on-secondary: "rgb(255 255 255)"
  secondary-container: "rgb(238 226 188)"
  on-secondary-container: "rgb(78 71 42)"
  tertiary: "rgb(67 102 78)"
  on-tertiary: "rgb(255 255 255)"
  tertiary-container: "rgb(197 236 206)"
  on-tertiary-container: "rgb(44 78 56)"
  surface: "rgb(255 249 238)"
  on-surface: "rgb(30 27 19)"
  surface-variant: "rgb(234 226 208)"
  on-surface-variant: "rgb(75 71 57)"
  outline: "rgb(124 119 103)"
  outline-variant: "rgb(205 198 180)"
  surface-container: "rgb(244 237 223)"
  surface-container-low: "rgb(250 243 229)"
  surface-container-high: "rgb(238 232 218)"
  surface-dim: "rgb(224 217 204)"
  error: "rgb(186 26 26)"
  on-error: "rgb(255 255 255)"
  dark-surface: "rgb(21 19 11)"
  dark-on-surface: "rgb(232 226 212)"
  dark-primary: "rgb(219 198 110)"
  dark-on-primary: "rgb(58 48 0)"
  dark-surface-container: "rgb(34 32 23)"
  dark-surface-container-high: "rgb(45 42 33)"
  dark-outline: "rgb(150 144 128)"
  dark-outline-variant: "rgb(75 71 57)"
typography:
  body:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  heading:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  label:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.01em"
rounded:
  sm: "8px"
  md: "12px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  section: "80px"
components:
  tag-chip:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface-variant}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  tag-chip-active:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.on-primary-container}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  article-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "24px"
---

# Design System: Archive WWW

## 1. Overview

**Creative North Star: "The Quiet Index"**

A reading-first archive that behaves like a well-organized research library — silent, navigable, and respectful of the reader's time. The interface disappears behind the content. Every element earns its place by serving the researcher's task: find, filter, read, cite.

The system explicitly rejects: visual clutter, competing hierarchies, decorative elements that don't serve comprehension, ad-layout patterns, and anything that makes the reader work harder to extract information. It draws from the functional clarity of dervis.de and the reading comfort of Daring Fireball.

**Key Characteristics:**
- Content-dense without feeling crowded — generous whitespace between articles, tight spacing within
- Warm neutral palette (gold/olive) that reduces eye strain during long reading sessions
- Single-column reading with a hard 70ch cap on prose
- Tags as the primary navigation paradigm, not menus or categories
- Light and dark themes that both prioritize contrast and readability

## 2. Colors

A warm, document-toned palette built on Material Design 3 with a gold/olive primary and sage green tertiary. The warmth lives in the surface tones, not as decoration but as an ergonomic choice for sustained reading.

### Primary
- **Archive Gold** `rgb(109 94 15)`: Interactive elements, active states, links. Used sparingly — the primary color marks actionable things, not brand decoration.
- **Gold Container** `rgb(248 226 135)`: Active tag chips, highlighted states, selection backgrounds.

### Secondary
- **Warm Stone** `rgb(102 94 64)`: Secondary interactive elements, metadata text when it needs distinction from body.
- **Stone Container** `rgb(238 226 188)`: Subtle backgrounds for grouped content.

### Tertiary
- **Sage** `rgb(67 102 78)`: Source links, external references, citation markers — anything that points outward.
- **Sage Container** `rgb(197 236 206)`: Source attribution backgrounds, success states.

### Neutral / Surface
- **Surface** `rgb(255 249 238)`: Page background (light mode). Warm enough to reduce glare, not warm enough to be "cream."
- **On Surface** `rgb(30 27 19)`: Body text. Near-black with warmth that matches the surface.
- **Surface Container** `rgb(244 237 223)`: Card backgrounds, elevated content areas.
- **Outline** `rgb(124 119 103)`: Borders, dividers. Used at 1px only.
- **Outline Variant** `rgb(205 198 180)`: Subtle separators between articles.

### Dark Theme
- **Dark Surface** `rgb(21 19 11)`: Page background. True dark, warm-tinted.
- **Dark On Surface** `rgb(232 226 212)`: Body text in dark mode. High contrast without being pure white.
- **Dark Primary** `rgb(219 198 110)`: Interactive elements in dark mode. Softer gold that doesn't glare.

### Contrast Variants
Medium-contrast and high-contrast variants are available for both themes (see `css/` directory). The standard variants are the default; high-contrast activates via user preference or manual toggle.

## 3. Typography

One typeface family (system stack) at multiple weights. The system prioritizes native rendering speed and familiar reading rhythm over typographic novelty.

### Scale
| Role | Size | Weight | Line Height | Use |
|------|------|--------|-------------|-----|
| Article title | `clamp(1.5rem, 3vw, 2.5rem)` | 700 | 1.2 | Article headings on index and detail pages |
| Body | `1.125rem` (18px) | 400 | 1.7 | Article content, long-form reading |
| Metadata | `0.875rem` (14px) | 500 | 1.4 | Dates, tags, source labels |
| Small | `0.75rem` (12px) | 400 | 1.4 | Timestamps, counts |

### Rules
- Maximum prose width: `65ch`–`70ch`. Never wider.
- `text-wrap: balance` on headings, `text-wrap: pretty` on body paragraphs.
- No font pairing. One family, weight contrast only.
- Letter-spacing on headings: `-0.02em` max. Body stays at `normal`.

## 4. Elevation

Flat. No box shadows. Hierarchy is communicated through:
- Surface color stepping (surface → surface-container → surface-container-high)
- Spacing (more space = more important separation)
- Typography scale (size and weight)

The only shadow in the system is on the theme toggle (a small `0 1px 3px` for affordance).

## 5. Components

### Tag Chip
- Default: `surface-container-high` background, `on-surface-variant` text, fully rounded
- Active/selected: `primary-container` background, `on-primary-container` text
- No border in either state. Color shift is the only indicator.
- Spacing: `4px` gap between chips, row wraps naturally

### Article List Item
- Title (heading scale), date (metadata scale, `outline` color), tags (chip components)
- Separated by `outline-variant` 1px border, not cards
- Generous vertical padding (`24px`) between items
- Title is the link; entire row is not clickable (precision over convenience)

### Article Detail
- Title → date + tags → body → source attribution → share button
- Body uses full typography rules (18px, 1.7 line-height, 70ch max)
- Source: sage-colored link with external icon
- Share: ghost button using Web Share API, clipboard fallback

### Theme Toggle
- Minimal toggle in the header area
- Respects `prefers-color-scheme` on first load
- Persists choice to `localStorage`

### Filter Bar
- Horizontal row of tag chips at the top of the index
- "All" is implicit (no chip selected = show all)
- Selecting a chip filters the list immediately (no submit button)
- Keyboard accessible: arrow keys move between chips, Enter/Space toggles

## 6. Do's and Don'ts

### Do
- Use `outline-variant` borders (1px) to separate article list items
- Let whitespace do the heavy lifting — generous section spacing
- Keep the tag filter always visible at the top (no collapse, no hamburger)
- Use the primary gold only for interactive elements and active states
- Test all text against both light and dark surfaces for 4.5:1 minimum contrast
- Use semantic HTML (`<article>`, `<time>`, `<nav>`, `<main>`)
- Provide keyboard shortcuts for common actions (filter, next/prev article)

### Don't
- Don't wrap articles in cards — use borders and spacing instead
- Don't use the primary color for decoration or large surfaces
- Don't add icons unless they carry meaning a label alone cannot
- Don't animate layout properties — transitions are opacity and transform only
- Don't use hover-only affordances — every interactive element must be discoverable without hover
- Don't add navigation depth beyond home → article (two levels max)
- Don't display more than 3 metadata items per article in the list view (date, tags, source — pick the most relevant)
