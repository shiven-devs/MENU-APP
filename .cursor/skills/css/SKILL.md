---
name: css
description: Modern CSS guidance for production web applications. Use when writing, debugging, or reviewing CSS, including layouts, responsive design, animations, accessibility, and modern CSS features.
---

# Modern CSS Skill

## Source of truth

Use MDN:

https://developer.mozilla.org/en-US/docs/Web/CSS

## Prefer

- CSS Grid
- Flexbox
- CSS custom properties
- Container queries where appropriate
- Modern responsive techniques
- Logical properties
- Accessible focus states
- Reduced-motion preferences
- Modern CSS nesting where supported
- Semantic HTML combined with CSS

## Rules

Prefer modern CSS solutions over unnecessary JavaScript.

Avoid unnecessarily complicated CSS.

When using a newer CSS feature, verify browser support from MDN or Can I Use when compatibility matters.

When working inside Tailwind projects, prefer Tailwind utilities for ordinary component styling while using CSS for cases where Tailwind is not the appropriate abstraction.
