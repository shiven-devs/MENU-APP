---
name: tailwind
description: Current Tailwind CSS development guidance using Tailwind CSS v4. Use when styling React or Next.js applications with Tailwind.
---

# Tailwind CSS Skill

## Source of truth

Use the official Tailwind CSS documentation:

https://tailwindcss.com/docs

Current target: Tailwind CSS v4.

## Important rules

- Use Tailwind CSS v4 conventions.
- Do not automatically generate a tailwind.config.js file.
- Do not use the old Tailwind v3 @tailwind base/components/utilities directives.
- Prefer the current CSS-first configuration model.
- Use @import "tailwindcss"; for the main stylesheet when appropriate.
- Use current Tailwind v4 utilities and variants.
- Check official documentation when uncertain about a utility or configuration feature.

## Next.js integration

Follow:

https://tailwindcss.com/docs/installation/framework-guides/nextjs

Current recommended setup uses:

tailwindcss
@tailwindcss/postcss
postcss

and:

@import "tailwindcss";

## Avoid

Do not blindly copy Tailwind v3 tutorials.

If an existing project is using Tailwind v3, inspect package.json before changing its configuration.

Prefer the project's installed Tailwind version unless the user explicitly requests an upgrade.
