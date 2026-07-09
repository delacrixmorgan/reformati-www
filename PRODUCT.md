# Product

## Register

product

## Users

Historians and researchers exploring a chronological archive of evidence on a specific topic. They arrive with intent — seeking a specific period, event, or tag — and need to scan, filter, and deep-read without friction. Context: focused research sessions, often comparing multiple articles across a timeline.

## Product Purpose

A static, Markdown-driven timeline archive deployed on GitHub Pages. Articles are tagged, dated, sorted reverse-chronologically, and filterable by tag from the home screen. Each article includes its source attribution and can be shared via the Web Share API. Maintenance is adding one Markdown file with frontmatter (date, tags, source). Success = a researcher finds the evidence they need in under 30 seconds.

## Article Structure

Each article is a Markdown file with frontmatter:
- **Date** — publication/event date, used for chronological sorting
- **Tags** — categorization for filtering on the home screen
- **Source** — original source URL for attribution
- **Content** — the article body in Markdown
- **Share** — Web Share API integration (with clipboard fallback)

## Brand Personality

Minimalist, functional, modern. The interface earns trust through restraint — no decoration, no noise, just clear information hierarchy optimized for sustained reading.

## References

- [dervis.de](https://dervis.de) — typographic clarity, content-first layout, quiet confidence
- [Daring Fireball](https://daringfireball.net/) — no-nonsense content-first blog, excellent readability, functional minimalism

## Anti-references

- Malaysiakini, The Star — ad-heavy, cluttered, competing visual hierarchies, sensory overload, poor signal-to-noise ratio. This archive should be the opposite: calm, focused, zero distractions.

## Design Principles

1. **Readability above all** — generous line-height, constrained measure (65–75ch), type choices optimized for sustained reading, high contrast in both themes
2. **Content is the interface** — typography and whitespace do the work; chrome stays invisible
3. **Zero-friction filtering** — tags and sort are immediate, not buried in menus
4. **Maintainer-first architecture** — adding an article = adding one Markdown file, nothing else
5. **Quiet confidence** — the design earns trust through restraint, not decoration

## Accessibility & Inclusion

- WCAG 2.1 AA compliance
- Light and dark theme support (system preference + manual toggle)
- Reduced motion support (`prefers-reduced-motion`)
- High contrast variants available
- Semantic HTML throughout
- Keyboard navigable
